export const buildAvatarUrl = (name = "User") => {
  const safeName = encodeURIComponent(name.trim() || "User");
  return `https://ui-avatars.com/api/?name=${safeName}&background=random&color=fff&bold=true`;
};

export const withProfileFallback = (user) => {
  const plainUser = user.toObject ? user.toObject() : user;
  return {
    ...plainUser,
    profilePhoto: plainUser.profilePhoto || buildAvatarUrl(plainUser.fullName || plainUser.username),
  };
};
