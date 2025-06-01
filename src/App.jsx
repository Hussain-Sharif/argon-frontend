import 'animate.css';
import { Suspense,lazy } from 'react'
import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import { LoadingAnime } from './app/Loader/loadingAnime';
import './App.css'
// import { Login } from './components/Login'
import { ReUseDiv } from './components/ReusableStyledComponents'
import { Button } from './components/ui/button';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoutesVendor } from './components/ProtectedRoutesVendor';
// import { Home } from './components/Home'
// import { Register } from './components/Register'

const Login = lazy(() => import('./components/Login').then(module => ({ default: module.Login })))
const Register = lazy(() => import('./components/Register').then(module => ({ default: module.Register })))
const Home = lazy(() => import('./components/Home').then(module => ({ default: module.Home })))

// function App() {
//   return (
//       <BrowserRouter >
        
//           <Routes>
          
//             <Route  path="/" element={<Suspense fallback={<LoadingAnime/>}><Home/></Suspense>}/>
//             <Route  path='/login' element={<Suspense fallback={<LoadingAnime/>}><Login/></Suspense>}/>
//             <Route  path="/register" element={<Suspense fallback={<LoadingAnime/>}><Register/></Suspense>}/>        
//             <Route path='*' element={<NotFound/>}/>
//           </Routes>
        
//       </BrowserRouter>
//   )
// }

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingAnime />}>
        <Routes>
          <Route path="/" element={<ProtectedRoutes element={Home} />} />
          <Route path='/dashboard' element={<ProtectedRoutesVendor element={Dashboard} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

const NotFound=()=>{
  return(
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <img className='max-w-72' alt="argon_logo" src="../public/assests/full-logo.png "/>
      <h1 className='text-4xl mb-2 mt-2 font-bold text-center'>404 Page Not Found</h1>
      <Button type="button" onClick={()=>{window.location.href="/"}}>Go to Home Page</Button>
    </div>
  )
}

export default App
