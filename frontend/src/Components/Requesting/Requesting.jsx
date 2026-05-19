import React, {useCallback} from 'react';
import classes from './Requesting.module.css';
import Cookies from "js-cookie";

const Requesting = ({ id, name, education, position, link}) => {

    const cookie = Cookies.get("auth");

    const fetchStatus = useCallback(async (id, status) => {
        try {
            const response = await fetch("http://localhost:5045/api/Requests", {
                method: "patch",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + cookie,
                },
                body: JSON.stringify({
                    id: id,
                    status: status,
                })

            });
            const data = await response.json();
            console.log("Data received:", data);
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    }, []);

    const onApprove = (e) => {
        e.preventDefault();
        fetchStatus(id, "Одобрено").then(() => (
            window.location.reload()
        ))
    };

    const onReject = (e) => {
        e.preventDefault();
        fetchStatus(id, "Отклонено").then(() => (
            window.location.reload()
        ))
    };

  return (
    <div className={classes.requesting}>
      <div className={classes.details}>
        <div className={classes.name}>{name}</div>
        <div className={classes.tags}>
          <span className={classes.tag}>{education}</span>
          <span className={classes.tag}>{position}</span>
          <span className={classes.tag}><a href={link} target="_blank" rel="noopener noreferrer">Telegram</a></span>
        </div>
      </div>
      <div className={classes.status}>
        <button className={`${classes.statusButton} ${classes.approved}`} onClick={onApprove}>Одобрить</button>
        <button className={`${classes.statusButton} ${classes.rejected}`} onClick={onReject}>Отклонить</button>
      </div>
    </div>
  );
};

export default Requesting;
