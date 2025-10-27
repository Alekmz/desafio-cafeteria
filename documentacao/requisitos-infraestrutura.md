# Lista de Requisitos de Infraestrutura

**Sistema: Gestão de Insumos de Cafeteria**  
**Data: Janeiro 2024**  
**Versão: 1.0**

## 1. SISTEMA GERENCIADOR DE BANCO DE DADOS (SGBD)

**SGBD:** SQLite  
**Versão:** 3.39.0 ou superior

**Justificativa:**
- Banco de dados leve e embarcado
- Não requer servidor de banco de dados separado
- Portável (arquivo único)
- Adequado para aplicações desktop/pequeno porte
- Suporte completo para SQL padrão
- Transações ACID

**Arquivo do Banco de Dados:**
- Nome: `manutencao.db`
- Localização: `server/manutencao.db`
- Tamanho estimado: 10MB - 100MB (dependendo do volume de dados)

---

## 2. LINGUAGEM DE PROGRAMAÇÃO

### 2.1 Backend
**Linguagem:** JavaScript (ECMAScript 2022)  
**Runtime:** Node.js  
**Versão do Node.js:** 18.0.0 ou superior  
**Framework:** Express.js 4.18.2

**Bibliotecas Principais:**
- Express.js: Framework web para API REST
- better-sqlite3: Driver para SQLite

### 2.2 Frontend
**Linguagem:** JavaScript (JSX)  
**Framework:** React  
**Versão do React:** 18.2.0

**Ferramentas:**
- Vite 5.0.8: Build tool e servidor de desenvolvimento
- Axios 1.6.2: Cliente HTTP para requisições à API

**Justificativa:**
- JavaScript permite desenvolvimento full-stack
- React oferece interface moderna e responsiva
- Node.js permite backend rápido e simples
- Vite oferece desenvolvimento rápido (HMR)

---

## 3. SISTEMA OPERACIONAL

### 3.1 Desenvolvimento
**Plataformas suportadas:**
- Windows 11 ou superior
- macOS 12 (Monterey) ou superior
- Linux (Ubuntu 20.04 LTS ou distribuições recentes)

### 3.2 Execução
O sistema foi desenvolvido e testado em:
- **macOS Sonoma 14.6**
- Windows 11
- Linux Ubuntu 22.04

**Justificativa:**
- Node.js é cross-platform
- SQLite é multiplataforma
- Navegadores web são disponíveis em todas as plataformas
- Não requer instalações específicas de SO

---

## 4. Navegador Web

**Navegadores Compatíveis:**
- Google Chrome 120 ou superior
- Mozilla Firefox 120 ou superior
- Microsoft Edge 120 ou superior
- Safari 16 ou superior (macOS)

**Justificativa:**
- Todos os navegadores modernos suportam React 18
- Renderização de interfaces web
- API de Fetch para requisições HTTP
- LocalStorage para persistência de sessão

---

## 5. DEPENDÊNCIAS E PACOTES

### 5.1 Dependências Principais
```
react: ^18.2.0
react-dom: ^18.2.0
axios: ^1.6.2
better-sqlite3: ^9.2.2
express: ^4.18.2
```

### 5.2 Dependências de Desenvolvimento
```
@vitejs/plugin-react: ^4.2.1
vite: ^5.0.8
```

### 5.3 Gerenciador de Pacotes
- npm (Node Package Manager)
- Versão mínima: 8.0.0

---

## 6. ARQUITETURA DO SISTEMA

### 6.1 Estrutura Cliente-Servidor
- **Cliente:** React (Frontend) - Porta 3000
- **Servidor:** Express.js (Backend) - Porta 3001
- **Banco de Dados:** SQLite

### 6.2 Comunicação
- Protocolo: HTTP/HTTPS
- Formato de dados: JSON
- API RESTful

### 6.3 Armazenamento Local
- **Frontend:** LocalStorage do navegador
  - Armazena dados de autenticação
- **Backend:** Arquivo SQLite
  - Armazena todos os dados do sistema

---

## 7. REQUISITOS DE HARDWARE

### 7.1 Mínimo Recomendado
- **CPU:** 1.0 GHz ou superior
- **RAM:** 2 GB
- **Disco:** 500 MB para instalação
- **Internet:** Não obrigatório (sistema funciona offline após instalação)

### 7.2 Ideal
- **CPU:** 2.0 GHz ou superior (multi-core)
- **RAM:** 4 GB ou superior
- **Disco:** 1 GB de espaço livre
- **Internet:** Conexão estável para instalação de dependências

---

## 8. SEGURANÇA

### 8.1 Autenticação
- Login baseado em email e senha
- Senhas armazenadas em texto plano (não recomendado para produção)
- **Nota:** Em ambiente de produção, usar hash de senhas (bcrypt)

### 8.2 CORS
- Configurado para aceitar requisições do frontend
- Headers de segurança habilitados

### 8.3 Validação
- Validação de entrada no frontend e backend
- Prevenção de SQL Injection (usando prepared statements)

---

## 9. INSTALAÇÃO E EXECUÇÃO

### 9.1 Instalação
```bash
npm install
```

### 9.2 Execução
```bash
# Terminal 1 - Iniciar servidor
npm run server

# Terminal 2 - Iniciar frontend
npm run dev
```

### 9.3 URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Banco de Dados:** server/manutencao.db

---

## 10. TAMANHO DO PROJETO

- **Código Fonte:** ~50 KB
- **Node Modules:** ~200 MB (após npm install)
- **Banco de Dados:** 10 KB - 10 MB (conforme uso)
- **Documentação:** ~50 KB

---

## 11. VERSÕES E COMPATIBILIDADE

| Componente | Versão Mínima | Versão Testada |
|------------|---------------|----------------|
| Node.js | 18.0.0 | 20.10.0 |
| npm | 8.0.0 | 10.2.0 |
| Chrome | 120 | 120+ |
| SQLite | 3.39.0 | 3.45.0 |

---

## 12. AMBIENTES SUPORTADOS

### Desenvolvimento
- ✅ Windows 11
- ✅ macOS Sonoma
- ✅ Linux Ubuntu 22.04

### Produção
- O sistema pode ser executado em qualquer ambiente com Node.js instalado
- Pode ser convertido para aplicação desktop (Electron)
- Pode ser implantado em servidor web

---

## RESUMO

| Item | Especificação |
|------|---------------|
| **SGBD** | SQLite 3.45.0 |
| **Linguagem Backend** | JavaScript (Node.js 20.10.0) |
| **Linguagem Frontend** | JavaScript (React 18.2.0) |
| **Framework Backend** | Express.js 4.18.2 |
| **Framework Frontend** | React 18.2.0 |
| **Build Tool** | Vite 5.0.8 |
| **SO Desenvolvimento** | macOS Sonoma 14.6 |
| **SO Suportados** | Windows, macOS, Linux |

---

**Documento elaborado em:** Janeiro 2024  
**Responsável:** [Seu Nome]  
**Versão do Sistema:** 1.0.0

