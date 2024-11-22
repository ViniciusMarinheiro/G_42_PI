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
        print(f"Dados carregados: {dados}")
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
    
    print(f'dados_login: {dados_login}')
    print(f'username: {username}')
    print(f'senha: {senha}')

    usuario = next((u for u in usuarios if u["username"] == username), None)
    print(f'usuario: {usuario}')
    print(f'usuario.get("senha") {usuario.get("senha")}')
    print(f'senha {senha}')
    if usuario and str(usuario.get("senha")) == str(senha):
        print("Login bem-sucedido!")
        return jsonify({"mensagem": "Login bem-sucedido!"}), 200
    else:
        print("Erro de login")
        return jsonify({"erro": "Usuário ou senha inválidos"}), 401

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
