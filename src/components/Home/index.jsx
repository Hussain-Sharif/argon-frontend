import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Header } from "../Header"

export const Home=()=>{
    return (
      <>
        <Header/>
        <Avatar className="w-60 h-60">
        <AvatarImage  src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </>
    )
}