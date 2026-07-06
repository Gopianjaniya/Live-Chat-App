import React from "react";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import Message from "./Message";

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);

  return (
    <div className="flex-1 overflow-auto px-4">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
