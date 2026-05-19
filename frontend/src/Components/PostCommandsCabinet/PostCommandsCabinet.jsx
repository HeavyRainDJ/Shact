import React, { useState } from "react";
import classes from "./PostCommandsCabinet.module.css";
import "@fontsource/dm-sans";
import { Collapse } from "@kunukn/react-collapse";
import Down from "../PostHacktons/Down";
import Badges from "../Badges/Badges";
import ModalDialog from "../ModalDialog/ModalDialog";
import hackton from "../../pictures/Compass_alt_fill.svg";
import lead from "../../pictures/Flag_finish.svg";
import abob from "../../pictures/_CXvWtgiipw.jpg";
import incounter from "../../pictures/abes.svg";
import CommandIncounter from "../CommandIncounter/CommandIncounter";

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

function Block({ isOpen, title, onToggle, children, duration = '1000ms', badges, count, max_count, status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "одобрено":
        return "green";
      case "отклонено":
        return "red";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className={classes.block}>
      <div className={classes.block_content}>
        <div>
          <img className={classes.logo_commands} src={abob} alt="" />
        </div>
        <div className={classes.block_left}>
          <span>{title}</span>
          <div className={classes.string_bages}>
            <Badges badges={badges} />
          </div>
        </div>
        <div className={classes.flex_container}>
          <div className={classes.status_bar} style={{ backgroundColor: getStatusColor(status) }}>
            <span className={classes.status_text}>{status}</span>
          </div>
        </div>
      </div>
      <Collapse transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`} isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
}

const PostCommandsCabinet = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleSubmit = (selectedBadges) => {
    console.log('Selected Badges:', selectedBadges);
    closeModal();
  };

  const badgesArray = props.post.RequestText.map(badge => badge.trim());

  return (
    <Block
      title={props.post.Team.Name}
      isOpen={state[0]}
      onToggle={() => dispatch({ type: "toggle", index: 0 })}
      badges={badgesArray}
      count={props.post.count}
      max_count={props.post.max_count}
      status={props.post.Status}
    >
      <div className={classes.content}>
        <div className={classes.content_left}>
          <div className={classes.labels}> 
            <img src={hackton} alt="hackton" />
            <span className={classes.labels_text}>{"234"}</span>
          </div>
          <div className={classes.labels}> 
            <img src={lead} alt="lead" />
            <span className={classes.labels_text}>{"123"}</span>
          </div>
          <div className={classes.labels_block_information}>
            <span className={classes.labels_information_header}>Требования:</span>
            <span className={classes.labels_information}>{props.post.information}</span>
          </div>
        </div>
        <div className={classes.content_right}>
          <div className={classes.form_lead_information}>
            <span className={classes.lead_header}>Лидер</span>
            <div className={classes.block_information}>
              <div className={classes.block_left_information}>
                <text>ФИО: {props.post.lead}</text>
                <text>Должность: {props.post.command}</text>
                <text>Образование: {props.post.education}</text>
                <text>Связь: <a href={props.post.link}>Telegram</a></text>
              </div>
            </div>
          </div>
          <button className={classes.button_registration} onClick={openModal}>Подать заявку</button>
        </div>
      </div>
    </Block>
  );
};

export default PostCommandsCabinet;