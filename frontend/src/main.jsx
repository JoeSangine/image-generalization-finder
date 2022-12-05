import React from 'react'
import ReactDOM from 'react-dom/client'
import Api from './components/Api'
import Login from './components/Login'
import Signup from './components/Signup'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Signup />
    <Login />
    <Api />

  </React.StrictMode>
)
