import React, { useCallback, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import classes from "./HacktonsPage.module.css";
import PostHacktons from "../../Components/PostHacktons/PostHacktons";
import FilterHacktons from "../../Components/FilterHacktons/FilterHacktons";

const HacktonsPage = (props) => {
  const [posts, setPosts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const fetchHackatons = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5045/api/Chakatons/All", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setPosts(data);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  }, []);

  useEffect(() => {
    fetchHackatons();
  }, [fetchHackatons]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedFilters((prevFilters) => [...prevFilters, name]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== name)
      );
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const titleMatch = post.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const directionMatch = selectedFilters.some((filter) => post.Direction.includes(filter));
    const typeMatch = selectedFilters.includes(post.Type);
    const cityMatch = selectedCity === "" || selectedCity === post.Location;
    return titleMatch && (selectedFilters.length === 0 || directionMatch || typeMatch) && cityMatch;
  });

  return (
    <div className={classes.page}>
      <Header />
      <div className={classes.page_hacktons}>
        <FilterHacktons
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          handleCityChange={handleCityChange}
        />
        <div className={classes.middle}>
          <h6>Поиск</h6>
          <input
            type="text"
            placeholder="Найти Хакатон"
            className={classes.search}
            value={searchTerm}
            onChange={handleSearch}
          />
          <h6>Все хакатоны</h6>
          <div className={classes.middle_form}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostHacktons post={post} key={post.Id} />
              ))
            ) : (
              <p className={classes.not_found}>Хакатоны не найдены</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HacktonsPage;