import React from "react"
import {useLocation, useNavigate} from 'react-router-dom';
import Navigationbar from "./Navbar";

function Home (){
    const user = JSON.parse(window.localStorage.getItem("user"));

    return (
        <div className="homepage">
            <Navigationbar></Navigationbar>
            <h1>Order Tracking App</h1>
            {
                user?<h2>Welcome {user.name}</h2>:<></>
            }
            

        </div>
    )
}

export default Home