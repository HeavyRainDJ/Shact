import React, {useCallback} from "react";
import Header from "../../Components/Header/Header";
import classes from "./RegistrationPage.module.css"
import image from "../../pictures/PicturesMain.png"
import "@fontsource/dm-sans";
import Footer from "../../Components/Footer/Footer";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const RegistrationPage  = (props) => {

    const navigate = useNavigate()

    const fetchRegistration = useCallback(async (name, email, password, organization, hardSkills, links) => {
        const response = await fetch(
            "http://localhost:5045/register", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    organization: organization,
                    hardSkills: hardSkills,
                    links: links
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
        const name = event.target.FIO.value
        const email = event.target.email.value
        const password = event.target.password.value
        const organization = event.target.organization.value
        const hardSkills = event.target.doljok.value
        const links = event.target.links.value
        fetchRegistration(name, email, password, organization, hardSkills, links)
    };

    return(
        <div className={classes.page}>
            <Header/>
            <div className={classes.container_registration}>
                <div className={classes.form}>
                    <h1 className={classes.head_word}>Регистрация</h1>
                    <form onSubmit={handleSubmit} className={classes.wrapper_inputs}>
                        <label>
                            <p>ФИО</p>
                            <p><input name="FIO" type="text" placeholder="Иванов Иван Иванович"
                                      className={classes.input}/></p>
                        </label>
                        <label>
                            <p>Электронная почта</p>
                            <p><input name="email" type="email" placeholder="example@email.com"
                                      className={classes.input}/></p>
                        </label>
                        <label>
                            <p>Пароль</p>
                            <p><input name="password" type="password" placeholder="qwerty12345"
                                      className={classes.input}/></p>
                        </label>
                        <label>
                            <p>Организация/Образовательное учреждение </p>
                            <p><input name="organization" type="text"
                                      placeholder="Название учебного заведения или организации"
                                      className={classes.input}/></p>
                        </label>
                        <label>
                            <p>Должность</p>
                            <p><input name="doljok" type="text" placeholder="Студент, Backend-разработчик С# и т.д."
                                      className={classes.input}/></p>
                        </label>
                        <label>
                            <p>Telegram</p>
                            <p><input name="links" type="text" placeholder="Телеграм ссылка"
                                      className={classes.input}/></p>
                        </label>
                        <div className={classes.container_checkbox}>
                            <input name="confedencial" type="checkbox" className={classes.checkbox}/>
                            <text className={classes.info_text}>Нажимая на кнопку, вы даёте свое согласие на обработку
                                персональных данных и соглашаетесь с условиями <a
                                    href="https://docs.google.com/document/d/1-skOaJUURSSn5Htgkus1M9tqbjp6YfnEm-Gik2e5__E/edit?usp=sharing" className={classes.rules_link}>политики
                                    конфиденциальности</a>.
                            </text>
                        </div>
                        <div className={classes.container_checkbox}>
                            <input name="rules" type="checkbox" className={classes.checkbox}/>
                            <text className={classes.info_text}>Я ознакомился с <a
                                href="https://docs.google.com/document/d/14E3o72bvpLOKr_hiJuSxjlaHhPmJAZr6ZHC-yGPI7N4/edit?usp=sharing"
                                className={classes.rules_link}>правилами</a> Web-платформы SHACT
                                и согласен с ними
                            </text>
                        </div>
                        <button type="submit" className={classes.button_sent}>Зарегистрироваться</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};


export default RegistrationPage;