

//Importe les chemins d'accès à toutes les images
const imagesFiles = import.meta.globEager("../../public/Images/Avatars/*");
const imagesPaths = Object.keys(imagesFiles);
//console.log(imagesPaths);

// imagesPaths.forEach((path) => {
//   const fileName = path.split("/").pop(); // Obtenez le nom du fichier à partir du chemin
//   const image = imagesFiles[path].default;
//   console.log("Nom du fichier:", fileName);
//   console.log("Chemin de l'image:", path);
//   console.log("Image:", image);
// });

function ImageGallery() {
  return (
    <div>
      {imagesPaths.map((image, index) => (
        <img key={index} src={image} alt={`image-${index}`} />
      ))}
    </div>
  );
}

export default ImageGallery;
