import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userData, setUserData] = useState({
    userId: 'Yuklanmoqda...',
    firstName: 'Yuklanmoqda...',
    lastName: 'Yuklanmoqda...',
    username: 'Yuklanmoqda...',
    phone: 'Yuklanmoqda...',
    language: 'Yuklanmoqda...',
    photoUrl: ''
  })
  const [imageStatus, setImageStatus] = useState('loading')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // URL parametrlarini o'qish
    const urlParams = new URLSearchParams(window.location.search)
    
    const userId = urlParams.get('id') || 'Noma\'lum'
    const firstName = decodeURIComponent(urlParams.get('firstName') || '')
    const lastName = decodeURIComponent(urlParams.get('lastName') || '')
    const username = decodeURIComponent(urlParams.get('username') || '')
    const phone = decodeURIComponent(urlParams.get('phone') || '')
    const lang = decodeURIComponent(urlParams.get('lang') || 'en')
    const photoUrl = decodeURIComponent(urlParams.get('photo') || '')

    // Til nomlarini aniqlash
    const langNames = {
      'uz': 'O\'zbekcha',
      'ru': 'Русский', 
      'en': 'English',
      'es': 'Español',
      'fr': 'Français'
    }

    const userInfo = {
      userId,
      firstName: firstName || 'Mavjud emas',
      lastName: lastName || 'Mavjud emas',
      username: username ? '@' + username : 'Mavjud emas',
      phone: phone || 'Mavjud emas',
      language: langNames[lang] || lang,
      photoUrl: photoUrl || ''
    }

    setUserData(userInfo)

    // Rasmni tekshirish
    if (photoUrl) {
      const img = new Image()
      img.onload = () => setImageStatus('success')
      img.onerror = () => setImageStatus('error')
      img.src = photoUrl
    } else {
      setImageStatus('no-image')
    }

    console.log('📊 Foydalanuvchi ma\'lumotlari:', userInfo)
    console.log('🔗 URL parametrlari:', window.location.search)
  }, [])

  const handleImageError = (e) => {
    setImageStatus('error')
    e.target.src = getDefaultAvatar()
  }

  const handleImageLoad = () => {
    setImageStatus('success')
  }

  const getDefaultAvatar = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23F3F4F6'/%3E%3Cpath d='M75 40C85.3757 40 94 48.6243 94 59C94 69.3757 85.3757 78 75 78C64.6243 78 56 69.3757 56 59C56 48.6243 64.6243 40 75 40Z' fill='%239B9B9B'/%3E%3Cpath d='M37.5 110C37.5 102.544 43.5443 96.5 51 96.5H99C106.456 96.5 112.5 102.544 112.5 110V124C112.5 131.456 106.456 137.5 99 137.5H51C43.5443 137.5 37.5 131.456 37.5 124V110Z' fill='%239B9B9B'/%3E%3C/svg%3E"
  }

  const getStatusColor = () => {
    switch (imageStatus) {
      case 'success': return '#28a745'
      case 'error': return '#dc3545'
      case 'loading': return '#ffc107'
      default: return '#6c757d'
    }
  }

  const getStatusText = () => {
    switch (imageStatus) {
      case 'success': return 'Yuklandi ✅'
      case 'error': return 'Xatolik ❌'
      case 'loading': return 'Yuklanmoqda...'
      case 'no-image': return 'Rasm yo\'q'
      default: return 'Noma\'lum'
    }
  }

  // Test URL lar
  const testUrls = [
    {
      name: '👤 Inglizcha profil (rasm bilan)',
      url: '/?id=12345&firstName=John&lastName=Doe&username=johndoe&phone=%2B123456789&lang=en&photo=https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: '👤 Ruscha profil',
      url: '/?id=54321&firstName=%D0%90%D0%BB%D0%B8%D1%88%D0%B5%D1%80&lastName=%D0%A3%D0%BB%D1%83%D0%B3%D0%BE%D0%B2&username=alisher&phone=%2B998901234567&lang=ru&photo=https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: '👤 O\'zbekcha profil (rasmsiz)',
      url: '/?id=98765&firstName=Ali&lastName=Valiyev&username=alivaliyev&phone=%2B998901112233&lang=uz'
    }
  ]

  return (
    <div className="app">
      <header className="header">
        <h1>Telegram MiniApp 0.4</h1>
        <p className="subtitle">React + Vite versiyasi</p>
      </header>

      <main className="main">
        <div 
          className={`profile-card ${isHovered ? 'profile-hover' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="avatar-section">
            <img 
              src={userData.photoUrl && imageStatus !== 'error' ? userData.photoUrl : getDefaultAvatar()}
              alt="Foydalanuvchi rasmi"
              className={`avatar ${
                imageStatus === 'success' ? 'avatar-success' : 
                imageStatus === 'error' ? 'avatar-error' : ''
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <div className="avatar-status" style={{ color: getStatusColor() }}>
              {getStatusText()}
            </div>
          </div>

          <div className="user-info">
            <h2 className="user-name">
              {userData.firstName} {userData.lastName}
            </h2>
            {userData.username !== 'Mavjud emas' && (
              <p className="user-username">{userData.username}</p>
            )}
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">🆔 ID raqami:</span>
              <span className="info-value">{userData.userId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">📞 Telefon:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🌐 Til:</span>
              <span className="info-value">{userData.language}</span>
            </div>
          </div>

          {userData.photoUrl && (
            <div className="url-section">
              <h3>📷 Rasm URL manzili:</h3>
              <div className="url-display">
                {userData.photoUrl}
              </div>
            </div>
          )}
        </div>

        <div className="debug-section">
          <h3>🔗 URL Parametrlari</h3>
          <pre className="url-params">
            {window.location.search || 'Hech qanday parametr topilmadi'}
          </pre>

          <div className="test-section">
            <h4>🧪 Test uchun linklar:</h4>
            <div className="test-links">
              {testUrls.map((test, index) => (
                <a
                  key={index}
                  href={test.url}
                  className="test-link"
                >
                  {test.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>React + Vite Telegram MiniApp &copy; 2024</p>
      </footer>
    </div>
  )
}

export default App