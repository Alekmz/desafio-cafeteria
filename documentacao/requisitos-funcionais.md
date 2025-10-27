# Lista de Requisitos Funcionais

**Sistema: Gestão de Insumos de Cafeteria**  
**Data: Janeiro 2024**  
**Versão: 1.0**

## 1. REQUISITOS FUNCIONAIS DE AUTENTICAÇÃO

### RF-01: Login de Usuário
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir que usuários autenticados façam login através de email e senha.

**Regras de Negócio:**
- O usuário deve informar email e senha válidos
- O email deve existir no banco de dados
- A senha deve corresponder ao usuário cadastrado
- Em caso de falha, o sistema deve exibir mensagem de erro específica

**Fluxo:**
1. Usuário acessa a tela de login
2. Informa email e senha
3. Sistema valida credenciais
4. Se válido, redireciona para o dashboard
5. Se inválido, exibe erro e mantém na tela de login

**Mensagens de Erro:**
- "Usuário não encontrado" (quando email não existe)
- "Senha incorreta" (quando senha não confere)
- "Email e senha são obrigatórios" (quando campos vazios)

### RF-02: Logout de Usuário
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir que o usuário faça logout, encerrando a sessão.

**Regras de Negócio:**
- Ao clicar em logout, o usuário é deslogado
- A sessão é encerrada
- O usuário é redirecionado para a tela de login
- O estado de autenticação é removido do localStorage

## 2. REQUISITOS FUNCIONAIS DE GESTÃO DE INSUMOS

### RF-03: Listar Insumos
**Prioridade:** ALTA  
**Descrição:** O sistema deve exibir uma lista de todos os insumos cadastrados em formato de tabela.

**Regras de Negócio:**
- Listagem deve ser carregada automaticamente ao acessar a tela
- Deve exibir: nome, categoria, unidade de medida, estoque mínimo, estoque atual
- Dados devem ser obtidos do banco de dados

### RF-04: Buscar Insumos
**Prioridade:** MÉDIA  
**Descrição:** O sistema deve permitir buscar insumos por nome ou categoria.

**Regras de Negócio:**
- Campo de busca deve filtrar em tempo real
- Busca deve considerar nome do insumo e categoria
- Lista deve atualizar automaticamente conforme o termo é digitado
- Se nenhum resultado for encontrado, exibir mensagem adequada

### RF-05: Cadastrar Novo Insumo
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir cadastrar novos insumos no sistema.

**Regras de Negócio:**
- Campos obrigatórios: nome, unidade de medida, estoque mínimo
- Campos opcionais: descrição, categoria, preço unitário
- Validações: valores numéricos não podem ser negativos
- Ao cadastrar com sucesso, limpar formulário e atualizar lista

**Validações:**
- Nome: obrigatório, texto
- Unidade de medida: obrigatória, texto
- Estoque mínimo: obrigatório, número positivo
- Estoque atual: opcional, número não negativo
- Preço unitário: opcional, número não negativo

### RF-06: Editar Insumo
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir editar insumos já cadastrados.

**Regras de Negócio:**
- Ao clicar em "Editar", preencher formulário com dados do insumo
- Mesmas validações do cadastro
- Ao salvar, atualizar registro no banco
- Exibir mensagem de sucesso

### RF-07: Excluir Insumo
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir excluir insumos do banco de dados.

**Regras de Negócio:**
- Solicitar confirmação antes de excluir
- Ao confirmar, remover registro do banco
- Atualizar lista após exclusão
- Exibir mensagem de sucesso

## 3. REQUISITOS FUNCIONAIS DE GESTÃO DE ESTOQUE

### RF-08: Listar Insumos Ordenados
**Prioridade:** ALTA  
**Descrição:** O sistema deve listar insumos em ordem alfabética para facilitar a localização.

**Regras de Negócio:**
- Listagem deve estar ordenada alfabeticamente pelo nome
- Deve exibir informações de estoque atual e mínimo
- Deve indicar visualmente quando estoque está abaixo do mínimo

### RF-09: Selecionar Insumo para Movimentação
**Prioridade:** ALTA  
**Descrição:** O usuário deve poder selecionar o insumo que terá movimentação de estoque.

**Regras de Negócio:**
- Dropdown deve listar todos os insumos disponíveis
- Exibir nome, estoque atual e unidade de medida no dropdown
- Ao selecionar, exibir informações detalhadas do insumo selecionado

### RF-10: Escolher Tipo de Movimentação
**Prioridade:** ALTA  
**Descrição:** O usuário deve escolher entre entrada ou saída de estoque.

**Regras de Negócio:**
- Opções: "Entrada" (adicionar estoque) e "Saída" (remover estoque)
- Seleção deve estar clara e acessível

### RF-11: Inserir Data da Movimentação
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir informar a data/hora da movimentação.

**Regras de Negócio:**
- Campo obrigatório
- Formato: datetime-local (data e hora)
- Validar que data é informada

### RF-12: Registrar Movimentação de Entrada
**Prioridade:** ALTA  
**Descrição:** Registrar quando insumos entram no estoque.

**Regras de Negócio:**
- Incrementar estoque atual do insumo
- Registrar movimentação no histórico
- Salvar data, quantidade, tipo e responsável
- Exibir novo valor de estoque

### RF-13: Registrar Movimentação de Saída
**Prioridade:** ALTA  
**Descrição:** Registrar quando insumos saem do estoque.

**Regras de Negócio:**
- Decrementar estoque atual do insumo
- Registrar movimentação no histórico
- Verificar se estoque não fica negativo
- Verificar se estoque fica abaixo do mínimo (gerar alerta)

### RF-14: Alerta de Estoque Mínimo
**Prioridade:** ALTA  
**Descrição:** O sistema deve alertar quando estoque fica abaixo do mínimo configurado.

**Regras de Negócio:**
- Verificar estoque após cada movimentação de saída
- Comparar estoque atual com estoque mínimo do insumo
- Se abaixo do mínimo, exibir alerta visual
- Alerta deve ser claro e específico
- Continuar processamento normalmente

## 4. REQUISITOS FUNCIONAIS DE INTERFACE

### RF-15: Exibir Nome do Usuário Logado
**Prioridade:** MÉDIA  
**Descrição:** O sistema deve exibir o nome e cargo do usuário logado.

**Regras de Negócio:**
- Exibir no cabeçalho da aplicação
- Formato: "Nome do Usuário (Cargo)"

### RF-16: Navegação entre Módulos
**Prioridade:** ALTA  
**Descrição:** O sistema deve permitir navegar entre diferentes módulos.

**Regras de Negócio:**
- Menu/Botões para acessar:
  - Cadastro de Insumos
  - Gestão de Estoque
  - Dashboard principal
- Botão "Voltar" deve retornar ao dashboard

## 5. REQUISITOS FUNCIONAIS DE VALIDAÇÃO E FEEDBACK

### RF-17: Validação de Formulários
**Prioridade:** ALTA  
**Descrição:** O sistema deve validar dados inseridos em formulários.

**Regras de Negócio:**
- Campos obrigatórios não podem ficar vazios
- Números negativos não são permitidos
- Valores decimais devem usar ponto como separador
- Exibir mensagens de erro específicas

### RF-18: Mensagens de Feedback
**Prioridade:** MÉDIA  
**Descrição:** O sistema deve exibir mensagens de sucesso e erro.

**Regras de Negócio:**
- Mensagens de sucesso (verde) para operações bem-sucedidas
- Mensagens de erro (vermelho) para falhas
- Mensagens de alerta (amarelo) para estoque baixo
- Auto-ocultar após 5 segundos

## 6. REQUISITOS FUNCIONAIS DE PERSISTÊNCIA

### RF-19: Persistência de Autenticação
**Prioridade:** MÉDIA  
**Descrição:** O sistema deve manter usuário logado mesmo após recarregar página.

**Regras de Negócio:**
- Usar localStorage para armazenar sessão
- Verificar autenticação ao carregar aplicação
- Se não autenticado, redirecionar para login

### RF-20: Histórico de Movimentações
**Prioridade:** MÉDIA  
**Descrição:** O sistema deve registrar histórico completo de todas as movimentações.

**Regras de Negócio:**
- Registrar: tipo, quantidade, data, usuário responsável
- Armazenar no banco de dados
- Permitir rastreabilidade

---

**Total de Requisitos Funcionais: 20**  
**Desenvolvido por: [Seu Nome]**  
**Data de Elaboração: Janeiro 2024**

