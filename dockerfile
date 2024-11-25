# Base única: Node.js com ambiente de backend Python
FROM node:18 AS base

# Instalar Python e dependências necessárias
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Criar diretórios para o frontend e backend
RUN mkdir -p /frontend /backend

# Instalar Expo CLI moderno
RUN npm install -g expo

# Instalar o pacote @expo/ngrok
RUN npm install -g @expo/ngrok

# Configurar o diretório de trabalho para o frontend
WORKDIR /frontend

# Copiar e instalar dependências do frontend
COPY ./ReutilizaPlus/package*.json ./
RUN npm install
COPY ./ReutilizaPlus/ ./

# Configurar o diretório de trabalho para o backend
WORKDIR /backend

# Copiar o arquivo requirements.txt antes de criar o ambiente virtual
COPY ./ReutilizaPlusAPISimples/requirements.txt ./

# Criar e ativar um ambiente virtual Python
RUN python3 -m venv /backend/venv

# Ativar o ambiente virtual e instalar as dependências
RUN /backend/venv/bin/pip install --no-cache-dir -r requirements.txt

# Copiar o restante dos arquivos do backend
COPY ./ReutilizaPlusAPISimples/ ./

# Expor as portas necessárias
EXPOSE 5000 19000 19001 19002

# Rodar o frontend e backend simultaneamente
CMD ["bash", "-c", "cd /frontend && expo start --host 0.0.0.0 & cd /backend && /backend/venv/bin/python app.py"]
