import { useState, useEffect } from 'react'
import api from '../services/api'
import './CadastroInsumo.css'

function CadastroInsumo({ onBack }) {
  const [insumos, setInsumos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria_id: '',
    unidade_medida: '',
    estoque_minimo: '',
    estoque_atual: '',
    preco_unitario: ''
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadInsumos()
    loadCategorias()
  }, [])

  useEffect(() => {
    loadInsumos()
  }, [searchTerm])

  const loadInsumos = async () => {
    try {
      const params = searchTerm ? { search: searchTerm } : {}
      const response = await api.get('/insumos', { params })
      setInsumos(response.data)
    } catch (error) {
      showMessage('danger', 'Erro ao carregar insumos')
    }
  }

  const loadCategorias = async () => {
    try {
      const response = await api.get('/categorias')
      setCategorias(response.data)
    } catch (error) {
      showMessage('danger', 'Erro ao carregar categorias')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    // Validações
    if (!formData.nome || !formData.unidade_medida || !formData.estoque_minimo) {
      showMessage('danger', 'Por favor, preencha todos os campos obrigatórios')
      return
    }

    if (formData.estoque_minimo < 0 || formData.estoque_atual < 0) {
      showMessage('danger', 'Os valores de estoque não podem ser negativos')
      return
    }

    setLoading(true)

    try {
      if (editingId) {
        await api.put(`/insumos/${editingId}`, formData)
        showMessage('success', 'Insumo atualizado com sucesso!')
      } else {
        await api.post('/insumos', formData)
        showMessage('success', 'Insumo cadastrado com sucesso!')
      }

      resetForm()
      loadInsumos()
    } catch (error) {
      const msg = error.response?.data?.error || 'Erro ao salvar insumo'
      showMessage('danger', msg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (insumo) => {
    setFormData({
      nome: insumo.nome,
      descricao: insumo.descricao || '',
      categoria_id: insumo.categoria_id || '',
      unidade_medida: insumo.unidade_medida,
      estoque_minimo: insumo.estoque_minimo,
      estoque_atual: insumo.estoque_atual,
      preco_unitario: insumo.preco_unitario || ''
    })
    setEditingId(insumo.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este insumo?')) {
      return
    }

    try {
      await api.delete(`/insumos/${id}`)
      showMessage('success', 'Insumo excluído com sucesso!')
      loadInsumos()
    } catch (error) {
      showMessage('danger', 'Erro ao excluir insumo')
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      categoria_id: '',
      unidade_medida: '',
      estoque_minimo: '',
      estoque_atual: '',
      preco_unitario: ''
    })
    setEditingId(null)
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  return (
    <div className="cadastro-insumo">
      <div className="card">
        <h2>📝 Cadastro de Insumos</h2>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <div className="form-section">
          <h3>{editingId ? 'Editar Insumo' : 'Novo Insumo'}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={formData.categoria_id}
                  onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                rows="2"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Unidade de Medida *</label>
                <input
                  type="text"
                  value={formData.unidade_medida}
                  onChange={(e) => setFormData({ ...formData, unidade_medida: e.target.value })}
                  placeholder="Ex: kg, L, un"
                  required
                />
              </div>

              <div className="form-group">
                <label>Estoque Mínimo *</label>
                <input
                  type="number"
                  value={formData.estoque_minimo}
                  onChange={(e) => setFormData({ ...formData, estoque_minimo: e.target.value })}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Estoque Atual</label>
                <input
                  type="number"
                  value={formData.estoque_atual}
                  onChange={(e) => setFormData({ ...formData, estoque_atual: e.target.value })}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Preço Unitário (R$)</label>
                <input
                  type="number"
                  value={formData.preco_unitario}
                  onChange={(e) => setFormData({ ...formData, preco_unitario: e.target.value })}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Cadastrar')}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="list-section">
          <h3>Lista de Insumos</h3>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar insumos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Unidade</th>
                  <th>Mínimo</th>
                  <th>Atual</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {insumos.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: '#999' }}>
                      Nenhum insumo encontrado
                    </td>
                  </tr>
                ) : (
                  insumos.map(insumo => (
                    <tr key={insumo.id}>
                      <td>{insumo.nome}</td>
                      <td>{insumo.categoria_nome || '-'}</td>
                      <td>{insumo.unidade_medida}</td>
                      <td>{insumo.estoque_minimo}</td>
                      <td 
                        className={insumo.estoque_atual < insumo.estoque_minimo ? 'low-stock' : ''}
                      >
                        {insumo.estoque_atual}
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(insumo)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(insumo.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroInsumo

