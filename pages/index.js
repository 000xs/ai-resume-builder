// pages/index.js
import Footer from "@/components/Footer";
import Navigationbar from "@/components/Navigationbar";
 

export default function Home() {
  return (
    <main className="bg-white font-mono">
      <Navigationbar />
      <div className=" min-h-screen px-24">
        {/* //hero section */}
        <div className="hero h-3/4 bg-pink-200 rounded-b-xl flex flex-row justify-between py-10 px-10">
          <div className="left">
            <h1 className="text-5xl font-normal height-20 mb-4">Create <br></br>Professional<br></br> resumes</h1>
            <p className="text-lg text-gray-600 font-light mb-6">Our AI-powerd builder ensures your resume ATS friendly and standerd out.</p>
            <div className="ctas flex flex-row space-x-2">
              <button className="cta border-black border-b-2 bg-white px-4 py-2">
                START NOW
              </button>
              <button className="cta  border-black border border-t-2 hover:border hover:border-b-2 bg-transparent px-4 py-2">
                TRY DEMO
              </button>

            </div>
          </div>
          <div className="right">
            <img src="file-black-icon.png" alt="" width={256} height={256}  />
          </div>
        </div>
        {/* //users section */}
        <div className="container-data my-4 flex flex-row justify-between">
          <div className="active-users flex flex-row items-end space-x-2  px-8 py-8 bg-pink-200  w-auto h-auto " >
            <div className="left">
              <p>Active Users</p>
              <h1 className="font-medium text-4xl">1M+</h1>
            </div>
            <div className="right">
              <img src="family-icon.png" width={64} height={64} alt=""  />
            </div>
          </div>
          <div className="requests  flex flex-row space-x-2  items-end px-8 py-8 bg-pink-200  w-auto h-auto ">
            <div className="left">
              <p>Resumes Genrated</p>
              <h1 className="font-medium text-4xl">6MB+</h1>
            </div>
            <div className="right">
              <img src="folder-icon.png" width={64} height={64} alt=""  />
            </div>
          </div>
          <div className="created-resume sspace-x-2 flex flex-row items-end px-8 py-8 bg-pink-200  w-auto h-auto  ">
            <div className="left">
              <p>Coverletter Created</p>
              <h1 className="font-medium text-4xl">1MB+</h1>
            </div>
            <div className="right">
              <img src="document-application-icon.png" width={48} height={48} alt=""  />
            </div>
          </div>
          <div className="cta-create-your-ow flex flex-row space-x-2  items-end px-8 py-8 bg-white border  w-auto h-auto   ">
            <div className="left">
              <p>Create your own</p>
              <h1 className="font-medium text-3xl">Create</h1>
            </div>
            <div className="right">
              <img src="external-link-icon.png" width={32} height={32} alt=""   />
            </div></div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
