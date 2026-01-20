import { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { connectSocket } from './features/socket/socketSlice';
import { registerSocketListeners } from './features/socket/socketListeners';
import AppRoutes from "./routes/AppRoutes";



function App() {
  const dispatch = useDispatch();
  const {token,isAuthenticated} = useSelector((state)=>state.auth);

//   useEffect(() => {
//   if (isAuthenticated && token) {
//     dispatch(connectSocket(token));
//     registerSocketListeners(dispatch);
//   }
// }, [dispatch, isAuthenticated, token]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>

  )
}

export default App
