import React from "react";
import Header from "../../Components/Header/Header";
import "@fontsource/dm-sans";
import Footer from "../../Components/Footer/Footer";
import classes from "./RestorePage.module.css"
import Bob from "../../pictures/bob_programming.svg"

const RestorePage = (props) => {
    return(
        <div className={classes.page}>
            <Header/>
            <div className={classes.container_restore}>
            <img src={Bob} alt="aboba" className={classes.bob}/>
                <div className={classes.form_restore}>
                    <div className={classes.container_word_restore}>
                        <h1 className={classes.head_word_restore}>Восстановление пароля</h1>
                    </div>
                    <label>
                        <p>Укажите куда отправить инструкцию для<br></br>
                             восстановления пароля</p>
                        
                        <p><input name="email" type="email" placeholder="Введите ваш email" className={classes.input}/></p>
                    </label>
                    <button type="submit" className={classes.button_sent_email}>Отправить</button>
                
                </div>
            </div>
            <div className={classes.space}></div>
            <Footer/> 
        </div>
    );
};

export default RestorePage;