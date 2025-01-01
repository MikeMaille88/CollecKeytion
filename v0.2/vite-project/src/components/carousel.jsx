// KeyCarousel.jsx

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const transformImageUrl = (url, width, height) => {
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},h_${height}/`
  );
};

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
      {Object.entries(images)
        .sort(([keyA], [keyB]) => {
          // Place "inBox" en premier
          if (keyA === "inBox") return -1;
          if (keyB === "inBox") return 1;
          return 0;
        })
        .map(([key, image], index) => (
          <div key={index} className="relative">
            <img
              src={transformImageUrl(
                image,
                500,
                750
              )}
              alt={`image ${key}`}
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
        className + " absolute left-10 top-1/2 transform -translate-y-1/2 z-10"
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
