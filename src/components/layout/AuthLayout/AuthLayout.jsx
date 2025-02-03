import { Outlet } from "react-router-dom";
import dineovuLogoLarge from "../../../assets/dineovuLogoLarge.svg";
import dineovuLogo from "../../../assets/dineovuLogo.svg";

import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <div className="container-layout">
      <div className="sides h-full relative">
        <div className="logo-position flex flex-col justify-center items-center">
          <img src={dineovuLogo} alt="a fork and spoon logo" width={50} height={50} />
          <h4 className="font-semibold">Dineovu</h4>
        </div>
        <Outlet />
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

export default AuthLayout;
