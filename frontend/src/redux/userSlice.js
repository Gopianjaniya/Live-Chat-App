import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],
    selectedUser: null,
    onlineUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload || [];
    },
    addOtherUser: (state, action) => {
      const user = action.payload;
      if (!user?._id || user._id === state.authUser?._id) return;

      const alreadyExists = state.otherUsers.some((existingUser) => existingUser._id === user._id);
      if (!alreadyExists) {
        state.otherUsers.unshift(user);
      }
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload || [];
    },
  },
});

export const { addOtherUser, setAuthUser, setOtherUsers, setOnlineUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
