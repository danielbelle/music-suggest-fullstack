# 🎵 Top 5 - Tião Carreiro e Pardinho (v2.0)

Sistema web para exibir as 5 músicas mais tocadas da dupla caipira Tião Carreiro
e Pardinho, permitindo sugestões de novas músicas via YouTube.

## 🚀 Tecnologias Utilizadas

- **Backend**: Laravel 11.x, PHP 8.1+
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
│   └── (código Laravel)
├── frontend/
│   ├── Dockerfile
│   ├── .env
│   └── (código React)
└── docker-compose.yml
```

### Sprint 1: Setup Inicial e Infraestrutura

- [✅] v1.1: Configurar Docker para backend Laravel
- [✅] v1.2: Configurar Docker para frontend React
- [ ] v1.3: Setup inicial do Laravel com autenticação
- [ ] v1.4: Setup inicial do React com roteamento
- [ ] v1.5: Configurar comunicação entre containers

### Sprint 2: Modelagem de Dados e API

- [ ] v2.1: Criar migrations para músicas e sugestões
- [ ] v2.2: Implementar models e relações
- [ ] v2.3: Desenvolver API REST para músicas
- [ ] v2.4: Desenvolver API REST para sugestões
- [ ] v2.5: Implementar validações de YouTube links

### Sprint 3: Frontend - Listagem e Sugestões

- [ ] v3.1: Componente de listagem das top 5 músicas
- [ ] v3.2: Formulário de sugestão de novas músicas
- [ ] v3.3: Integração com API Laravel
- [ ] v3.4: Layout responsivo com TailwindCSS

### Sprint 4: Sistema de Autenticação

- [ ] v4.1: Sistema de login frontend
- [ ] v4.2: Proteção de rotas React
- [ ] v4.3: Middleware de autenticação Laravel
- [ ] v4.4: Gestão de tokens com Sanctum

### Sprint 5: Painel Administrativo

- [ ] v5.1: CRUD completo de músicas
- [ ] v5.2: Interface para aprovar/reprovar sugestões
- [ ] v5.3: Filtros e busca no painel admin
- [ ] v5.4: Dashboard com estatísticas

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
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
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
- **Backend (API):** http://localhost:8000
- **Adminer:** http://localhost:8080

### Credenciais Padrão

- **Email:** admin@techpines.com.br
- **Senha:** password

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
