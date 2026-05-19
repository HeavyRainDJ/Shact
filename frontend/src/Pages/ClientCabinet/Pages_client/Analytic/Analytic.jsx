import React, { useCallback, useEffect, useState } from "react";
import classes from "./Analytic.module.css";
import "@fontsource/dm-sans";
import Graph from "../../../../Components/Graph/Graph";
import StolbDiagramm from "../../../../Components/StolbDiagramm/StolbDiagramm";
import Cookies from "js-cookie";
const Analytic = (props) => {
    const [amountStats, setAmountStats] = useState([]);

    const fetchAnalytic = useCallback(async (email, password) => {
        try {
            const response = await fetch(
                "http://localhost:5045/api/Chakatons/AmountStats", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setAmountStats(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchAnalytic();
    }, [fetchAnalytic]);


    const sortedStats = amountStats.sort((a, b) => b.Amount - a.Amount);
    
    const top3Hackathons = sortedStats.slice(0, 3);


    const [amountCommand, SetAmountCommand] = useState([])
    const cookie = Cookies.get("auth")

    const fetchAmountCommand = useCallback(async () => {
        console.log("Fetching hackatons...");
        try {
          const response = await fetch("http://localhost:5045/api/Teams/AmountStats", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + cookie,
            },
          });
    
          console.log("Response received:", response);
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
          console.log("Data received:", data);
    
          SetAmountCommand(data);
        } catch (error) {
          console.error("Fetch error:", error.message);
        }
      }, []);
    
      useEffect(() => {
        fetchAmountCommand();
      }, [fetchAmountCommand]);

    
    return (
        <div className={classes.form}>
            <div className={classes.form_left}>
                <text className={classes.title_analytic}>Активность</text>
                <div className={classes.form_right}>
                    <div className={classes.form_graph}>
                        <Graph />
                    </div>
                    <div className={classes.stats_grid}>
                        <div className={classes.stats_item}>
                            <h2 className={classes.information_data}>Дата регистрация</h2>
                            <p className={classes.information_data_client}>12.05.2024</p>
                        </div>
                        <div className={classes.stats_item}>
                            <h2 className={classes.information_data}>Участие в командах</h2>
                            <p className={classes.information_data_client}>{amountCommand.amount}</p>
                        </div>
                        <div className={classes.stats_item_top}>
                            <h2 className={classes.information_data}>Топ - 3 Хакатонов</h2>
                            <ol className={classes.lo}>
                                {top3Hackathons.map((hackathon, index) => (
                                    <li key={index} className={classes.il}>{hackathon.Name}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <text className={classes.title_analytic}>Статистика Хакатонов</text>
                <div className={classes.form_graph1}>
                    <div className={classes.stolbik}>
                        <StolbDiagramm data={amountStats} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytic;