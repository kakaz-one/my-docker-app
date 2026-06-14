import { useState, useEffect, FormEvent } from 'react'
import './App.css'

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

type Status = 'checking' | 'ok' | 'error'

interface StatusCardProps {
  label: string
  status: Status
  detail: string
}

interface Message {
  id: number
  content: string
  created_at: string
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

  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/hello`)
      .then(r => r.json())
      .then(data => { setApiStatus('ok'); setApiMessage(data.message) })
      .catch(() => setApiStatus('error'))

    fetch(`${API}/health`)
      .then(r => r.json())
      .then(() => setHealthStatus('ok'))
      .catch(() => setHealthStatus('error'))

    fetchMessages()
  }, [])

  function fetchMessages() {
    fetch(`${API}/api/messages`)
      .then(r => r.json())
      .then(setMessages)
      .catch(console.error)
  }

  async function handlePost(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setPosting(true)
    try {
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: trimmed }),
      })
      if (res.ok) {
        const newMsg: Message = await res.json()
        setMessages(prev => [newMsg, ...prev])
        setText('')
      }
    } finally {
      setPosting(false)
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('ja-JP', {
      month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

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
            <StatusCard label="フロントエンド" status="ok" detail="React 19 + Vite" />
            <StatusCard label="バックエンド API" status={apiStatus} detail={apiStatus === 'ok' ? apiMessage : 'Go + air'} />
            <StatusCard label="ヘルスチェック" status={healthStatus} detail="GET /health" />
          </div>
        </section>

        <section className="section">
          <h2>技術スタック</h2>
          <div className="stack-list">
            {[
              { name: 'React',      color: '#61dafb' },
              { name: 'TypeScript', color: '#3178c6' },
              { name: 'Vite',       color: '#646cff' },
              { name: 'Go',         color: '#00add8' },
              { name: 'PostgreSQL', color: '#336791' },
              { name: 'Docker',     color: '#2496ed' },
            ].map(({ name, color }) => (
              <span key={name} className="badge" style={{ '--badge-color': color } as React.CSSProperties}>
                {name}
              </span>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>メッセージボード</h2>

          <form className="msg-form" onSubmit={handlePost}>
            <input
              className="msg-input"
              type="text"
              placeholder="メッセージを入力…"
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={200}
            />
            <button className="msg-button" type="submit" disabled={posting || !text.trim()}>
              {posting ? '送信中…' : '送信'}
            </button>
          </form>

          <ul className="msg-list">
            {messages.map(m => (
              <li key={m.id} className="msg-item">
                <span className="msg-content">{m.content}</span>
                <span className="msg-date">{formatDate(m.created_at)}</span>
              </li>
            ))}
          </ul>
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
