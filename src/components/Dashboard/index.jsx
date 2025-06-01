import { DashboardHeaderNew } from "../DashboardHeaderNew"
import { DashboardSidebarNew } from "../DashboardSidebarNew"
import { SidebarProvider } from "../ui/sidebar"

export const Dashboard = () => {
    return (
        <SidebarProvider  className="w-full p-2 m-0">

            <DashboardSidebarNew />

            <main className='w-full m-0 p-0 '>
            <DashboardHeaderNew pageTitle="Dashboard" />
                <div className="p-3 w-full">
                    
                </div>
            </main>
        </SidebarProvider>
    )
}