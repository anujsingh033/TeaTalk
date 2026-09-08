import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import getCurrentUser from './customHooks/GetCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import getOtherUser from './customHooks/GetOtherUser'
import { io } from "socket.io-client"
import { authDataContext } from "./context/AuthContext";
import { useContext } from 'react'
import { setOnlineUser, setSocket } from './redux/user.Slice'
function App() {
  getCurrentUser();
  getOtherUser();
  let { userData, socket, onlineUser } = useSelector(state => state.user);
  let { serverUrl } = useContext(authDataContext);
  let dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      const socketIo = io(`${serverUrl}`, {
        query: {
          userId: userData?._id
        }
      });
      dispatch(setSocket(socketIo));
      socketIo.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUser(users))
      })

      return () => socketIo.close()
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null))
      }
    }
  }, [userData, serverUrl, dispatch])


  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/signin" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
    </Routes>
  )
}

export default App