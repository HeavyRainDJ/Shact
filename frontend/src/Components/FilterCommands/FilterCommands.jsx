import React from "react";
import classes from "./FilterCommands.module.css"; 

const FilterCommands = ({ selectedFilters, handleFilterChange}) => {
  return (
    <div className={classes.left}>
      <h6>Фильтр</h6>
      <div className={classes.left_form}>
        <h3 className={classes.head_text}>Направление</h3>
        <div className={classes.stroke_checkbox}>
          <div className={classes.container_checkbox}>
            <input
              name="Backend"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>Backend</text>
          </div>
          <div className={classes.container_checkbox}>
            <input
              name="Frontend"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>Frontend</text>
          </div>
        </div>

        <div className={classes.stroke_checkbox}>
          <div className={classes.container_checkbox}>
            <input
              name="Mobile"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>Mobile</text>
          </div>
          <div className={classes.container_checkbox}>
            <input
              name="QA"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>QA</text>
          </div>
        </div>

        <div className={classes.stroke_checkbox}>
          <div className={classes.container_checkbox}>
            <input
              name="DevOps"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>DevOps</text>
          </div>
          <div className={classes.container_checkbox}>
            <input
              name="GameDev"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>GameDev</text>
          </div>
        </div>

        <div className={classes.stroke_checkbox}>
          <div className={classes.container_checkbox}>
            <input
              name="UX/UI"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>UX/UI</text>
          </div>
          <div className={classes.container_checkbox}>
            <input
              name="AI"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>AI</text>
          </div>
        </div>

        <div className={classes.stroke_checkbox}>
          <div className={classes.container_checkbox}>
            <input
              name="ML"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>ML</text>
          </div>
          <div className={classes.container_checkbox}>
            <input
              name="HR"
              type="checkbox"
              className={classes.checkbox}
              onChange={handleFilterChange}
            />
            <text className={classes.info_text}>HR</text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCommands;