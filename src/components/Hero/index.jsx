
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
import { ChevronDown,  X } from "lucide-react"
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
    const hasExactMatch = getExactMatch();
    // console.log("in handleSearchClick:", hasExactMatch);
    setShowInvalidSearchAlert(!hasExactMatch);
    onSearchClickTechnicians(hasExactMatch);
  };

  const shouldShowList = () => {
    if (suggestionApiSituation === allApiSituations.inProgress) return true;
    if (suggestionApiSituation !== allApiSituations.success) return false;
    if (!isInputFocused) return false;
    
    return !getExactMatch();
  };

  return (
    <div className="w-full min-h-screen border-none p-4 md:p-10 flex flex-col md:flex-row justify-between items-start">
      <div className="mt-8 border-none mb-2">
        <h1 className="text-4xl font-bold mb-2">
          Take care of your home needs now! <br />
        </h1>
        <ReUseText color="#525F7F" mb="5px" className="text-xl">
          Argon is your one-stop solution to troubleshoot, choose a vendor and book a technician.
        </ReUseText>
        <div className="flex flex-col justify-start items-start mt-5">
          <div>
            <DropdownMenu >
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
                <DropdownMenuRadioGroup value={position}  onValueChange={(selectedPosition) => handleSelectButton(selectedPosition)}>
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
          <div className="flex flex-row justify-start items-start  relative">                
                <Command className="border-[#CAD1D7] border-2  rounded-md ">
              
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
                  <CommandList className={`${shouldShowList() ?"h-auto max-h-[300px] overflow-y-auto" : "h-0"}`}>
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
              
              <AlertDialog  open={showInvalidSearchAlert &&  selectedCityId===null} onOpenChange={handleSearchClick}>
                <AlertDialogTrigger asChild>
                  <Button className="ml-4" type="button" onClick={handleSearchClick}>Search</Button>
                </AlertDialogTrigger>
                {<AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{selectedCityId===null?"Please Choose a city":"Please Select/Enter among provided appliances"}</AlertDialogTitle>
                    <AlertDialogDescription>
                    {selectedCityId===null?"It helps to identify available area's":"We are limited with the search feature, Kindly understand."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button type="button" onClick={()=>{
                      setShowInvalidSearchAlert(false) }} className="mb-4" variant="outline">Cancel</Button>
                    <Button type="button" onClick={()=>{setShowInvalidSearchAlert(false) }} className="mb-4">Sure</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>}
              </AlertDialog>
          </div>
        </div>
        
      </div>
      <img className="max-w-90 md:max-w-sm" alt="hero_img" src="public/assests/hero_image.png" />
    </div>
  )
}
