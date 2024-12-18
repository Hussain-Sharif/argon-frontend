import { trefoil } from 'ldrs'
import { Header } from "../Header"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

trefoil.register()

const allApiSituations={
  inital:"INITIAL",
  inProgress:"LOADING",
  success:"SUCCESS",
  failure:"FAILURE"
}

export const Home=()=>{

  const [allCities,setAllCities]=useState([])
  const [apiSituation,setApiSituation]=useState(allApiSituations.inital)

  useEffect(()=>{
    const getAllCities=async()=>{
        setApiSituation(allApiSituations.inProgress)
        let cookieData=Cookies.get("jwtTokenData")
        let jwtToken;
        if(cookieData){
          cookieData=JSON.parse(cookieData)
          jwtToken=cookieData.jwtToken
        }
        console.log("In hero:",{jwtToken})
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
    size="40"
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
        <Header/>
        {
          allApiSituations.success==apiSituation?<div>
            It's Success
          </div>:
          <div>
            It's Failure
          </div>
        }
        
      </>
    )
}






