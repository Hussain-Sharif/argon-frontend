import { Header } from "../Header"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import { Hero } from '../Hero'
import { LoadingAnime } from '@/app/Loader/loadingAnime'



const allApiSituations={
  inital:"INITIAL",
  inProgress:"LOADING",
  success:"SUCCESS",
  failure:"FAILURE"
}

export const Home=()=>{
      const navigate=useNavigate()

  const [allCities,setAllCities]=useState([])
  const [allSpecfiedCityAreas,setAllSpecfiedCityAreas]=useState([])
  const [apiSituation,setApiSituation]=useState(allApiSituations.inital)
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  let cookieData=Cookies.get("jwtTokenData")
  let jwtToken;
  console.log(cookieData && !isLoggedOut,cookieData,!isLoggedOut)
  if(cookieData && !isLoggedOut){
    cookieData=JSON.parse(cookieData)
    jwtToken=cookieData.jwtToken
  }
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
          // console.log(formatedData)
          setApiSituation(allApiSituations.success)
          setAllCities(formatedData)
        }else{
          // console.log("Not OK:",responseData)
          setApiSituation(allApiSituations.failure)
        }
    }
    getAllCities()
  },[])

  const onCityClick=async(cityId)=>{
    const specifiedCityAreasApiUrl="https://argonbackend-production.up.railway.app/api/v1/city/chosen-city-area"
    
    const options={
      method:"POST",
      headers:{
        "content-type":"application/json",
        "authorization":`Bearer ${jwtToken}`
      },
      body:JSON.stringify({specificCityId:cityId})
    }

    const request=await fetch(specifiedCityAreasApiUrl,options)
    const response=await request.json()
    if(request.ok){
      setApiSituation(allApiSituations.success)
      setAllSpecfiedCityAreas({response})
    }else{
      setApiSituation(allApiSituations.failure)
      console.log("Error ==>",{response})
    }
}
    if(allApiSituations.inProgress===apiSituation){
      return <LoadingAnime className="w-full"/>
    }

    console.log({allCities,allSpecfiedCityAreas,isLoggedOut,apiSituation})
  
    return (
      <>
        <Header isLoggedOut={isLoggedOut} handleLogout={handleLogout}/>
          <Hero allCities={allCities} onCityClick={onCityClick} isLoggedOut={isLoggedOut}/>              
      </>
    )
}






