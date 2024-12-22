import 'animate.css';
import { Suspense,lazy } from 'react'
import { Route, BrowserRouter, Routes, } from 'react-router-dom'
import { LoadingAnime } from './app/Loader/loadingAnime';
import './App.css'
// import { Login } from './components/Login'
import { ReUseDiv } from './components/ReusableStyledComponents'
import { Button } from './components/ui/button';
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
          <Route path="/" element={<Home />} />
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
      <img className='max-w-72' alt="argon_logo" src="https://s3-alpha-sig.figma.com/img/a7c2/c95a/e57df5f03ddceb5a4011eb1efd953170?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i7lvM1s0i74MfggIel4C7VrexlGfffkxShALGiS99Txtnir6kf9cE0wDtpfwUiHXVw0BRZQHQIfzxZw1EQ0H1ClfCtFjay3rQCAIS~nSYjLOjg2TBlpcxwCRke5MQCppl-mEDFaqK3aVya7rCuiCkN2hntF9bpWkY8IHJUAJHnAT3XawIK1KXfQdPSW8NrdCJX0OPs0WWHm1JoUY~g374aVLigYQeWKFPHWCLbp7LdkPNRoL~08fbV~qj1viBUfox9ktE9IfCzq6zwxjitIwcAaYxJhH7o77FBChfuYVChd6aYDxaStNv9~tWtzOPwKUir3zVend3~SPe9Jc-FP5VA__"/>
      <h1 className='text-4xl mb-2 mt-2 font-bold text-center'>404 Page Not Found</h1>
      <Button type="button" onClick={()=>{window.location.href="/"}}>Go to Home Page</Button>
    </div>
  )
}

export default App
