# Diagrama Entidade Relacionamento (DER)

**Sistema: Gestão de Insumos de Cafeteria**  
**Data: Janeiro 2024**

## Estrutura das Entidades

### Descrição Textual do DER

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUÁRIOS                                │
├─────────────────────────────────────────────────────────────────┤
│ PK │ id                  │ INTEGER PRIMARY KEY AUTOINCREMENT   │
│    │ nome                │ TEXT NOT NULL                       │
│    │ email               │ TEXT UNIQUE NOT NULL               │
│    │ senha               │ TEXT NOT NULL                       │
│    │ cargo               │ TEXT NOT NULL                       │
│    │ data_criacao        │ DATETIME DEFAULT CURRENT_TIMESTAMP  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ 1
                         │
                         │
                         │ R: um usuário pode fazer
                         │    várias movimentações
                         │
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MOVIMENTAÇÕES                               │
├─────────────────────────────────────────────────────────────────┤
│ PK │ id                  │ INTEGER PRIMARY KEY AUTOINCREMENT   │
│ FK │ insumo_id           │ INTEGER NOT NULL                    │
│ FK │ usuario_id          │ INTEGER NOT NULL                    │
│    │ tipo                │ TEXT CHECK(entrada/saida)          │
│    │ quantidade          │ REAL NOT NULL                       │
│    │ data_movimentacao    │ DATETIME NOT NULL                   │
│    │ observacao          │ TEXT                                │
│    │ data_registro       │ DATETIME DEFAULT CURRENT_TIMESTAMP  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ N
                         │
                         │ R: várias movimentações
                         │    para um insumo
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       INSUMOS                                   │
├─────────────────────────────────────────────────────────────────┤
│ PK │ id                  │ INTEGER PRIMARY KEY AUTOINCREMENT   │
│ FK │ categoria_id        │ INTEGER                            │
│    │ nome                │ TEXT NOT NULL                       │
│    │ descricao           │ TEXT                                │
│    │ unidade_medida      │ TEXT NOT NULL                       │
│    │ estoque_minimo      │ REAL NOT NULL                       │
│    │ estoque_atual       │ REAL DEFAULT 0                      │
│    │ preco_unitario      │ REAL                                │
│    │ data_criacao        │ DATETIME DEFAULT CURRENT_TIMESTAMP  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ N
                         │
                         │ R: um insumo pertence a
                         │    uma categoria
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CATEGORIAS                                 │
├─────────────────────────────────────────────────────────────────┤
│ PK │ id                  │ INTEGER PRIMARY KEY AUTOINCREMENT   │
│    │ nome                │ TEXT NOT NULL UNIQUE                │
│    │ descricao           │ TEXT                                │
│    │ data_criacao        │ DATETIME DEFAULT CURRENT_TIMESTAMP  │
└─────────────────────────────────────────────────────────────────┘
```

## Relacionamentos

### 1. USUÁRIOS ← MOVIMENTAÇÕES (1:N)
- **Tipo:** Um para Muitos
- **Cardinalidade:** Um usuário pode realizar várias movimentações
- **Obrigatoriedade:** Uma movimentação deve ter um usuário responsável

### 2. INSUMOS ← MOVIMENTAÇÕES (1:N)
- **Tipo:** Um para Muitos
- **Cardinalidade:** Um insumo pode ter várias movimentações de entrada e saída
- **Obrigatoriedade:** Uma movimentação deve referenciar um insumo

### 3. CATEGORIAS ← INSUMOS (1:N)
- **Tipo:** Um para Muitos
- **Cardinalidade:** Uma categoria pode ter vários insumos
- **Obrigatoriedade:** Um insumo pode ou não ter uma categoria (opcional)

## Chaves Primárias (PK)
- **usuarios:** id
- **categorias:** id
- **insumos:** id
- **movimentacoes:** id

## Chaves Estrangeiras (FK)
- **movimentacoes.usuario_id** → **usuarios.id**
- **movimentacoes.insumo_id** → **insumos.id**
- **insumos.categoria_id** → **categorias.id**

## Observações do Diagrama

### Tabela: usuarios
Armazena informações dos usuários do sistema (gerentes, baristas, estoquistas).

### Tabela: categorias
Classifica os insumos por tipo (Grãos de Café, Laticínios, Adoçantes, etc).

### Tabela: insumos
Armazena os produtos/insumos da cafeteria com suas especificações.

### Tabela: movimentacoes
Registra todo histórico de entrada e saída de insumos, mantendo rastreabilidade completa.

## Estatísticas das Tabelas

| Tabela | Quantidade de Campos | Chaves Estrageiras | Registros Iniciais |
|--------|---------------------|-------------------|-------------------|
| usuarios | 6 | 0 | 3 |
| categorias | 4 | 0 | 5 |
| insumos | 9 | 1 | 8 |
| movimentacoes | 8 | 2 | 6+ |

## Regras de Negócio Implementadas

1. **Cascata:** Movimentações são vinculadas a insumos e usuários
2. **Integridade:** Campos obrigatórios garantem dados consistentes
3. **Rastreabilidade:** Cada movimentação registra usuário e data
4. **Categorização:** Insumos podem ser organizados por categoria
5. **Controle de Estoque:** Estoque atual e mínimo são sempre mantidos

---

**Diagrama elaborado em:** Janeiro 2024  
**Responsável:** [Seu Nome]

