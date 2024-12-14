import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
