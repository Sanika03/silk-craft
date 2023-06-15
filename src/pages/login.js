import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../contexts/authContext";

export const Login = () => {
  const location = useLocation();

  const testUserData = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const { loginHandler, token } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    toast.success('Successfully Logged In!');
    e.preventDefault();
    loginHandler(loginData);
  };

  const togglePasswordVisibility = (e) => {
    setPasswordIsVisible(!passwordIsVisible);
    e.preventDefault()
  };

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from.pathname, { replace: true });
    }
  }, [token, location, navigate]);

  const loginPage = () => <div className="login-component">
    <form onSubmit={(e) => handleUserLogin(e)} className="login-page">
      <h3 className="login-head">Sign In</h3>
      <label>
        Email address{" "}
        <input
          className="auth-input"
          type="email"
          required
          placeholder="email"
          value={loginData?.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
      </label>
      <label>
        Password{" "}
        <div className="password-container">
          <input
            className="auth-input"
            type={passwordIsVisible ? "text" : "password"}
            required
            placeholder="password"
            value={loginData?.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={(e) => togglePasswordVisibility(e)}
          >
          <FontAwesomeIcon
            icon={passwordIsVisible ? faEye : faEyeSlash}
            className="toggle-password-icon"
          />
          </button>
        </div>
      </label>
      <button type="submit" className="login">
        Login
      </button>
      <button
        type="submit"
        className="login-as-guest"
        onClick={() => setLoginData(testUserData)}
      >
        Login as guest
      </button>
      <p>
        Don't have an account? <NavLink to="/signUp" className="signup-link">Sign up</NavLink>
      </p>
    </form>
  </div>

  return (
    <>
      {loginPage()}
    </>
  );
};
