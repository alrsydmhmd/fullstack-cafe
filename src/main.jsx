import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
        <Header />
        <About />
        <Menu />
      <Footer />
  </StrictMode>,
)
