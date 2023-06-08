import { NavLink } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import { toast } from "react-toastify";

import { useAuth } from "../contexts/authContext";

import "../styles/signup.css";

export const SignUp = () => {
  const { signupHandler } = useAuth();

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
    // toast.success("Signed up!");
  };

  const togglePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };  

  return (
    <div className="signup_component">
      <form onSubmit={handleUserSignUp} className="signup_page">
        <h3 className="signup_heading">Sign Up</h3>
        <label>
          Name{" "}
          <input
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
          <input
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
          className="toggle_password_btn"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={passwordIsVisible ? faEyeSlash : faEye}
            className="toggle_password_icon"
          />
        </button>

        </label>
        <label>
          Confirm Password{" "}
          <input
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
          className="toggle_password_btn"
          onClick={toggleConfirmPasswordVisibility}
        >
          <FontAwesomeIcon
            icon={confirmPasswordVisible ? faEyeSlash : faEye}
            className="toggle_password_icon"
          />
        </button>

        </label>
        {!signUpData.confirmPassword && <p> password doesn't match</p>}
        <button type="submit" className="signup_btn">
          Create new account
        </button>
        <p>
          Already have an account? <NavLink to="/login">Sign in</NavLink>{" "}
        </p>
      </form>
    </div>
  );
};
