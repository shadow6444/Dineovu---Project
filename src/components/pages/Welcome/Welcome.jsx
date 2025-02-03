import { Link } from "react-router-dom";
import dineovuLogoLarge from "../../../assets/dineovuLogoLarge.svg";
import dineovuLogo from "../../../assets/dineovuLogo.svg";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="container-layout">
      <div className="sides h-full relative">
        <div className="logo-position flex flex-col justify-center items-center">
          <img
            src={dineovuLogo}
            alt="a fork and spoon logo"
            width={50}
            height={50}
          />
          <h4 className="font-semibold">Dineovu</h4>
        </div>
        <div className="home-container">
          <div className="welcome-content">
            <p className="font-semibold text-2xl">
              Experience Smooth
              <br />
              Dining Experience with
              <br />
              Your Digital Companion
            </p>
            <Link
              to="/auth/login"
              className="bg-amberColor hover:bg-amber-500 text-white rounded-[20px] px-5 py-2 border-none text-base w-full text-center"
            >
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
      <div className="sides right-side">
        <img
          src={dineovuLogoLarge}
          alt="a fork and a spoon"
          height={270}
          width={270}
          className="dineovu-image"
        />
      </div>
    </div>
  );
};

export default Welcome;
