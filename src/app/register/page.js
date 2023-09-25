"use client";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = async () => {
    try {
      const newUser = { name: username, email, password, confirmPassword };
      const result = await axios.post("/api/signup", newUser);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserName = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className=" h-screen bg-slate-200">
      <div className="mx-auto flex w-[320px] flex-col bg-white p-[20px]">
        <form>
          <fieldset className="my-5 flex flex-col items-center gap-4">
            <p className="w-full">
              {/* <label for="user_input">Username</label> */}
              <input
                value={username}
                onChange={handleUserName}
                className="w-full  rounded-sm border border-opacity-100 px-2 py-1.5"
                type="text"
                name="email"
                id="user_input"
                placeholder="Username"
              />
            </p>
            <p className="w-full">
              {/* <label for="email_input">Email</label> */}
              <input
                value={email}
                onChange={handleEmail}
                className="w-full  rounded-sm border border-opacity-100 px-2 py-1.5 "
                type="text"
                name="email"
                id="email_input"
                placeholder="E-mail address"
              />
            </p>
            <p className="w-full">
              {/* <label for="password_input">Password</label> */}
              <input
                value={password}
                onChange={handlePassword}
                className="w-full  rounded-sm border border-opacity-100 px-2 py-1.5 "
                type="password"
                name="password"
                id="password_input"
                placeholder="Password"
              />
            </p>
            <p className="w-full">
              {/* <label for="confirmpassword_input">Confirm Password</label> */}
              <input
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="w-full  rounded-sm border border-opacity-100 px-2 py-1.5 "
                type="password"
                name="password"
                id="confirmpassword_input"
                placeholder="Confirm Password"
              />
            </p>
          </fieldset>
        </form>
        <button
          className="rounded bg-slate-400 px-3 py-2"
          onClick={handleClick}
          type="submit"
          value="submit"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
