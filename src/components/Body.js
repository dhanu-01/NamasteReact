import RestuarantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  //Local State Variable - Super powerful variable
  let [listOfRestaurants, setListOfRestaurants] = useState(restaurants);

  const topResturants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.5
    );
    setListOfRestaurants(filteredList);
  };

  return (
    <div className="res-body">
      <div className="filter">
        <button className="filter-btn" onClick={topResturants}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((item) => {
          return <RestuarantCard resData={item} key={item?.info?.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
