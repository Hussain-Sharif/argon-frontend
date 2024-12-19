import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { ReUseDiv, ReUseImage } from "../ReusableStyledComponents"
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
        <ReUseDiv w="100%" p="20px" pt="10px" pb="10px" className="bg-[#FAFAFA] sticky top-0 flex flex-row justify-between">
            <ReUseImage w="150px"  alt="logo" src="https://s3-alpha-sig.figma.com/img/a7c2/c95a/e57df5f03ddceb5a4011eb1efd953170?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i7lvM1s0i74MfggIel4C7VrexlGfffkxShALGiS99Txtnir6kf9cE0wDtpfwUiHXVw0BRZQHQIfzxZw1EQ0H1ClfCtFjay3rQCAIS~nSYjLOjg2TBlpcxwCRke5MQCppl-mEDFaqK3aVya7rCuiCkN2hntF9bpWkY8IHJUAJHnAT3XawIK1KXfQdPSW8NrdCJX0OPs0WWHm1JoUY~g374aVLigYQeWKFPHWCLbp7LdkPNRoL~08fbV~qj1viBUfox9ktE9IfCzq6zwxjitIwcAaYxJhH7o77FBChfuYVChd6aYDxaStNv9~tWtzOPwKUir3zVend3~SPe9Jc-FP5VA__"/>
            <ReUseDiv>
                {jwtToken?
                <ReUseDiv>
                    <SidebarProvider className="">
                        <NavUser user={userData} handleLogout={handleLogout}/> 
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