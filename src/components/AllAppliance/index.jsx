

export const AllAppliance=(props)=>{

    const {allAppliancesList}=props

    return(
        <div className="md:p-20 p-5 min-h-screen bg-[#F5FEFF]">
            <div className="md:top-[-200px] top-[-170px] z-40 relative w-[100%] bg-white p-10 rounded-lg border shadow-xl
            animate__animated animate__fadeInUp">
                <h1 className="text-4xl mb-2 font-bold">All Appliances</h1>
                <p className="text-base mb-7 text-[#525F7F]">The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
            <div className="justify-center items-start" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {allAppliancesList.map((appliance) => (
                    <div
                    key={appliance.id}
                    className="min-w-72 max-w-80 flex flex-col justify-start items-start"
                    style={{
                        
                        borderRadius: "8px",
                        padding: "10px",
                        textAlign: "center",
                        width: "200px",
                    }}
                    >
                    {/* Render the Lucide Icon */}
                    <div className="mb-4 bg-slate-100 rounded-full p-4">{appliance.image()}</div>

                    {/* Appliance Name */}
                    <h3 className="text-2xl mb-2">{appliance.name}</h3>

                    {/* Appliance Description */}
                    <p className="text-[#525F7F] text-base text-left">
                        {appliance.description}
                    </p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}