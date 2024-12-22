import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { AirVent, Flame, LucideMicrowave, Refrigerator, Tv, WashingMachine } from "lucide-react";

import { Header } from "../Header"

import { Hero } from '../Hero'
import { LoadingAnime } from '@/app/Loader/loadingAnime'
import { AllAppliance } from "../AllAppliance";
import { StepsToUseApp } from "../StepsToUseApp";
import { Reviews } from "../Reviews";
// import { allAppliancesList } from "../../lib/utils"


const allApiSituations={
  initial:"INITIAL",
  inProgress:"LOADING",
  success:"SUCCESS",
  failure:"FAILURE"
}

export const allAppliancesList = [
  {
    id: 1,
    image: () => <Refrigerator size={40} color="#EA3C12" opacity={0.7} />, // Function returning JSX
    name: "Fridge",
    description:
      "Silent guardian of preservation, holding memories in suspended animation. Cooling the passions of the moment, protecting what matters from the heat of impulsiveness.",
  },
  {
    id: 2,
    image: () => <AirVent size={40} color="#EA3C12" opacity={0.7} />, // Function returning JSX
    name: "Air Conditioner",
    description:
      "Architect of comfort, creating invisible boundaries between chaos and serenity. Filtering out life's harsh temperatures, crafting a sanctuary of controlled emotion.",
  },
  {
    id: 3,
    image: () => <Flame size={40} color="#EA3C12" opacity={0.7} />, // Function returning JSX
    name: "Gas Stove",
    description:
      "Elemental transformer, turning raw potential into nourishment. A crucible of creation where fire meets intention, cooking not just food, but possibilities.",
  },
  {
    id: 4,
    image: () => <Tv size={40} color="#EA3C12" opacity={0.7}/>, // Function returning JSX
    name: "Television",
    description:
      "Window to infinite worlds, a portal transcending physical boundaries. Reflecting dreams, broadcasting stories that bridge isolation.",
  },
  {
    id: 5,
    image: () => <WashingMachine size={40} color="#EA3C12" opacity={0.7} />, // Function returning JSX
    name: "Washing Machine",
    description:
      "Life spins in cycles, just like the drum that cleanses our burdens. Each rotation washes away the stains of yesterday, leaving us renewed.",
  },
  {
    id: 6,
    image: () => <LucideMicrowave size={40} color="#EA3C12" opacity={0.7}/>, // Function returning JSX
    name: "Microwave",
    description:
      "Instant transformation, heating cold memories into warm possibilities. Time compressed, potential unleashed in mere moments.",
  },
];


export const Home=()=>{

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
    if(!exactMatch){
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
      console.log("Search Result api responseData:",{responseData})
      if(response.ok){
        const fetchedData=responseData.data
        setSearchResult(fetchedData)
        setSearchResultApiSituation(allApiSituations.success)
      }
      else{
        setSearchResultApiSituation(allApiSituations.failure)
      }
    }
  }

    if(allApiSituations.inProgress===apiSituation){
      return <LoadingAnime className="w-full"/>
    }

    console.log({selectedCityId,searchResult,searchResultApiSituation,allCities,allSpecfiedCityAreas,isLoggedOut,apiSituation,areaApiSituation,applianceSearchValue,allSuggestions})
    return (
      <>
        <Header isLoggedOut={isLoggedOut} handleLogout={handleLogout}/>
          <Hero selectedCityId={selectedCityId} onSearchClickTechnicians={onSearchClickTechnicians} setApplianceSearchValue={setApplianceSearchValue} applianceSearchValue={applianceSearchValue} jwtToken={jwtToken} applianceSearchInputEvent={applianceSearchInputEvent} suggestionApiSituation={suggestionApiSituation}  allSuggestions={allSuggestions}  areaApiSituation={areaApiSituation} allSpecfiedCityAreas={allSpecfiedCityAreas} allApiSituations={allApiSituations} allCities={allCities} onCityClick={onCityClick} isLoggedOut={isLoggedOut}/>              
          <AllAppliance allAppliancesList={allAppliancesList}/>
          <StepsToUseApp/>
          <Reviews/>
      </>
    )
}