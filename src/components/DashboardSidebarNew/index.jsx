import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Cookies from "js-cookie";
import { ChevronsUpDownIcon, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn, dashboardMenuItems } from "@/lib/utils";

  // const rolesList=["Technician","manager"] // These are values stored in DB 
  
  export const DashboardSidebarNew = () => {
    const navigate=useNavigate()
    const {isMobile,state}=useSidebar()
    const location=useLocation()

    const jwtTokenData=Cookies.get('jwtTokenData')
    const emailFromCookies=jwtTokenData?JSON.parse(jwtTokenData).email:""
    const businessLogoUrlFromCookie=jwtTokenData?JSON.parse(jwtTokenData).image:""
    const nameFromCookies=jwtTokenData?JSON.parse(jwtTokenData).name:""
    const fallBackUserName=nameFromCookies?.split(' ')?.length>1?nameFromCookies?.split(' ')[0]?.toLocaleUpperCase()[0]+nameFromCookies?.split(' ')[1]?.toLocaleUpperCase()[0]:nameFromCookies?.split(' ')[0]?.toLocaleUpperCase()[0]+nameFromCookies?.split(' ')[0]?.toLocaleUpperCase()[1]

    const onClickLogout = () => {
            Cookies.remove('jwtTokenData');
            navigate('/', { replace: true });
            console.log("logout clicked...");
          };

    return (
      <Sidebar
  collapsible="icon"
  className={`${state === "collapsed" && "w-28" } m-2 bg-sidebar !bg-[#FAFAFA] dark:!bg-[#18181b] shadow-md border-[0.5px] rounded-md `}
>

<SidebarHeader  className="m-0 p-0 ">
  <SidebarMenu>
  <SidebarMenuItem className="m-0 p-0 flex justify-center items-center">
    <SidebarMenuButton
      size="lg"
      className={`m-0 flex ${
        state === "collapsed" ? "justify-center w-10 h-10" : "justify-start"
      } items-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground`}
    >
      <div className="flex p-0 m-0 w-full justify-start items-center gap-3">
        <Avatar className="w-10 h-10 rounded-full p-2 overflow-hidden flex-shrink-0">
          <AvatarImage
            src="assests/Logo_simp.png"
            alt="Business Logo"
            className="w-full h-full object-fit "
          />
          <AvatarFallback className="bg-gray-100 text-xs font-semibold text-gray-600 flex items-center justify-center w-full h-full">
            LOGO
          </AvatarFallback>
        </Avatar>
        {state !== "collapsed" && (
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-semibold text-lg">Argon</span>
            <span className="truncate text-xs">
              {nameFromCookies || "Company-Name"}
            </span>
          </div>
        )}
      </div>
    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>

</SidebarHeader>


        <SidebarContent className="overflow-x-hidden py-4  w-full flex justify-start items-center ">

          {
            dashboardMenuItems.map((menuItem)=>{
              return(
                <SidebarMenu key={menuItem.id} className="w-full   ">
                    <SidebarMenuItem className="w-full flex justify-center items-center">
                        <Link to={menuItem.url} className="w-full flex justify-center items-center">
                            <SidebarMenuButton 
                        className={cn(
                            location.pathname === menuItem.url && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                        >
                            <menuItem.icon className="mr-2 h-8 w-8 " />
                            <span className="text-sm ">{menuItem.title}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
              )
            })
          }

        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size='lg'
                        className={`${  state !== "collapsed" && "hover:dark:bg-[#292524] hover:bg-[#e9e9e9]"
                                        } data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground  `}>
                      <Avatar  className='h-7 w-7 rounded-lg'>
                        <AvatarImage src={businessLogoUrlFromCookie} alt={nameFromCookies}/>
                        <AvatarFallback className={`${state==="collapsed" && "hover:dark:bg-[#292524] hover:bg-[#e9e9e9]"} dark:bg-[#322e2c] bg-[#f1f0f0]  rounded-lg`}>{fallBackUserName}</AvatarFallback>
                      </Avatar>
                      <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>Technician</span>
                        <span className='truncate text-xs'>{emailFromCookies}</span>
                      </div>
                      <ChevronsUpDownIcon className='ml-auto size-4 text-[#f97316]' />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={` mb-2 w-34 rounded-lg `} side={isMobile ? 'bottom' : 'right'}>
                    <DropdownMenuLabel className='p-0 font-normal'>
                      <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                        <Avatar className='h-8 w-8 rounded-lg '>
                          <AvatarImage src={businessLogoUrlFromCookie} alt={nameFromCookies} />
                          <AvatarFallback className={`rounded-lg `}>{fallBackUserName}</AvatarFallback>
                        </Avatar>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                          <span className='truncate font-semibold'>Technician</span>
                          <span className='truncate text-xs'>{emailFromCookies}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator/>

                    <DropdownMenuGroup>
                      {/* <DropdownMenuItem>
                        <SparklesIcon/>
                        Upgrade to Pro
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SparklesIcon/>
                        Upgrade to Pro
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SparklesIcon/>
                        Upgrade to Pro
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/> */}
                      <DropdownMenuItem>
                        <Button variant="destructive" onClick={onClickLogout} >
                          <LogOutIcon/>
                          Logout
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  };
  