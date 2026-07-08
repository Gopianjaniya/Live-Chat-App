import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";

const HomePage = () => {
  const { authUser, selectedUser } = useSelector((store) => store.user);

  if (!authUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-900 sm:h-[90vh] sm:max-w-5xl sm:rounded-lg sm:border sm:border-slate-600">
      <div className={`${selectedUser ? "hidden sm:flex" : "flex"} min-w-0 flex-1 sm:w-72 sm:flex-none md:w-80`}>
        <Sidebar />
      </div>
      <div className={`${selectedUser ? "flex" : "hidden sm:flex"} min-w-0 flex-1`}>
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
