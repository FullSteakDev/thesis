import React from "react";
import { NavLink } from "react-router-dom";
import "../style/loginroutes.css";

const Login = () => {
  return (
    <div className="container">
      <div className="links">
        <div className="login-box">
          <div className="left">
            <NavLink to="/loginemployee" className="link-style">
              <span>Login employee</span>
            </NavLink>
          </div>
        </div>

        <div className="login-box">
          <div className="middle">
              <NavLink to="/logincustomer" className="link-style">
                <span>Login customer</span>
              </NavLink>

              <NavLink to="/registercustomer" className="link-style">
                <span>Register customer</span>
              </NavLink>
          </div>
        </div>

        <div className="login-box">
          <div className="right">
            <NavLink to="/loginmanager" className="link-style">
              <span>Login manager</span>
            </NavLink>
          </div>
        </div>

        <div className="about">
          <NavLink to="/" className="link-style">
            <span>Back to home</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
