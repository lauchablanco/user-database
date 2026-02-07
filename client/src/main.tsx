import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/theme.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import MagicFiles from './pages/MagicFiles.tsx'
import SorteringHat from './pages/SorteringHat.tsx'
import QuiddichForecast from './pages/QuiddichForecast.tsx'
import Header from './components/Header.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<App />}></Route>
          <Route path='magic-files' element={<MagicFiles />}></Route>
          <Route path='quiddich-forecast' element={<QuiddichForecast />}></Route>
          <Route path='sortering-hat' element={<SorteringHat />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
