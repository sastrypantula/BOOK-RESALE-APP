import {Routes, Route ,Navigate} from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import MyBooks from "./pages/MyBooks";
import AdminDashboard from "./pages/AdminDashBoard.jsx";
import SellBook from "./pages/SellBook";
import UpdateBook from "./pages/UpdateBook";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authslice";
import { useEffect } from "react";
import BookDetails from "./pages/BookDetails.jsx";

function App(){
  
  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
  <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
      <Route path="/admin" element={isAuthenticated && user?.role==="seller"?<AdminDashboard/>:<Navigate to="/" />}></Route>
      <Route path="/admin/sell" element={isAuthenticated && user?.role==="seller"?<SellBook/>:<Navigate to="/" />}></Route>
      <Route path="/admin/mybooks" element={isAuthenticated && user?.role==="seller"?<MyBooks/>:<Navigate to="/" />}></Route>
      <Route path="/admin/update/:id" element={isAuthenticated && user?.role==="seller"?<UpdateBook/>:<Navigate to="/" />}></Route>
      <Route path="/book/:id" element={isAuthenticated ?<BookDetails/>:<Navigate to="/"/>}></Route>
    </Routes>
  </>
  )
}

export default App;
