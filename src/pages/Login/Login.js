import React, { useState } from "react";
import InputField, { InputButton } from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { uid: username, password: password, blocked: 0 };
    try {
      const { data } = await axios.post(
        "https://myphysio.digitaldarwin.in/api/login/",
        payload
      );
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <p className="brand-heading">physioai</p>
      <p className="login-heading">Welcome Back!</p>
      <form className="m-5 pt-20" onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChangeHandler={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChangeHandler={(e) => setPassword(e.target.value)}
          required
          icon={
            showPassword ? (
              <i className="fas fa-eye"></i>
            ) : (
              <i className="fas fa-eye-slash"></i>
            )
          }
          iconClickHandler={() => setShowPassword(!showPassword)}
        />
        <p className="login-forgot mt-10">Forgot Password ?</p>
        <InputButton type="submit">Login</InputButton>
      </form>
    </div>
  );
};

export default Login;
