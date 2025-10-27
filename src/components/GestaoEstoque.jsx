import { useState, useEffect } from 'react'
import api from '../services/api'
import './GestaoEstoque.css'

function GestaoEstoque({ user, onBack }) {
  const [insumos, setInsumos] = useState([])
  const [selectedInsumo, setSelectedInsumo] = useState(null)
  const [tipoMovimentacao, setTipoMovimentacao] = useState('entrada')
  const [quantidade, setQuantidade] = useState('')
  const [dataMovimentacao, setDataMovimentacao] = useState('')
  const [observacao, setObservacao] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadInsumos()
  }, [])

  const loadInsumos = async () => {
    try {
      const response = await api.get('/estoque')
      setInsumos(response.data)
    } catch (error) {
      showMessage('danger', 'Erro ao carregar insumos')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!selectedInsumo) {
      showMessage('danger', 'Por favor, selecione um insumo')
      return
    }

    if (!quantidade || quantidade <= 0) {
      showMessage('danger', 'A quantidade deve ser maior que zero')
      return
    }

    if (!dataMovimentacao) {
      showMessage('danger', 'Por favor, informe a data da movimentação')
      return
    }

    setLoading(true)

    try {
      const dataFormatada = new Date(dataMovimentacao).toISOString()
      const response = await api.post('/movimentacoes', {
        insumo_id: selectedInsumo.id,
        usuario_id: user.id,
        tipo: tipoMovimentacao,
        quantidade: parseFloat(quantidade),
        data_movimentacao: dataFormatada,
        observacao
      })

      // Verificar se há alerta de estoque baixo
      if (response.data.lowStock) {
        showMessage('warning', response.data.mensagem)
      } else {
        const insumo = selectedInsumo
        const novoEstoque = tipoMovimentacao === 'entrada' 
          ? insumo.estoque_atual + parseFloat(quantidade)
          : insumo.estoque_atual - parseFloat(quantidade)
        
        showMessage('success', `Movimentação registrada! Novo estoque: ${novoEstoque.toFixed(2)} ${insumo.unidade_medida}`)
      }

      // Resetar formulário
      setQuantidade('')
      setObservacao('')
      setSelectedInsumo(null)
      setTipoMovimentacao('entrada')
      setDataMovimentacao('')
      
      loadInsumos()
    } catch (error) {
      const msg = error.response?.data?.error || 'Erro ao registrar movimentação'
      showMessage('danger', msg)
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  return (
    <div className="gestao-estoque">
      <div className="card">
        <h2>📊 Gestão de Estoque</h2>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <div className="form-section">
          <h3>Movimentação de Estoque</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Selecione o Insumo *</label>
              <select
                value={selectedInsumo?.id || ''}
                onChange={(e) => {
                  const insumo = insumos.find(i => i.id === parseInt(e.target.value))
                  setSelectedInsumo(insumo)
                }}
                required
              >
                <option value="">Selecione um insumo...</option>
                {insumos.map(insumo => (
                  <option key={insumo.id} value={insumo.id}>
                    {insumo.nome} - Estoque: {insumo.estoque_atual} {insumo.unidade_medida}
                  </option>
                ))}
              </select>
            </div>

            {selectedInsumo && (
              <div className="insumo-info">
                <p><strong>Estoque Atual:</strong> {selectedInsumo.estoque_atual} {selectedInsumo.unidade_medida}</p>
                <p><strong>Estoque Mínimo:</strong> {selectedInsumo.estoque_minimo} {selectedInsumo.unidade_medida}</p>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>Tipo de Movimentação *</label>
                <select
                  value={tipoMovimentacao}
                  onChange={(e) => setTipoMovimentacao(e.target.value)}
                  required
                >
                  <option value="entrada">Entrada (Adicionar estoque)</option>
                  <option value="saida">Saída (Remover estoque)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantidade *</label>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                  placeholder={selectedInsumo ? `em ${selectedInsumo.unidade_medida}` : ''}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Data da Movimentação *</label>
              <input
                type="datetime-local"
                value={dataMovimentacao}
                onChange={(e) => setDataMovimentacao(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Observação</label>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows="2"
                placeholder="Observações sobre a movimentação..."
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processando...' : 'Registrar Movimentação'}
            </button>
          </form>
        </div>

        <div className="list-section">
          <h3>Insumos Cadastrados (Ordenados Alfabeticamente)</h3>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Estoque Atual</th>
                  <th>Estoque Mínimo</th>
                  <th>Unidade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {insumos.map(insumo => {
                  const abaixoMinimo = insumo.estoque_atual < insumo.estoque_minimo
                  return (
                    <tr key={insumo.id} className={abaixoMinimo ? 'low-stock-row' : ''}>
                      <td>{insumo.nome}</td>
                      <td>{insumo.categoria_nome || '-'}</td>
                      <td>{insumo.estoque_atual}</td>
                      <td>{insumo.estoque_minimo}</td>
                      <td>{insumo.unidade_medida}</td>
                      <td>
                        {abaixoMinimo ? (
                          <span className="status-badge status-warning">⚠️ Abaixo do mínimo</span>
                        ) : (
                          <span className="status-badge status-ok">✓ Normal</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GestaoEstoque

