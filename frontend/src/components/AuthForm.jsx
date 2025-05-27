import React, { useState } from "react";
import "./AuthForm.css"; // Assuming CSS is in this file
import AuthButton from "./AuthButton";

export default function AuthForms() {
  const [activeForm, setActiveForm] = useState("login");

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
            onClick={() => setActiveForm("login")}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login">
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" required />
              </div>
            </fieldset>
            <div className="d-flex justify-content-center">
              <AuthButton className="btn-login" buttonValue={"Login"} />
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
            onClick={() => setActiveForm("signup")}
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
                <AuthButton className="btn-signup" buttonValue={"Sign Up"} />
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
