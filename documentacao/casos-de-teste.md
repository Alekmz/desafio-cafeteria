# Descritivo de Casos de Teste de Software

**Sistema: Gestão de Insumos de Cafeteria**  
**Data: Janeiro 2024**  
**Versão: 1.0**

## INFORMAÇÕES GERAIS

**Ferramentas de Teste:**
- Manual e funcional
- Navegadores: Chrome, Firefox, Edge (versões mais recentes)
- Ferramentas de desenvolvimento: DevTools do navegador

**Ambiente de Teste:**
- Sistema Operacional: Windows 11 / macOS / Linux
- Node.js: versão 18 ou superior
- Navegador: Google Chrome 120+
- Banco de Dados: SQLite (manutencao.db)

---

## CASOS DE TESTE DE AUTENTICAÇÃO

### CT-01: Login com Credenciais Válidas
**Objetivo:** Verificar se o login funciona com credenciais corretas

**Pré-condições:**
- Sistema rodando (backend e frontend)
- Usuário existe no banco de dados

**Passos:**
1. Acessar http://localhost:3000
2. Preencher email: joao@cafeteria.com
3. Preencher senha: senha123
4. Clicar em "Entrar"

**Resultado Esperado:**
- Redirecionado para o dashboard
- Exibe nome do usuário no cabeçalho
- Interface principal é exibida

**Prioridade:** ALTA

---

### CT-02: Login com Email Inválido
**Objetivo:** Verificar validação de email inexistente

**Pré-condições:**
- Sistema rodando

**Passos:**
1. Acessar http://localhost:3000
2. Preencher email: teste@teste.com
3. Preencher senha: senha123
4. Clicar em "Entrar"

**Resultado Esperado:**
- Exibe mensagem: "Usuário não encontrado"
- Permanece na tela de login
- Campos mantêm valores

**Prioridade:** ALTA

---

### CT-03: Login com Senha Incorreta
**Objetivo:** Verificar validação de senha incorreta

**Passos:**
1. Acessar http://localhost:3000
2. Preencher email: joao@cafeteria.com
3. Preencher senha: senha_errada
4. Clicar em "Entrar"

**Resultado Esperado:**
- Exibe mensagem: "Senha incorreta"
- Permanece na tela de login

**Prioridade:** ALTA

---

### CT-04: Login com Campos Vazios
**Objetivo:** Verificar validação de campos obrigatórios

**Passos:**
1. Acessar http://localhost:3000
2. Deixar campos vazios
3. Clicar em "Entrar"

**Resultado Esperado:**
- Navegador exige preenchimento dos campos
- Botão Entrar desabilitado ou campos validados

**Prioridade:** MÉDIA

---

### CT-05: Logout do Sistema
**Objetivo:** Verificar se logout funciona corretamente

**Pré-condições:**
- Usuário logado no sistema

**Passos:**
1. Estar logado no dashboard
2. Clicar no botão "Sair"

**Resultado Esperado:**
- Redirecionado para tela de login
- Sessão encerrada

**Prioridade:** ALTA

---

## CASOS DE TESTE DE CADASTRO DE INSUMOS

### CT-06: Listar Insumos Cadastrados
**Objetivo:** Verificar se insumos são carregados automaticamente

**Pré-condições:**
- Usuário logado
- Insumos cadastrados no banco

**Passos:**
1. Logar no sistema
2. Clicar em "Cadastro de Insumos"
3. Aguardar carregamento

**Resultado Esperado:**
- Tabela exibe todos os insumos cadastrados
- Colunas: Nome, Categoria, Unidade, Mínimo, Atual, Ações
- Dados estão completos

**Prioridade:** ALTA

---

### CT-07: Buscar Insumo por Nome
**Objetivo:** Verificar funcionalidade de busca

**Passos:**
1. Acessar Cadastro de Insumos
2. Digitar no campo de busca: "Café Arábica"
3. Aguardar atualização

**Resultado Esperado:**
- Lista filtra e exibe apenas "Café Arábica"
- Termo de busca está marcado/selecionado

**Prioridade:** MÉDIA

---

### CT-08: Buscar Insumo por Categoria
**Objetivo:** Verificar busca por categoria

**Passos:**
1. Acessar Cadastro de Insumos
2. Digitar: "Grãos"
3. Aguardar

**Resultado Esperado:**
- Exibe apenas insumos da categoria "Grãos de Café"

**Prioridade:** MÉDIA

---

### CT-09: Cadastrar Novo Insumo
**Objetivo:** Verificar cadastro de insumo

**Passos:**
1. Acessar Cadastro de Insumos
2. Preencher formulário:
   - Nome: Café Descafeinado
   - Unidade: kg
   - Estoque mínimo: 5
3. Clicar em "Cadastrar"

**Resultado Esperado:**
- Exibe mensagem de sucesso
- Novo insumo aparece na lista
- Formulário limpo

**Prioridade:** ALTA

---

### CT-10: Validação ao Cadastrar Sem Campos Obrigatórios
**Objetivo:** Verificar validação

**Passos:**
1. Tentar cadastrar deixando "Nome" vazio
2. Clicar em "Cadastrar"

**Resultado Esperado:**
- Exibe mensagem: "Por favor, preencha todos os campos obrigatórios"
- Não cadastra insumo

**Prioridade:** ALTA

---

### CT-11: Editar Insumo Existente
**Objetivo:** Verificar edição de insumo

**Passos:**
1. Acessar Cadastro de Insumos
2. Clicar em "Editar" em um insumo
3. Alterar valores no formulário
4. Clicar em "Atualizar"

**Resultado Esperado:**
- Formulário preenchido com dados do insumo
- Após atualizar, exibe mensagem de sucesso
- Lista atualizada com novos valores

**Prioridade:** ALTA

---

### CT-12: Excluir Insumo
**Objetivo:** Verificar exclusão de insumo

**Passos:**
1. Acessar Cadastro de Insumos
2. Clicar em "Excluir" em um insumo
3. Confirmar exclusão

**Resultado Esperado:**
- Solicita confirmação antes de excluir
- Após confirmar, insumo é removido
- Exibe mensagem de sucesso

**Prioridade:** ALTA

---

## CASOS DE TESTE DE GESTÃO DE ESTOQUE

### CT-13: Listar Insumos Ordenados Alfabeticamente
**Objetivo:** Verificar ordenação alfabética

**Passos:**
1. Acessar Gestão de Estoque
2. Verificar lista de insumos

**Resultado Esperado:**
- Insumos aparecem em ordem alfabética (A-Z)
- Lista completa e visível

**Prioridade:** ALTA

---

### CT-14: Registrar Movimentação de Entrada
**Objetivo:** Verificar registro de entrada de estoque

**Passos:**
1. Acessar Gestão de Estoque
2. Selecionar insumo: "Leite Integral"
3. Tipo: "Entrada"
4. Quantidade: 10
5. Data: 2024-01-20 08:00
6. Clicar em "Registrar Movimentação"

**Resultado Esperado:**
- Mensagem de sucesso
- Novo estoque exibido (estoque anterior + 10)
- Histórico atualizado

**Prioridade:** ALTA

---

### CT-15: Registrar Movimentação de Saída
**Objetivo:** Verificar registro de saída de estoque

**Passos:**
1. Acessar Gestão de Estoque
2. Selecionar insumo com estoque disponível
3. Tipo: "Saída"
4. Quantidade: 2
5. Data: Data atual
6. Clicar em "Registrar"

**Resultado Esperado:**
- Mensagem de sucesso
- Estoque diminuído corretamente
- Verifica alerta de estoque mínimo

**Prioridade:** ALTA

---

### CT-16: Alerta de Estoque Abaixo do Mínimo
**Objetivo:** Verificar alerta automático

**Pré-condições:**
- Insumo com estoque próximo ao mínimo

**Passos:**
1. Acessar Gestão de Estoque
2. Selecionar insumo com estoque próximo ao mínimo
3. Tipo: "Saída"
4. Quantidade que deixe estoque abaixo do mínimo
5. Registrar movimentação

**Resultado Esperado:**
- Alerta exibido: "Alerta: Estoque abaixo do mínimo configurado!"
- Movimentação é registrada normalmente
- Lista atualizada com indicação visual de estoque baixo

**Prioridade:** ALTA

---

### CT-17: Validação de Quantidade Negativa
**Objetivo:** Verificar validação de valores negativos

**Passos:**
1. Acessar Gestão de Estoque
2. Selecionar insumo
3. Digitar quantidade: -5
4. Clicar em "Registrar"

**Resultado Esperado:**
- Exibe erro: "A quantidade deve ser maior que zero"
- Não registra movimentação

**Prioridade:** MÉDIA

---

### CT-18: Validação de Data Obrigatória
**Objetivo:** Verificar validação de data

**Passos:**
1. Preencher formulário de movimentação
2. Deixar campo de data vazio
3. Clicar em "Registrar"

**Resultado Esperado:**
- Exibe erro: "Por favor, informe a data da movimentação"
- Não registra movimentação

**Prioridade:** MÉDIA

---

### CT-19: Seleção de Insumo para Movimentação
**Objetivo:** Verificar seleção de insumo

**Passos:**
1. Acessar Gestão de Estoque
2. Clicar no dropdown de insumos
3. Selecionar um insumo

**Resultado Esperado:**
- Exibe informações do insumo selecionado
- Mostra estoque atual e estoque mínimo

**Prioridade:** MÉDIA

---

### CT-20: Persistência de Sessão
**Objetivo:** Verificar se sessão persiste após recarregar

**Passos:**
1. Logar no sistema
2. Recarregar a página (F5)

**Resultado Esperado:**
- Usuário permanece logado
- Dados da sessão mantidos

**Prioridade:** MÉDIA

---

## RESUMO DE CASOS DE TESTE

**Total de Casos de Teste:** 20  
**Prioridade ALTA:** 12 casos  
**Prioridade MÉDIA:** 8 casos

**Cobertura:**
- ✅ Autenticação (5 casos)
- ✅ Cadastro de Insumos (7 casos)
- ✅ Gestão de Estoque (7 casos)
- ✅ Validações e Persistência (1 caso)

---

**Elaborado por: [Seu Nome]**  
**Data: Janeiro 2024**

