import React, { useState } from "react";
import classes from "./MyCommand.module.css";
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
import Requesting from "../Requesting/Requesting";


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

function Block({ isOpen, title, onToggle, children, duration = '1000ms', badges, count, max_count }) {

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
          <div className={classes.strelka_belka}>
            <button className={classes.btn} onClick={onToggle}>
              <Down isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>
      <Collapse transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`} isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
}

const MyCommand = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleSubmit = (selectedBadges) => {
    console.log('Selected Badges:', selectedBadges);
    closeModal();
  };

  return (
    <Block
      title={props.post.Name}
      isOpen={state[0]}
      onToggle={() => dispatch({ type: "toggle", index: 0 })}
      badges={props.post.Direction}
      count={props.post.count}
      max_count={props.post.max_count}
      status={props.post.status}
    >
      <div className={classes.content}>
        <div className={classes.content_left}>
          <div className={classes.labels}> 
            <img src={hackton} alt="hackton" />
            <span className={classes.labels_text}>{props.post.Chakaton.Name}</span>
          </div>
          <div className={classes.labels_block_information}>
            <text className={classes.labels_information_header}>Заявки</text>
            {props.post.Direction.map((badge, index) => (
              <div key={index} className={classes.form_request}>
                <text className={classes.title_request_team}>{badge}</text>
                {props.post.Requests.map((request) => (
                    (request.RequestText === badge && request.Status === "На рассмотрении" ?
                        <Requesting
                            id={request.Id}
                            name={request.Candidate.Name}
                            education={request.Candidate.Organization}
                            position={request.Candidate.HardSkills}
                            link={request.Candidate.Links}
                        /> : "")
                ))}
                {console.log(props.post)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalDialog 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        onSubmit={handleSubmit} 
        badges={props.post.badges_type}
      />
    </Block>
  );
};

export default MyCommand;