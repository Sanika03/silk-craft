import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../contexts/authContext";

import "../styles/signup.css";

export const SignUp = () => {
  const { signupHandler, token } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: true,
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleUserSignUp = (event) => {
    event.preventDefault();
    signupHandler(signUpData);
    toast.success("Successfully Signed up!");
  };

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordIsVisible(!passwordIsVisible);
  };
  
  const toggleConfirmPasswordVisibility = (event) => {
    event.preventDefault();
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };  

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from.pathname || '/', { replace: true });
    }
  }, [token, location, navigate]);

  return (
    <div className="signup-component">
      <form onSubmit={handleUserSignUp} className="signup-page">
        <h3 className="signup-heading">Sign Up</h3>
        <label>
          Name{" "}
          <input
            className="auth-input"
            type="text"
            required
            placeholder="name"
            value={signUpData?.name}
            onChange={(e) =>
              setSignUpData({ ...signUpData, name: e.target.value })
            }
          />
        </label>
        <label>
          Email address{" "}
          <input
            className="auth-input"
            required
            type="email"
            placeholder="email"
            value={signUpData?.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
        </label>
        <label>
          Password{" "}
          <div className="password-container">
            <input
              className="auth-input"
              required
              type={passwordIsVisible ? "text" : "password"}
              placeholder="password"
              value={signUpData?.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={(event) => togglePasswordVisibility(event)}
            >
              <FontAwesomeIcon
                icon={passwordIsVisible ? faEye : faEyeSlash}
                className="toggle-password-icon"
              />
            </button>
          </div>
        </label>
        <label>
          Confirm Password{" "}
          <div className="confirm-password-container">
            <input
              className="auth-input"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="confirm password"
              required
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: signUpData.password === e.target.value ? true : false,
                })
              }
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={(event) => toggleConfirmPasswordVisibility(event)}
            >
            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEye : faEyeSlash}
              className="toggle-password-icon"
            />
            </button>
          </div>
        </label>
        {!signUpData.confirmPassword && <p className="alert-message">Passwords don't match</p>}
        <button type="submit" className="signup-btn">
          Create new account
        </button>
        <p>
          Already have an account? <NavLink to="/login" className="signin-link">Sign in</NavLink>{" "}
        </p>
      </form>
    </div>
  );
};
