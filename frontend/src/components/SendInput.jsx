import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BASE_URL } from "..";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { selectedUser } = useSelector((store) => store.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || !selectedUser?._id || sending) return;

    setSending(true);
    setMessage("");
    try {
      await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser._id}`,
        { message: text },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
    } catch (error) {
      setMessage(text);
      toast.error(error?.response?.data?.message || "Message not sent");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="my-3 px-3 sm:px-4">
      <div className="relative w-full">
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Send a message..." className="block w-full rounded-lg border border-zinc-500 bg-gray-700 p-3 pr-12 text-base text-white outline-none focus:border-sky-400 sm:text-sm" />
        <button type="submit" disabled={sending || !message.trim()} className="absolute inset-y-0 end-0 flex items-center pr-4 text-white disabled:opacity-40">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
