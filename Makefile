# Nome dos containers
backend=laravel-app
frontend=react-app
db=mysql-db
nginx=nginx

start:
	@$(MAKE) verificationOS
	@$(MAKE) up
	@$(MAKE) wait-db
	@$(MAKE) testfim
	@$(MAKE) migrate
	@$(MAKE) seed
	@$(MAKE) urls

# Derrubar containers e limpar database
finish:
	@$(MAKE) reset-sql
	@echo "Parando frontend, backend, mysql e nginx..."
	@docker-compose stop backend frontend db nginx || true
	@docker stop $(frontend) $(backend) $(db) $(nginx) 2>/dev/null || true
	@echo "Finalizando containers e removendo volumes..."
	docker-compose down -v
	@$(MAKE) testfim
	@$(MAKE) on
	@echo "Finalizado."
	
# Esperar o banco de dados ficar pronto
wait-db:
	@echo "Aguardando o banco de dados ficar pronto..."
	@while [ "$$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' $(db) 2>/dev/null)" != "healthy" ]; do \
		sleep 2; \
	done

wait-backend:
	@echo "Aguardando o laravel-app ficar pronto (2 tentativas de 30s)..."
	@for attempt in 1 2; do \
		echo "Tentativa $$attempt de 2..."; \
		for i in $$(seq 1 30); do \
			if docker exec $(backend) curl -s http://localhost/musicas > /dev/null 2>&1; then \
				echo "laravel-app está pronto!"; \
				exit 0; \
			fi; \
			sleep 1; \
		done; \
		if [ "$$attempt" -lt 2 ]; then \
			echo "Tentativa $$attempt falhou, aguardando 5s antes de tentar novamente..."; \
			sleep 5; \
		else \
			echo "Timeout esperando o laravel-app ficar pronto após 2 tentativas!"; \
			exit 1; \
		fi; \
	done

urls:
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
	print_url $(backend); \
	print_url $(frontend); \
	print_url $(db); \
	print_url $(nginx); \

# Reiniciar Front
restartfront:
	docker-compose restart frontend

restartback:
	docker-compose restart backend

restart:
	docker-compose restart backend frontend
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
bashb:
	docker-compose exec -it backend bash

bashf:
	docker-compose exec -it frontend bash

# Rodar migrations
migrate:
	docker-compose exec -it backend php artisan migrate

# Rodar seeds
seed:
	docker-compose exec -it backend php artisan db:seed

# Limpar cache do Laravel
cache-clear:
	docker-compose exec -it backend php artisan optimize:clear

# Instalar dependências backend
composer-install:
	docker-compose exec -it backend composer install

# Instalar dependências frontend
npm-install:
	docker-compose exec -it frontend npm install

# Rodar build frontend
npm-build:
	docker-compose exec -it frontend npm run build

# Rodar frontend em modo dev
npm-dev:
	docker-compose exec -it frontend npm run dev

# Listar containers ativos
on:
	docker-compose ps -a

log-backend:
	docker-compose logs -f $(backend)

log-frontend:
	docker-compose logs -f $(frontend)

log-db:
	docker-compose logs -f $(db)

reset-sql:
	@echo "Dropping and recreating MySQL database (via mysql client)..."
	@docker-compose exec db sh -c 'mysql -u"user" -p"secret" -e "DROP DATABASE IF EXISTS \`top5\`; CREATE DATABASE \`top5\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'
	@docker-compose exec backend php artisan migrate --seed

verificationOS:
	@if [ "$$OS" = "Windows_NT" ]; then \
		echo "Ambiente Windows detectado."; \
		echo "Por favor, abra o terminal no PowerShell (recomendado) ou no CMD antes de prosseguir."; \
		printf "Pressione Enter para continuar..."; \
		read -r _; \
	fi

testb:
	docker-compose exec backend composer test

testf:
	docker-compose exec frontend npm test

testfim:
	docker-compose stop backend-test frontend-test
	docker-compose rm -f backend-test frontend-test