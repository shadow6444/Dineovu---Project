import Beverages from "../../../../assets/beverages.jpeg";
import Starter from "../../../../assets/starter.jpeg";
import MainCourse from "../../../../assets/main.jpeg";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MenuSection = () => {
  return (
    <section className="mt-8 w-full flex flex-col items-center px-16 pt-10 pb-10 bg-[#EFEFEF]">
      <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
        Hungry? Take A Look At Our Menu
      </h1>
      <div className="flex justify-center items-center gap-12 flex-wrap w-full max-w-7xl">
        <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-[335px]">
          <img
            src={Starter}
            alt="Starter Menu"
            className="rounded-md mb-4"
            height={209}
            width={335}
          />
          <div className="flex gap-4 items-center justify-center">
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-[#000033] font-semibold text-lg mb-2">
                Starters
              </h4>
              <p className="text-[#82888C] text-sm">
                A perfect beginning to your meal!
              </p>
            </div>

            <Link
              to="/menu/starter"
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
            src={Beverages}
            alt="Beverages Menu"
            className="rounded-md mb-4"
            height={209}
            width={335}
          />
          <div className="flex gap-4 items-center justify-center">
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-[#000033] font-semibold text-lg mb-2">
                Beverages
              </h4>
              <p className="text-[#82888C] text-sm">
                Quench your thirst with our finest drinks!
              </p>
            </div>

            <Link
              to="/menu/beverage"
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
            src={MainCourse}
            alt="Main Course Menu"
            className="rounded-md mb-4"
            height={209}
            width={335}
          />
          <div className="flex gap-4 items-center justify-center">
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-[#000033] font-semibold text-lg mb-2">
                Main Course
              </h4>
              <p className="text-[#82888C] text-sm">
                Satisfy your hunger with our main dishes!
              </p>
            </div>

            <Link
              to="/menu/maincourse"
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
  );
};

export default MenuSection;
