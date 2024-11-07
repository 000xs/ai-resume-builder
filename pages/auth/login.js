import Navigationbar from "@/components/Navigationbar";
import { Fragment } from "react";

const Login = () => {
  return (
    <Fragment>
      <Navigationbar />
      <div className=" min-h-screen  bg-white px-28 py-10">
        <form action="" method="post" className="flex flex-col space-y-4">
          <div className=" flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="username border p-1"
              placeholder="Email"
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="password border p-1"
              placeholder="Password"
            />
          </div>
          <button
            className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
            onClick={() =>
              router.push(
                `/generate-resume?step=6&templateId=${selectedTemplate}`
              )
            }
          >
            Login
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
