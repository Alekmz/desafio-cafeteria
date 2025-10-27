# 🎯 GUIA DE ENTREGA FINAL

## 📦 Estrutura de Entrega Requerida

Você precisa criar um arquivo ZIP contendo:

```
[nome-completo].zip
├── requisitos-funcionais.pdf
├── casos-de-teste.pdf
├── requisitos-infraestrutura.pdf
├── DER.png (ou DER.jpeg)
├── database.sql
└── sistema/
    └── [todos os arquivos do código]
```

---

## 📝 Passo 1: Gerar PDFs da Documentação

### Método Rápido (Recomendado)

1. Acesse: https://www.markdowntopdf.com/
2. Para cada arquivo em `documentacao/`:
   - Abra: `requisitos-funcionais.md`
   - Copie todo o conteúdo
   - Cole no site
   - Clique "Convert to PDF"
   - Baixe e salve como `requisitos-funcionais.pdf`
   - Repita para: `casos-de-teste.md` → `casos-de-teste.pdf`
   - Repita para: `requisitos-infraestrutura.md` → `requisitos-infraestrutura.pdf`

### Método com VS Code

1. Instale extensão "Markdown PDF"
2. Abra cada arquivo `.md`
3. Ctrl+Shift+P → "Markdown PDF: Export (pdf)"

---

## 🎨 Passo 2: Criar Imagem do DER

1. Acesse: https://app.diagrams.net/
2. Clique em "Create New Diagram"
3. Escolha "Blank Diagram"
4. Use como referência: `documentacao/DER-VISUAL.txt`

### Desenhar o DER:

```
Crie 4 retângulos (tabelas):

┌─────────────┐
│  usuarios   │ →→ N ┌─────────────┐
└─────────────┘    │  │movimentacoes│
                   ├─▶│             │
┌─────────────┐    │  └─────────────┘
│ categorias  │──N→N
└─────────────┘
       ↓
   ┌─────────────┐
   │  insumos    │
   └─────────────┘
```

5. Adicione os campos de cada tabela
6. Conecte as tabelas com setas
7. Salve como: `DER.png` ou `DER.jpeg`

---

## 📁 Passo 3: Organizar Pasta "sistema"

Crie uma pasta chamada `sistema/` e copie TODOS os arquivos do projeto:

```bash
# No terminal, dentro da pasta saep4afase:
mkdir entrega
cp -r src entrega/sistema/
cp -r server entrega/sistema/
cp package.json entrega/sistema/
cp vite.config.js entrega/sistema/
cp index.html entrega/sistema/
cp README.md entrega/sistema/
```

OU copie manualmente todos os arquivos para a pasta `sistema/`

---

## 📦 Passo 4: Estrutura Final

```
entrega/
├── requisitos-funcionais.pdf
├── casos-de-teste.pdf
├── requisitos-infraestrutura.pdf
├── DER.png
├── database.sql
└── sistema/
    ├── src/
    ├── server/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── README.md
```

---

## 🗜️ Passo 5: Compactar

### macOS/Linux:
```bash
cd entrega
zip -r ../[seu-nome-completo].zip .
```

### Windows:
- Selecione todos os arquivos na pasta `entrega`
- Botão direito → "Enviar para" → "Pasta compactada"
- Renomeie para: `[seu-nome-completo].zip`

### Formato final:
- `Alex-Silva.zip`
- `Maria-Santos.zip`
- etc.

---

## ✅ Checklist Antes de Entregar

- [ ] Todos os 3 PDFs foram gerados?
- [ ] DER foi criado em imagem (PNG ou JPEG)?
- [ ] Pasta `sistema/` contém todos os arquivos?
- [ ] `database.sql` está incluído?
- [ ] Arquivo compactado tem seu nome completo?
- [ ] Testou o sistema antes de entregar?

---

## 🧪 Teste Final do Sistema

Antes de entregar, certifique-se:

```bash
# Terminal 1
npm run server
# Deve mostrar: "Servidor rodando na porta 3001"

# Terminal 2
npm run dev
# Deve mostrar: "Local: http://localhost:3000"
```

1. ✅ Acesse http://localhost:3000
2. ✅ Faça login com joao@cafeteria.com / senha123
3. ✅ Teste cadastro de insumo
4. ✅ Teste edição de insumo
5. ✅ Teste exclusão de insumo
6. ✅ Teste gestão de estoque
7. ✅ Teste alerta de estoque baixo

---

## 📧 Informações da Entrega

**Formato do arquivo:** ZIP, RAR ou 7ZIP

**Tamanho esperado:** ~1-5 MB

**Conteúdo obrigatório:**
1. ✅ Lista de requisitos funcionais (PDF)
2. ✅ Diagrama entidade relacionamento (PNG)
3. ✅ Script SQL (SQL)
4. ✅ Sistema (pasta com código)
5. ✅ Casos de teste (PDF)
6. ✅ Requisitos de infraestrutura (PDF)

---

## 🎓 Resumo Rápido

Você precisa entregar:
- ✅ 3 arquivos PDF (requisitos, testes, infraestrutura)
- ✅ 1 arquivo imagem (DER.png)
- ✅ 1 arquivo SQL (database.sql)
- ✅ 1 pasta (sistema/) com todo o código

**Tudo isso compactado em ZIP com seu nome!**

---

## 🚀 Bom Trabalho!

Seu projeto está completo e pronto para entrega! 🎉

**Desenvolvido com:** React + Node.js + SQLite  
**Data:** Janeiro 2024  
**Status:** ✅ PRONTO PARA ENTREGA

