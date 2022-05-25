import React,{useState} from "react";
import AppNavBar from "./Components/AppNavBar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Logout from "./Pages/Logout";
import PageNotFound from "./Pages/PageError";
import Product from "./Pages/Product";
import ProductView from "./Pages/ProductView";
import Cart from "./Pages/Cart";


import { UserProvider } from "./UserContext";

// routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";




function App() {
  
const [user, setUser] = useState({
  accessToken : localStorage.getItem('accessToken'),
  email : localStorage.getItem("email"),
  
  isAdmin: localStorage.getItem("isAdmin")=== 'true'
});

const unsetUser = () =>{
  localStorage.clear()
}

  return (
    <UserProvider value={{user,setUser,unsetUser}}>
    <Router>
      <AppNavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/*" element={<PageNotFound/>}/>
        <Route path="/product" element={<Product/>} />
        <Route path="/product/:productId" element={<ProductView/>} />
        <Route path="/myCart" element={<Cart/>}/>
        
      </Routes>
   
     
      
     
    </Router>
    </UserProvider>
  );
}

export default App;
