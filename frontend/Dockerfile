FROM node:20

WORKDIR /app

# Copia apenas package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Executa o Vite no host 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host"]
