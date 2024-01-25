import RestuarantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";
import { useState, useEffect, lazy, Suspense } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const LazyListItem = lazy(() => import("./RestaurantCard"));

const Body = () => {
  //Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [search, setSearch] = useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const requestData = {
    lat: 13.044825,
    lng: 80.2439809,
    filters: {},
    nextOffset: "COVCELQ4KICw+9HexfbPZTCnEzgB",
    page_type: "DESKTOP_WEB_LISTING",
    seoParams: {
      seoUrl: "https://www.swiggy.com/",
      pageType: "FOOD_HOMEPAGE",
      apiName: "FoodHomePage",
    },
    widgetOffset: {
      NewListingView_category_bar_chicletranking_TwoRows: "",
      NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
      Restaurant_Group_WebView_PB_Theme: "",
      Restaurant_Group_WebView_SEO_PB_Theme: "",
      collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "100",
      inlineFacetFilter: "",
      restaurantCountWidget: "",
    },
    _csrf: "HucL5wNwzsh7-ivrmqol_yIiDE0F-n8vbBIsex4E",
  };

  const apiUrl = "https://www.swiggy.com/dapi/restaurants/list/update";


  const handleScroll = () => {
    console.log("handle")
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      lazyFetchData();
    }
  };

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const lazyFetchData = async () => {
      await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestData),
    })
    .then(response => {
       console.log(response);
    })
  };

  const topResturants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.5
    );
    setListOfRestaurants(filteredList);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    const searchList = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(e.target.value?.toLowerCase())
    );
    setFilteredRestaurants(searchList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.044825&lng=80.2439809&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurants(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  return listOfRestaurants?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="res-body">
      <div className="filter">
        <button className="filter-btn" onClick={topResturants}>
          Top Rated Restaurants
        </button>
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={search}
            onChange={(e) => onSearch(e)}
          />
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurants &&
          filteredRestaurants.map((item) => {
            return <Link to={"/restaurants/" + item.info.id} key={item.info.id} ><RestuarantCard resData={item} /></Link>;
          })}
      </div>
    </div>
  );
};

export default Body;
