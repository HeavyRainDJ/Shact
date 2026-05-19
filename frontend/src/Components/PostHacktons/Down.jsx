import React from "react";
import classes from "./PostHacktons.module.css";
import classNames from "classnames";

const Down = ({ isOpen }) => {
  return (
    <svg
    className={classNames(classes["icon-down"], { [classes["is-open"]]: isOpen })}
      width="28"
      height="28"
      viewBox="0 0 16 16"
    >
      <path d="M14.8 4L8 9.6 1.2 4 0 5.333 8 12l8-6.667z" />
    </svg>
  );
};

Down.defaultProps = {};

export default Down;