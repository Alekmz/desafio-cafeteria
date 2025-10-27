-- Script de criação do banco de dados manutencao.db
-- Sistema de Gestão de Insumos de Cafeteria

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    cargo TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias de insumos
CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de insumos
CREATE TABLE IF NOT EXISTS insumos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria_id INTEGER,
    unidade_medida TEXT NOT NULL,
    estoque_minimo REAL NOT NULL,
    estoque_atual REAL DEFAULT 0,
    preco_unitario REAL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabela de movimentações de estoque
CREATE TABLE IF NOT EXISTS movimentacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    insumo_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('entrada', 'saida')),
    quantidade REAL NOT NULL,
    data_movimentacao DATETIME NOT NULL,
    observacao TEXT,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (insumo_id) REFERENCES insumos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Inserção de dados nas tabelas

-- Inserir usuários
INSERT INTO usuarios (nome, email, senha, cargo) VALUES
('João Silva', 'joao@cafeteria.com', 'senha123', 'Gerente'),
('Maria Santos', 'maria@cafeteria.com', 'senha123', 'Barista'),
('Pedro Oliveira', 'pedro@cafeteria.com', 'senha123', 'Estoquista');

-- Inserir categorias
INSERT INTO categorias (nome, descricao) VALUES
('Grãos de Café', 'Diferentes tipos e origens de grãos de café'),
('Laticínios', 'Leites e derivados lácteos'),
('Adoçantes e Xaropes', 'Xaropes e adoçantes para bebidas'),
('Descartáveis', 'Copos, canudos e outros materiais descartáveis'),
('Outros', 'Outros insumos diversos');

-- Inserir insumos
INSERT INTO insumos (nome, descricao, categoria_id, unidade_medida, estoque_minimo, estoque_atual, preco_unitario) VALUES
('Café Arábica', 'Grãos de café Arábica - torra média', 1, 'kg', 10.0, 15.5, 45.00),
('Café Robusta', 'Grãos de café Robusta - torra forte', 1, 'kg', 8.0, 12.0, 38.00),
('Leite Integral', 'Leite integral frescos', 2, 'L', 20.0, 25.0, 4.50),
('Leite Desnatado', 'Leite desnatado fresco', 2, 'L', 15.0, 18.0, 4.30),
('Leite de Aveia', 'Leite vegetal de aveia', 2, 'L', 10.0, 12.0, 6.50),
('Xarope de Caramelo', 'Xarope sabor caramelo', 3, 'L', 3.0, 4.5, 25.00),
('Xarope de Baunilha', 'Xarope sabor baunilha', 3, 'L', 3.0, 3.8, 25.00),
('Copos Descartáveis 200ml', 'Copos plásticos descartáveis', 4, 'un', 500.0, 750.0, 0.15);

-- Inserir movimentações
INSERT INTO movimentacoes (insumo_id, usuario_id, tipo, quantidade, data_movimentacao, observacao) VALUES
(1, 1, 'entrada', 20.0, '2024-01-15 08:00:00', 'Recebimento de fornecedor'),
(1, 3, 'saida', 2.5, '2024-01-16 14:30:00', 'Uso diário no preparo'),
(3, 2, 'entrada', 30.0, '2024-01-15 09:00:00', 'Compras semanais'),
(3, 2, 'saida', 5.0, '2024-01-17 10:00:00', 'Preparo de bebidas'),
(4, 2, 'entrada', 25.0, '2024-01-16 08:00:00', 'Estoque de leite desnatado'),
(6, 1, 'entrada', 5.0, '2024-01-14 10:00:00', 'Reposição de xaropes');

