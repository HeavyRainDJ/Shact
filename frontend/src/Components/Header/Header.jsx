
import classes from './Header.module.css'
import logo from "../../pictures/logo_shact.png"
import "@fontsource/dm-sans";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";



const Header = (props) => {
    const [user, setUser] = useState([])
    const cookie = Cookies.get("auth")

    const fetchUser = useCallback(async () => {
        console.log("Fetching hackatons...");
        try {
          const response = await fetch("http://localhost:5045/api/Users/profile", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + cookie,
            },
          });
    
          console.log("Response received:", response);
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          console.log("Data received:", data);
    
          setUser(data);
        } catch (error) {
          console.error("Fetch error:", error.message);
        }
      }, []);
    
      useEffect(() => {
        fetchUser();
      }, [fetchUser]);


    return (
        <header className={classes.head}>
            <div className={classes.left_header}>
                <Link to = "/Shact"> <img className={classes.image}src={logo} alt=""/></Link>
            </div>
            <div className={classes.right_header} >
                { !cookie && (<>
                    <Link to = "/Hacktons"className={classes.links}>Хакатоны</Link>
                    <Link to= "/Login"><button className={classes.button1}>Вход</button></Link>
                    <Link to= "/Registration"><button className={classes.button2}>Регистрация</button></Link>
                </>)}
                { cookie && (<>
                    <Link to = "/Hacktons"className={classes.links}>Хакатоны</Link>
                    <Link to = "/Commands"className={classes.links}>Поиск команд</Link>
                    <Link to= "/Cabinet">
                        <button className={classes.profile}>
                            {user.Name}
                        </button>
                    </Link>
                </>)}
            </div>
        </header>

    );
};

export default Header