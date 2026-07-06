import React from "react";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import OtherUser from "./OtherUser";

const OtherUsers = ({ users }) => {
  useGetOtherUsers();

  return (
    <div className="flex-1 overflow-auto pr-1">
      {users?.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
