import {  useState } from "react"
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
  

import { ReUseDiv, ReUseImage, ReUseText } from "../ReusableStyledComponents"
import { TabsCont } from "../Tabs"



export const Login=()=>{
    let navigate=useNavigate()
    const [activeTab,setTab]=useState("user");
    const onChangeTab=(newTabValue)=>{
        setTab(newTabValue)
        setEmail("")
        setPassword("")
        setApiResponse({isError:false,errorMsg:""})
    }

    const [email,setEmail]=useState("");
    const onEmailChangeValue=(event)=>{
        // console.log("email change:",event.target.value,"<=",email);
        setEmail(event.target.value)
    }
    

    const [password,setPassword]=useState("");
    const onPasswordChangeValue=(event)=>{
        // console.log("password change:",event.target.value,"<=",password);
        setPassword(event.target.value)
    }

    const [apiResponse,setApiResponse]=useState({
        isError:false,
        inProgress:false,
        errorMsg:null
    })

    const makeApiForLogin=async(event)=>{
        event.preventDefault()
        setApiResponse({inProgress:true})
        const userDetails={email,password}
        const options={
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDetails),
            }
        const url=activeTab=="user"?"https://argonbackend-production.up.railway.app/api/v1/user/user-login/":"https://argonbackend-production.up.railway.app/api/v1/technician/technician-login/"
        const response=await fetch(url,options)
        const fetchedData=await response.json()
        if(response.ok===true){
            //console.log(fetchedData.data.jwtToken,"It's True==>",fetchedData)
            Cookies.set("jwtTokenData",JSON.stringify(fetchedData.data),{ expires: 7, path: '/' })
            setApiResponse({inProgress:false})
            navigate("/",{replace:true})
        }else{
            //console.log("Error ==>",fetchedData)
            setApiResponse({isError:true,errorMsg:fetchedData.message,inProgress:false})
        }
    }


    return(
        <ReUseDiv w="100%" h="100vh" p="30px" display="flex" fD="column" jC="center" aI="center">
             <ReUseImage w="250px" m="10px" mb="30px" alt="argon_logo" src="/assests/full-logo.png"/>
            <Tabs defaultValue="user" className="w-[350px]">
            <TabsCont activeTab={activeTab} onChangeTab={onChangeTab}/>
            <TabsContent value="user">
                <form onSubmit={makeApiForLogin}>
                    <Card   className="w-[350px] p-2">
                        <CardHeader>
                            <CardTitle>User Login</CardTitle>
                            <CardDescription>Please enter your credentials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input id="name" value={email} onChange={onEmailChangeValue} placeholder="Enter your Email to login" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" value={password} onChange={onPasswordChangeValue} type="password" placeholder="Enter your password" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="button" variant="outline" onClick={()=>{navigate("/register")}} >Register As User</Button>
                            <Button type="submit" disabled={apiResponse.inProgress}>{apiResponse.inProgress && <Loader2 className="animate-spin" />} Login</Button>
                        </CardFooter>
                        {apiResponse.errorMsg && <ReUseText color="red" fS="2px" pl="5px">*{apiResponse.errorMsg}</ReUseText>}
                    </Card>     
                </form>   
            </TabsContent>
            <TabsContent value="vendor">
                <form onSubmit={makeApiForLogin}>
                <Card   className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Vendor/Technician Login</CardTitle>
                        <CardDescription>Please enter your credentials</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email</Label>
                            <Input id="name" value={email} onChange={onEmailChangeValue} placeholder="Enter your Email to login" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={onPasswordChangeValue} placeholder="Enter your password" />
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" variant="outline" onClick={()=>{navigate("/register")}}>Register As Vendor</Button>
                        <Button type="submit" disabled={apiResponse.inProgress}>{apiResponse.inProgress && <Loader2 className="animate-spin" />} Login</Button>
                    </CardFooter>
                    {apiResponse.errorMsg && <ReUseText color="red" fS="2px" pl="5px">*{apiResponse.errorMsg}</ReUseText>}

                </Card>
                </form>
            </TabsContent>
            </Tabs>
            
        </ReUseDiv>
    )
}
