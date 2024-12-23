
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Badge } from "@/components/ui/badge"




import { ReUseText } from "../ReusableStyledComponents"
import { useEffect, useState } from "react"
import { ChevronDown,  Search,  SearchCheckIcon,  X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { BounceLoadAnime } from "@/app/Loader/bounceLoadAnime"
import { LoadingAnime } from "@/app/Loader/loadingAnime"

export const Hero = (props) => {
  const {selectedCityId,jwtToken, onSearchClickTechnicians, allCities,onCityClick,areaApiSituation,allSpecfiedCityAreas,allApiSituations,applianceSearchValue,applianceSearchInputEvent,suggestionApiSituation,allSuggestions,setApplianceSearchValue } = props
  const navigate=useNavigate()

  const [position, setPosition] = useState(null)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [showInvalidSearchAlert, setShowInvalidSearchAlert] = useState(false);
  const handleSelectButton = (selectedPosition) => {
    setPosition(selectedPosition);
    if (allCities.length > 0 && selectedPosition) {
      // console.log("User selected a city, making API call", selectedPosition ,position);
      onCityClick(selectedPosition);
    }
  };
  


  const handleFormatingOfAreaName=(cityAreasList)=>{
    const formatedAreaValue=cityAreasList.map((eachAreaObj) => eachAreaObj.areaName)
    // console.log(formatedAreaValue)
    const convertedAreaValue=formatedAreaValue.length > 1 
    ? ("Only in "+ formatedAreaValue.slice(0, -1).join(", ") + " & " + formatedAreaValue[formatedAreaValue.length - 1])
    : (formatedAreaValue.length === 1?("Only in " + formatedAreaValue[0]) : "Sorry No Technicians avaiable for this city")
    return convertedAreaValue
  }

  const switchAreaSpecifiedSituation=(areaApiSituation)=>{
    // console.log(areaApiSituation,allApiSituations.initial)
      switch (areaApiSituation) {
        case allApiSituations.initial:
          return (<>
              <p>Areas Covered for chosen City</p>
              </>)
        case allApiSituations.inProgress:
            return(
                <BounceLoadAnime/>  
                )
        case allApiSituations.success:
            return(
                `
                  ${handleFormatingOfAreaName(allSpecfiedCityAreas)}
                `
            )
        case allApiSituations.failure:
            return(
                `
                something went wrong please Refresh the Page
                `
            )
        default:
          break;
      }
  }

  const getExactMatch = () => {
    // console.log("applianceSearchValue:", applianceSearchValue);
    // console.log("allSuggestions:", allSuggestions);
    if (!allSuggestions || !applianceSearchValue) return false;
    const hasMatch = allSuggestions.some(
      suggestion => suggestion.applianceName.toLowerCase() === applianceSearchValue.toLowerCase()
    );
    // console.log("hasMatch:", hasMatch);
    return hasMatch;
  };

  useEffect(() => {
    setShowInvalidSearchAlert(false);
  }, [applianceSearchValue]); // when value changes the alert should be hidden

  // Handle search button click
  const handleSearchClick = () => {
    const hasExactMatch = getExactMatch()?selectedCityId===null:true ;
    // console.log("in handleSearchClick:", hasExactMatch,getExactMatch(), selectedCityId===null);
    setShowInvalidSearchAlert(hasExactMatch);
    onSearchClickTechnicians(hasExactMatch);
  };

  const shouldShowList = () => {
    if (suggestionApiSituation === allApiSituations.inProgress) return true;
    if (suggestionApiSituation !== allApiSituations.success) return false;
    if (!isInputFocused) return false;
    
    return !getExactMatch();
  };

  return (
    <div className="w-full relative max-h-fit  overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-10 flex flex-col md:flex-row justify-between items-start">
      <div className="mt-0 border-none mb-2 ">
        <h1 className="md:text-5xl text-3xl font-bold mb-4">
          Take care of your home needs now! <br />
        </h1>
        <ReUseText color="#525F7F"  className="text-base">
          Argon is your one-stop solution to troubleshoot, choose a vendor and book a technician.
        </ReUseText>
        <div className="flex flex-col justify-start items-start mt-5">
          <div>
            <DropdownMenu className="">
            <AlertDialog>
            <AlertDialogTrigger className="outline-none">
              <DropdownMenuTrigger className="mr-4 mb-2" asChild>
                <Button variant="outline">
                  {allCities.filter((each) => each.id === position).map((each) => each.cityName)[0] || "Select City"}{" "}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              </AlertDialogTrigger>
              {
                allCities.length>0? <DropdownMenuContent className="w-56 ml-4">
                <DropdownMenuLabel>Currently 10 Cities in INDIA</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup className="" value={position}  onValueChange={(selectedPosition) => handleSelectButton(selectedPosition)}>
                  {allCities.map((city) => {
                    return (
                      <DropdownMenuRadioItem onClick={() => handleSelectButton(city.id)} key={city.id} value={city.id}>
                        {city.cityName}
                      </DropdownMenuRadioItem>
                    )
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>:
                  
                  <AlertDialogContent>
                    
                    <AlertDialogHeader className="flex flex-row justify-between items-start w-full pt-0 ">
                      <div>
                      <AlertDialogTitle>We request please log-in</AlertDialogTitle>
                      <AlertDialogDescription>
                        Haven't created an account, you can Register with neccesary credentails
                      </AlertDialogDescription>
                      </div>
                      <AlertDialogCancel className="p-0 absolute top-0 right-5 bg-transparent border-none outline-none hover:bg-transparent"><X className="top-0 text-3xl right-0"/></AlertDialogCancel>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button onClick={()=>{navigate("/login")}} type="button" variant="outline">Log-in</Button>
                      <Button onClick={()=>{navigate("/register")}} type="button" className="mb-4">Sign-Up/Register</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
              }
              </AlertDialog>
            </DropdownMenu>
            <Badge className="w-46 bg-[#5E72E4]">{switchAreaSpecifiedSituation(areaApiSituation)}</Badge>
          </div>
          {<h1 className="text-xs text-[#525F7F] font-bold mb-1 mt-4">
           Please enter among them
        </h1>}
          <div className="flex flex-row justify-start items-start  ">                
                <Command className="border-[#CAD1D7] border-2  rounded-md z-30 relative">
              
                  <CommandInput  value={applianceSearchValue}
              onValueChange={(value) => {
                setApplianceSearchValue(value);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsInputFocused(false))
              }}
              placeholder="Search Home Appliances" 
              className="h-10" />
                  <CommandList className={`${shouldShowList() ?"h-auto max-h-[300px] overflow-y-auto  " : "h-0"}`}>
                  {suggestionApiSituation===allApiSituations.success && <CommandEmpty>No appliances found.</CommandEmpty>}
                  <CommandGroup>
                  {suggestionApiSituation===allApiSituations.success ? (
                    allSuggestions.map((suggestion, index) => (
                      <CommandItem 
                        key={index}
                        value={suggestion.applianceName}
                        onSelect={(suggestionValue) => {
                          // console.log("==> suggestion value:",suggestionValue)
                          setApplianceSearchValue(suggestionValue);
                          setIsInputFocused(false);
                        }}
                      >
                        {suggestion.applianceName}
                      </CommandItem>
                    ))
                  ) :null 
                  }
                </CommandGroup>
                {(suggestionApiSituation === allApiSituations.inProgress &&  jwtToken!==undefined) && (
                <CommandGroup>
                  <CommandItem>
                    <BounceLoadAnime color="black" text="searching for appliances"/>
                  </CommandItem>
                </CommandGroup>
              )}
                  </CommandList>
                </Command>
              
              <AlertDialog  open={showInvalidSearchAlert} onOpenChange={handleSearchClick}>
                <AlertDialogTrigger inert asChild>
                  <Button className="ml-4" type="button" onClick={handleSearchClick}><Search/> Search</Button>
                </AlertDialogTrigger>
                {<AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{selectedCityId===null?"Please Choose a city":"Please Select/Enter among provided appliances"}</AlertDialogTitle>
                    <AlertDialogDescription>
                    {selectedCityId===null?"It helps to identify available area's":"We are limited with the search feature, Kindly understand."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter >
                    <Button type="button" onClick={()=>{
                      setShowInvalidSearchAlert(false) }} className="mb-4" variant="outline">Cancel</Button>
                    <Button type="button" onClick={()=>{setShowInvalidSearchAlert(false) }} className="mb-4">Sure</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>}
              </AlertDialog>
          </div>
        </div>
    </div>
    <div className="relative hidden lg:inline-block">
          <div className="absolute inset-0 bg-blue-800/10 rounded-3xl transform rotate-3" />
          <div className="absolute inset-0 bg-blue-800/10 rounded-3xl transform -rotate-3" />
          <img
            alt="Home services illustration"
            className="relative rounded-3xl object-cover"
            src="/assests/hero_image.png"
            width={580}
            height={580}
          />
          </div>
    </div>
  )
}


// 'use client'

// import { useState, useEffect } from "react"
// import { ChevronDown, Search, X } from 'lucide-react'
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card"

// export const Hero = (props) => {
//   const {
//     selectedCityId,
//     jwtToken,
//     onSearchClickTechnicians,
//     allCities,
//     onCityClick,
//     areaApiSituation,
//     allSpecfiedCityAreas,
//     allApiSituations,
//     applianceSearchValue,
//     suggestionApiSituation,
//     allSuggestions,
//     setApplianceSearchValue
//   } = props

//   const navigate = useNavigate()
//   const [position, setPosition] = useState(null)
//   const [isInputFocused, setIsInputFocused] = useState(false)
//   const [showInvalidSearchAlert, setShowInvalidSearchAlert] = useState(false)

//   const handleSelectButton = (selectedPosition) => {
//     setPosition(selectedPosition)
//     if (allCities.length > 0 && selectedPosition) {
//       onCityClick(selectedPosition)
//     }
//   }

//   const handleFormatingOfAreaName = (cityAreasList) => {
//     const formatedAreaValue = cityAreasList.map((eachAreaObj) => eachAreaObj.areaName)
//     return formatedAreaValue.length > 1
//       ? "Only in " + formatedAreaValue.slice(0, -1).join(", ") + " & " + formatedAreaValue[formatedAreaValue.length - 1]
//       : formatedAreaValue.length === 1
//       ? "Only in " + formatedAreaValue[0]
//       : "Sorry No Technicians available for this city"
//   }

//   const switchAreaSpecifiedSituation = (areaApiSituation) => {
//     switch (areaApiSituation) {
//       case allApiSituations.initial:
//         return "Areas Covered for chosen City"
//       case allApiSituations.inProgress:
//         return "Loading areas..."
//       case allApiSituations.success:
//         return handleFormatingOfAreaName(allSpecfiedCityAreas)
//       case allApiSituations.failure:
//         return "Something went wrong please Refresh the Page"
//       default:
//         return ""
//     }
//   }

//   const getExactMatch = () => {
//     if (!allSuggestions || !applianceSearchValue) return false
//     return allSuggestions.some(
//       suggestion => suggestion.applianceName.toLowerCase() === applianceSearchValue.toLowerCase()
//     )
//   }

//   useEffect(() => {
//     setShowInvalidSearchAlert(false)
//   }, [applianceSearchValue])

//   const handleSearchClick = () => {
//     const hasExactMatch = getExactMatch() ? selectedCityId === null : true
//     setShowInvalidSearchAlert(hasExactMatch)
//     onSearchClickTechnicians(hasExactMatch)
//   }

//   const shouldShowList = () => {
//     if (suggestionApiSituation === allApiSituations.inProgress) return true
//     if (suggestionApiSituation !== allApiSituations.success) return false
//     if (!isInputFocused) return false
//     return !getExactMatch()
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
//       <div className="absolute inset-0 bg-grid-blue-500/[0.025] -z-10" />
//       <div className="container mx-auto px-4 py-8 md:py-24">
//         <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                 Take care of your home needs now!
//               </h1>
//               <p className="text-gray-500 md:text-xl">
//                 Argon is your one-stop solution to troubleshoot, choose a vendor and book a technician.
//               </p>
//             </div>

//             <Card className="border-2 border-blue-100">
//               <CardContent className="p-6 space-y-4">
//                 <div className="space-y-2">
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="outline" className="w-full justify-between">
//                             {allCities.find((city) => city.id === position)?.cityName || "Select City"}
//                             <ChevronDown className="ml-2 h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         {allCities.length > 0 ? (
//                           <DropdownMenuContent className="w-full min-w-[200px]">
//                             <DropdownMenuLabel>Currently 10 Cities in INDIA</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuRadioGroup value={position} onValueChange={handleSelectButton}>
//                               {allCities.map((city) => (
//                                 <DropdownMenuRadioItem key={city.id} value={city.id}>
//                                   {city.cityName}
//                                 </DropdownMenuRadioItem>
//                               ))}
//                             </DropdownMenuRadioGroup>
//                           </DropdownMenuContent>
//                         ) : (
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <div className="space-y-2">
//                                 <AlertDialogTitle>We request please log-in</AlertDialogTitle>
//                                 <AlertDialogDescription>
//                                   Haven't created an account? You can Register with necessary credentials
//                                 </AlertDialogDescription>
//                               </div>
//                               <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//                                 <X className="h-4 w-4" />
//                                 <span className="sr-only">Close</span>
//                               </AlertDialogCancel>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <Button onClick={() => navigate("/login")} variant="outline">
//                                 Log-in
//                               </Button>
//                               <Button onClick={() => navigate("/register")}>Sign-Up/Register</Button>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         )}
//                       </DropdownMenu>
//                     </AlertDialogTrigger>
//                   </AlertDialog>

//                   <Badge variant="secondary" className="w-full justify-center text-sm">
//                     {switchAreaSpecifiedSituation(areaApiSituation)}
//                   </Badge>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="text-sm font-medium text-gray-500">Please enter among them</p>
//                   <div className="flex gap-2">
//                     <Command className="border rounded-lg flex-1">
//                       <CommandInput
//                         value={applianceSearchValue}
//                         onValueChange={setApplianceSearchValue}
//                         onFocus={() => setIsInputFocused(true)}
//                         onBlur={() => setTimeout(() => setIsInputFocused(false))}
//                         placeholder="Search Home Appliances"
//                       />
//                       <CommandList className={shouldShowList() ? "h-auto max-h-[300px]" : "h-0"}>
//                         {suggestionApiSituation === allApiSituations.success && (
//                           <CommandEmpty>No appliances found.</CommandEmpty>
//                         )}
//                         <CommandGroup>
//                           {suggestionApiSituation === allApiSituations.success &&
//                             allSuggestions.map((suggestion, index) => (
//                               <CommandItem
//                                 key={index}
//                                 value={suggestion.applianceName}
//                                 onSelect={(value) => {
//                                   setApplianceSearchValue(value)
//                                   setIsInputFocused(false)
//                                 }}
//                               >
//                                 {suggestion.applianceName}
//                               </CommandItem>
//                             ))}
//                           {suggestionApiSituation === allApiSituations.inProgress && jwtToken && (
//                             <CommandItem>Searching for appliances...</CommandItem>
//                           )}
//                         </CommandGroup>
//                       </CommandList>
//                     </Command>

//                     <AlertDialog open={showInvalidSearchAlert}>
//                       <AlertDialogTrigger asChild>
//                         <Button onClick={handleSearchClick}>
//                           <Search className="h-4 w-4 mr-2" />
//                           Search
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>
//                             {selectedCityId === null
//                               ? "Please Choose a city"
//                               : "Please Select/Enter among provided appliances"}
//                           </AlertDialogTitle>
//                           <AlertDialogDescription>
//                             {selectedCityId === null
//                               ? "It helps to identify available areas"
//                               : "We are limited with the search feature, Kindly understand."}
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <Button variant="outline" onClick={() => setShowInvalidSearchAlert(false)}>
//                             Cancel
//                           </Button>
//                           <Button onClick={() => setShowInvalidSearchAlert(false)}>Sure</Button>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="relative hidden lg:block">
//             <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform rotate-3" />
//             <div className="absolute inset-0 bg-blue-500/10 rounded-3xl transform -rotate-3" />
//             <img
//               alt="Home services illustration"
//               className="relative rounded-3xl object-cover"
//               src="/assests/hero_image.png"
//               width={580}
//               height={580}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

