import React, { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "..";
import { setAllMessages } from "../redux/messageSlice";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";
import OtherUsers from "./OtherUsers";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { authUser, otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return otherUsers;
    return otherUsers.filter((user) => user.fullName.toLowerCase().includes(value));
  }, [otherUsers, search]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`, { withCredentials: true });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setAuthUser(null));
      dispatch(setAllMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
      navigate("/login");
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (search.trim() && filteredUsers.length === 0) {
      toast.error("User not found!");
    }
  };

  return (
    <div className="flex w-80 flex-col border-r border-slate-600 p-4">
      <div className="mb-4 flex items-center gap-3 text-white">
        <Avatar user={authUser} size="w-12" />
        <div className="min-w-0">
          <p className="truncate font-semibold">{authUser?.fullName}</p>
          <p className="truncate text-sm text-slate-300">@{authUser?.username}</p>
        </div>
      </div>
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered h-10 flex-1 rounded-md text-black" type="text" placeholder="Search..." />
        <button type="submit" className="btn h-10 min-h-10 bg-zinc-700 text-white">
          <BiSearchAlt2 className="h-6 w-6" />
        </button>
      </form>
      <div className="divider my-2"></div>
      <OtherUsers users={filteredUsers} />
      <button onClick={logoutHandler} className="btn btn-sm mt-3">Logout</button>
    </div>
  );
};

export default Sidebar;
