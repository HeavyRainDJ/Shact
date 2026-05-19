import React, {useCallback, useEffect} from "react";
import Header from "../../Components/Header/Header";
import "@fontsource/dm-sans";
import Footer from "../../Components/Footer/Footer";
import classes from "./LoginPage.module.css"
import logo_shact_click from "../../pictures/mini_logo_shact.svg"
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = (props) => {
    const navigate = useNavigate()

    const fetchLogin = useCallback(async (email, password) => {
        const response = await fetch(
            "http://localhost:5045/login", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            }
        )
        const data = await response.json()
        if (response.ok){
            Cookies.set("auth", data.Token)
            navigate("/Cabinet")
        } else {
            console.log("Неправильный пароль или Email ")
        }
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value
        const password = event.target.password.value
        fetchLogin(email, password)
    };

    return(
        <div className={classes.page}>
            <Header/>
            <form onSubmit={handleSubmit}>
                <div className={classes.container_login}>
                    <div className={classes.form_enteres}>
                        <div className={classes.container_word_enteres}>
                            <h1 className={classes.head_word_enteres}>Войти в</h1>
                            <Link to="/Shact"><img src={logo_shact_click} alt="Logo_Mini_Shact"
                                                   className={classes.logo_shact_click}/></Link>
                        </div>
                        <label>
                            <p>Электронная почта</p>
                            <p><input name="email" type="email" placeholder="Введите ваш email"
                                      className={classes.input}/></p>
                        </label>
                        <label>
                            <p>Пароль</p>
                            <p><input name="password" type="password" placeholder="Введите ваш пароль"
                                      className={classes.input}/></p>
                        </label>
                        <Link to="/RestorePassword">
                            <text className={classes.link_restore_password}>Забыли пароль?</text>
                        </Link>
                        <button type="submit" className={classes.button_autorization}>Войти</button>
                        <text className={classes.text_to_registration}>Ещё нет аккаунта? <Link to="/Registration"
                                                                                               className={classes.link_registration}>Зарегистрируешься?</Link>
                        </text>
                        <div className={classes.space}></div>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>
);
};

export default LoginPage;