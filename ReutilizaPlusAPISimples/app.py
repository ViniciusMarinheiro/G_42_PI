from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

def carregar_dados(nome_arquivo):
    caminho = os.path.join(DATA_DIR, nome_arquivo)
    if not os.path.exists(caminho):
        with open(caminho, "w") as f:
            json.dump([], f)
    with open(caminho, "r") as f:
        dados = json.load(f)
        return dados


def salvar_dados(nome_arquivo, dados):
    caminho = os.path.join(DATA_DIR, nome_arquivo)
    with open(caminho, "w") as f:
        json.dump(dados, f, indent=4)


@app.route("/")
def home():
    return "Bem-vindo à API do Reutiliza+!"

@app.route("/usuarios", methods=["GET", "POST"])
def usuarios():
    usuarios = carregar_dados("usuarios.json")

    if request.method == "POST":
        novo_usuario = request.json
        print(novo_usuario)
        usuarios.append(novo_usuario)
        salvar_dados("usuarios.json", usuarios)
        return jsonify({"mensagem": "Usuário cadastrado com sucesso!"}), 201

    return jsonify(usuarios)

@app.route("/produtos", methods=["GET", "POST"])
def produtos():
    produtos = carregar_dados("produtos.json")

    if request.method == "POST":
        novo_produto = request.json
        produtos.append(novo_produto)
        salvar_dados("produtos.json", produtos)
        return jsonify({"mensagem": "Produto cadastrado com sucesso!"}), 201

    return jsonify(produtos)

@app.route("/pedidos", methods=["GET", "POST"])
def pedidos():
    pedidos = carregar_dados("pedidos.json")

    if request.method == "POST":
        novo_pedido = request.json
        pedidos.append(novo_pedido)
        salvar_dados("pedidos.json", pedidos)
        return jsonify({"mensagem": "Pedido registrado com sucesso!"}), 201

    return jsonify(pedidos)

@app.route("/pedidos/<int:id_pedido>", methods=["GET"])
def detalhes_pedido(id_pedido):
    pedidos = carregar_dados("pedidos.json")
    pedido = next((p for p in pedidos if p["id"] == id_pedido), None)

    if not pedido:
        return jsonify({"erro": "Pedido não encontrado"}), 404

    return jsonify(pedido)

@app.route("/login", methods=["POST"])
def login():
    usuarios = carregar_dados("usuarios.json")
    
    dados_login = request.json
    username = dados_login.get("username")
    senha = dados_login.get("senha")

    print(f'username: {username}')
    print(f'senha: {senha}')


    usuario = next((u for u in usuarios if u["username"] == username), None)

    if usuario and str(usuario.get("senha")) == str(senha):
        print("Login bem-sucedido!")
        return jsonify({"mensagem": "Login bem-sucedido!"}), 200
    else:
        print("Erro de login")
        return jsonify({"erro": "Usuário ou senha inválidos"}), 401

@app.route("/perfil", methods=["GET", "PUT", "DELETE"])
def perfil():
    username = request.args.get('username')

    print(f'username: {username}')

    if not username:
        return jsonify({"erro": "Username não fornecido"}), 400

    # Carrega os dados dos usuários
    usuarios = carregar_dados("usuarios.json")

    # Busca o usuário pelo username
    usuario = next((u for u in usuarios if u["username"] == username), None)

    if not usuario:
        return jsonify({"erro": "Usuário não encontrado"}), 404

    # Se o método for GET, retorna os dados do usuário
    if request.method == "GET":
        return jsonify(usuario), 200

    # Se o método for PUT, atualiza os dados do usuário
    if request.method == "PUT":
        novos_dados = request.json

        # Atualiza os campos do usuário com os novos dados, exceto a senha
        for chave, valor in novos_dados.items():
            if chave in usuario:
                # Se a chave for "senha" e já houver um valor definido, não atualize
                if chave == "senha" and usuario[chave]:
                    continue
                usuario[chave] = valor

        salvar_dados("usuarios.json", usuarios)
        return jsonify({"mensagem": "Perfil atualizado com sucesso!", "perfil": usuario}), 200

    # Se o método for DELETE, exclui o usuário
    if request.method == "DELETE":
        usuarios = [u for u in usuarios if u["username"] != username]
        salvar_dados("usuarios.json", usuarios)
        return jsonify({"mensagem": f"Usuário {username} excluído com sucesso!"}), 200


@app.route("/doacoes_feitas", methods=["GET", "POST"])
def doacoes_feitas():
    # Carrega os dados de doações existentes
    doacoes = carregar_dados("doacoes.json")

    if request.method == "POST":
        # Recebe a nova doação do cliente
        nova_doacao = request.json

        # Validação básica para garantir que os dados necessários estão presentes
        if not all(k in nova_doacao for k in ("categoria", "descricao", "autorizaDivulgacao")):
            return jsonify({"erro": "Dados incompletos. Verifique se todos os campos foram preenchidos."}), 400

        # Adiciona a nova doação à lista
        doacoes.append(nova_doacao)

        # Salva as doações atualizadas no arquivo JSON
        salvar_dados("doacoes.json", doacoes)

        return jsonify({"mensagem": "Doação registrada com sucesso!"}), 201

    # Retorna todas as doações registradas
    return jsonify(doacoes), 200


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
