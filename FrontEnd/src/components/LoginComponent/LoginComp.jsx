import { userContext } from "../../contexts/context";
import { useContext } from "react";

const LoginComp = () => {
  //destructure the context userContext using useContext to get the handleFormSubmit, usernameRef, passwordRef, and loginResponse
  const { handleFormSubmit, usernameRef, passwordRef, loginResponse } =
    useContext(userContext);

  return (
    <>
      <div className="bg-white drop-shadow-md max-w-[450px] mt-[15vh] mx-auto p-10 gap-2 flex flex-col">
        <header className=" font-semibold text-3xl">Login</header>
        <div className="drop-shadow-md text-2xl p-5 flex flex-col mx-auto justify-center items-center">
          <form
            className="flex flex-col justify-center items-center gap-[20px] w-auto"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <input
              className="p-1 text-center text-xl shrink w-[80%]"
              type="text"
              placeholder="Username"
              ref={usernameRef}
            />
            <input
              className="p-1 text-center text-xl shrink w-[80%]"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              className="drop-shadow-sm bg-[#a4f3ff] hover:bg-[#69ebff] text-base p-1 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComp;
