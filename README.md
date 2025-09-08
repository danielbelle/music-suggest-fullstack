# 🎵 Top 5 - Tião Carreiro e Pardinho (v2.0)

## Instruções rápidas para uma máquina limpa (sem nada instalado)

Siga estes passos para clonar e executar o projeto mesmo que você não tenha
ferramentas instaladas localmente.

Requisitos mínimos

- Docker Desktop (Windows / macOS / Linux) — inclui Docker Engine e Docker
  Compose.
  - Windows: instalar Docker Desktop e executar Docker Desktop antes de
    prosseguir.
- Git
- (Opcional) make — facilita comandos automatizados; não é obrigatório.

> ⚠️ **Atenção**  
> Execute os comandos Docker pelo PowerShell ou CMD do Windows. Não use o Git
> Bash para levantar os containers — volumes com caminhos do Windows podem
> falhar.

1. Clonar o repositório

```powershell
git clone https://github.com/danielbelle/music-suggest-fullstack.git
cd music-suggest-fullstack
```

## Criar os arquivos .env e .env.test

Copie os exemplos e ajuste os valores conforme necessário. Abaixo há templates
mínimos recomendados — salve nos caminhos indicados.

backend/.env (Laravel)

execute o comando docker-compose exec backend php artisan key:generate para
gerar sua api key laravel

```env
APP_KEY=ADICIONAR-KEY

APP_NAME="Top5 Music"
APP_ENV=local
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:9000

SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,localhost:5173,127.0.0.1
SESSION_DRIVER=cookie
SESSION_SECURE_COOKIE=false
SESSION_DOMAIN=localhost
SESSION_SAME_SITE=lax

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=top5
DB_USERNAME=user
DB_PASSWORD=secret

SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

CACHE_DRIVER=file
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

```


Comandos úteis

```powershell
# copiar exemplos (se houver .env.example)
cp  backend/.env

# gerar APP_KEY dentro do container Laravel
docker-compose run --rm backend php artisan key:generate

# rodar testes com .env.test (Laravel usa .env.testing por padrão)
# se usar sqlite in-memory, não precisa de arquivo físico
```

2. Usando o Makefile (se você tiver make instalado)

```powershell
# comando único (Makefile já encapsula build, wait, migrate e seed)
make start

# para finalizar containers
make finish

# para testes frontend
make testf

# para testes backend
make testb
```

3. Sem Make (passo a passo manual)

```powershell
# Build e sobe todos os serviços em background
docker-compose up -d --build

#Aguarde o banco de dados ficar pronto

# Instalar dependências (apenas se necessário)
docker-compose exec backend composer install
docker-compose exec frontend npm install

# Rodar migrations e seed
docker-compose exec backend php artisan migrate --seed

# Ver logs (se necessário)
docker-compose logs -f
```

4. Alternativa: executar targets do Make dentro de um container (se não tiver
   make no host)

```powershell
# no Windows CMD/PowerShell (usa imagem Alpine temporária)
docker run --rm -v "%cd%":/work -w /work alpine:latest sh -c "apk add --no-cache make && make start"
```

5. URLs locais padrão

- Frontend: http://localhost:3000
- Backend (NGINX): http://localhost:9000

6. Parar e remover containers/volumes

```powershell
docker-compose down -v
```

Dicas rápidas

- Se algo não subir, verifique o status e os logs dos serviços: docker-compose
  ps / docker-compose logs -f backend
- Se o projeto tiver arquivo backend/.env.example, copie para backend/.env e
  ajuste valores sensíveis antes de rodar (ou use variáveis de ambiente).
- Testes:
  - Backend: docker-compose exec backend php artisan test
  - Frontend: docker-compose exec frontend npm test

---

## 🚀 Tecnologias Utilizadas

- **Backend**: Laravel 11.x, PHP 8.2+
- **Frontend**: React 18.x, tailwindcss v4.1
- **Database**: MySQL 8.0
- **Container**: Docker + Docker Compose
- **Auth**: Laravel Sanctum
- **Testing**: PHPUnit, Jest + React Testing Library

## 📋 Sprint Planning

### 📁 Estrutura do Projeto

```
top5-tiao-carreiro-v2/
├── backend/
│   ├── Dockerfile
│   ├── .env
│   └── ... (código Laravel)
├── frontend/
│   ├── Dockerfile
│   └── ... (código React)
├── nginx/
│   └── default.conf
├── docker-compose.yml
├── Makefile
├── .env
└── README.md
```

### Sprint 1: Setup Inicial e Infraestrutura

- [x] v1.1: Configurar Docker para backend Laravel
- [x] v1.2: Configurar Docker para frontend React
- [x] v1.3: Setup inicial do Laravel com autenticação
- [x] v1.4: Setup inicial do React com roteamento
- [x] v1.5: Configurar comunicação entre containers

### Sprint 2: Modelagem de Dados e API

- [x] v2.1: Criar migrations para músicas e sugestões
- [x] v2.2: Implementar models e relações
- [x] v2.3: Desenvolver API REST para músicas
- [x] v2.4: Desenvolver API REST para sugestões
- [x] v2.5: Implementar validações de YouTube links

### Sprint 3: Frontend - Listagem e Sugestões

- [x] v3.1: Componente de listagem das top 5 músicas
- [x] v3.2: Formulário de sugestão de novas músicas
- [x] v3.3: Integração com API Laravel
- [x] v3.4: Layout responsivo com TailwindCSS

### Sprint 4: Sistema de Autenticação

- [x] v4.1: Sistema de login frontend
- [ ] v4.2: Proteção de rotas React
- [x] v4.3: Middleware de autenticação Laravel
- [x] v4.4: Gestão de tokens com Sanctum

### Sprint 5: Painel Administrativo

- [x] v5.1: CRUD completo de músicas
- [x] v5.2: Interface para aprovar/reprovar sugestões
- [ ] v5.3: Filtros e busca no painel admin
- [x] v5.4: Dashboard com estatísticas

### Sprint 6: Testes Automatizados

- [x] v6.1: Testes unitários Laravel
- [x] v6.2: Testes de API com PHPUnit
- [x] v6.3: Testes de componentes React
- [ ] v6.4: Testes e2e com Cypress

### Sprint 7: Polimento e Deploy

- [x] v7.1: Documentação completa
- [x] v7.2: Variáveis de ambiente exemplos
- [ ] v7.3: Scripts de build e deploy
- [ ] v7.4: Testes finais e ajustes

## 🐳 Como Executar o Projeto

### ⚠️ Atenção para usuários Windows

> **IMPORTANTE:**  
> Sempre execute os comandos Docker (como `docker-compose up`,
> `docker-compose exec`, etc) pelo **CMD** ou **PowerShell** do Windows, e
> **NÃO** pelo Git Bash ou WSL!  
> Isso garante que os caminhos relativos dos volumes funcionem corretamente no
> Docker.

---

### Credenciais Padrão

- **Email:**
- **Senha:**

---

## 🧪 Executando Testes

```bash
# Testes backend
docker-compose exec backend php artisan test

# Testes frontend
docker-compose exec frontend npm test
```

---

## 📞 Suporte

Para dúvidas técnicas: henrique.danielb@gmail.com

## 📡 API REST de Músicas

A API REST para músicas oferece os seguintes endpoints:

- `GET /musicas` — Lista todas as músicas cadastradas.
- `GET /musicas/{musica}` — Exibe os detalhes de uma música específica.
- `POST /musicas` — Cria uma nova música (requer autenticação).
- `PUT /musicas/{musica}` — Atualiza uma música existente (requer autenticação).
- `DELETE /musicas/{musica}` — Remove (soft delete) uma música (requer
  autenticação).
- `PATCH /musicas/{musica}/restore` — Restaura uma música excluída (requer
  autenticação).

As operações de criação, edição, exclusão e restauração exigem que o usuário
esteja autenticado via Sanctum.

## 📡 API REST de Sugestões

A API REST para sugestões oferece os seguintes endpoints:

- `GET /sugestoes` — Lista todas as sugestões cadastradas.
- `POST /sugestoes` — Cria uma nova sugestão (público ou autenticado).
- `DELETE /sugestoes/{sugestao}` — Remove (soft delete) uma sugestão (requer
  autenticação).
- `PATCH /sugestoes/{id}/restore` — Restaura uma sugestão excluída (requer
  autenticação).
- `PATCH /sugestoes/{sugestao}/aprovar` — Aprova uma sugestão (requer
  autenticação).
- `PATCH /sugestoes/{sugestao}/reprovar` — Reprova uma sugestão (requer
  autenticação).

As operações de exclusão, restauração, aprovação e reprovação exigem que o
usuário esteja autenticado via Sanctum.
