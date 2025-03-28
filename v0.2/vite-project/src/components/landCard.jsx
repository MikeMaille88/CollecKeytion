// //landCard.jsx

// import { Link } from "react-router-dom";
// import adv from "/Images/Lands/adv_tr.png";
// import dis from "/Images/Lands/dis_tr.png";
// import dvh from "/Images/Lands/dvh_tr.png";
// import fan from "/Images/Lands/fan_tr.png";
// import fro from "/Images/Lands/fro_tr.png";
// import msu from "/Images/Lands/msu_tr.png";
// import wds from "/Images/Lands/wds_tr.png";
// import castle from "/Images/chateau.png";

// const LandCard = () => {
//   const landImages = [adv, dis, fan, fro, msu, wds, dvh];

//   return (
//     <div className="land-card-container">
//       {landImages.map((image, index) => (
//         <Link
//           to={`${getLandLink(index)}`}
//           key={index}
//           className={`land-image link-${index} animate-float`}
//         >
//           <img
//             className="object-center w-full h-full"
//             src={image}
//             alt={`Land image ${index}`}
//           />
//         </Link>
//       ))}
//       <Link to="/allKeys" className="castle-image animate-float">
//         <img
//           className="object-center w-full h-full"
//           src={castle}
//           alt="Castle image"
//         />
//       </Link>
//     </div>
//   );
// };

// // Utilitaire pour obtenir le nom du land en fonction de l'index
// const getLandLink = (index) => {
//   const landLinks = [
//     "/land/Adventureland",
//     "/land/Discoveryland",
//     "/land/Fantasyland",
//     "/land/Frontierland",
//     "/land/MSU",
//     "/land/WDS",
//     "/land/DVH",
//   ];
//   return landLinks[index];
// };

// export default LandCard;




// landCard.jsx - Updated version
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import adv from "/Images/Lands/adv_tr.png";
import dis from "/Images/Lands/dis_tr.png";
import dvh from "/Images/Lands/dvh_tr.png";
import fan from "/Images/Lands/fan_tr.png";
import fro from "/Images/Lands/fro_tr.png";
import msu from "/Images/Lands/msu_tr.png";
import wds from "/Images/Lands/wds_tr.png";
import castle from "/Images/chateau.png";

const LandCard = () => {
  const lands = [
    { image: adv, name: "Adventureland", path: "/land/Adventureland" },
    { image: dis, name: "Discoveryland", path: "/land/Discoveryland" },
    { image: fan, name: "Fantasyland", path: "/land/Fantasyland" },
    { image: fro, name: "Frontierland", path: "/land/Frontierland" },
    { image: msu, name: "MSU", path: "/land/MSU" },
    { image: wds, name: "WDS", path: "/land/WDS" },
    { image: dvh, name: "DVH", path: "/land/DVH" },
  ];

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="land-card-container relative min-h-[130vh] w-full flex justify-center items-center">
      <div className="castle-wrapper relative z-0">
        <Link to="/allKeys" className="castle-image animate-float block">
          <img
            className="object-contain w-full h-full"
            src={castle}
            alt="Castle image"
          />
        </Link>
      </div>
      
      <div className="lands-wrapper absolute inset-0 z-0">
        {lands.map((land, index) => (
          <Link
            to={land.path}
            key={index}
            className={`land-image animate-float land-item-${index}`}
            style={{ 
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <img
              className="object-contain w-full h-full"
              src={land.image}
              alt={land.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandCard;
