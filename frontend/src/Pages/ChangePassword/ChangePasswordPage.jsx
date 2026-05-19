import React from "react";
import Header from "../../Components/Header/Header";
import "@fontsource/dm-sans";
import Footer from "../../Components/Footer/Footer";
import classes from "./ChangePasswordPage.module.css"
import { Link } from "react-router-dom";
const ChangePasswordPage = (props) => {
    return(
        <div className={classes.page}>
            <Header/>
            <div className={classes.container_new_password}>
                <div className={classes.form_new_password}>
                    <div className={classes.container_word_new_password}>
                        <h1 className={classes.head_word_new_password}>Восстановление пароля</h1>
                    </div>
                    <label>
                        <p>Введите новый пароль</p>
                        <p><input name="email" type="text" placeholder="Введите новый пароль" className={classes.input}/></p>
                    </label>
                    <label>
                        <p>Повторите пароль</p>
                        <p><input name="password" type="password" placeholder="Повторно введите ваш новый пароль" className={classes.input}/></p>
                    </label>
                    <Link to="/Login" className={classes.spacer}><button type="submit" className={classes.button_new_password}>Отправить</button></Link>
                </div>
                <div className={classes.space}></div>
            </div>
            <Footer/> 
        </div>
    );
};

export default ChangePasswordPage;