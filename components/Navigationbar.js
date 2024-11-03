const Navigationbar = ()=>{
    return (
        <div className=" flex flex-row justify-between py-6 px-28 border-b align-middle items-center bg-white">
            <div className="icon text-black font-bold text-xl">ResumeGinues</div>
            <ul className="item flex space-x-4 ">
                <li>Get</li>
                <li>How its work</li>
                <li>FAQ</li>
                <li>Pricing</li>
            </ul>
            <div className="cta"><button type="button" className="bg-transparent border px-4 py-1.5 font-semibold border-b-4 border-b-black">Login</button></div>   
        </div>
    )
}

export default Navigationbar;