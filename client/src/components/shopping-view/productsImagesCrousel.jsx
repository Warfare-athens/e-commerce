import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = ({ images }) => {
    return (
        <div className="text-white text-[20px] w-full max-w-[500px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={true}
                showStatus={false}
                thumbWidth={60}
                autoPlay={true}
                emulateTouch={true}
                className="productCarousel"                
            >
                {images?.map((img, index) => (
                    <img className=" bg-gray-200  "
                        key={index} // Use `index` as the key
                        src={img.src || img} // Adjust based on your image object structure
                        alt={img.alt || `Image ${index + 1}`} // Provide a fallback for alt
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default ProductDetailsCarousel;