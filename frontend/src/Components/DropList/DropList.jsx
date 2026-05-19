import React, { useState } from "react";
import classes from "../DropList/DropList.module.css"
const DropList = ({handleCityChange}) => {

  return (
    <div>
      <select className={classes.list_city} onChange={handleCityChange}>
        <option value="">Выберите город</option>
        <option value="Москва">Москва</option>
        <option value="Санкт-Петербург">Санкт-Петербург</option>
        <option value="Новосибирск">Новосибирск</option>
        <option value="Воронеж">Воронеж</option>
        <option value="Красногорск">Красногорск</option>
        <option value="Зеленоград">Зеленоград</option>
        <option value="Липецк">Липецк</option>
        <option value="Орел">Орел</option>
        <option value="Крым">Крым</option>
      </select>
    </div>
  );
};

export default DropList;