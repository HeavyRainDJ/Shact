import React, {useCallback, useEffect, useState} from "react";
import classes from "./Commands.module.css";
import "@fontsource/dm-sans";
import PostCommandsCabinet from "../../../../Components/PostCommandsCabinet/PostCommandsCabinet";
import MyCommand from "../../../../Components/MyCommand/MyCommand";
import { useDropzone } from 'react-dropzone';
import Cookies from "js-cookie";


const Commands = (props) => {
    const cookie = Cookies.get("auth")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [teams, setTeams] = useState([]);

    const fetchRequests = useCallback(async (selectedBadges) => {
        const response = await fetch(
            "http://localhost:5045/api/Requests", {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookie,
                }
            }
        )
        const data = await response.json()
        if (response.ok){
            setPosts(data)
        } else {
            console.log("Неправильный пароль или Email ")
        }
        console.log(data)


        const response2 = await fetch("http://localhost:5045/api/Chakatons/All", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data2 = await response2.json();
        console.log("Fetched data:", data2);
        setCategories(data2);

        const response3 = await fetch("http://localhost:5045/api/Teams/jwt", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + cookie,
            },
        });

        const data3 = await response3.json();
        console.log("Fetched data:", data3);
        setTeams(data3);

        setLoading(false)
    }, [setPosts, setLoading, setCategories, setTeams])

    useEffect(() => {
        fetchRequests()
    }, [fetchRequests])

    const [showPopup, setShowPopup] = useState(false);
    const [newTeam, setNewTeam] = useState({
        name: "",
        badges: [],
        hackathon: "",
        leader: "",
        requirements: "",
        position: "",
        education: "",
        contact: "",
        slots: "",
        photo: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
    };

    const handleBadgeChange = (badge) => {
        setNewTeam((prevTeam) => {
            if (prevTeam.badges.includes(badge)) {
                return { ...prevTeam, badges: prevTeam.badges.filter((b) => b !== badge) };
            } else {
                return { ...prevTeam, badges: [...prevTeam.badges, badge] };
            }
        });
    };

    const handlePhotoChange = (acceptedFiles) => {
        setNewTeam((prevTeam) => ({ ...prevTeam, photo: acceptedFiles[0] }));
    };

    const fetchTeam = useCallback(async (name, badges, requirements, hackathon) => {
        const response = await fetch(
            "http://localhost:5045/api/Teams", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookie,
                },
                body: JSON.stringify({
                    name: name,
                    direction: badges,
                    requirements: requirements,
                    chakatonId: hackathon,
                })
            }
        )
        const data = await response.json()
        console.log(data)
    }, [setPosts, setLoading, setCategories])

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkbox = newTeam.badges
        const name = e.target.name.value
        const hackathon = e.target.hackathon.value
        const requirements = e.target.requirements.value

        console.log(checkbox,hackathon,requirements)

        fetchTeam(name, checkbox, requirements, hackathon)

        // const newPost = {
        //     id: teams.length + 1,
        //     title: newTeam.name,
        //     lead: newTeam.leader,
        //     badges_type: newTeam.badges,
        //     hackton: newTeam.hackathon,
        //     link: newTeam.contact,
        //     command: newTeam.position,
        //     education: newTeam.education,
        //     information: newTeam.requirements,
        //     photo: newTeam.photo
        // };
        // setTeams([...teams, newPost]);
        setShowPopup(false);
        window.location.reload();
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handlePhotoChange,
        accept: 'image/*'
    });

    return (
        <div className={classes.form}>
            <text className={classes.text_on_commands}>Мои заявки</text>
            <div className={classes.form_for_post}>
                {(loading ? "Загрузка" : posts.map((post) => (
                    <PostCommandsCabinet post={post} key={post.id} />
                )))}
            </div>
            <text className={classes.text_on_commands}>Мои команды</text>
            <div className={classes.form_for_post}>
                {(loading ? "Загрузка" : teams.map((team) => (
                    <MyCommand post={team} key={team.id} />
                )))}
            </div>
            <div className={classes.create_team_button_wrapper}>
                <button 
                    className={classes.create_team_button} 
                    onClick={() => setShowPopup(true)}
                >
                    Создать команду
                </button>
            </div>
            {showPopup && (
                <div className={classes.popup}>
                    <div className={classes.popup_inner}>
                        <h2 className={classes.zagolovoka}>Создать команды</h2>
                        <form className={classes.form_b} onSubmit={handleSubmit}>
                            <label className={classes.label}>
                                Название команды:
                                <input id="name" type="text" name="name" value={newTeam.name} onChange={handleInputChange} className={classes.input} />
                            </label>
                            <div className={classes.badges_wrapper}>
                                {["Backend", "Frontend", "Mobile", "QA", "DevOps", "GameDev", "UX/UI", "AI", "ML", "HR"].map((badge) => (
                                    <label key={badge} className={classes.badge_label}>
                                        <input
                                            id="checkbox"
                                            type="checkbox"
                                            checked={newTeam.badges.includes(badge)}
                                            onChange={() => handleBadgeChange(badge)}
                                            className={classes.badge_input}
                                        />
                                        {badge}
                                    </label>
                                ))}
                            </div>
                            <label className={classes.label}>
                                Хакатон:
                                {/*<input type="text" name="hackathon" value={newTeam.hackathon}*/}
                                {/*       onChange={handleInputChange} className={classes.input}/>*/}
                                <select
                                    id="hackathon"
                                    className={classes.input}
                                    value={newTeam.hackathon}
                                    onChange={(event) =>
                                        setNewTeam((prev) => ({...prev, hackathon: event.target.value}))
                                    }
                                >
                                    {categories.map((category) => (
                                            <option key={category.Id} value={category.Id}>{category.Name}</option>
                                        )
                                    )}
                                </select>
                            </label>
                            <label className={classes.label}>
                                Требования:
                                <textarea id="requirements" name="requirements" value={newTeam.requirements} onChange={handleInputChange}
                                          className={classes.textarea}></textarea>
                            </label>
                            {/*<div {...getRootProps()} className={classes.dropzone}>*/}
                            {/*    <input {...getInputProps()} />*/}
                            {/*    <p>Перетащите сюда фотографию команды или нажмите для выбора файла</p>*/}
                            {/*    {newTeam.photo && <p>{newTeam.photo.name}</p>}*/}
                            {/*</div>*/}
                            <div>
                                <button type="submit" className={classes.submit_button}>Создать</button>
                                <button type="button" onClick={() => setShowPopup(false)} className={classes.cancel_button}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Commands;
