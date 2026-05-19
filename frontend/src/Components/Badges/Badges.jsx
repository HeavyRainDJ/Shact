import React from "react";
import classes from './Badges.module.css';
import "@fontsource/dm-sans";
import '@fontsource-variable/jetbrains-mono';

const Badges = (props) => {
    return (
        <div className={classes.badge}>
            {props.badges.map((badge, index) => (
                <div 
                    key={index} 
                    className={`${classes.badges} ${index === 0 ? classes.firstBadge : ''}`}
                >
                    <span className={classes.badges_text}>{badge}</span>
                </div>
            ))}
        </div>
    );
};

export default Badges;
