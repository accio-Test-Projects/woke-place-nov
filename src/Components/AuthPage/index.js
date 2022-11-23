import { Button } from "@mui/material";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

import { useNavigate } from "react-router-dom";
function AuthPage({ type }) {
  const navigate = useNavigate();
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        const docRef = doc(db, "userData", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userInfo=docSnap.data()
          const userType = userInfo.type;
          localStorage.setItem('userinfo',JSON.stringify(userInfo))

          if (type === "candidate") {
            if (userType === type) {

              setTimeout(()=>{
                navigate("/candidate/profile");
              },3000)
            

            } else {
              alert("you are already onboarded as employer");
              return;
            }
          } else {
            if (userType === type) {
              setTimeout(()=>{
              navigate("/employer/profile");
              },3000)
            } else {
              alert("you are already onboarded as candidate");
              return;
            }
          }
          console.log("Document data:", docSnap.data());
        } else {

          if (type === "candidate") {
            setTimeout(()=>{
            navigate("/candidate/onboarding");
            },3000)
          } else {
            setTimeout(()=>{
            navigate("/employer/onboarding");
            },3000)
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
