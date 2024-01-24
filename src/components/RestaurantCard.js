import { CDN_URL } from "../utils/constants";

const RestuarantCard = ({ resData }) => {
    const { name, cloudinaryImageId, areaName, avgRating ,sla,cuisines} = resData?.info;
    return (
      <div className="res-card">
        <img
          className="res-img"
          src={
             CDN_URL
             +
            cloudinaryImageId
          }
        />
        <h3>{name}</h3>
        <div className="rating-div">
        <h4>{avgRating} ★</h4>
        <h4>{sla.slaString}</h4>
        </div>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{areaName}</h4>
      </div>
    );
  };

  export default RestuarantCard;
