import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { Tabs, TabsContent } from "../ui/tabs"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
  } from "@/components/ui/popover";
  import { Checkbox } from "@/components/ui/checkbox";


import { ReUseDiv, ReUseImage, ReUseText } from "../ReusableStyledComponents"
import { TabsCont } from "../Tabs"


const listOfCities= [
    { id: 1, city: "Hyderabad" },
    { id: 2, city: "Bangalore" },
    { id: 3, city: "Chennai" },
    { id: 4, city: "Delhi" },
    { id: 5, city: "Mumbai" },
    { id: 6, city: "Pune" },
    { id: 7, city: "Kolkata" },
    { id: 8, city: "Ahmedabad" },
    { id: 9, city: "Jaipur" },
    { id: 10, city: "Lucknow" },
  ];
  

const listOfAreas = [
        { id: 1, area: "Hitech City" },
        { id: 2, area: "Banjara Hills" },
        { id: 3, area: "Jubilee Hills" },
        { id: 4, area: "Kondapur" },
        { id: 5, area: "Madhapur" },
        { id: 6, area: "Gachibowli" },
        { id: 7, area: "Koramangala" },
        { id: 8, area: "Indiranagar" },
        { id: 9, area: "Whitefield" },
        { id: 10, area: "Electronic City" },
        { id: 11, area: "Marathahalli" },
        { id: 12, area: "HSR Layout" },
        { id: 13, area: "Adyar" },
        { id: 14, area: "Mylapore" },
        { id: 15, area: "Anna Nagar" },
        { id: 16, area: "T Nagar" },
        { id: 17, area: "Velachery" },
        { id: 18, area: "Porur" },
        { id: 19, area: "Connaught Place" },
        { id: 20, area: "Nehru Place" },
        { id: 21, area: "Dwarka" },
        { id: 22, area: "Vasant Kunj" },
        { id: 23, area: "Saket" },
        { id: 24, area: "Noida Sector 62" },
        { id: 25, area: "Bandra" },
        { id: 26, area: "Juhu" },
        { id: 27, area: "Andheri" },
        { id: 28, area: "Powai" },
        { id: 29, area: "Worli" },
        { id: 30, area: "Lower Parel" },
        { id: 31, area: "Koregaon Park" },
        { id: 32, area: "Baner" },
        { id: 33, area: "Hinjewadi" },
        { id: 34, area: "Wakad" },
        { id: 35, area: "Viman Nagar" },
        { id: 36, area: "Camp Area" },
        { id: 37, area: "Salt Lake" },
        { id: 38, area: "Park Street" },
        { id: 39, area: "Ballygunge" },
        { id: 40, area: "Sector V" },
        { id: 41, area: "Gariahat" },
        { id: 42, area: "New Town" },
        { id: 43, area: "Satellite" },
        { id: 44, area: "Navrangpura" },
        { id: 45, area: "Vastrapur" },
        { id: 46, area: "C.G. Road" },
        { id: 47, area: "Bopal" },
        { id: 48, area: "Sarkhej-Gandhinagar Highway" },
        { id: 49, area: "Malviya Nagar" },
        { id: 50, area: "Vaishali Nagar" },
        { id: 51, area: "C-Scheme" },
        { id: 52, area: "Mansarovar" },
        { id: 53, area: "JLN Marg" },
        { id: 54, area: "Tonk Road" },
        { id: 55, area: "Gomti Nagar" },
        { id: 56, area: "Hazratganj" },
        { id: 57, area: "Alambagh" },
        { id: 58, area: "Charbagh" },
        { id: 59, area: "Indira Nagar" },
        { id: 60, area: "BBD Chowk" },
      ];
      
  
  // Array of appliances/Services
  const listOfAppliances = [
   { id:1 , service:"Fridge"},
   { id:2 , service:"Air Conditioner"},
   { id:3 , service:"Gas Stove"},
   { id:4 , service:"Television"},
   { id:5 , service:"Washing Machine"},
   { id:6 , service:"Microwave"}
  ];



export const Register = () => {
    let navigate = useNavigate()
    const [activeTab, setTab] = useState("user");
    const onChangeTab = (newTabValue) => {
        setTab(newTabValue)
        setEmail("")
        setPassword("")
        setApiResponse({ isError: false, errorMsg: "" })
    }

    const [email, setEmail] = useState("");
    const onEmailChangeValue = (event) => {
        // console.log("email change:",event.target.value,"<=",email);
        setEmail(event.target.value)
    }


    const [password, setPassword] = useState("");
    const onPasswordChangeValue = (event) => {
        // console.log("password change:",event.target.value,"<=",password);
        setPassword(event.target.value)
    }

    const [username, setUsername] = useState("")
    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }


    const [mobile, setMobile] = useState("")
    const onChangeMobile = (event) => {
        setMobile(event.target.value)
    }


    const [description, setDescription] = useState("")
    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const [vendorImage,setVendorImage]=useState(null)
    const onChangeVendorImage=(event)=>{
        setVendorImage(event.target.files[0])
    }


    const [allCities, setAllCities] = useState([])
    const [allAreas, setAllAreas] = useState([])
    const [allServices, setAllServices] = useState([])


    const [apiResponse, setApiResponse] = useState({
        isError: false,
        inProgress: false,
        errorMsg: null
    })

    const toggleSelectionCity = (value) => {
        setAllCities((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
      };

      const toggleSelectionArea = (value) => {
        setAllAreas((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
      };

      const toggleSelectionServices = (value) => {
        setAllServices((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
      };

    const makeApiForRegister = async (event) => {
        event.preventDefault()
        setApiResponse({ inProgress: true })
        const imageEncoded=new FormData()
        imageEncoded.append("image",vendorImage)
        //console.log("==>",imageEncoded.get("image"))
        // const userDetails = activeTab == "user" ? { email, username, password } : { email, name: username, password, mobile, description , image:vendorImage, city:allCities,areas:allAreas,services:allServices}
        // console.log(userDetails)
        imageEncoded.append("email", email);
        imageEncoded.append("username", username);
        imageEncoded.append("password",password)
        if (activeTab !== "user") {
            imageEncoded.append("name", username);
            imageEncoded.append("mobile", mobile);
            imageEncoded.append("description", description);
            imageEncoded.append("city", allCities);
            imageEncoded.append("areas", allAreas);
            imageEncoded.append("services", allServices);
        }
        const userBody={
            email,username,password
        }
        //console.log("imageEncoded", imageEncoded,email,username,password,userBody)
        
        const userJson=activeTab !== "user"? imageEncoded: JSON.stringify(userBody)
        const options = {
            method: "POST",
            headers: activeTab === "user" ? { "Content-Type": "application/json" } : undefined,
            body: userJson,
        };
        
        const url = activeTab == "user" ? "https://argonbackend-production.up.railway.app/api/v1/user/user-register/" : "https://argonbackend-production.up.railway.app/api/v1/technician/technician-register"
        const response = await fetch(url, options)
        const fetchedData = await response.json()
        if (response.ok === true) {
            //console.log(fetchedData.data, "It's True==>", fetchedData)
            setApiResponse({ inProgress: false })
            navigate("/login")
        } else {
            //console.log("Error ==>", fetchedData)
            setApiResponse({ isError: true, errorMsg: fetchedData.message, inProgress: false })
        }
    }

    const showCityNames=allCities.map(eachCityId=>{
        const valObj=listOfCities.filter(eachCityObj=>eachCityObj.id===eachCityId)[0]
        return valObj.city
    })

    const showAreaNames=allAreas.map(eachAreaId=>{
        const valObj=listOfAreas.filter(eachAreaObj=>eachAreaObj.id===eachAreaId)[0]
        return valObj.area
    })

    const showApplianceNames=allServices.map(eachApplianceId=>{
        const valObj=listOfAppliances.filter(eachApplianceObj=>eachApplianceObj.id===eachApplianceId)[0]
        return valObj.service
    })
    // console.log(vendorImage)

    return (
        <ReUseDiv className="overflow-y-auto" w="100%"  p="30px" display="flex" fD="column" jC="center" aI="center" >
            <ReUseImage w="250px" m="10px" mb="30px" alt="argon_logo" src="/assests/full-logo.png" />
            <Tabs defaultValue="user" className="w-[350px]">
                <TabsCont activeTab={activeTab} onChangeTab={onChangeTab} />
                <TabsContent value="user">
                    <form onSubmit={makeApiForRegister}>
                        <Card className="w-[350px] p-2">
                            <CardHeader>
                                <CardTitle>User Sign Up</CardTitle>
                                <CardDescription>Register as User with required credentails</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Email</Label>
                                        <Input id="name" value={email} onChange={onEmailChangeValue} type="email" placeholder="Enter your Email" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" value={username} onChange={onChangeUsername} type="text" placeholder="Create your username" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" value={password} onChange={onPasswordChangeValue} type="password" placeholder="Create your password" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={() => { navigate("/login") }}>Login As User</Button>
                                <Button type="submit" disabled={apiResponse.inProgress}>{apiResponse.inProgress && <Loader2 className="animate-spin" />} Sign Up</Button>
                            </CardFooter>
                            {apiResponse.errorMsg && <ReUseText color="red" fS="2px" pl="5px">*{apiResponse.errorMsg}</ReUseText>}
                        </Card>
                    </form>
                </TabsContent>
                <TabsContent value="vendor">
                    <form onSubmit={makeApiForRegister}>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Vendor/Technician Sign Up</CardTitle>
                                <CardDescription>Register as Vendor with required credentails</CardDescription>
                            </CardHeader>
                            <CardContent>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" value={email} onChange={onEmailChangeValue} placeholder="Enter your Business Email" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name">Business/Vendor Name</Label>
                                            <Input id="name" type="text" value={username} onChange={onChangeUsername} placeholder="Enter Businees/Vendor Name" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="password">Password</Label>
                                            <Input id="password" type="password" value={password} onChange={onPasswordChangeValue} placeholder="Create your password" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="description">Business/Vendor Description</Label>
                                            <Input id="description" type="text" value={description} onChange={onChangeDescription} placeholder="Enter Businees/Vendor Description" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="mobile">Business/Vendor Mobile</Label>
                                            <Input id="mobile" type="tel" value={mobile} onChange={onChangeMobile} placeholder="Enter Businees/Vendor Mobile Number" />
                                        </div>

                                        <div>
                                        <Label htmlFor="city">Select Cities </Label>
                                        <Popover>
                                            <PopoverTrigger asChild >
                                                <Button variant="outline" className="w-[300px] justify-between text-wrap h-auto text-zinc-500">
                                                {showCityNames.length > 0
                                                    ? showCityNames.join(", ")
                                                    : "Select Cities providing the services"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full border-6">
                                                <div className="p-4 space-y-2">
                                                {listOfCities.map((eachCity) => (
                                                    <div key={eachCity.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={eachCity.id}
                                                        checked={allCities.includes(eachCity.id)}
                                                        onCheckedChange={() => toggleSelectionCity(eachCity.id)}
                                                    />
                                                    <Label htmlFor={eachCity.id}>{eachCity.city}</Label>
                                                    </div>
                                                ))}
                                                </div>
                                            </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div>
                                        <Label htmlFor="area">Select Areas </Label>
                                        <Popover>
                                            <PopoverTrigger asChild >
                                                <Button variant="outline" className="w-[300px] justify-between text-wrap h-auto text-zinc-500">
                                                {showAreaNames.length > 0
                                                    ? showAreaNames.join(", ")
                                                    : "Select Areas providing the services"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full border-6 h-[40vh] overflow-y-auto">
                                                <div className="p-4 space-y-2">
                                                {listOfAreas.map((eachArea) => (
                                                    <div key={eachArea.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={eachArea.id}
                                                        checked={allAreas.includes(eachArea.id)}
                                                        onCheckedChange={() => toggleSelectionArea(eachArea.id)}
                                                    />
                                                    <Label htmlFor={eachArea.id}>{eachArea.area}</Label>
                                                    </div>
                                                ))}
                                                </div>
                                            </PopoverContent>
                                            </Popover>
                                        </div>

                                        
                                        <div>
                                        <Label htmlFor="services">Select Services </Label>
                                        <Popover>
                                            <PopoverTrigger asChild >
                                                <Button variant="outline" className="w-[300px] justify-between text-wrap h-auto text-zinc-500">
                                                {showApplianceNames.length > 0
                                                    ? showApplianceNames.join(", ")
                                                    : "Select Appliances to provide services"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full border-6 h-[40vh] overflow-y-auto">
                                                <div className="p-4 space-y-2">
                                                {listOfAppliances.map((eachService) => (
                                                    <div key={eachService.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={eachService.id}
                                                        checked={allServices.includes(eachService.id)}
                                                        onCheckedChange={() => toggleSelectionServices(eachService.id)}
                                                    />
                                                    <Label htmlFor={eachService.id}>{eachService.service}</Label>
                                                    </div>
                                                ))}
                                                </div>
                                            </PopoverContent>
                                            </Popover>
                                        </div>
                                        
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="image">Business/Vendor Image</Label>
                                            <Input id="image" type="file" accept="image/*" onChange={onChangeVendorImage} />
                                        </div>

                                    </div>
                               
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="outline" onClick={() => { navigate("/login") }}>Login As Vendor</Button>
                                <Button type="submit" disabled={apiResponse.inProgress}>{apiResponse.inProgress && <Loader2 className="animate-spin" />} Sign Up</Button>
                            </CardFooter>
                            {apiResponse.errorMsg && <ReUseText color="red" fS="2px" pl="5px">*{apiResponse.errorMsg}</ReUseText>}

                        </Card>
                    </form>
                </TabsContent>
            </Tabs>

        </ReUseDiv>
    )
}
