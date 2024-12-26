import { useState, useEffect, useRef } from "react";
import { userContext } from "./contexts/context";
import "./App.css";
import LoginComp from "./components/LoginComponent/LoginComp";
import UserComp from "./components/UserComp/UserComp";

function App() {
  //State declarations and initializations
  const [isformSubmitted, setFormSubmitted] = useState(false);
  const [loginResponse, setLoginResponse] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");

  //Ref declarations
  const usernameRef = useRef();
  const passwordRef = useRef();

  //Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  //UseEffect hook to handle login API call
  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    };
    console.log(
      JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    );
    if (isformSubmitted) {
      fetch("http://localhost:3100/api/auth/login", options)
        .then((res) => {
          if (!res.ok) {
            alert("Invalid credentials");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setLoginResponse(data);
          setUserName(usernameRef.current.value);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
    setFormSubmitted(false);
  }, [isformSubmitted]); //useEffect dependency on isformSubmitted

  //UseEffect hook to check user type
  useEffect(() => {
    if (isLoggedIn) {
      try {
        const options = {
          mothod: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginResponse?.token}`,
          },
        };
        fetch("http://localhost:3100/api/user/user", options)
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "User route verified") {
              setUserType("user");
            } else {
              console.log("In else part of user check");
              fetch("http://localhost:3100/api/user/admin", options)
                .then((res) => res.json())
                .then((data) => {
                  console.log("Hit Admin RBAC API");
                  if (data.message === "Admin route verified") {
                    setUserType("admin");
                  } else {
                    setIsLoggedIn(false);
                  }
                });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoggedIn]); //useEffect dependency on isLoggedIn

  console.log(loginResponse);
  console.log(isLoggedIn);
  console.log(userType);

  return (
    //userContext.Provider to provide the context to the child components
    <userContext.Provider
      value={{
        handleFormSubmit,
        usernameRef,
        passwordRef,
        loginResponse,
        userType,
        userName,
      }}
    >
      {/* //Conditional rendering of components based on login status and user type  */}
      <div className="App">
        {!isLoggedIn && <LoginComp />}

        {isLoggedIn && userType === "user" && <UserComp />}
        {isLoggedIn && userType === "admin" && <UserComp />}
      </div>
    </userContext.Provider>
  );
}

export default App;
