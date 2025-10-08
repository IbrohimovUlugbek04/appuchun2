import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userData, setUserData] = useState({
    telegram_id: 'Yuklanmoqda...',
    full_name: 'Yuklanmoqda...',
    username: 'Yuklanmoqda...',
    phone: 'Yuklanmoqda...',
    lang: 'Yuklanmoqda...',
    photo_url: ''
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const telegram_id = urlParams.get('telegram_id') || 'Noma\'lum'
    const full_name = decodeURIComponent(urlParams.get('full_name') || 'Mavjud emas')
    const username = decodeURIComponent(urlParams.get('username') || '')
    const phone = decodeURIComponent(urlParams.get('phone') || 'Mavjud emas')
    const lang = decodeURIComponent(urlParams.get('lang') || 'uz')
    const photo_url = decodeURIComponent(urlParams.get('photo_url') || '')

    const langNames = {
      'uz': 'Oʻzbekcha',
      'ru': 'Русский',
      'en': 'English'
    }

    setUserData({
      telegram_id,
      full_name: full_name || 'Mavjud emas',
      username: username ? `@${username}` : 'Mavjud emas',
      phone: phone || 'Mavjud emas',
      lang: langNames[lang] || lang,
      photo_url: photo_url || ''
    })

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }
  }, [])

  const getDefaultAvatar = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%230078d7'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%23ffffff'/%3E%3Cpath d='M30 85c0-11 9-20 20-20s20 9 20 20v15H30V85z' fill='%23ffffff'/%3E%3C/svg%3E"
  }

  const handleOpenBot = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/${window.Telegram.WebApp.initDataUnsafe.bot_username}`)
    }
  }

  return (
    <div className="app" style={{ maxWidth: '500px', width: '100%' }}>
      <div className="container">
        <div className="profile-card">
          <div className="avatar-section">
            <div className="avatar-container">
              <img
                src={userData.photo_url || getDefaultAvatar()}
                alt="Foydalanuvchi rasmi"
                className="avatar"
                onError={(e) => {
                  e.target.src = getDefaultAvatar()
                }}
              />
              <div className="online-indicator"></div>
            </div>
          </div>

          <div className="user-info">
            <h1 className="user-name">
              {userData.full_name}
            </h1>
            {userData.username !== 'Mavjud emas' && (
              <p className="username">{userData.username}</p>
            )}
          </div>

          <div className="info-section">
            <div className="info-item">
              <div className="info-icon">🆔</div>
              <div className="info-content">
                <span className="info-label">Telegram ID</span>
                <span className="info-value">{userData.telegram_id}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <span className="info-label">Telefon raqam</span>
                <span className="info-value">{userData.phone}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🌐</div>
              <div className="info-content">
                <span className="info-label">Til</span>
                <span className="info-value">{userData.lang}</span>
              </div>
            </div>
          </div>

          <div className="actions-section">
            <button className="btn primary" onClick={handleOpenBot}>
              📲 Botga qaytish
            </button>
            <button
              className="btn secondary"
              onClick={() => window.Telegram?.WebApp?.close()}
            >
              ❌ Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App