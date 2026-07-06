import React, { useState } from "react";
import { getAvatarUrl } from "../utils/avatar";

const Avatar = ({ user, online = false, size = "w-10" }) => {
  const [failed, setFailed] = useState(false);
  const name = encodeURIComponent(user?.fullName || user?.username || "User");
  const fallback = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&bold=true`;
  const src = failed ? fallback : getAvatarUrl(user);

  return (
    <div className={`avatar ${online ? "online" : ""}`}>
      <div className={`${size} rounded-full`}>
        <img src={src} alt={user?.fullName || "user profile"} onError={() => setFailed(true)} />
      </div>
    </div>
  );
};

export default Avatar;
