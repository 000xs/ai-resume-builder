import { useRouter } from "next/router";

const Navigationbar = ()=>{
    const router = useRouter()
    return (
        <div className=" flex flex-row justify-between py-6 px-28 border-b align-middle items-center bg-white">
            <div className="icon text-black font-bold text-xl hover:cursor-pointer"
            onClick={()=>{router.push('/')}}
            >ResumeGinues</div>
            <ul className="item flex space-x-6 ">
                <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer"
                onClick={()=>{router.push('/generate-resume')}}
                >Get</li>
                <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer">How its work</li>
                <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer">FAQ</li>
                <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer">Pricing</li>
            </ul>
            <div className="cta"><button type="button" className="bg-transparent border border-black hover:cursor-pointer px-4 py-1.5 font-semibold border-b-4 border-b-black">Login</button></div>   
        </div>
    )
}

export default Navigationbar;