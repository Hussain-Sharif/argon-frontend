import { ReUseText } from "../ReusableStyledComponents"


export const Hero=()=>{

    return (
        <div className="w-full min-h-screen border-2 p-4 md:p-10 flex flex-col md:flex-row justify-between items-start">
            <div className="mt-8 border-2 ">
                <h1 className="text-4xl font-bold mb-5">
                Take care of your home needs now! <br/>
                </h1>
                <ReUseText color="#525F7F"  className="text-xl">
                ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a technician.
                </ReUseText>
            </div>
            <div>
                
            </div>
            <img className="max-w-90 md:max-w-sm" alt="hero_img" src="public/assests/hero_image.png"/>
        </div>
    )
}