import { Link } from "react-router-dom";
import Cards from "../../../../assets/Game2.jpeg";
import Seating from "../../../../assets/cafe seating.jpeg";
import Playground from "../../../../assets/children.jpeg";
import { FaArrowRight } from "react-icons/fa6";

const StartingSection = () => {
  return (
    <div>
      <section className="w-full flex flex-col items-center px-16 py-8">
        <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
          Have a Look Inside
        </h1>
        <div className="flex justify-center items-center gap-12 flex-wrap w-full max-w-7xl">
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Cards}
              alt="Cards Game"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Games
                </h4>
                <p className="text-[#82888C] text-sm">
                  Enjoy The Games In Free Time!
                </p>
              </div>

              <Link
                to="/games"
                className="flex items-center gap-2 text-sm text-[#FF8D10] font-semibold hover:underline whitespace-nowrap"
              >
                View Details
                <span className="bg-amberColor p-2 rounded-full">
                  <FaArrowRight className="text-white" />
                </span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Seating}
              alt="Seating"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Booking
                </h4>
                <p className="text-[#82888C] text-sm">
                  Your Perfect Seat, Your Perfect Experience!
                </p>
              </div>

              <Link
                to="/booking"
                className="flex items-center gap-2 text-sm text-[#FF8D10] font-semibold hover:underline whitespace-nowrap"
              >
                View Details
                <span className="bg-amberColor p-2 rounded-full">
                  <FaArrowRight className="text-white" />
                </span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
            <img
              src={Playground}
              alt="Playground"
              className="rounded-md mb-4"
              height={209}
              width={335}
            />
            <div className="flex gap-4 items-center justify-center">
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-[#000033] font-semibold text-lg mb-2">
                  Playground
                </h4>
                <p className="text-[#82888C] text-sm">
                  A Safe, Fun Space for Kids!
                </p>
              </div>

              <Link
                to="/playground"
                className="flex items-center gap-2 text-sm text-[#FF8D10] font-semibold hover:underline whitespace-nowrap"
              >
                View Details
                <span className="bg-amberColor p-2 rounded-full">
                  <FaArrowRight className="text-white" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartingSection;
