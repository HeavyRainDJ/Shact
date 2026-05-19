import React, { useState } from 'react';
import classes from './CommandIncounter.module.css';
import incounter from "../../pictures/abes.svg";

const CommandIncounter = (props) => {
    return(
        <div className={classes.counter}>
            <span className={classes.top_count}>{props.count}</span>
            <div className={classes.palka}></div>
            <span className={classes.bottom_count}>{props.max_count}</span>
        </div>
    );
};

export default CommandIncounter;