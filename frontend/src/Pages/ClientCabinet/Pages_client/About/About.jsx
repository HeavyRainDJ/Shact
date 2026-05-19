import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";

import classes from './About.module.css';



const About = () => {
  const [dob, setDob] = useState('1.01.1990');
  const [city, setCity] = useState('Москва');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [about, setAbout] = useState(['Системный аналитик', 'Старший аналитик']);
  const [education, setEducation] = useState(['МГТУ им. Н.Э. Баумана', 'РТУ МИРЭА']);


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
    <form className={classes.form}>
      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="fio">ФИО</label>
        <div className={classes.input}> {user.Name}</div>
      </div>
      <div className={`${classes.formGroup} ${classes.inputHalf}`}>
        <label className={classes.label} htmlFor="dob">Электронная почта</label>
        <div className={classes.input}> {user.Email}</div>
      </div>
      {/*<div className={classes.formGroup}>*/}
      {/*  <label className={classes.label} htmlFor="city">Город</label>*/}
      {/*  <div className={classes.input}> {user.City}</div>*/}
      {/*</div>*/}
      <div className={classes.formGroup}>
        <label className={classes.label} htmlFor="email">Контакты</label>
        <div className={classes.input}> {user.Links}</div>
      </div>
      <div className={classes.formGroup}>
        <label className={classes.label}>О себе</label>
        <div className={classes.input}> {user.HardSkills}</div>
      </div>
      <div className={classes.formGroup}>
        <label className={classes.label}>Образование</label>
        <div className={classes.input}> {user.Organization}</div>
      </div>
    </form>
  );
};

export default About;