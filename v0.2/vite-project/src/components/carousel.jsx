// KeyCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function KeyCarousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings}>
      {Object.values(images).map((image, index) => (
        <div key={index} className="relative">
          <img
            //Affichage Mongo seul
            //src={`/src/images/${image}`}
            //Affichage Cloudinary
            src={image}
            alt={`image ${index + 1}`}
            className="mx-auto w-3/4 h-auto object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}

// CustomPrevArrow.jsx
export const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={
        className + " absolute left-10 top-1/2 transform -translate-y-1/2"
      }
      onClick={onClick}
    >
      {/* Ajoutez ici votre icône ou contenu pour la flèche précédente */}
      Prev
    </div>
  );
};

// CustomNextArrow.jsx
export const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={
        className + " absolute right-10 top-1/2 transform -translate-y-1/2"
      }
      onClick={onClick}
    >
      {/* Ajoutez ici votre icône ou contenu pour la flèche suivante */}
      Next
    </div>
  );
};
