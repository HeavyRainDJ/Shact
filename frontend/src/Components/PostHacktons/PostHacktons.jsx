import React from "react";
import classes from './PostHacktons.module.css';
import "@fontsource/dm-sans";
import { Collapse } from "@kunukn/react-collapse";
import Down from "./Down";
import freePlacement from "../../pictures/empty-wallet.svg"; // New image for free placement
import paidPlacement from "../../pictures/payd.svg"; // New image for paid placement
import Badges from "../Badges/Badges";
import onlineStatus from "../../pictures/online.svg"; // Image for online status
import offlineStatus from "../../pictures/offline.svg"; // New image for offline status
import placement from "../../pictures/placement.svg";

const initialState = [false, false, false];
function reducer(state, { type, index }) {
  switch (type) {
    case "toggle":
      let newState = [...state];
      newState[index] = !newState[index];
      return newState;
    default:
      throw new Error("reducer configuration");
  }
}

function Block({ isOpen, title, onToggle, children, duration = '1000ms', date, badges }) {
  return (
    <div className={classes.block}>
        <div className={classes.block_content}>
            <div className={classes.block_left}>
                <span>{title}</span>
                <div className={classes.string_bages}>
                    <span className={classes.dates}>{date}</span>
                    <Badges badges={badges} />
                </div>
            </div>
            <div className={classes.strelka_belka}>
                <button className={classes.btn} onClick={onToggle}>
                    <Down isOpen={isOpen} />
                </button>
            </div>
        </div>
        <Collapse transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`} 
            isOpen={isOpen}>{children}
        </Collapse>
    </div>
  );
}

const PostHacktons = ({ post }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const getTypeImage = (type) => {
        switch(type) {
            case "Бесплатный":
                return freePlacement;
            case "Платный":
                return paidPlacement;
            default:
                return freePlacement;
        }
    };

    const getStatusImage = (status) => {
        switch(status) {
            case "Онлайн":
                return onlineStatus;
            case "Оффлайн":
                return offlineStatus;
            default:
                return null;
        }
    };

    const badgesArray = post.Direction.map(badge => badge.trim());


    return (
        <Block
            title={post.Name}
            isOpen={state[0]}
            onToggle={() => dispatch({ type: "toggle", index: 0 })}
            date={post.Dates}
            badges={badgesArray} // Use the array instead of the string
        >
            <div className={classes.content}>
                <div className={classes.labels}> 
                    <img src={placement} alt="placement" />
                    <span className={classes.labels_text}>{post.Location}</span>
                    <img src={getTypeImage(post.Type)} alt="placement" />
                    <span className={classes.labels_text}>{post.Type}</span>
                    <img src={getStatusImage(post.Type)} alt="status" />
                    <span className={classes.labels_text}>{post.Status}</span>
                </div>
                <div className={classes.labels_block_information}>
                    <span className={classes.labels_information_header}>Описание:</span>
                    <span className={classes.labels_information}>{post.Info}</span>
                </div>
                <button className={classes.button_registration}>
                    <a href={post.Links} className={classes.a_link}>Зарегистрироваться</a>
                </button>
            </div>
        </Block>
    );
};

export default PostHacktons;
