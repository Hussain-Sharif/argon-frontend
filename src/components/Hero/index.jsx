
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
import { Badge } from "@/components/ui/badge"



import { ReUseText } from "../ReusableStyledComponents"
import { useState } from "react"


export const Hero=(props)=>{

    const {allCities,isLoggedOut}=props

    const [position, setPosition]=useState(null)


    return (
        <div className="w-full min-h-screen border-2 p-4 md:p-10 flex flex-col md:flex-row justify-between items-start">
            <div className="mt-8 border-2 ">
                <h1 className="text-4xl font-bold mb-5">
                Take care of your home needs now! <br/>
                </h1>
                <ReUseText color="#525F7F"  className="text-xl">
                ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a technician.
                </ReUseText>
                <div className="flex flex-col justify-start items-start mt-5">
                    <div >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline">{allCities.filter(each=>each.id===position).map(each=>each.cityName)[0]||"Select City"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Currently 10 Cities in INDIA</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            {
                                allCities.map((city)=>{
                                    return (
                                        <DropdownMenuRadioItem key={city.id} value={city.id}>
                                            {city.cityName}
                                        </DropdownMenuRadioItem>
                                    )
                                })
                            }
                        </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Badge className="ml-8">Areas Covered for choosen City</Badge>
                    </div>
                </div>
            </div>
            <img className="max-w-90 md:max-w-sm" alt="hero_img" src="public/assests/hero_image.png"/>
        </div>
    )
}