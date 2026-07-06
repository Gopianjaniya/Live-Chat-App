import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      if (!action.payload?._id) return;
      const exists = state.messages.some((message) => message._id === action.payload._id);
      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    setAllMessages: (state, action) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { addMessage, setAllMessages } = messageSlice.actions;
export default messageSlice.reducer;
