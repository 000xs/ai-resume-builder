const Navigationbar = ()=>{
    return (
        <div className=" flex flex-row justify-between py-6 px-28 border-b align-middle items-center bg-white">
            <div className="icon text-black font-bold text-xl">ResumeGinues</div>
            <ul className="item flex space-x-6 ">
                <li className="hover:border-b-2 hover:border-b-black">Get</li>
                <li className="hover:border-b-2 hover:border-b-black">How its work</li>
                <li className="hover:border-b-2 hover:border-b-black">FAQ</li>
                <li className="hover:border-b-2 hover:border-b-black">Pricing</li>
            </ul>
            <div className="cta"><button type="button" className="bg-transparent border border-black px-4 py-1.5 font-semibold border-b-4 border-b-black">Login</button></div>   
        </div>
    )
}

export default Navigationbar;