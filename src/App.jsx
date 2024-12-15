import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { ReUseDiv } from './components/ReusableStyledComponents'
import { Home } from './components/Home'
import { Register } from './components/Register'

function App() {
  return (
    <ReUseDiv w="100%" h="100%">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>        
        </Routes>
      </BrowserRouter>
    </ReUseDiv>
  )
}

export default App
