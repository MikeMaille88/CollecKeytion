import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const transformImageUrl = (url, width, height) => {
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width},h_${height}/`
  );
};

export default function KeyCarousel({ images }) {
  const placeholderImage = "https://res.cloudinary.com/colleckeytion/image/upload/v1741006301/CollecKeytion/others/key_placeholder.jpg";

  // Vérifier si toutes les images sont nulles/undefined
  const validImages = images ? Object.values(images).filter(Boolean) : [];

  // Si aucune image valide, on affiche 4 fois le placeholder
  const displayImages = validImages.length > 0 ? validImages : Array(4).fill(placeholderImage);

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
      {displayImages.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={transformImageUrl(image, 500, 750)}
            alt={`image ${index}`}
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
      className={className + " absolute left-10 top-1/2 transform -translate-y-1/2 z-10"}
      onClick={onClick}
    >
      {/* Icône ou texte pour la flèche précédente */}
      Prev
    </div>
  );
};

// CustomNextArrow.jsx
export const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={className + " absolute right-10 top-1/2 transform -translate-y-1/2"}
      onClick={onClick}
    >
      {/* Icône ou texte pour la flèche suivante */}
      Next
    </div>
  );
};
