# 🎵 Top 5 - Tião Carreiro e Pardinho (v2.0)

Sistema web para exibir as 5 músicas mais tocadas da dupla caipira Tião Carreiro
e Pardinho, permitindo sugestões de novas músicas via YouTube.

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

- [ ] v6.1: Testes unitários Laravel
- [ ] v6.2: Testes de API com PHPUnit
- [ ] v6.3: Testes de componentes React
- [ ] v6.4: Testes e2e com Cypress

### Sprint 7: Polimento e Deploy

- [ ] v7.1: Documentação completa
- [ ] v7.2: Variáveis de ambiente exemplos
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

### Pré-requisitos

- Docker e Docker Compose
- Git

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/top5-tiao-carreiro-v2.git
cd top5-tiao-carreiro-v2
```

## ⚙️ Configuração do Projeto

### Configure as variáveis de ambiente

```bash
cp backend/.env
```

### Execute os containers

```bash
docker-compose up -d
```

### Instale as dependências

```bash
# Backend
docker-compose exec backend composer install

# Frontend
docker-compose exec frontend npm install
```

### Configure o banco de dados

```bash
docker-compose exec backend php artisan migrate --seed
```

### Acesse a aplicação

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:9000
- **Adminer:** http://localhost:8080

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
