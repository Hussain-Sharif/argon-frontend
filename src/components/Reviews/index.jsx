import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "../ui/separator";
import { StarHalfIcon, StarIcon } from "lucide-react";


  const reviews = [
    {
      name: "Priya Sharma",
      image: "/api/placeholder/60/60",  // Using placeholder since I can't generate real images
      rating: 4.8,
      review: "Found the perfect AC technician through this platform. The booking process was seamless, and the technician was both professional and knowledgeable. What impressed me most was the transparent pricing and prompt service. Would definitely recommend for any home appliance repairs!"
    },
    {
      name: "Rajesh Kumar",
      image: "/api/placeholder/60/60",
      rating: 5.0,
      review: "Had an emergency with my refrigerator late evening. Used this app and got connected with a technician within 30 minutes! The service quality was excellent, and the technician even explained how to prevent similar issues in the future. This app is a game-changer for appliance repairs in Bangalore."
    },
    {
      name: "Anita Desai",
      image: "/api/placeholder/60/60",
      rating: 4.9,
      review: "As a working professional, finding reliable technicians was always a challenge. This platform solved that problem completely. The technician who fixed my washing machine was punctual, skilled, and very courteous. The follow-up service was equally impressive. Really happy with the overall experience!"
    }
  ];


export const Reviews=()=>{
    return(
        <div className="md:p-20 p-8    bg-[#F5FEFF] flex flex-col justify-start items-center">
            <h1 className="text-4xl mb-2 font-bold text-left self-start"><Badge className={"mb-2"}>OUR CUSTOMERS</Badge><br/>Listen from there words</h1>
            <div className="w-full flex justify-center items-center gap-20 mt-10 flex-wrap">
                {
                    reviews.map(eachReview=>(<>
                        <div className="max-w-[270px] flex flex-row justify-center items-start gap-4">
                            <Avatar className="h-10 w-10 rounded-full p-2 bg-[#FA8F44]">
                                <AvatarImage  src="../../public/assests/Logo_simp.png" alt={eachReview.name} />
                                <AvatarFallback className="rounded-lg]">{(eachReview.name[0]+eachReview.name[1]).toUpperCase()}</AvatarFallback>
                            </Avatar>
                    <div className="flex flex-col justify-center items-start w-full text-left">
                        <div className="flex flex-row justify-start items-center">
                            {eachReview.rating>=1 ?<StarIcon color="gold" className="size-5"/>:<StarHalfIcon color="gold" className="size-5"/>}
                            {eachReview.rating>=2 ?<StarIcon color="gold" className="size-5"/>:<StarHalfIcon color="gold" className="size-5"/>}
                            {eachReview.rating>=3 ?<StarIcon color="gold" className="size-5"/>:<StarHalfIcon color="gold" className="size-5"/>}
                            {eachReview.rating>=4 ?<StarIcon color="gold" className="size-5"/>:<StarHalfIcon color="gold" className="size-5"/>}
                            {eachReview.rating>=5 ?<StarIcon color="gold" className="size-5"/>:<StarHalfIcon color="gold" className="size-5"/>}
                        </div>
                        <h1 className="text-xl mb-2 font-bold ">{eachReview.name}</h1>
                        <p className="text-sm mb-2 text-[#525F7F] ">{eachReview.review}</p>
                    </div>
                </div>
                 {eachReview.name!=="Anita Desai" &&   <Separator className="w-[70%] md:hidden bg-[#FA8F44]" color="#FA8F44"/>}
                </>))
                }
                
                
            </div>
        </div>
    )
}