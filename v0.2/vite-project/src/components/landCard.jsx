//landCard.jsx

import { Link } from "react-router-dom";
import adv from "/Images/Lands/adv_tr.png";
import dis from "/Images/Lands/dis_tr.png";
import dvh from "/Images/Lands/dvh_tr.png";
import fan from "/Images/Lands/fan_tr.png";
import fro from "/Images/Lands/fro_tr.png";
import msu from "/Images/Lands/msu_tr.png";
import wds from "/Images/Lands/wds_tr.png";
import castle from "/Images/chateau.png";

const LandCard = () => {
  const landImages = [adv, dis, fan, fro, msu, wds, dvh];

  return (
    <div className="land-card-container">
      {landImages.map((image, index) => (
        <Link
          to={`${getLandLink(index)}`}
          key={index}
          className={`land-image link-${index} animate-float`}
        >
          <img
            className="object-center w-full h-full"
            src={image}
            alt={`Land image ${index}`}
          />
        </Link>
      ))}
      <Link to="/allKeys" className="castle-image animate-float">
        <img
          className="object-center w-full h-full"
          src={castle}
          alt="Castle image"
        />
      </Link>
    </div>
  );
};

// Utilitaire pour obtenir le nom du land en fonction de l'index
const getLandLink = (index) => {
  const landLinks = [
    "/land/Adventureland",
    "/land/Discoveryland",
    "/land/Fantasyland",
    "/land/Frontierland",
    "/land/MSU",
    "/land/WDS",
    "/land/DVH",
  ];
  return landLinks[index];
};

export default LandCard;
