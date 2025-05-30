import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import AuthButton from "./AuthButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage";

export default function AuthForms() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      navigate("/feed");
    }
  },[]);

  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [toastObject, setToastObject] = useState({
    header: "",
    content: "",
  });
  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (val) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/${val}`,
        formData
        // {withCredentials: true, headers: { "Content-Type": "application/json" }}
      );
      console.log(response)
      if (response.status == 200) {
        const token = response.data.token;
        localStorage.setItem("token", token)
        navigate("/feed");
      }
      else if (response.status == 404) {
        toastObject.header = "Error";
        toastObject.content = "User Not Found";
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setToastObject({ header: "Error", content: "Invalid Credentials" });
        console.log(toastObject);
      } else if (axios.isAxiosError(error) && error.response?.status === 404) {
        setToastObject({ header: "Error", content: "User Not Found" });
        console.log(toastObject);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <section className="forms-section">
      <h1 className="section-title">Welcome Back</h1>
      <div className="forms">
        <div
          className={`form-wrapper ${
            activeForm === "login" ? "is-active" : ""
          }`}
        >
          <button
            type="button"
            className="switcher switcher-login"
            onClick={() => {
              setActiveForm("login");
            }}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login">
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                  required
                />
              </div>
            </fieldset>
            <div className="d-flex justify-content-center">
              <AuthButton
                className="btn-login"
                buttonValue={"Login"}
                handleSubmit={handleSubmit}
              />
            </div>
          </form>
        </div>

        <div
          className={`form-wrapper ${
            activeForm === "signup" ? "is-active" : ""
          }`}
        >
          <button
            type="button"
            className="switcher switcher-signup"
            onClick={() => {
              console.log("clicked");
              setActiveForm("signup");
            }}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className="form form-signup">
            <fieldset>
              <legend>
                Please, enter your email, password and password confirmation for
                sign up.
              </legend>
              <div className="input-block">
                <label htmlFor="signup-username">Username</label>
                <input id="signup-username" type="text" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" required />
              </div>
            </fieldset>
            {activeForm === "signup" && (
              <div className="d-flex justify-content-center">
                <AuthButton
                  className="btn-signup"
                  buttonValue={"Sign Up"}
                  onClick={() => {
                    handleSubmit("signup");
                  }}
                />
              </div>
            )}
          </form>
          {toastObject.header && (
            <ToastMessage
              message={toastObject}
              placement="middle-center"
              onClose={() => setToastObject({ header: "", content: "" })}
            />
          )}
        </div>
      </div>
    </section>
  );
}
