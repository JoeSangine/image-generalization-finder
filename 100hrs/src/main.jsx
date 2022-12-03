import React from 'react'
import ReactDOM from 'react-dom/client'
import Welcome from './components/Welcome'
import Images from './components/Images'
import Input from './components/input'
import Login from './components/Login'
import Signup from './components/Signup'
import '../views/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Welcome />
    <Signup />
    <Login />
    <Images />
    <Input />
  </React.StrictMode>
)
