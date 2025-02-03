import HeroSection from "./HeroSection";
import StartingSection from "./StartingSection";
import MenuSection from "./MenuSection";
import ReviewSection from "./ReviewSection";
import "./Home.css";

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      {/* Starting Section */}
      <StartingSection />
      {/* Menu Section */}
      <MenuSection />
      {/* Review Section */}
      <ReviewSection />
    </div>
  );
};

export default Home;
