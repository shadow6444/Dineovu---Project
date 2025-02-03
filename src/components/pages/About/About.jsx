import AboutUs from "../../../assets/about.jpg";
import Mission from "../../../assets/mission.jpg";

const About = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex items-center bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
        <h1 className="text-white font-medium text-2xl pl-24">
          Know About the Journey <br /> of How Our Cafe was Introduced
        </h1>
      </section>
      {/* About Section */}
      <section className="w-full flex items-center justify-between gap-16 px-32 py-8">
        <div className="flex flex-col flex-1 gap-2 justify-center">
          <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
            About Us
          </h1>
          <p className="text-[#82888C] text-base text-left  ">
            Welcome to Dineovu, where innovation meets dining!
          </p>
          <p className="text-[#82888C] text-base text-left">
            At Dineovu, we believe in creating a seamless and enjoyable dining
            experience for everyone. Whether you're a food lover looking for the
            perfect place to dine, a busy professional in need of a quick meal,
            or a café manager striving for efficiency, Dineovu is designed to
            simplify and enhance your journey.
          </p>
          <p className="text-[#82888C] text-base text-left">
            By leveraging cutting-edge technology, we aim to bridge the gap
            between customers and café operations, ensuring every interaction is
            smooth and delightful.
          </p>
        </div>
        <div className="flex justify-center flex-1 text-center items-center gap-16 flex-wrap">
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-full">
            <img
              src={AboutUs}
              alt="Playground for children"
              className="rounded-md h-72"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-[#F9F9F9] flex items-center justify-between gap-12 px-32 py-8 pb-10">
        <div className="flex justify-center flex-1 text-center items-center gap-12 flex-wrap">
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-full">
            <img
              src={Mission}
              alt="Playground for children"
              className="rounded-md h-72"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2 justify-center">
          <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
            Our Mission
          </h1>
          <p className="text-[#82888C] text-base text-left mb-8">
            To revolutionize the dining experience by combining convenience,
            efficiency, and innovation in a user-friendly digital platform.
          </p>
          <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
            OUR VISION
          </h1>
          <p className="text-[#82888C] text-base text-left  ">
            To be the go-to solution for enhancing café and dining experiences,
            empowering businesses to thrive and customers to enjoy every meal.
          </p>
        </div>
      </section>

      {/* Why Dineovu Section */}
      <section className="w-full flex flex-col items-center px-16 py-8">
        <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-8">
          Why Choose Dineovu
        </h1>
        <div className="flex justify-center text-center items-center gap-12 w-full">
          <div className="flex flex-col flex-1 bg-white rounded-md shadow-lg p-4">
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Sustainability and Innovation
                </h4>
                <p className="text-[#82888C] text-sm">
                  Enjoy paperless menus and efficient operations designed for
                  the future
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 bg-white rounded-md shadow-lg p-4 h-[128px]">
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Transparency in Service
                </h4>
                <p className="text-[#82888C] text-sm">
                  Track your orders in real time and receive timely updates
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 bg-white rounded-md shadow-lg p-4">
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Convenience at Your Fingertips
                </h4>
                <p className="text-[#82888C] text-sm">
                  Reserve tables, order food, and pay seamlessly with just a few
                  taps.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 bg-white rounded-md shadow-lg p-4 h-[128px]">
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Empowered Businesses
                </h4>
                <p className="text-[#82888C] text-sm">
                  Streamline operations and maximize customer satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
