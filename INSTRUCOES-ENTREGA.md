# Instruções para Gerar e Entregar o Trabalho

Este documento explica como organizar e entregar o projeto completo.

## Estrutura do Projeto

```
saep4afase/
├── documentacao/
│   ├── requisitos-funcionais.md
│   ├── casos-de-teste.md
│   ├── requisitos-infraestrutura.md
│   └── DER.md
├── database.sql
├── sistema/
│   ├── src/
│   ├── server/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── .gitignore
└── INSTRUCOES-ENTREGA.md
```

## Como Converter Documentação Markdown para PDF

### Opção 1: Usando Pandoc (Recomendado)

1. **Instalar Pandoc:**
   ```bash
   # macOS
   brew install pandoc
   
   # Windows
   # Baixar de: https://pandoc.org/installing.html
   
   # Linux
   sudo apt-get install pandoc
   ```

2. **Instalar LaTeX (necessário para Pandoc):**
   ```bash
   # macOS
   brew install --cask basictex
   
   # Windows
   # Baixar MiKTeX: https://miktex.org/download
   ```

3. **Converter documentos:**
   ```bash
   cd documentacao
   
   # Requisitos Funcionais
   pandoc requisitos-funcionais.md -o requisitos-funcionais.pdf
   
   # Casos de Teste
   pandoc casos-de-teste.md -o casos-de-teste.pdf
   
   # Requisitos de Infraestrutura
   pandoc requisitos-infraestrutura.md -o requisitos-infraestrutura.pdf
   ```

### Opção 2: Usando Markdown para PDF Online

1. Acesse um dos sites:
   - https://www.markdowntopdf.com/
   - https://dillinger.io/
   - https://stackedit.io/

2. Copie o conteúdo do arquivo `.md`
3. Cole no editor
4. Exporte para PDF

### Opção 3: Usando VS Code

1. Instale a extensão "Markdown PDF" no VS Code
2. Abra o arquivo `.md`
3. Pressione Ctrl+Shift+P (ou Cmd+Shift+P no Mac)
4. Digite "Markdown PDF: Export (pdf)"
5. O PDF será gerado na mesma pasta

## Como Criar o DER em Imagem

### Opção 1: Desenhar Manualmente

Use ferramentas como:
- **Lucidchart**
- **draw.io** (https://app.diagrams.net/)
- **Excalidraw**
- **PowerPoint** ou **Google Slides**

Crie o diagrama baseado na descrição em `documentacao/DER.md`.

### Opção 2: Usar Mermaid

O DER também pode ser visualizado usando Mermaid:
- Acesse: https://mermaid.live/
- Cole a sintaxe do arquivo DER.md
- Exporte como PNG

### Opção 3: Usar Criar Diagrama SQLite

1. Abra o arquivo `database.sql`
2. Use uma ferramenta de modelagem de dados
3. Importe o script SQL

## Estrutura de Entrega Final

Organize os arquivos assim:

```
[nome-completo].zip
├── documentacao/
│   ├── requisitos-funcionais.pdf
│   ├── casos-de-teste.pdf
│   ├── requisitos-infraestrutura.pdf
│   └── DER.png
├── database.sql
└── sistema/
    ├── src/
    ├── server/
    ├── package.json
    ├── README.md
    └── [todos os outros arquivos do projeto]
```

## Checklist de Entrega

Antes de compactar, verifique:

- [ ] Todos os arquivos de código estão em `sistema/`
- Banco de dados: `database.sql`
- Documentação em PDF (3 arquivos)
- DER em formato de imagem (PNG, JPEG)
- Script SQL com pelo menos 3 registros em cada tabela
- Pasta compactada com seu nome completo

## Testando o Sistema

Antes de entregar, certifique-se de que:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor:**
   ```bash
   npm run server
   ```
   (Mantém este terminal aberto)

3. **Inicie o frontend:**
   ```bash
   npm run dev
   ```
   (Em outro terminal)

4. **Teste o login:**
   - Acesse: http://localhost:3000
   - Use: joao@cafeteria.com / senha123

5. **Teste todas as funcionalidades:**
   - ✅ Cadastro de insumos
   - ✅ Edição de insumos
   - ✅ Exclusão de insumos
   - ✅ Busca de insumos
   - ✅ Movimentação de estoque
   - ✅ Alertas de estoque mínimo

## Observações Importantes

1. **O banco SQLite será criado automaticamente** quando você executar o servidor pela primeira vez
2. **Os dados de teste** já estão no arquivo `database.sql`
3. **A porta do backend é 3001** e do frontend é **3000**
4. **Certifique-se** de que não há conflito de portas

## Problemas Comuns

### Erro: "Cannot find module"
```bash
npm install
```

### Porta já em uso
```bash
# macOS/Linux - Encerre o processo na porta
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Banco de dados não está sendo criado
- Verifique se o servidor está rodando
- Verifique permissões da pasta server/
- Confira o arquivo database.sql

## Suporte

Se precisar de ajuda:
- Verifique o README.md
- Revise os arquivos de documentação
- Teste cada funcionalidade individualmente

---

**Boa sorte com a entrega! 🍀**

