import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import dineovuLogo from "../../../assets/dineovuLogo.svg";
import defaultPhoto from "../../../assets/default_picture.svg";
import { useEffect, useRef, useState } from "react";
import Facebook from "../../../assets/Facebook icon.svg";
import Instagram from "../../../assets/Instagram icon.svg";
import Youtube from "../../../assets/Youtube.svg";
import Linkedin from "../../../assets/Linkedin icon.svg";
import Copyright from "../../../assets/Copyright.svg";
import { jwtDecode } from "jwt-decode";

const AdminLayout = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? jwtDecode(token) : "Not logged in";
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const isViewActive = location.pathname === "/menu";
  const isAddActive = location.pathname === "/menu/add";
  const isUpdateActive = location.pathname === "/menu/update";

  useEffect(() => {
    console.log("Updated Profile");
  }, [user]);

  const handleProfileClick = (event) => {
    event.stopPropagation();
    setIsVisible((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return isLoggedIn && isLoggedIn.role === "admin" ? (
    <section className="flex flex-col min-h-screen">
      <header className="flex items-center h-16 w-full shadow-md fixed z-50 bg-white">
        <div className="flex items-center justify-between h-full w-full px-12">
          <Link to="/menu" className="flex items-center gap-3">
            <img
              src={dineovuLogo}
              alt="a spoon and a fork"
              height={50}
              width={50}
            />
            <h4 className="text-xl font-semibold text-gray-950">Dineovu</h4>
          </Link>
          <div className="flex items-center gap-8 font-medium">
            <NavLink
              className={({ isActive }) =>
                isViewActive
                  ? "text-amberColor text-base px-2 py-1"
                  : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
              }
              to="/menu"
            >
              View Menu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isAddActive
                  ? "text-amberColor text-base px-2 py-1"
                  : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
              }
              to="/menu/add"
            >
              Add Item
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isUpdateActive
                  ? "text-amberColor text-base px-2 py-1"
                  : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
              }
              to="/menu/update"
            >
              Update Item
            </NavLink>
            <button
              type="button"
              onClick={handleProfileClick}
              className="border-none bg-white rounded-full flex items-center justify-center relative z-50"
            >
              <img
                src={
                  isLoggedIn?.picURL !== "none"
                    ? isLoggedIn?.picURL
                    : defaultPhoto
                }
                alt="profile picture"
                height={50}
                width={50}
                className="rounded-full"
              />
            </button>
            {isVisible && (
              <div
                ref={dropdownRef}
                className="absolute top-16 right-0 w-32 bg-white shadow-lg rounded-lg z-60"
              >
                <Link
                  to="/auth/login"
                  className="block px-4 py-2 text-red-600 hover:bg-gray-100 text-center transition-colors w-full rounded-lg"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="flex-grow pt-16 pb-4 w-full">
        <div className="w-full flex flex-col">
          <section className="w-full flex items-center bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
            <h1 className="text-white font-medium text-2xl pl-24">
              Delight in Every Bite – A <br /> Menu Full of Flavors to Explore!
            </h1>
          </section>
          <Outlet />
        </div>
      </div>
      <footer className="bg-[#F9F9F9] flex flex-col w-full">
        <div className="flex justify-between px-20 pb-12 pt-6 w-full">
          <div className="flex flex-col gap-6 pt-[-1rem] items-start w-[28%]">
            <Link
              to="/me"
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

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold mb-2">Find Us On</h4>
            <div className="flex gap-4 items-center">
              <Link to="/menu">
                <img src={Facebook} alt="Facebook" height={19.29} width={19} />
              </Link>
              <Link to="/menu">
                <img src={Instagram} alt="Instagram" height={19} width={19} />
              </Link>
              <Link to="/menu">
                <img src={Youtube} alt="Youtube" height={24.2} width={17} />
              </Link>
              <Link to="/menu">
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
    </section>
  ) : isLoggedIn && isLoggedIn.role === "customer" ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default AdminLayout;
