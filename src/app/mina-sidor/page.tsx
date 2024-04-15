'use client'
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const MyPages = () => {
const {isAuthenticated}: any = useContext(AuthContext);
const isLoggedin = isAuthenticated();
if(!isLoggedin)
    return;


return(<div className="flex flex-col lg:w-1/2 items-center justify-center mx-auto">
<div className="flex flex-col">

</div>

</div>)
}
export default MyPages;