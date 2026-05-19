import React from "react";
import Header from "../../Components/Header/Header";
import classes from "./MainPage.module.css"
import image from "../../pictures/PicturesMain.png"
import "@fontsource/dm-sans";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
const MainPage = (props) => {
    return (
      <div className={classes.main_page}>
        <Header/>
        <div className={classes.all_block}>
        
        <img className={classes.image}src={image} alt=""/>
          
          <div className={classes.right_block}>
            <text className={classes.shact_text}>SHACT - Searching Hacktons and Create Teams</text>
            <section className={classes.shact_text_information}>
            <text>Это проект Web-платформы, обеспечивающий парсинг Хакатонов и формирование команд для участия.</text>
            <text><span className={classes.bold}>«SHACT»</span> - реализует функционал сбора информации о Хакатонах проходящих на территории РФ с последующей возможностью создания произвольных команд для участия пользователя.</text>
            </section>
            <div className={classes.claster_buttons}>
                <Link to= "/Registration"><button className={classes.button2}>Регистрация</button></Link>
                <Link to= "/Login"><button className={classes.button1}>Вход</button></Link>
            </div>
          </div>     
        </div>
        <Footer/>
      </div>
    );
  }
  
  export default MainPage;