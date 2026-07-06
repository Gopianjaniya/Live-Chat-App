import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import Avatar from "./Avatar";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers.includes(user._id);
  const selected = selectedUser?._id === user._id;

  return (
    <>
      <button
        type="button"
        onClick={() => dispatch(setSelectedUser(user))}
        className={`${selected ? "bg-zinc-200 text-black" : "text-white"} flex w-full cursor-pointer items-center gap-3 rounded p-2 text-left hover:bg-zinc-200 hover:text-black`}
      >
        <Avatar user={user} online={isOnline} size="w-12" />
        <p className="min-w-0 flex-1 truncate">{user.fullName}</p>
      </button>
      <div className="divider my-0 h-1 py-0"></div>
    </>
  );
};

export default OtherUser;
