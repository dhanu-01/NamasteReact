import RestuarantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [search, setSearch] = useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const topResturants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.5
    );
    setListOfRestaurants(filteredList);
  };

  const onSearch = (e) => {
      setSearch(e.target.value)
      const searchList = listOfRestaurants.filter(
        (res) => res.info.name.toLowerCase().includes(e.target.value?.toLowerCase())
      );
      setFilteredRestaurants(searchList)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.044825&lng=80.2439809&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
    setFilteredRestaurants(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants)
  };

  return listOfRestaurants?.length == 0 ? <Shimmer/> : (
    <div className="res-body">
      <div className="filter">
        <button className="filter-btn" onClick={topResturants}>
          Top Rated Restaurants
        </button>
        <div className="search">
          <input type="text" className="search-box" value={search} onChange={(e)=> onSearch(e)}/>
          <button
          onClick={onSearch}
          >Search</button>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurants && filteredRestaurants.map((item) => {
          return <RestuarantCard resData={item} key={item.info.id} />
        })}
      </div>
    </div>
  );
};

export default Body;
