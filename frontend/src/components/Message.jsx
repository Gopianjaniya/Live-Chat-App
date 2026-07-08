import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Message = ({ message }) => {
  const scroll = useRef(null);
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const isMine = message.senderId?.toString() === authUser?._id?.toString();
  const user = isMine ? authUser : selectedUser;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={scroll} className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
      <div className="chat-image">
        <Avatar user={user} size="w-10" />
      </div>
      <div className={`chat-bubble max-w-[78vw] break-words sm:max-w-md ${isMine ? "bg-sky-600 text-white" : "bg-gray-200 text-black"}`}>
        {message.message}
      </div>
    </div>
  );
};

export default Message;
