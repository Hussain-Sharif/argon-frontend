import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Header } from "../Header"

import { Hero } from '../Hero'
import { LoadingAnime } from '@/app/Loader/loadingAnime'



const allApiSituations={
  initial:"INITIAL",
  inProgress:"LOADING",
  success:"SUCCESS",
  failure:"FAILURE"
}

export const Home=()=>{
      const navigate=useNavigate()

  const [selectedCityId,setSelectedCityId]=useState(null)
  const [allCities,setAllCities]=useState([])
  const [allSpecfiedCityAreas,setAllSpecfiedCityAreas]=useState([])
  const [allSuggestions,setAllSuggestions]=useState([])
  const [applianceSearchValue,setApplianceSearchValue]=useState("")
  const [apiSituation,setApiSituation]=useState(allApiSituations.initial)
  const [areaApiSituation,setAreaApiSituations]=useState(allApiSituations.initial)
  const [suggestionApiSituation,setSuggestionApiSituation]=useState(allApiSituations.initial)
  const [searchResultApiSituation,setSearchResultApiSituation]=useState(allApiSituations.initial)
  const [searchResult,setSearchResult]=useState([])
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  // const [noIssueSearch,setNoIssueSearch]=useState(false)

  let cookieData=Cookies.get("jwtTokenData")
  let jwtToken;
  // console.log(cookieData && !isLoggedOut,cookieData,!isLoggedOut)
  if(cookieData && !isLoggedOut){
    cookieData=JSON.parse(cookieData)
    jwtToken=cookieData.jwtToken
  }

  

  const applianceSearchInputEvent=(e)=>{
    // console.log("values,",e)
    setApplianceSearchValue(e)
  }

    const handleLogout = () => {
        // console.log("Button Is clicked as LogOut")
        // console.log("Before removing cookie:", Cookies.get("jwtTokenData")); // Debugging
        Cookies.remove("jwtTokenData",{path: '/',domain:window.location.hostname}); // Include path
        // console.log("After removing cookie:", Cookies.get("jwtTokenData")); // Check removal
        setIsLoggedOut(true); // Trigger to re-render this component
        setAllCities([])
        setAreaApiSituations(allApiSituations.initial)
    };

  useEffect(()=>{
    const getAllCities=async()=>{
        setApiSituation(allApiSituations.inProgress)
        // console.log("In home:",{jwtToken})
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


     async function onCityClick (cityId){
      // console.log("onClick is executing......<======")
      setAreaApiSituations(allApiSituations.inProgress)
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
        setAreaApiSituations(allApiSituations.success)
        const fetchedData=response.data
        const formatedData=fetchedData.map(eachAreaObj=>({
          areaName:eachAreaObj.area_name,
          areaId:eachAreaObj.area_id,
          cityId:eachAreaObj.city_id,
          technicianId:eachAreaObj.technician_id,
          id:eachAreaObj.id
        }))
        setAllSpecfiedCityAreas(formatedData)
        setSelectedCityId(cityId)
      }else{
        setAreaApiSituation(allApiSituations.failure)
        // console.log("Error ==>",response.data)
      }
  }
 
  useEffect(()=>{
    
    const getSuggestions=async()=>{
      setSuggestionApiSituation(allApiSituations.inProgress)
      const suggestionApiUrl="https://argonbackend-production.up.railway.app/api/v1/appliance/appliance-suggestions"
      const options={
        method:"POST",
        headers:{
          "content-type":"application/json",
          "authorization":`Bearer ${jwtToken}`
        },
        body:JSON.stringify({searchedAppliance:applianceSearchValue})
      }

      const response=await fetch(suggestionApiUrl,options)
      const responseData=await response.json()
      // console.log("suggestion api responseData:",{responseData})
      if(response.ok){
        const fetchedData=responseData.data
        const formatedData=fetchedData.map(eachSuggestionObj=>({
          applianceName:eachSuggestionObj.name,
          applianceId:eachSuggestionObj.appliance_id
        }))
        setAllSuggestions(formatedData)
        setSuggestionApiSituation(allApiSituations.success)
      }else{
        setSuggestionApiSituation(allApiSituations.failure)
      }
    }
    getSuggestions()
    
  },[applianceSearchValue])


  const onSearchClickTechnicians=async(exactMatch)=>{
    console.log("Search Button is Clicked search exactmatch & selectedCityId!==null",exactMatch,selectedCityId!==null)
    if(exactMatch && selectedCityId!==null){
      setSearchResultApiSituation(allApiSituations.inProgress)
      const requestData={
        specificCityId:selectedCityId,
        applianceId:allSuggestions.filter(eachSuggestionObj=>eachSuggestionObj.applianceName===applianceSearchValue)[0].applianceId
      }
      console.log("After exactMatch is made for API data",{requestData})
      const searchTechniciansApiUrl="https://argonbackend-production.up.railway.app/api/v1/technician/featured-technicians"
      const options={
        method:"POST",
        headers:{
          "content-type":"application/json",
          "authorization":`Bearer ${jwtToken}`
        },
        body:JSON.stringify(requestData)
      }
      const response=await fetch(searchTechniciansApiUrl,options)
      const responseData=await response.json()
      if(response.ok){
        const fetchedData=responseData.data
        setSearchResult(fetchedData)
        setSearchResultApiSituation(allApiSituations.success)
      }
    }else{
      setSearchResultApiSituation(allApiSituations.failure)
    }
  }

    if(allApiSituations.inProgress===apiSituation){
      return <LoadingAnime className="w-full"/>
    }

    console.log({selectedCityId,searchResult,allCities,allSpecfiedCityAreas,isLoggedOut,apiSituation,areaApiSituation,applianceSearchValue,allSuggestions})
    return (
      <>
        <Header isLoggedOut={isLoggedOut} handleLogout={handleLogout}/>
          <Hero selectedCityId={selectedCityId} onSearchClickTechnicians={onSearchClickTechnicians} setApplianceSearchValue={setApplianceSearchValue} applianceSearchValue={applianceSearchValue} jwtToken={jwtToken} applianceSearchInputEvent={applianceSearchInputEvent} suggestionApiSituation={suggestionApiSituation}  allSuggestions={allSuggestions}  areaApiSituation={areaApiSituation} allSpecfiedCityAreas={allSpecfiedCityAreas} allApiSituations={allApiSituations} allCities={allCities} onCityClick={onCityClick} isLoggedOut={isLoggedOut}/>              
      </>
    )
}