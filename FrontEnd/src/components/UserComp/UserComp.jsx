import { userContext } from "../../contexts/context";
import { useContext } from "react";

const UserComp = () => {
  //destructure the context userContext using useContext to get the userName and userType
  const { userName, userType } = useContext(userContext);
  return (
    <>
      <header className="text-3xl font-semibold">
        <h1>
          Hello {userName}! Welcome to the{" "}
          {userType === "user" ? `User` : `Admin`} panel.
        </h1>
      </header>
    </>
  );
};

export default UserComp;
