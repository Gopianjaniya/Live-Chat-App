export const getAvatarUrl = (user) => {
  const name = encodeURIComponent(user?.fullName || user?.username || "User");
  return user?.profilePhoto || `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&bold=true`;
};
