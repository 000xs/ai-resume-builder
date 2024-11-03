const Footer = () => {
    return (
        <div className="bg-white py-8 px-28 border-t flex flex-row pb-36 justify-between">
            <div className="left">
                <h1 className="font-bold">Get started</h1>
                <p>Trusted scince 2024</p>
                <img src="donate.webp" width={128} height={32} alt="" srcset="" />

            </div>
            <div className="right">
                <ul className=" flex flex-row space-x-16">
                    <div className="flex space-y-1 flex-col">
                        <p className="font-medium ">Our vision</p>
                        <li>Our Mission</li>
                        <li>Opportunie</li>
                        <li>Get in Touch</li>
                        <li>Inspireing</li>
                    </div>
                    <div className="flex space-y-1 flex-col">
                        <p className="font-medium">Joing the</p>
                        <li>Support Center</li>
                        <li>Upgrade to</li>
                        
                    </div>
                    <div className="flex space-y-1 flex-col">
                        <p className="font-medium">Connect to</p>
                        <li>Linkdin</li>
                        <li>Facebook</li>
                        <li>Twitter</li>
                    </div>
                </ul>

            </div>
        </div>
    )
}


export default Footer;