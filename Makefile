# Nome dos containers
BACKEND=laravel-app
FRONTEND=react-app
DB=mysql-db
HTTPSERVER=nginx

start:
	@$(MAKE) up
	@$(MAKE) wait-db
	@$(MAKE) wait-backend
	@docker exec -it $(BACKEND) php artisan migrate
	@$(MAKE) print-urls

# Derrubar containers e limpar database
finish:
	@$(MAKE) wait-backend
	@echo "Executando drop das tabelas (php artisan migrate:reset) no container $(BACKEND)..."
	@docker exec -it $(BACKEND) php artisan migrate:reset --force || true
	@echo "Finalizando containers e removendo volumes..."
	@docker-compose down -v
	@echo "Concluído."
	
# Esperar o banco de dados ficar pronto
wait-db:
	@echo "Aguardando o banco de dados ficar pronto..."
	@while [ "$$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' $(DB) 2>/dev/null)" != "healthy" ]; do \
		sleep 2; \
	done

wait-backend:
	@echo "Aguardando o $(BACKEND) ficar pronto (espera de 60s)..."
	@timeout=60; \
	while [ $$timeout -gt 0 ]; do \
		status=$$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' $(BACKEND) 2>/dev/null); \
		if [ "$$status" = "healthy" ] || [ "$$status" = "running" ]; then break; fi; \
		sleep 1; \
		timeout=$$((timeout - 1)); \
	done; \
	if [ $$timeout -eq 0 ]; then \
		echo "Terminou a espera do $(BACKEND) ficar pronto!"; \
		exit 1; \
	fi

print-urls:
	@echo "Serviços disponíveis:"
	@print_url() { \
		cont=$$1; \
		p=$$(docker port "$$cont" 2>/dev/null | sed -n 's/.*-> //p' | head -n1); \
		if [ -z "$$p" ]; then \
			echo " - $$cont: (nenhuma porta publicada)"; \
		else \
			host=$${p%:*}; port=$${p##*:}; [ "$$host" = "0.0.0.0" ] && host=localhost; \
			case "$$port" in \
				80|443|8000|8080|3000|5173) proto=http ;; \
				3306) proto=mysql ;; \
				*) proto=http ;; \
			esac; \
			echo " - $$cont: $${proto}://$${host}:$${port}"; \
		fi; \
	}; \
	print_url $(BACKEND); \
	print_url $(FRONTEND); \
	print_url $(DB); \
	print_url $(HTTPSERVER)


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