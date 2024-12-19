import { trefoil } from 'ldrs'
import { Header } from "../Header"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import { Hero } from '../Hero'

trefoil.register()

const allApiSituations={
  inital:"INITIAL",
  inProgress:"LOADING",
  success:"SUCCESS",
  failure:"FAILURE"
}

export const Home=()=>{
      const navigate=useNavigate()

  const [allCities,setAllCities]=useState([])
  const [apiSituation,setApiSituation]=useState(allApiSituations.inital)
  const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        console.log("Button Is clicked as LogOut")
        console.log("Before removing cookie:", Cookies.get("jwtTokenData")); // Debugging
        Cookies.remove("jwtTokenData",{path: '/',domain:window.location.hostname}); // Include path
        console.log("After removing cookie:", Cookies.get("jwtTokenData")); // Check removal
        setIsLoggedOut(true); // Trigger to re-render this component
        setAllCities([])
    };

  useEffect(()=>{
    const getAllCities=async()=>{
        setApiSituation(allApiSituations.inProgress)
        let cookieData=Cookies.get("jwtTokenData")
        let jwtToken;
        console.log(cookieData && !isLoggedOut,cookieData,!isLoggedOut)
        if(cookieData && !isLoggedOut){
          cookieData=JSON.parse(cookieData)
          jwtToken=cookieData.jwtToken
        }
        console.log("In home:",{jwtToken})
        const urlAllCities="https://argonbackend-production.up.railway.app/api/v1/city/all-cities"
        const options={
          method:"GET",
          headers:{
            "content-type":"application/json",
            "authorization" : `Bearer ${jwtToken}`
          }
        }
        const response=await fetch(urlAllCities,options)
        const responseData=await response.json()
        if(response.ok){
          // console.log("ok:",responseData)
          const dataListOfCities=responseData.data;
          const formatedData=dataListOfCities.map(eachCityObj=>({
            cityName:eachCityObj.city_name,
            ...eachCityObj
          }))
          console.log(formatedData)
          setApiSituation(allApiSituations.success)
          setAllCities(formatedData)
        }else{
          // console.log("Not OK:",responseData)
          setApiSituation(allApiSituations.failure)
        }
    }
    getAllCities()
  },[])

  if(allApiSituations.inProgress==apiSituation){
    return(
      <div className='flex h-screen w-screen flex-col justify-center items-center'>
          <l-trefoil
    size="45"
    stroke="4"
    stroke-length="0.15"
    bg-opacity="0.1"
    speed="1.4" 
    color="black" 
  ></l-trefoil>
      </div>
    )
  }
    return (
      <>
        <Header isLoggedOut={isLoggedOut} handleLogout={handleLogout}/>
        <Hero allCities={allCities} isLoggedOut={isLoggedOut}/>        
      </>
    )
}






