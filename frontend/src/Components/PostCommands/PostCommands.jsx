import React, { useCallback, useState, useReducer } from "react";
import classes from "./PostCommands.module.css";
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
import Cookies from "js-cookie";

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
      </div>
      <Collapse transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`} isOpen={isOpen}>
        {children}
      </Collapse>
      <div className={classes.strelka_belka}>
        <img className={classes.glushka_encounter} src={incounter} alt="" />
        <CommandIncounter count={count} max_count={max_count} />
        <button className={classes.btn} onClick={onToggle}>
          <Down isOpen={isOpen} />
        </button>
      </div>
    </div>
  );
}

const PostCommands = ({ post , uid }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const cookie = Cookies.get("auth");
    const [posts, setPosts] = useState([]);

    const fetchRequest = useCallback(async (selectedBadges) => {
        const response = await fetch(
            "http://localhost:5045/api/Requests", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookie,
                },
                body: JSON.stringify({
                    teamId: post.Id,
                    requestText: selectedBadges,
                }),
            }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setPosts(data);
        } else {
            console.log("Пупупу- бэк сдох ");
        }
    }, [cookie, post.Id]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const handleSubmit = (selectedBadges) => {
        console.log('Selected Badges:', selectedBadges);
        fetchRequest(selectedBadges).then(() => window.location.reload());
        closeModal();
    };

    const badgesArray = post.Direction ? post.Direction.map(badge => badge.trim()) : [];

    let isCancelled = false
    post.Requests.map((req) => (!isCancelled && (req.UserId === uid && post.Id === req.TeamId ? isCancelled = true : isCancelled = false)))

    let isMine = false
    post.Members.map((member) => (!isMine && (member.Id === uid ? isMine = true : isMine = false)))
    console.log("isMine: ", isMine, post.Name, uid, post.Members)

    return (
        <Block
            title={post.Name}
            isOpen={state[0]}
            onToggle={() => dispatch({ type: "toggle", index: 0 })}
            badges={badgesArray}
            count={post.Members.length}
            max_count="4"
        >
            <div className={classes.content}>
                <div className={classes.content_left}>
                    <div className={classes.labels}> 
                        <img src={hackton} alt="hackton" />
                        <text className={classes.labels_text}>{post.Chakaton.Name}</text>
                    </div>
                    <div className={classes.labels}> 
                        <img src={lead} alt="lead" />
                        <text className={classes.labels_text}>{post.Leader.Name}</text>
                    </div>
                    <div className={classes.labels_block_information}>
                        <text className={classes.labels_information_header}>Требования:</text>
                        <text className={classes.labels_information}>{post.Requirements}</text>
                    </div>
                </div>
                <div className={classes.content_right}>
                    <div className={classes.form_lead_information}>
                        <text className={classes.lead_header}>Лидер</text>
                        <div className={classes.block_information}>
                            <div className={classes.block_left_information}>
                                <text>ФИО: {post.Leader.Name}</text>
                                <text>Должность: {post.Leader.HardSkills}</text>
                                <text>Образование: {post.Leader.Organization}</text>
                                <text>Связь: <a href={post.Leader.Links}>Telegram</a></text>
                            </div>
                        </div>
                    </div>

                    {isCancelled ?
                        <button className={classes.button_registration} style={{color: "white", backgroundColor: "red", fontSize: "14px"}}>Заявка
                            уже подана</button> :
                        (isMine ?
                            <button className={classes.button_registration} style={{color: "white", backgroundColor: "red", fontSize: "14px"}}>Вы уже в команде</button> :
                            <button className={classes.button_registration} onClick={openModal}>Подать заявку</button>)
                    }
                </div>
            </div>
            <ModalDialog
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                onSubmit={handleSubmit} 
                badges={badgesArray}
            />
        </Block>
    );
};

export default PostCommands;
