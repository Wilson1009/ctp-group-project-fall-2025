import './App.css'
import LoginPage from "./components/LoginPage.jsx"
import NavBar from './components/NavBar.jsx'
import { useState } from 'react'
import SearchResults from './components/SearchResults/SearchResults.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('LoginPage')

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  

  return (
    <>
      <NavBar onNavigate={handleNavigate}/>
    </>
  )
}
 
export default App
