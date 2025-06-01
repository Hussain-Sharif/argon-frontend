import { clsx } from "clsx";
import { Box, ListOrdered, User2Icon } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const dashboardMenuItems=[
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: Box,
  },
  {
    id: 1,
    title: "My Profile",
    url: "/my-vendor-profile",
    icon: User2Icon,
  },
  {
    id: 1,
    title: "All Orders",
    url: "/all-orders",
    icon: ListOrdered,
  },
]