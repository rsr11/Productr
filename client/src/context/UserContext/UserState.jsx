import { useState } from "react";
import UserDetail from "./user.js";
// import axios from "axios";


const UserState = (props)=>{

    console.log("user context is loaded!!");
    

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    return (
        <UserDetail.Provider value={{user,setUser,loading,setLoading}}>
            {props.children}
        </UserDetail.Provider>
    )

};

export default UserState