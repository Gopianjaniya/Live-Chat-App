import React from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import Messages from "./Messages";
import SendInput from "./SendInput";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = selectedUser?._id && onlineUsers.includes(selectedUser._id);

  if (!selectedUser) {
    return (
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="text-3xl font-bold">Hi, {authUser?.fullName}</h1>
        <p className="mt-2 text-slate-300">Select a conversation to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="mb-2 flex items-center gap-3 bg-zinc-800 px-4 py-3 text-white">
        <Avatar user={selectedUser} online={isOnline} size="w-12" />
        <p className="truncate font-semibold">{selectedUser.fullName}</p>
      </div>
      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;
