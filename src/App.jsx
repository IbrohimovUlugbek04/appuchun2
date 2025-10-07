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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    
    const userId = urlParams.get('id') || 'Noma\'lum'
    const firstName = decodeURIComponent(urlParams.get('firstName') || '')
    const lastName = decodeURIComponent(urlParams.get('lastName') || '')
    const username = decodeURIComponent(urlParams.get('username') || '')
    const phone = decodeURIComponent(urlParams.get('phone') || '')
    const lang = decodeURIComponent(urlParams.get('lang') || 'en')
    const photoUrl = decodeURIComponent(urlParams.get('photo') || '')

    const langNames = {
      'uz': 'Oʻzbekcha',
      'ru': 'Русский', 
      'en': 'English'
    }

    setUserData({
      userId,
      firstName: firstName || 'Mavjud emas',
      lastName: lastName || 'Mavjud emas',
      username: username ? '@' + username : 'Mavjud emas',
      phone: phone || 'Mavjud emas',
      language: langNames[lang] || lang,
      photoUrl: photoUrl || ''
    })
  }, [])

  const getDefaultAvatar = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%230078d7'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%23ffffff'/%3E%3Cpath d='M30 85c0-11 9-20 20-20s20 9 20 20v15H30V85z' fill='%23ffffff'/%3E%3C/svg%3E"
  }

  return (
    <div className="app">
      <div className="profile-card">
        <div className="avatar-section">
          <img 
            src={userData.photoUrl || getDefaultAvatar()}
            alt="Foydalanuvchi rasmi"
            className="avatar"
            onError={(e) => {
              e.target.src = getDefaultAvatar()
            }}
          />
        </div>

        <div className="user-info">
          <h2 className="user-name">
            {userData.firstName} {userData.lastName}
          </h2>
          {userData.username !== 'Mavjud emas' && (
            <p className="username">{userData.username}</p>
          )}
        </div>

        <div className="info-section">
          <div className="info-row">
            <span className="info-label">ID raqami:</span>
            <span className="info-value">{userData.userId}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Telefon:</span>
            <span className="info-value">{userData.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Til:</span>
            <span className="info-value">{userData.language}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App