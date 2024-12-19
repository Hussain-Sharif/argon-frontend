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
import { ChevronDown, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Hero = (props) => {
  const { allCities,onCityClick } = props
  const navigate=useNavigate()

  const [position, setPosition] = useState(null)
  // const [isDropdownOpen, setDropdownOpen] = useState(false)
  const handleSelectButton = () => {
    setPosition(position)
    // console.log("button is clicked",position)
  }

  useEffect(() => {
    if(allCities.length>0){
      // console.log("button is effected in useEffect",position)
      onCityClick(position)
    }
  },[position])

  // const handleDropdownChange = (isOpen) => {
  //   setDropdownOpen(isOpen)
  //   if (isOpen) {
  //     handleSelectButton() // Log when the dropdown is opened
  //   }
  // }
  
  // console.log({position})

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
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  {allCities.map((city) => {
                    return (
                      <DropdownMenuRadioItem onClick={handleSelectButton} key={city.id} value={city.id}>
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
            <Badge className="w-46 bg-[#5E72E4]">Areas Covered for chosen City</Badge>
          </div>
        </div>
      </div>
      <img className="max-w-90 md:max-w-sm" alt="hero_img" src="public/assests/hero_image.png" />
    </div>
  )
}
