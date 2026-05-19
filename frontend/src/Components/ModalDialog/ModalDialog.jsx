import React, { useState } from 'react';
import Modal from 'react-modal';
import classes from './ModalDialog.module.css';

const ModalDialog = ({ isOpen, onRequestClose, onSubmit, badges = [] }) => {
    const [selectedBadges, setSelectedBadges] = useState([]);

    const toggleBadge = (badge) => {
        setSelectedBadges(prevSelected =>
            prevSelected.includes(badge)
                ? prevSelected.filter(b => b !== badge)
                : [...prevSelected, badge]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(selectedBadges);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal Dialog"
            className={classes.modal}
            overlayClassName={classes.overlay}
        >
            <h2 className={classes.zagolovk}>Подать заявку</h2>
            <div className={classes.badgesContainer}>
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className={`${classes.badge} ${selectedBadges.includes(badge) ? classes.selected : ''}`}
                        onClick={() => toggleBadge(badge)}
                    >
                        {badge}
                    </div>
                ))}
            </div>
            <div className={classes.modalButtons}>
                <button type="button" onClick={onRequestClose}>Отмена</button>
                <button type="button" onClick={handleSubmit}>Отправить заявку</button>
            </div>
        </Modal>
    );
};

export default ModalDialog;
