import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import store from "../redux/store.js";

import { useEffect, useState } from "react";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import ForgotPassword from "./components/pages/ForgotPassword";
import Welcome from "./components/pages/Welcome";
import Login from "./components/pages/Login";
import NewPassword from "./components/pages/NewPassword";
import NewPasswordSuccess from "./components/pages/NewPasswordSuccess";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Signup from "./components/pages/Signup";
import LoginProtectedRoutes from "./components/layout/LoginProtectedRoutes";
import Home from "./components/pages/Home";
import Booking from "./components/pages/Booking";
import BookingPayment from "./components/pages/BookingPayment/BookingPayment.jsx";
import Feedback from "./components/pages/Feedback";
import PageNotFound from "./components/pages/PageNotFound";
import Game from "./components/pages/Game";
import Playground from "./components/pages/Playground";
import About from "./components/pages/About";
import Starter from "./components/pages/Menu/Starter";
import Beverage from "./components/pages/Menu/Beverage";
import MainCourse from "./components/pages/Menu/MainCourse";
import MenuLayout from "./components/layout/MenuLayout/MenuLayout.jsx";
import OrderPayment from "./components/pages/OrderPayment";
import ProfileLayout from "./components/layout/ProfileLayout";
import Profile from "./components/pages/Profile";
import Reservations from "./components/pages/Reservations";
import Orders from "./components/pages/Orders";

function App() {
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    const resetEmail = localStorage.getItem("resetEmail");
    setIsEmailEntered(!!resetEmail);

    const passwordResetSuccessful = localStorage.getItem(
      "passwordResetSuccessful"
    );
    console.log(
      "password reset successfult from appjs",
      passwordResetSuccessful
    );
    setIsPasswordReset(!!passwordResetSuccessful);
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route
              path="newpassword"
              element={
                <ProtectedRoute
                  condition={isEmailEntered}
                  redirectTo="/auth/login"
                >
                  <NewPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="newpassword/successful"
              element={
                <ProtectedRoute
                  condition={isPasswordReset}
                  redirectTo="/auth/newpassword"
                >
                  <NewPasswordSuccess />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route element={<LoginProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/games" element={<Game />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/payment" element={<BookingPayment />} />
              <Route element={<MenuLayout />}>
                <Route path="/menu/starter" element={<Starter />} />
                <Route path="/menu/beverage" element={<Beverage />} />
                <Route path="/menu/maincourse" element={<MainCourse />} />
              </Route>
              <Route path="/order/payment" element={<OrderPayment />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<Profile />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
