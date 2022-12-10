import React, { useState } from "react";

import firebase from "../firebase";
import {useNavigate, useNavigation } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  const navigate = useNavigate();
  function login() {
    console.log(email,password);
   firebase
     .auth()
     .signInWithEmailAndPassword( email, password)
     .then((userCredential: any) => {
       localStorage.setItem("admindata",JSON.stringify( userCredential));
       const user = userCredential.user;
      //  localStorage.setItem("userinfo",user)
       console.log(user);
       navigate("/");

       // ...
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log(errorCode, errorMessage);
       alert(error.message)

       // ..
     });
  }
  return (
    <div
      style={{ width: "25rem", marginTop: "7rem" }}
      className="  ml-auto mr-auto "
    >
      <div className="card text-center" style={{ height: "30rem" }}>
        <div className="card-body">
          <h2 className="card-title mt-5" style={{ color: "#04AA6D" }}>
            LOGIN
          </h2>
          <div>
            <div className="mb-3 mt-5">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="mb-5 mt-2">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="btn mt-5 btn-primary"
              style={{ backgroundColor: "#04AA6D", width: "100%" }}
              onClick={login}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
