import { useState } from "react";
import UserDetail from "./user.js";
// import axios from "axios";


const UserState = (props)=>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // useEffect(()=>{
    //       const fetchUser = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:4020/productr/api/auth/activeUser", {
    //       withCredentials: true
    //     });
    //     setUser(res?.data?.data || null);
    //   } catch (err) {
    //     console.log(err);
        
    //     setUser(null);
    //   }finally{
    //     setLoading(false);
    //   }
    // };

    // fetchUser();
    // },[]);


    return (
        <UserDetail.Provider value={{user,setUser,loading,setLoading}}>
            {props.children}
        </UserDetail.Provider>
    )

};

export default UserState