# Sistema de Gestão de Insumos de Cafeteria

Sistema web desenvolvido em React para gerenciar o estoque de insumos de uma cafeteria, incluindo cadastro de produtos, gestão de movimentações (entrada/saída) e alertas de estoque mínimo.

## Tecnologias Utilizadas

- **Frontend**: React 18.2
- **Backend**: Node.js com Express
- **Banco de Dados**: SQLite (better-sqlite3)
- **Build Tool**: Vite

## Requisitos do Sistema

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. Clone ou extraia o projeto no seu computador

2. Instale as dependências:
```bash
npm install
```

## Execução

### Iniciar o Backend (Servidor API)
```bash
npm run server
```

O servidor API estará rodando em: `http://localhost:3001`

### Iniciar o Frontend (React)
```bash
npm run dev
```

O sistema estará acessível em: `http://localhost:3000`

## Login

O sistema possui 3 usuários de teste pré-cadastrados:

| Email | Senha | Cargo |
|-------|-------|-------|
| joao@cafeteria.com | senha123 | Gerente |
| maria@cafeteria.com | senha123 | Barista |
| pedro@cafeteria.com | senha123 | Estoquista |

## Funcionalidades

### 1. Autenticação
- Login com email e senha
- Validação de credenciais
- Mensagens de erro adequadas

### 2. Dashboard Principal
- Exibição do nome do usuário logado
- Botão de logout
- Navegação para módulos do sistema

### 3. Cadastro de Insumos
- Listar insumos cadastrados
- Buscar insumos por nome ou categoria
- Cadastrar novo insumo
- Editar insumo existente
- Excluir insumo
- Validações de campos obrigatórios

### 4. Gestão de Estoque
- Listar insumos em ordem alfabética
- Selecionar insumo para movimentação
- Registrar entrada de estoque
- Registrar saída de estoque
- Validar data da movimentação
- Alertas automáticos quando estoque fica abaixo do mínimo

## Estrutura do Banco de Dados

O banco de dados SQLite (`manutencao.db`) possui as seguintes tabelas:

- **usuarios**: Usuários do sistema
- **categorias**: Categorias de insumos
- **insumos**: Produtos cadastrados
- **movimentacoes**: Histórico de movimentações

Para mais detalhes, consulte o arquivo `database.sql`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento React
- `npm run build`: Gera build de produção
- `npm run preview`: Pré-visualiza o build de produção
- `npm run server`: Inicia o servidor API Node.js

## Estrutura de Arquivos

```
saep4afase/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CadastroInsumo.jsx
│   │   └── GestaoEstoque.jsx
│   ├── services/            # Serviços (API)
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── server/
│   └── index.js             # Servidor Express
├── database.sql             # Script SQL do banco
├── package.json
└── README.md
```

## Desenvolvido Para

Este sistema foi desenvolvido para atender ao requisito de gestão de insumos de cafeteria, incluindo todas as funcionalidades solicitadas:

✅ Interface de autenticação
✅ Interface principal com logout
✅ Interface de cadastro de insumos com CRUD completo
✅ Interface de gestão de estoque com movimentações
✅ Alertas de estoque mínimo
✅ Histórico de movimentações
✅ Validações de formulários
✅ Design simples e objetivo

