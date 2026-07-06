import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BASE_URL } from ".";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { setSocket } from "./redux/socketSlice";
import { addOtherUser, setOnlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser?._id) {
      dispatch(setSocket(null));
      dispatch(setOnlineUsers([]));
      return;
    }

    const socketio = io(BASE_URL, {
      query: { userId: authUser._id },
      withCredentials: true,
    });

    dispatch(setSocket(socketio));
    socketio.on("getOnlineUsers", (onlineUsers) => dispatch(setOnlineUsers(onlineUsers)));
    socketio.on("userRegistered", (user) => dispatch(addOtherUser(user)));

    return () => {
      socketio.off("getOnlineUsers");
      socketio.off("userRegistered");
      socketio.close();
      dispatch(setSocket(null));
    };
  }, [authUser?._id, dispatch]);

  return (
    <div className="app-shell p-4 flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
