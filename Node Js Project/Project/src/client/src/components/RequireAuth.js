import { Navigate } from "react-router-dom";
export const RequireAuth=({children})=>{
    const user = JSON.parse(window.localStorage.getItem("user"));

    if(!user){
        return <Navigate to ='/login'/>
    }

    return children
}