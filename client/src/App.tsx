//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './styles/App.css'
import UserList from './components/UserList'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className='bg-school'>
      <AuthProvider>
      <UserList />
      </AuthProvider>
    </div>
  )
}

export default App
