import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { ReUseDiv } from "../ReusableStyledComponents"
import { Button } from "../ui/button"
import { LogInIcon,  NotebookPen } from "lucide-react"
import { NavUser } from "../nav-user"
import { SidebarProvider } from "../ui/sidebar"


export const Header=(props)=>{
    const {handleLogout,isLoggedOut}=props
    const navigate=useNavigate()
    

    
    let cookieData=Cookies.get("jwtTokenData") || false
    console.log("Header islogout ",isLoggedOut,cookieData)

    if (cookieData && !isLoggedOut) {
        cookieData=JSON.parse(cookieData)
     console.log("Cookie Data from Header Component:",{cookieData})
      }
     
     const userData={
        name:cookieData?.username ||cookieData?.name,
        email:cookieData?.email,
        avatar:cookieData?.image ||""
     }
     const {jwtToken}=cookieData
    return(
        <ReUseDiv w="100%" p="20px" pt="10px" pb="10px" className=" bg-[#EFF6FF]  z-50 sticky top-0 flex flex-row justify-between">
            <img className="w-[150px] md:w-[170px]" alt="logo" src="../../../public/assests/full-logo.png"/>
            <ReUseDiv>
                {jwtToken?
                <ReUseDiv>
                    <SidebarProvider className="">
                        <NavUser  user={userData} handleLogout={handleLogout}/> 
                    </SidebarProvider>
                    
                </ReUseDiv> : 
                <ReUseDiv className="flex flex-row justify-end " > 
                    <Button  className="md:block hidden" type="button" onClick={()=>{navigate("/login")}} >Login</Button>
                    <Button className="ml-2 md:block hidden" type="button" variant="outline"  onClick={()=>{navigate("/register")}} >Sign Up/Register</Button>
                    <Button  className="md:hidden block" type="button" onClick={()=>{navigate("/login")}} > <LogInIcon/> </Button>
                    <Button className="ml-1 md:hidden block" type="button" variant="outline"  onClick={()=>{navigate("/register")}} ><NotebookPen/> </Button>
                    </ReUseDiv> }
            </ReUseDiv>
        </ReUseDiv>
    )
}