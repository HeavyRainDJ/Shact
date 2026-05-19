import React from "react";
import classes from './Footer.module.css';
import "@fontsource/dm-sans";
import logo from "../../pictures/logo_shact.png"
import Bauman_logo from "../../pictures/Bauman_logo.png"
import { Link } from "react-router-dom";
const Footer = (props) =>{
    return (
        <footer className= {classes.footer}>      
            <div className = {classes.container_footer}>
                <div className={classes.left_container}>
                    <img className={classes.image}src={logo} alt=""/>
                    <img className={classes.Bauman_logo}src={Bauman_logo} alt=""/>
                </div>
                <div className={classes.right_container}>
                    
                    <div>
                        <h4>О проекте</h4>
                        <ul className= {classes.list}>
                            <li>Платформа SHACT - это нечто большее чем агрегатор Хакатонов, это целая возможность найти себе команду по интересам. Обозначив конкретные требования, создавая тем самым свое окружение людей с которыми весело и приятно будет участвовать в Хакатонах.</li>
                        </ul>
                    </div>
                    <div className={classes.info}>
                        <div>
                            <h4>Информация</h4>
                            <ul className= {classes.list_1}>
                                <li><a href="">О проекте</a></li>
                                <li><Link to= "/Hacktons">Хакатоны</Link></li> 
                                <li><a href="">Контакты</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4>Социальные сети</h4>
                            <ul className= {classes.list_2}>
                                <li><a href="https://vk.com/samuraiyourlovest">VKONTAKTE</a></li>
                                <li><a href="https://t.me/temy4_tema">Telegram</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4>Адрес</h4>
                            <ul className= {classes.list_3}>
                                <li>105005, Москва, 2-я Бауманская ул., д. 5, стр. 1</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Контакты</h4>
                            <ul className= {classes.list_4}>
                                <li>8 (800) 555-35-35</li>
                                <li>shact.project@bmstu.ru</li>
                            </ul>
                        </div>
                        

                    </div>

                </div>
            </div>
            <div className={classes.copy}>2024. Все права защищены</div>
        </footer>

    );
};

export default Footer