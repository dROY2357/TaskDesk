import { useState, useEffect, useRef } from "react";
import { userContext } from "./contexts/context";
import "./App.css";
import LoginComp from "./components/LoginComponent/LoginComp";
import UserComp from "./components/UserComp/UserComp";
import AdminComp from "./components/AdminComp/AdminComp";

function App() {
  const [isformSubmitted, setFormSubmitted] = useState(false);
  const [loginResponse, setLoginResponse] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleFormSubmit = (e) => {
    console.log("Clicked");
    e.preventDefault();
    console.log(`${usernameRef.current.value} ${passwordRef.current.value}`);
    setFormSubmitted(true);
  };

  useEffect(() => {
    console.log("Inside useEffect");
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
      console.log("Form Submitted");
      fetch("http://localhost:3100/api/auth/login", options)
        .then((res) => res.json())
        .then((data) => {
          setLoginResponse(data);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
    setFormSubmitted(false);
  }, [isformSubmitted]);

  useEffect(() => {
    if (isLoggedIn) {
      try {
        fetch("");
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoggedIn]);

  console.log(loginResponse);

  return (
    <userContext.Provider
      value={{ handleFormSubmit, usernameRef, passwordRef, loginResponse }}
    >
      <div className="App">
        <LoginComp />

        {isLoggedIn && loginResponse.role === "user" && <UserComp />}
        {isLoggedIn && loginResponse.role === "admin" && <AdminComp />}
      </div>
    </userContext.Provider>
  );
}

export default App;
