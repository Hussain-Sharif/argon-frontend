import React from "react"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

export const AllAppliance=(props)=>{

    const {allAppliancesList}=props

    return(
        <>
        <div className="md:p-10 md:pb-[0px] p-5 pb-0 max-h-fit bg-gradient-to-t from-blue-200 to-blue-50">
        <div className="w-full bg-gradient-to-br from-white to-gray-50 p-8 lg:p-12 rounded-xl shadow-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <Badge className="mb-4 ">
            WANT TO KNOW
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            All Appliances
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            The time is now for it to be okay to be great. For being a bright color. For standing out.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAppliancesList.map((appliance, index) => (
            <Card 
              key={appliance.id}
              className="group hover:shadow-xl transition-all duration-300 border-0"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-start space-y-4">
                  {/* Icon Container */}
                  <div className="bg-blue-50 group-hover:bg-blue-100 p-4 rounded-2xl transition-colors duration-300">
                    {React.cloneElement(appliance.image(), {
                      className: "w-8 h-8 text-blue-600"
                    })}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {appliance.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {appliance.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

        </div>
        {/* <div className="w-full mb-0 relative border-0 outline-none bg-[#f5feff]">
                <img className="w-full h-[220px] border-0 " alt="up-curve" src="assests/upper-curve.png"/>
        </div> */}
   </> )
}