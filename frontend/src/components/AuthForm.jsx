import React, { useState, useEffect } from "react";
import "./AuthForm.css";
import AuthButton from "./AuthButton";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AuthForms() {
  const [inputType, setInputType] = useState("");
  const [activeForm, setActiveForm] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    loginInput: "",
  });

  const [toastObject, setToastObject] = useState({
    header: "",
    content: "",
  });
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const validateAuthInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input)) {
      setInputType("email");
    } else {
      setInputType("username");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/feed");
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="container mt-5">
        <Skeleton height={50} width={300} />
        <Skeleton height={20} count={5} style={{ marginTop: 10 }} />
      </div>
    );
  }

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (val) => {
    try {
      let payload = {};

      if (val === "signin") {
        payload = {
          password: formData.password,
          [inputType]: formData.loginInput,
        };
      } else {
        payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/${val}`,
        payload
      );

      if (response.status === 200) {
        const token = response.data.token;
        var oneHour = 1 / 24;
        Cookies.set("token", token, {
          expires: oneHour,
          sameSite: "strict",
        });
        setTimeout(() => {
          navigate("/feed", { replace: true });
        }, 100);
      } else if (response.status === 201) {
        setToastObject({
          header: "User Successfully Created",
          content: "Please Login to Continue",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setToastObject({ header: "Error", content: "Invalid Credentials" });
      } else if (axios.isAxiosError(error) && error.response?.status === 404) {
        setToastObject({ header: "Error", content: "User Not Found" });
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
                <label htmlFor="login-email">Username or E-mail</label>
                <input
                  id="login-input"
                  type="text"
                  name="loginInput"
                  value={formData.loginInput}
                  onChange={(e) => {
                    handleFormData(e);
                    validateAuthInput(e.target.value);
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
                <input
                  id="signup-username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    handleFormData(e);
                  }}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
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
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
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
            {activeForm === "signup" && (
              <div className="d-flex justify-content-center">
                <AuthButton
                  className="btn-signup"
                  buttonValue={"Sign Up"}
                  handleSubmit={handleSubmit}
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
