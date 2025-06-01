import { SidebarTrigger } from "../ui/sidebar"


export const DashboardHeaderNew = (props) => {
    const {pageTitle}=props
    return (
         <header className={`flex flex-row justify-start p-4 gap-4 items-center h-12`}>
            <div className='flex flex-row justify-start items-center'>
                <SidebarTrigger variant='outline' className='scale-125 sm:scale-100 '/>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <h1 className='text-2xl font-bold'>{pageTitle}</h1>    
            </div>


        </header>
    )
}