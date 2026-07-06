import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "..";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-slate-600 bg-slate-800/80 p-6 text-white shadow-md">
        <h1 className="text-center text-3xl font-bold">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <label className="label p-2"><span className="label-text text-white">Full Name</span></label>
          <input value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className="input input-bordered h-10 w-full text-black" type="text" placeholder="Full Name" />
          <label className="label p-2"><span className="label-text text-white">Username</span></label>
          <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="input input-bordered h-10 w-full text-black" type="text" placeholder="Username" />
          <label className="label p-2"><span className="label-text text-white">Password</span></label>
          <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input input-bordered h-10 w-full text-black" type="password" placeholder="Password" />
          <label className="label p-2"><span className="label-text text-white">Confirm Password</span></label>
          <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className="input input-bordered h-10 w-full text-black" type="password" placeholder="Confirm Password" />
          <div className="my-4 flex items-center gap-5">
            <label className="flex items-center gap-2"><input type="radio" name="gender" checked={user.gender === "male"} onChange={() => setUser({ ...user, gender: "male" })} className="radio radio-sm" /> Male</label>
            <label className="flex items-center gap-2"><input type="radio" name="gender" checked={user.gender === "female"} onChange={() => setUser({ ...user, gender: "female" })} className="radio radio-sm" /> Female</label>
          </div>
          <p className="my-3 text-center">Already have an account? <Link className="text-sky-300" to="/login">login</Link></p>
          <button type="submit" className="btn btn-block btn-sm mt-2 border border-slate-700">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
