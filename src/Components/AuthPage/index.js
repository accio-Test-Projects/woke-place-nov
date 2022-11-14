import { Button } from "@mui/material";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
function AuthPage({ type }) {
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        if (type === "candidate") {
          if (!true) {
            // if user is registered
            navigate("/candidate/profile");
          } else {
            // if user is not registered
            navigate("/candidate/onboarding");
          }
        } else {
          if (!true) {
            // if user is registered
            navigate("/employer/profile");
          } else {
            // if user is not registered
            navigate("/employer/onboarding");
          }
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  };

  return (
    <div>
      <h1>Welcome {type} please SignIn</h1>
      <h3>SignIn with google</h3>
      <Button onClick={signIn}> SignIn</Button>
    </div>
  );
}

export default AuthPage;
// type
// onboarding when user is now
// profile we have  user's data
