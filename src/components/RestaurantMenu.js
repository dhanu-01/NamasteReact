import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    const {resId} = useParams();
    const [resInfo, setResInfo] = useState();

    useEffect(()=> {
        fetchMenu();
    },[])

    const fetchMenu = async () => {
       const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.044825&lng=80.2439809&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`)
       const json = await data.json();
       console.log(json.data);
       setResInfo(json.data)
    }

    if(resInfo == null) return <Shimmer/>;

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[0]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h2>{cuisines.join(", ")} - {costForTwoMessage}</h2>
             <ul>
                {
                   itemCards?.length>0 && itemCards.map((item) => (
                        <li key={item.card.info.id}>{item.card.info.name} - Rs {item.card.info.price || item.card.info.defaulPrice / 100}</li>
                    ))
                }
             </ul>

        </div>
    )
}

export default RestaurantMenu;