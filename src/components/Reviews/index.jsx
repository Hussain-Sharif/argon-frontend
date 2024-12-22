

export const Reviews=()=>{
    return(
        <div className="md:p-20 md:pt-10 pt-0 p-5  min-h-screen bg-[#F5FEFF] flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-2 font-bold text-center">See what our happy customers have to say about us</h1>
            <div className="w-full flex justify-center items-center gap-20 mt-10 flex-wrap">
                <div className="max-w-80 flex flex-col justify-center items-center gap-4">
                    <img className="max-w-72" alt="step_1" src="../../public/assests/step_1.png"/>
                    <div className="flex flex-col justify-center items-center max-w-72">
                        <h1 className="text-2xl mb-2 font-bold text-center">Provide your appliance details</h1>
                        <p className="text-base mb-7 text-[#525F7F] text-center">Let us know your appliance details and your issue.</p>
                    </div>
                </div>
                <div className="max-w-80 flex flex-col justify-center items-center gap-4">
                    <img className="max-w-72" alt="step_1" src="../../public/assests/step_2.png"/>
                    <div className="flex flex-col justify-center items-center max-w-72">
                        <h1 className="text-2xl mb-2 font-bold text-center">Choose your technician</h1>
                        <p className="text-base mb-7 text-[#525F7F] text-center">Choose from a wide variety of technicians and vendors.</p>
                    </div>
                </div>
                <div className="max-w-80 flex flex-col justify-center items-center gap-4">
                    <img className="max-w-72" alt="step_1" src="../../public/assests/step_3.png"/>
                    <div className="flex flex-col justify-center items-center max-w-72">
                        <h1 className="text-2xl mb-2 font-bold text-center">Get it fixed!</h1>
                        <p className="text-base mb-7 text-[#525F7F] text-center">The technician will arrive at your doorstep shortly to fix it!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}