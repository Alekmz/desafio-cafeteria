import { useState } from 'react'
import CadastroInsumo from './CadastroInsumo'
import GestaoEstoque from './GestaoEstoque'
import './Dashboard.css'

function Dashboard({ user, onLogout, currentView, setCurrentView }) {
  const renderContent = () => {
    switch (currentView) {
      case 'cadastro':
        return <CadastroInsumo onBack={() => setCurrentView('dashboard')} />
      case 'gestao':
        return <GestaoEstoque user={user} onBack={() => setCurrentView('dashboard')} />
      default:
        return (
          <div className="dashboard-home">
            <h2>Bem-vindo, {user.nome}! 👋</h2>
            <div className="dashboard-grid">
              <div className="dashboard-card" onClick={() => setCurrentView('cadastro')}>
                <div className="icon">📝</div>
                <h3>Cadastro de Insumos</h3>
                <p>Cadastre e gerencie insumos do estoque</p>
              </div>
              <div className="dashboard-card" onClick={() => setCurrentView('gestao')}>
                <div className="icon">📊</div>
                <h3>Gestão de Estoque</h3>
                <p>Gerencie entradas e saídas de produtos</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🍵 Gestão de Cafeteria</h1>
          <div className="header-actions">
            <span className="user-name">{user.nome} ({user.cargo})</span>
            <button className="btn btn-danger" onClick={onLogout}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {currentView !== 'dashboard' && (
          <button 
            className="btn btn-secondary btn-back"
            onClick={() => setCurrentView('dashboard')}
          >
            ← Voltar
          </button>
        )}
        {renderContent()}
      </main>
    </div>
  )
}

export default Dashboard

