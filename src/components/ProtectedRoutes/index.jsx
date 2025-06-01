import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"



export const ProtectedRoutes = ({element: Component,...rest}) => {
    const jwtTokenData=Cookies.get("jwtTokenData")
    const type=jwtTokenData?JSON.parse(jwtTokenData).type:""
    console.log("protectedroutes:",jwtTokenData,type,type==="technician")
    if(!jwtTokenData) {
        return <Navigate to='/' />
    }
    if(type==="user"){
        return <Component {...rest} />
    }
    return <Navigate to='/dashboard'/>
}