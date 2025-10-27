# 🚀 Início Rápido - Sistema de Gestão de Cafeteria

## Instalação e Execução (5 minutos)

### 1. Instalar Dependências

```bash
npm install
```

Isso instalará todas as dependências necessárias (React, Express, SQLite, etc).

### 2. Iniciar o Sistema

Abra **dois terminais**:

#### Terminal 1 - Servidor Backend
```bash
npm run server
```

Você verá:
```
Banco de dados inicializado com sucesso!
Servidor rodando na porta 3001
```

#### Terminal 2 - Frontend React
```bash
npm run dev
```

Você verá:
```
VITE v5.0.8 ready in xxx ms
Local: http://localhost:3000
```

### 3. Acessar o Sistema

1. Abra seu navegador em: **http://localhost:3000**

2. **Login:**
   - Email: `joao@cafeteria.com`
   - Senha: `senha123`

3. **Pronto!** Sistema funcionando ✅

## Usuários de Teste

| Email | Senha | Cargo |
|-------|-------|-------|
| joao@cafeteria.com | senha123 | Gerente |
| maria@cafeteria.com | senha123 | Barista |
| pedro@cafeteria.com | senha123 | Estoquista |

## Estrutura do Sistema

### Frontend
- **URL:** http://localhost:3000
- **Framework:** React 18.2
- **Build Tool:** Vite

### Backend API
- **URL:** http://localhost:3001
- **Framework:** Express.js
- **Banco:** SQLite (manutencao.db)

## Testando Funcionalidades

### ✅ Login
- Acesse http://localhost:3000
- Faça login com qualquer usuário de teste
- Verifique se é redirecionado para o dashboard

### ✅ Cadastro de Insumos
1. Clique em "Cadastro de Insumos"
2. Digite um nome para buscar
3. Clique em "Cadastrar" e preencha o formulário
4. Clique em "Editar" em um insumo existente
5. Clique em "Excluir" para remover (com confirmação)

### ✅ Gestão de Estoque
1. Clique em "Gestão de Estoque"
2. Selecione um insumo
3. Escolha tipo: "Entrada" ou "Saída"
4. Informe quantidade e data
5. Clique em "Registrar Movimentação"

### ✅ Alertas de Estoque
- Registre uma saída que deixe o estoque abaixo do mínimo
- Sistema deve exibir alerta: "Estoque abaixo do mínimo!"
- Insuído deve aparecer marcado na lista

## Parar o Sistema

Em ambos os terminais, pressione:
```
Ctrl + C
```

## Banco de Dados

O banco de dados SQLite é criado automaticamente em:
```
server/manutencao.db
```

Para resetar o banco, delete este arquivo e reinicie o servidor.

## Problemas e Soluções

### ❌ "Cannot find module"
```bash
npm install
```

### ❌ Porta 3000 ou 3001 já em uso
Mac/Linux:
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

Windows:
```powershell
netstat -ano | findstr :3000
taskkill /PID [numero] /F
netstat -ano | findstr :3001
taskkill /PID [numero] /F
```

### ❌ Erro ao iniciar servidor
```bash
# Verifique se está na pasta correta
pwd

# Verifique se Node.js está instalado
node --version

# Deve mostrar: v18.x.x ou superior
```

### ❌ Banco não está sendo criado
- Verifique permissões na pasta `server/`
- Confira se o arquivo `database.sql` existe
- Veja os logs no terminal do servidor

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia frontend React

# Produção
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Servidor
npm run server       # Inicia API backend
```

## Arquitetura Resumida

```
┌─────────────────┐
│   Frontend       │ React (Porta 3000)
│   (Navegador)    │
└────────┬─────────┘
         │ HTTP/AJAX
         ↓
┌─────────────────┐
│   Backend       │ Express.js (Porta 3001)
│   (API)         │
└────────┬─────────┘
         │ SQL
         ↓
┌─────────────────┐
│   Banco         │ SQLite (manutencao.db)
│   de Dados      │
└─────────────────┘
```

## Próximos Passos

1. ✅ Sistema está funcionando
2. ✅ Teste todas as funcionalidades
3. 📝 Gere PDFs da documentação (veja INSTRUCOES-ENTREGA.md)
4. 📊 Crie diagrama DER em imagem
5. 📦 Compacte e entregue

**Sucesso! 🎉**

