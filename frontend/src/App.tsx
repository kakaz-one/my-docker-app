import { useState, useEffect } from 'react'
import './App.css'

type Status = 'checking' | 'ok' | 'error'

interface StatusCardProps {
  label: string
  status: Status
  detail: string
}

function StatusCard({ label, status, detail }: StatusCardProps) {
  return (
    <div className={`status-card status-${status}`}>
      <span className="status-dot" />
      <div className="status-info">
        <span className="status-label">{label}</span>
        <span className="status-detail">{detail}</span>
      </div>
      <span className="status-badge">
        {status === 'checking' ? '確認中…' : status === 'ok' ? '正常' : 'エラー'}
      </span>
    </div>
  )
}

function App() {
  const [apiStatus, setApiStatus] = useState<Status>('checking')
  const [healthStatus, setHealthStatus] = useState<Status>('checking')
  const [apiMessage, setApiMessage] = useState('')

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

    fetch(`${base}/api/hello`)
      .then(r => r.json())
      .then(data => {
        setApiStatus('ok')
        setApiMessage(data.message)
      })
      .catch(() => setApiStatus('error'))

    fetch(`${base}/health`)
      .then(r => r.json())
      .then(() => setHealthStatus('ok'))
      .catch(() => setHealthStatus('error'))
  }, [])

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-inner">
          <h1>my-docker-app</h1>
          <p>React + Go + PostgreSQL による Docker 開発環境サンプル</p>
        </div>
      </header>

      <main className="content">
        <section className="section">
          <h2>サービス稼働状況</h2>
          <div className="card-list">
            <StatusCard
              label="フロントエンド"
              status="ok"
              detail="React 19 + Vite"
            />
            <StatusCard
              label="バックエンド API"
              status={apiStatus}
              detail={apiStatus === 'ok' ? apiMessage : 'Go + air'}
            />
            <StatusCard
              label="ヘルスチェック"
              status={healthStatus}
              detail="GET /health"
            />
          </div>
        </section>

        <section className="section">
          <h2>技術スタック</h2>
          <div className="stack-list">
            {[
              { name: 'React', color: '#61dafb' },
              { name: 'TypeScript', color: '#3178c6' },
              { name: 'Vite', color: '#646cff' },
              { name: 'Go', color: '#00add8' },
              { name: 'PostgreSQL', color: '#336791' },
              { name: 'Docker', color: '#2496ed' },
            ].map(({ name, color }) => (
              <span key={name} className="badge" style={{ '--badge-color': color } as React.CSSProperties}>
                {name}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="https://github.com/kakaz-one/my-docker-app" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
