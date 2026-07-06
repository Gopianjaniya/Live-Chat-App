import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "..";
import { setAllMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) {
      dispatch(setAllMessages([]));
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`, {
          withCredentials: true,
        });
        dispatch(setAllMessages(res.data));
      } catch (error) {
        console.log(error);
        dispatch(setAllMessages([]));
      }
    };

    fetchMessages();
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
