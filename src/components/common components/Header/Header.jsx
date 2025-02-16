import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import dineovuLogo from "../../../assets/dineovuLogo.svg";
import defaultPhoto from "../../../assets/defaultpicture.svg";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  console.log(user?.picURL);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    console.log("Updated Profile");
  }, [user]);

  const isMenuActive =
    location.pathname.startsWith("/menu/starter") ||
    location.pathname.startsWith("/menu/beverage") ||
    location.pathname.startsWith("/menu/maincourse");

  const isProfileActive =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/profile/reservation") ||
    location.pathname.startsWith("/profile/order");

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

  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

  return (
    <header className="flex items-center h-16 w-full shadow-md fixed z-50 bg-white">
      <div className="flex items-center justify-between h-full w-full px-12">
        <Link to="/home" className="flex items-center gap-3">
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
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/booking"
          >
            Booking
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isMenuActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/menu/starter"
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/feedback"
          >
            Feedback
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-amberColor text-base px-2 py-1"
                : "hover:text-white hover:bg-amberColor px-2 py-1 rounded-md transition-colors"
            }
            to="/about"
          >
            About Us
          </NavLink>
          <button
            type="button"
            onClick={handleProfileClick}
            className="border-none bg-white rounded-full flex items-center justify-center relative z-50"
          >
            <img
              src={user?.picURL !== "none" ? user?.picURL : defaultPhoto}
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
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isProfileActive
                    ? "block w-full px-4 py-2 text-amberColor text-center"
                    : "block px-4 py-2 hover:text-white hover:bg-amberColor text-center transition-colors w-full rounded-lg"
                }
              >
                My Profile
              </NavLink>
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
  );
};

export default Header;
