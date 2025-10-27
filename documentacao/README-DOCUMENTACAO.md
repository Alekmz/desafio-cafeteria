# Como Gerar os PDFs da Documentação

Este diretório contém os documentos em formato Markdown. Para entregar no formato PDF solicitado, siga as instruções:

## Documentos Necessários

1. **requisitos-funcionais.pdf** - Lista de requisitos funcionais
2. **casos-de-teste.pdf** - Descritivo de casos de teste
3. **requisitos-infraestrutura.pdf** - Lista de requisitos de infraestrutura

## Método Rápido - Usando Ferramentas Online

### Passo a Passo:

1. **Para cada arquivo .md:**
   - Abra o arquivo no VS Code ou editor de texto
   - Copie todo o conteúdo (Ctrl+A, Ctrl+C)

2. **Acesse:**
   - https://dillinger.io/ ou
   - https://www.markdowntopdf.com/

3. **Cole o conteúdo** e clique em "Export to PDF"

4. **Salve** com o nome correto do arquivo

## Método Avançado - Pandoc (Linha de Comando)

Se você tem Pandoc instalado:

```bash
# No diretório documentacao/
cd documentacao

# Converter cada arquivo
pandoc requisitos-funcionais.md -o requisitos-funcionais.pdf
pandoc casos-de-teste.md -o casos-de-teste.pdf
pandoc requisitos-infraestrutura.md -o requisitos-infraestrutura.pdf
```

## Resultado

Após gerar os PDFs, você deve ter:

```
documentacao/
├── requisitos-funcionais.pdf
├── casos-de-teste.pdf
├── requisitos-infraestrutura.pdf
└── DER.md (ou DER.png/jpeg)
```

**Importante:** Você também precisará criar uma imagem do DER (Diagrama Entidade Relacionamento). Veja o arquivo `DER.md` para a descrição textual.

## Criando o DER em Imagem

1. Abra https://app.diagrams.net/ (draw.io)
2. Crie um diagrama com 4 tabelas:
   - usuarios
   - categorias
   - insumos
   - movimentacoes
3. Conecte as tabelas conforme descrito em `DER.md`
4. Exporte como PNG ou JPEG
5. Salve como `DER.png`

## Estrutura Final de Entrega

Seu arquivo compactado deve conter:

```
[nome-completo].zip
├── requisitos-funcionais.pdf
├── DER.png (ou DER.jpeg)
├── database.sql
└── sistema/
    └── [todos os arquivos do código]
```

**Nota:** Os arquivos `.md` são referência. A entrega deve conter apenas os PDFs e imagem do DER.

