import { Suspense,lazy } from 'react'
import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { ReUseDiv } from './components/ReusableStyledComponents'
import { Home } from './components/Home'
import { Register } from './components/Register'



function App() {
  return (
    <ReUseDiv w="100%" h="100%">
      {/* <Suspense fallback={<LoadingAnime></LoadingAnime>}> */}
      <BrowserRouter>
        
          <Routes>
          
            <Route exact path="/" element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>        
          
          </Routes>
        
      </BrowserRouter>
      {/* </Suspense> */}
    </ReUseDiv>
  )
}

export default App
