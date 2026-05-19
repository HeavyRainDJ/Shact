import React, { useCallback, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import classes from "./HacktonsCommands.module.css";
import PostCommands from "../../Components/PostCommands/PostCommands";
import FilterCommands from "../../Components/FilterCommands/FilterCommands";
import Cookies from "js-cookie";

const HacktonsCommands = (props) => {
  const [posts, setPosts] = useState([]);
  const [uid, setUid] = useState(0)
  const cookie = Cookies.get("auth");
  const fetchHackatons = useCallback(async () => {
    console.log("Fetching hackatons...");
    try {
      const response = await fetch("http://localhost:5045/api/Teams/All", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data received:", data);

      setPosts(data);


      const response2 = await fetch("http://localhost:5045/api/Users/profile", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + cookie,
        },
      });
      const data2 = await response2.json();
      console.log("Data received2:", data2);

      setUid(data2.Id);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchHackatons();
  }, [fetchHackatons]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, name]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== name));
    }
  };

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const directionMatch = selectedFilters.some((filter) => post.Direction.includes(filter));
    return titleMatch && (selectedFilters.length === 0 || directionMatch);
  });

  return (
    <div className={classes.page}>
      <Header />
      <div className={classes.page_hacktons}>
        <FilterCommands selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
        <div className={classes.middle}>
          <h6>Поиск</h6>
          <input
            type="text"
            placeholder="Найти команду"
            className={classes.search}
            value={searchTerm}
            onChange={handleSearch}
          />
          <h6>Все команды</h6>
          <div className={classes.middle_form}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCommands post={post} uid={uid} key={post.Id} />
              ))
            ) : (
              <p className={classes.not_found}>Commands not found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HacktonsCommands;