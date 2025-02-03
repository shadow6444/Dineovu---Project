import { Link } from "react-router-dom";
import dineovuLogo from "../../../assets/dineovuLogo.svg";
import Facebook from "../../../assets/Facebook icon.svg";
import Instagram from "../../../assets/Instagram icon.svg";
import Youtube from "../../../assets/Youtube.svg";
import Linkedin from "../../../assets/Linkedin icon.svg";
import Copyright from "../../../assets/Copyright.svg";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] flex flex-col w-full">
      <div className="flex justify-between px-20 pb-12 pt-6 w-full">
        <div className="flex flex-col gap-6 pt-[-1rem] items-start w-[28%]">
          <Link
            to="/home"
            className="flex items-center gap-3 hover:no-underline"
          >
            <img
              className="mix-blend-multiply"
              src={dineovuLogo}
              alt="a spoon and a fork"
              height={80}
              width={80}
            />
            <h4 className="text-2xl font-semibold text-gray-950">DINEOVU</h4>
          </Link>
          <p className="text-lg text-gray-400 leading-6">
            At Dineovu, we blend delicious flavors with a serene, relaxing
            atmosphere – where great food meets peaceful moments.
          </p>
        </div>

        <div className="flex flex-1 gap-32 mt-6 justify-end">
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold mb-2">What We Have</h4>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/home"
            >
              Home
            </Link>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/booking"
            >
              Booking
            </Link>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/menu/starter"
            >
              Menu
            </Link>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/feedback"
            >
              Feedback
            </Link>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/about"
            >
              About Us
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold mb-2">What We Provide</h4>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/menu/starter"
            >
              Starter
            </Link>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/menu/beverage"
            >
              Beverages
            </Link>
            <Link
              className="text-base text-gray-400 hover:text-gray-600"
              to="/menu/maincourse"
            >
              Main Course
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold mb-2">Find Us On</h4>
            <div className="flex gap-4 items-center">
              <Link to="/home">
                <img src={Facebook} alt="Facebook" height={19.29} width={19} />
              </Link>
              <Link to="/home">
                <img src={Instagram} alt="Instagram" height={19} width={19} />
              </Link>
              <Link to="/home">
                <img src={Youtube} alt="Youtube" height={24.2} width={17} />
              </Link>
              <Link to="/home">
                <img
                  src={Linkedin}
                  alt="Linkedin"
                  height={19.25}
                  width={19.2}
                />
              </Link>
            </div>
            <h4 className="text-lg font-semibold mt-4">Contact Us</h4>
            <p className="text-base text-gray-400">dineovu@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full px-14 pb-6">
        <div className="flex-1 flex items-center">
          <div className="h-[3px] w-full bg-gray-400"></div>
          <div className="h-4 w-4 rotate-45 bg-gray-400"></div>
        </div>
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center gap-2">
            <img src={Copyright} alt="Copyright" />
            <p className="text-base text-gray-400">
              Dineovu. All Rights Reserved By Dineovu
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="h-4 w-4 rotate-45 bg-gray-400"></div>
          <div className="h-[3px] w-full bg-gray-400"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
