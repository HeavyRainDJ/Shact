import React, { useState, useCallback } from "react";
import classes from "./ClientCabinet.module.css";
import "@fontsource/dm-sans";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import About from "./Pages_client/About/About";
import Analytic from "./Pages_client/Analytic/Analytic";
import Commands from "./Pages_client/Commands/Commands";

import logo_client from "../../pictures/efe.png";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const ClientCabinet = (props) => {
    const [activeSection, setActiveSection] = useState('personalData');
    const [avatar, setAvatar] = useState(logo_client);

    const uploadAvatarToBackend = useCallback(async (file) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch("http://localhost:5045/api/upload-avatar", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload avatar");
            }

            const data = await response.json();
            console.log("Avatar uploaded successfully:", data);
        } catch (error) {
            console.error("Upload error:", error);
        }
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                uploadAvatarToBackend(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'personalData':
                return <About />;
            case 'analytics':
                return <Analytic />;
            case 'data':
                return <Commands />;
            default:
                return <div>Личные данные content here</div>;
        }
    };

    return (
        <div className={classes.page}>
            <Header />
            <div className={classes.cabinet_page}>
                <div className={classes.cabinet_page_left}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className={classes.avatar_input}
                    />
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className={classes.logo_client}
                        onClick={() => document.querySelector(`.${classes.avatar_input}`).click()}
                    />
                    <div className={classes.form_swapper}>
                        <button
                            className={`${classes.form_swapper_buttons} ${activeSection === 'personalData' ? classes.active : ''}`}
                            onClick={() => setActiveSection('personalData')}
                        >
                            Личные данные
                        </button>
                        <button
                            className={`${classes.form_swapper_buttons} ${activeSection === 'analytics' ? classes.active : ''}`}
                            onClick={() => setActiveSection('analytics')}
                        >
                            Аналитика
                        </button>
                        <button
                            className={`${classes.form_swapper_buttons} ${activeSection === 'data' ? classes.active : ''}`}
                            onClick={() => setActiveSection('data')}
                        >
                            Команды
                        </button>
                        <Link to={"/Shact"}><button style={{margin: "0 auto", display: "block"}} className={classes.form_swapper_buttons} onClick={() => Cookies.remove("auth")}>Выйти</button></Link>
                    </div>
                </div>
                <div className={classes.cabinet_page_right}>
                    {renderSection()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClientCabinet;
