import ChildGround from "../../../assets/children.jpeg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Playground = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
        <Link
          to="/home"
          className="flex items-center gap-2 text-lg text-white pt-6 pl-8 font-medium hover:underline whitespace-nowrap"
        >
          <span className="bg-white p-2 rounded-full">
            <FaArrowLeft className="text-amberColor" />
          </span>
          Go Back
        </Link>
        <h1 className="text-white font-medium text-2xl pt-6 pl-24">
          Tired From the Noise of <br /> Kids - Let Them Play at Playground
        </h1>
      </section>
      {/* Child Section */}
      <section className="w-full flex items-center justify-between gap-16 px-32 py-8">
        <div className="flex flex-col flex-1 gap-2 justify-center">
          <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
            Free Time Games!
          </h1>
          <p className="text-[#82888C] text-base text-left">
            Supervised Fun: Parents can watch over their children or leave them
            in our trusted care. Child-Friendly Environment: Designed to
            stimulate learning and active play. Entertainment for All Ages: From
            toddlers to young kids, there’s something for everyone.
          </p>
        </div>
        <div className="flex justify-center flex-1 text-center items-center gap-16 flex-wrap">
          <div className="flex flex-col bg-white rounded-md shadow-lg p-4 w-full">
            <img
              src={ChildGround}
              alt="Playground for children"
              className="rounded-md h-72"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Playground;
