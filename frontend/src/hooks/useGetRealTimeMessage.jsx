import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const socket = useSelector((store) => store.socket.socket);
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !authUser?._id || !selectedUser?._id) return;

    const handler = (newMessage) => {
      const senderId = newMessage?.senderId?.toString();
      const receiverId = newMessage?.receiverId?.toString();
      const authId = authUser._id.toString();
      const selectedId = selectedUser._id.toString();
      const belongsToOpenChat =
        (senderId === selectedId && receiverId === authId) ||
        (senderId === authId && receiverId === selectedId);

      if (belongsToOpenChat) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handler);
    return () => socket.off("newMessage", handler);
  }, [socket, authUser?._id, selectedUser?._id, dispatch]);
};

export default useGetRealTimeMessage;
