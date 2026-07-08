import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASE_URL } from "..";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch(setAuthUser(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-sm px-3 sm:px-0">
      <div className="rounded-lg border border-slate-600 bg-slate-800/80 p-5 text-white shadow-md sm:p-6">
        <h1 className="text-center text-2xl font-bold sm:text-3xl">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <label className="label p-2">
            <span className="label-text text-white">Username</span>
          </label>
          <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="input input-bordered h-10 w-full text-base text-black sm:text-sm" type="text" placeholder="Username" />
          <label className="label p-2">
            <span className="label-text text-white">Password</span>
          </label>
          <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input input-bordered h-10 w-full text-base text-black sm:text-sm" type="password" placeholder="Password" />
          <p className="my-3 text-center">
            Don't have an account? <Link className="text-sky-300" to="/signup">signup</Link>
          </p>
          <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
