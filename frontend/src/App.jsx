import './App.css'
import LoginPage from "./components/LoginPage.jsx"
import NavBar from './components/NavBar.jsx'
import { useState, useEffect } from 'react'
import SearchResults from './components/SearchResults/SearchResults.jsx'
import { subscribeToAuthChanges, logoutUser } from './firebase'
function App() {
  const [currentPage, setCurrentPage] = useState('LoginPage')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if(!user) return
    
    const loadUserData = async () => {
      try{
        const userData = await getUserData(user.uid)
        console.log('User data loaded:', userData)
      } catch (err) {
      console.error('Failed to load user data:', err)
      }
    }

    loadUserData()
  },[user])

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleAuthSuccess = () => {
    // Auth listener will trigger and update user state automatically
  }

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    setCurrentPage('home')
  }

  if (!user) {
    return <LoginPage onAuthSuccess={handleAuthSuccess} />
  }

  

  return (
    <>
      <NavBar onNavigate={handleNavigate} onLogout={handleLogout}/>

      {currentPage === 'coursepicker' && <CoursePickerPage/>}
      {currentPage === 'progress' && <Progress />}
    </>
  )
}
 
export default App
