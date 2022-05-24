import React,{useContext,useEffect} from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
export default function Logout(){
   
  const {unsetUser,setUser} = useContext(UserContext);

  unsetUser();
  useEffect(() =>{setUser({accessToken : null,isCartEmpty: true})})
    return(
        <Navigate to= "/"/>
    )
}