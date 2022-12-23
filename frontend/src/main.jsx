import React from 'react'
import ReactDOM from 'react-dom/client'
import Api from './components/Api'
import Footer from './components/Footer'
import Nav from './components/Nav'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Nav />
    <Api />
    <Footer />

  </React.StrictMode>
)
