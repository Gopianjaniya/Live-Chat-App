import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);

  if (!authUser) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-[88vh] w-full max-w-5xl overflow-hidden rounded-lg border border-slate-600 bg-slate-900">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
