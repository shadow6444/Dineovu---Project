import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroImage1 from "../../../../assets/hero-image-1.jpg";
import HeroImage2 from "../../../../assets/hero-image-2.jpg";
import HeroImage3 from "../../../../assets/hero-image-3.jpg";
import HeroImage4 from "../../../../assets/hero-image-4.jpg";

const images = [HeroImage1, HeroImage2, HeroImage3, HeroImage4];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative w-full h-[90vh] mb-8">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-center bg-cover bg-no-repeat transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})`, objectFit: "cover" }}
        />
      ))}

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10"></div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white px-4 z-20">
        <h1 className="text-6xl font-bold mb-8 animate-fadeIn">DINEOVU</h1>
        <h1 className="text-3xl font-semibold mb-4 animate-fadeIn">
          Experience Delightful Dining and Memorable Moments!
        </h1>
        <Link
          to="/booking"
          className="relative animate-fadeIn hover:bg-[#FF8D10] inline-flex items-center bg-amberColor px-6 py-3 rounded-full text-lg font-semibold group"
        >
          Book Now!
          <span className="flex items-center ml-2 text-white group-hover:animate-gradient">
            <FaChevronRight
              className="ml-1 animate-chevron-color"
              style={{ animationDelay: "0s" }}
            />
            <FaChevronRight
              className="ml-[-6px] animate-chevron-color"
              style={{ animationDelay: "0.2s" }}
            />
            <FaChevronRight
              className="ml-[-6px] animate-chevron-color"
              style={{ animationDelay: "0.4s" }}
            />
          </span>
        </Link>
      </div>

      <button
        onClick={() =>
          setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-amberColor text-white p-3 rounded-full hover:bg-[#FF8D10] z-20"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-amberColor text-white p-3 rounded-full hover:bg-[#FF8D10] z-20"
      >
        <FaChevronRight size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
