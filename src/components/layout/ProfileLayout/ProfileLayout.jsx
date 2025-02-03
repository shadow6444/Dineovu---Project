import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import defaultPhoto from "../../../assets/default_picture.svg";
import { useEffect } from "react";
import { isPending } from "@reduxjs/toolkit";

const ProfileLayout = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  useEffect(() => {
    console.log("Updated Profile");
  }, [user]);

  const isReservationActive = location.pathname.startsWith(
    "/profile/reservation"
  );
  const isOrderActive = location.pathname.startsWith("/profile/orders");
  const isProfileActive = location.pathname === "/profile";

  return (
    <div className="w-full flex flex-col">
      <section className="w-full bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56 flex justify-center items-center">
        <div className="pt-8 pl-28 flex items-center justify-center gap-6">
          <img
            src={user?.picURL !== "none" ? user?.picURL : defaultPhoto}
            alt="profile picture"
            className="h-36 w-36 rounded-full border-[6px] border-white bg-white"
          />
          <div className="flex flex-col text-white gap-2">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-lg font-semibold">{user?.email}</p>
          </div>
        </div>
      </section>

      <section className="mt-5 w-full flex flex-col items-center py-8">
        <div className="flex w-full justify-between items-center pl-16">
          <div className="flex items-center flex-1 gap-4">
            {/* NavLinks */}
            <NavLink
              className={({ isActive }) =>
                isProfileActive
                  ? "text-amberColor text-base font-medium px-2 py-1"
                  : "hover:text-white hover:bg-amberColor px-2 py-1 font-medium rounded-md transition-colors"
              }
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isReservationActive
                  ? "text-amberColor text-base font-medium px-2 py-1"
                  : "hover:text-white hover:bg-amberColor font-medium px-2 py-1 rounded-md transition-colors"
              }
              to="/profile/reservations"
            >
              Reservations
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isOrderActive
                  ? "text-amberColor text-base font-medium px-2 py-1"
                  : "hover:text-white hover:bg-amberColor font-medium px-2 py-1 rounded-md transition-colors"
              }
              to="/profile/orders"
            >
              Orders
            </NavLink>
          </div>
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default ProfileLayout;
