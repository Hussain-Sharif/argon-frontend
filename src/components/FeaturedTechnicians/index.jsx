import React, { useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Phone, Mail, Award, ArrowBigUpDash } from "lucide-react";
import { Button } from '../ui/button';

const technicians = [
  {
    name: "Alex Rodriguez",
    description: "Master technician specializing in refrigeration and cooling systems. Expert in diagnosing and repairing complex issues with refrigerators and air conditioning units. Brings precision and deep technical knowledge to every service call.",
    image: "https://res.cloudinary.com/aymar/image/upload/v1733921447/alex_yirmbk.jpg",
    mobile: 9876543210,
    rating: 4.8
  },
  {
    name: "Alex Rodriguez",
    description: "Master technician specializing in refrigeration and cooling systems. Expert in diagnosing and repairing complex issues with refrigerators and air conditioning units. Brings precision and deep technical knowledge to every service call.",
    image: "https://res.cloudinary.com/aymar/image/upload/v1733921447/alex_yirmbk.jpg",
    mobile: 9876543210,
    rating: 4.8
  },
  {
    name: "Alex Rodriguez",
    description: "Master technician specializing in refrigeration and cooling systems. Expert in diagnosing and repairing complex issues with refrigerators and air conditioning units. Brings precision and deep technical knowledge to every service call.",
    image: "https://res.cloudinary.com/aymar/image/upload/v1733921447/alex_yirmbk.jpg",
    mobile: 9876543210,
    rating: 4.8
  },
  {
    name: "Alex Rodriguez",
    description: "Master technician specializing in refrigeration and cooling systems. Expert in diagnosing and repairing complex issues with refrigerators and air conditioning units. Brings precision and deep technical knowledge to every service call.",
    image: "https://res.cloudinary.com/aymar/image/upload/v1733921447/alex_yirmbk.jpg",
    mobile: 9876543210,
    rating: 4.8
  }
  // Add more technicians as needed
];

const EmptyState = (props) => {
  const {scrollToHero}=props
  return(
    <div className="flex flex-col items-center text-center py-2 w-full ">
      <img
        src="../../../public/assests/empty-search-reusit-img.png" // Replace with a meaningful illustration
        alt="No results illustration"
        className="mb-6 w-32"
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Technicians Found
      </h3>
      <p className="text-gray-600 max-w-md">
        Enter specific keywords in the search bar to find technicians that match your requirements.
      </p>
      <Button onClick={scrollToHero} className="mt-2"><ArrowBigUpDash size={80}/> Let's Search</Button>
    </div>
  )};
  

const RatingDisplay = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarIcon className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      )}
      <span className="text-sm font-medium ml-1">{rating}</span>
    </div>
  );
};

export const FeaturedTechnicians = React.forwardRef((props, ref) => {
    const {searchResult,scrollToHero}=props

    

    

    const technicians = searchResult.length>0 ? searchResult : [];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-[#EDF5FF] to-[#F5FEFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4">EXPERT TECHNICIANS</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Featured Professionals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Highly skilled technicians ready to solve your appliance problems with expertise and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicians.map((tech, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-blue-100">
                      <AvatarImage src={tech.image} alt={tech.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {tech.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{tech.name}</h3>
                      <RatingDisplay rating={tech.rating} />
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Featured
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {tech.description}
                </p>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+{tech.mobile}</span>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {technicians.length === 0 && <EmptyState scrollToHero={scrollToHero}/>}
      </div>
    </section>
  );
});

