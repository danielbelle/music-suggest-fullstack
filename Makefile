# Nome dos containers
BACKEND=laravel-app
FRONTEND=react-app
DB=mysql-db

#
startar:
	docker-compose up -d --build && 
	docker exec -it $(BACKEND) php artisan migrate

# Subir containers
up:
	docker-compose up -d --build

# Derrubar containers
down:
	docker-compose down -v

# Logs em tempo real
logs:
	docker-compose logs -f

# Entrar no container Laravel
bash:
	docker exec -it $(BACKEND) bash

# Rodar migrations
migrate:
	docker exec -it $(BACKEND) php artisan migrate

# Rodar seeds
seed:
	docker exec -it $(BACKEND) php artisan db:seed

# Limpar cache do Laravel
cache-clear:
	docker exec -it $(BACKEND) php artisan optimize:clear

# Instalar dependências backend
composer-install:
	docker exec -it $(BACKEND) composer install

# Instalar dependências frontend
npm-install:
	docker exec -it $(FRONTEND) npm install

# Rodar build frontend
npm-build:
	docker exec -it $(FRONTEND) npm run build

# Rodar frontend em modo dev
npm-dev:
	docker exec -it $(FRONTEND) npm run dev

# Listar containers ativos
on:
	docker ps -a

log-backend:
	docker logs -f $(BACKEND)

log-frontend:
	docker logs -f $(FRONTEND)

log-db:
	docker logs -f $(DB)