import express from 'express'
import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(express.json())

// Criar banco de dados e tabelas
const dbPath = path.join(__dirname, 'manutencao.db')
let db

// Inicializar banco de dados
function initDatabase() {
  db = new Database(dbPath)
  
  // Criar tabelas se não existirem
  const sqlScript = fs.readFileSync(path.join(__dirname, '..', 'database.sql'), 'utf8')
  db.exec(sqlScript)
  
  console.log('Banco de dados inicializado com sucesso!')
}

initDatabase()

// Middleware para log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// ==================== USUÁRIOS ====================

// Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body
  
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' })
  }
  
  try {
    const user = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email)
    
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }
    
    if (user.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }
    
    const { senha: _, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== INSUMOS ====================

// Listar insumos
app.get('/api/insumos', (req, res) => {
  try {
    const { search } = req.query
    let query = `
      SELECT i.*, c.nome as categoria_nome 
      FROM insumos i 
      LEFT JOIN categorias c ON i.categoria_id = c.id
    `
    
    if (search) {
      query += ` WHERE i.nome LIKE '%${search}%' OR c.nome LIKE '%${search}%'`
    }
    
    query += ' ORDER BY i.nome'
    
    const insumos = db.prepare(query).all()
    res.json(insumos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Buscar insumo por ID
app.get('/api/insumos/:id', (req, res) => {
  try {
    const insumo = db.prepare('SELECT * FROM insumos WHERE id = ?').get(req.params.id)
    if (!insumo) {
      return res.status(404).json({ error: 'Insumo não encontrado' })
    }
    res.json(insumo)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Criar insumo
app.post('/api/insumos', (req, res) => {
  const { nome, descricao, categoria_id, unidade_medida, estoque_minimo, estoque_atual, preco_unitario } = req.body
  
  if (!nome || !unidade_medida || !estoque_minimo) {
    return res.status(400).json({ error: 'Nome, unidade de medida e estoque mínimo são obrigatórios' })
  }
  
  try {
    const result = db.prepare(`
      INSERT INTO insumos (nome, descricao, categoria_id, unidade_medida, estoque_minimo, estoque_atual, preco_unitario)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(nome, descricao || null, categoria_id || null, unidade_medida, estoque_minimo, estoque_atual || 0, preco_unitario || 0)
    
    res.json({ id: result.lastInsertRowid })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualizar insumo
app.put('/api/insumos/:id', (req, res) => {
  const { nome, descricao, categoria_id, unidade_medida, estoque_minimo, estoque_atual, preco_unitario } = req.body
  
  if (!nome || !unidade_medida || !estoque_minimo) {
    return res.status(400).json({ error: 'Nome, unidade de medida e estoque mínimo são obrigatórios' })
  }
  
  try {
    db.prepare(`
      UPDATE insumos 
      SET nome = ?, descricao = ?, categoria_id = ?, unidade_medida = ?, 
          estoque_minimo = ?, estoque_atual = ?, preco_unitario = ?
      WHERE id = ?
    `).run(nome, descricao || null, categoria_id || null, unidade_medida, estoque_minimo, estoque_atual || 0, preco_unitario || 0, req.params.id)
    
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Deletar insumo
app.delete('/api/insumos/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM insumos WHERE id = ?').run(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== CATEGORIAS ====================

// Listar categorias
app.get('/api/categorias', (req, res) => {
  try {
    const categorias = db.prepare('SELECT * FROM categorias ORDER BY nome').all()
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== MOVIMENTAÇÕES ====================

// Listar movimentações
app.get('/api/movimentacoes', (req, res) => {
  try {
    const movimentacoes = db.prepare(`
      SELECT m.*, i.nome as insumo_nome, u.nome as usuario_nome
      FROM movimentacoes m
      JOIN insumos i ON m.insumo_id = i.id
      JOIN usuarios u ON m.usuario_id = u.id
      ORDER BY m.data_registro DESC
      LIMIT 100
    `).all()
    res.json(movimentacoes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Criar movimentação
app.post('/api/movimentacoes', (req, res) => {
  const { insumo_id, usuario_id, tipo, quantidade, data_movimentacao, observacao } = req.body
  
  if (!insumo_id || !usuario_id || !tipo || !quantidade || !data_movimentacao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }
  
  if (tipo !== 'entrada' && tipo !== 'saida') {
    return res.status(400).json({ error: 'Tipo deve ser entrada ou saida' })
  }
  
  try {
    // Criar transação
    const transaction = db.transaction(() => {
      // Inserir movimentação
      db.prepare(`
        INSERT INTO movimentacoes (insumo_id, usuario_id, tipo, quantidade, data_movimentacao, observacao)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(insumo_id, usuario_id, tipo, quantidade, data_movimentacao, observacao || null)
      
      // Atualizar estoque
      const insumo = db.prepare('SELECT * FROM insumos WHERE id = ?').get(insumo_id)
      let novoEstoque = insumo.estoque_atual
      
      if (tipo === 'entrada') {
        novoEstoque += quantidade
      } else {
        novoEstoque -= quantidade
        
        // Verificar estoque mínimo
        if (novoEstoque < insumo.estoque_minimo) {
          return { lowStock: true, mensagem: 'Alerta: Estoque abaixo do mínimo configurado!' }
        }
      }
      
      db.prepare('UPDATE insumos SET estoque_atual = ? WHERE id = ?').run(novoEstoque, insumo_id)
      
      return { lowStock: false, estoque_atual: novoEstoque }
    })
    
    const result = transaction()
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ==================== ESTOQUE ====================

// Listar insumos ordenados para gestão de estoque
app.get('/api/estoque', (req, res) => {
  try {
    const insumos = db.prepare(`
      SELECT i.*, c.nome as categoria_nome 
      FROM insumos i 
      LEFT JOIN categorias c ON i.categoria_id = c.id
      ORDER BY i.nome COLLATE NOCASE
    `).all()
    res.json(insumos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

