import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "..";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          withCredentials: true,
        });
        
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, [authUser?._id, dispatch]);
};

export default useGetOtherUsers;
