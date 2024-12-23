import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarIcon, StarHalfIcon, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "/api/placeholder/60/60",
    rating: 4.8,
    review: "Found the perfect AC technician through this platform. The booking process was seamless, and the technician was both professional and knowledgeable. What impressed me most was the transparent pricing and prompt service. Would definitely recommend for any home appliance repairs!"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    image: "/api/placeholder/60/60",
    rating: 5.0,
    review: "Had an emergency with my refrigerator late evening. Used this app and got connected with a technician within 30 minutes! The service quality was excellent, and the technician even explained how to prevent similar issues in the future. This app is a game-changer for appliance repairs in Bangalore."
  },
  {
    id: 3,
    name: "Anita Desai",
    image: "/api/placeholder/60/60",
    rating: 4.9,
    review: "As a working professional, finding reliable technicians was always a challenge. This platform solved that problem completely. The technician who fixed my washing machine was punctual, skilled, and very courteous. The follow-up service was equally impressive. Really happy with the overall experience!"
  }
];

const RatingStars = ({ rating }) => {
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
      <Badge className="text-sm font-medium ml-1 rounded-sm">{rating}</Badge>
    </div>
  );
};

export const Reviews = () => {
  return (
    <section className="bg-gradient-to-b from-[#F5FEFF] to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center  mb-16">
          <Badge className="mb-4 px-4 py-1">OUR CUSTOMERS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real experiences from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
                
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 border-2 border-orange-400">
                    <AvatarImage src={review.image} alt={review.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-700">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <RatingStars rating={review.rating} />
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {review.review}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;