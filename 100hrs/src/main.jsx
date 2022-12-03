import React from 'react'
import ReactDOM from 'react-dom/client'
import Welcome from './Welcome'
import Images from './Images'
import Input from './input'
import Login from './Login'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Welcome />
    <Login />
    <Images />
    <Input />
  </React.StrictMode>
)
