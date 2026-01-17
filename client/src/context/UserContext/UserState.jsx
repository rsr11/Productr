import { useEffect, useState } from "react";
import UserDetail from "./user.js";
import axios from "axios";


const UserState = (props)=>{

    const [user, setUser] = useState(false);
    
    useEffect(()=>{
          const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4020/productr/api/auth/activeUser", {
          withCredentials: true
        });
        setUser(res?.data);
      } catch (err) {
        console.log(err);
        
        setUser(false);
      }
    };

    fetchUser();
    },[]);


    return (
        <UserDetail.Provider value={{user,setUser}}>
            {props.children}
        </UserDetail.Provider>
    )

};

export default UserState