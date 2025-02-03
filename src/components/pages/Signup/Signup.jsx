import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common components/Input";
import Profile from "../../../assets/Profile.svg";
import Mail from "../../../assets/Mail.svg";
import Password from "../../../assets/password.svg";
import { Link } from "react-router-dom";
import Button from "../../common components/Button";
import GoogleButton from "../../common components/GoogleButton";
import { auth, googleProvider, signInWithPopup } from "../../../firebaseConfig";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await axios.post("http://localhost:3000/api/user/signup", {
        name: user.displayName,
        email: user.email,
        picURL: user.photoURL,
        password: "googlePass",
      });
      console.log("User Info:", user);
      navigate("/home");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleFormSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/auth/login");
      } else {
        console.error("Signup failed:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("Email")) {
          newErrors.email = message;
          setErrors(newErrors);
        } else {
          console.error("Unexpected error:", message);
        }
      } else console.error("Signup Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col items-center gap-4 w-[45%]">
        <div className="w-full my-2">
          <h3 className="text-2xl font-semibold">Sign Up</h3>
        </div>
        <form
          onSubmit={handleFormSignup}
          className="w-full flex flex-col gap-4"
        >
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            image={Profile}
            placeholder="Full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.name}</p>
          )}
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            image={Mail}
            placeholder="abc@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.email}</p>
          )}
          <Input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            image={Password}
            placeholder="Your Password"
            password={true}
            togglePassword={togglePassword}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-[-10px]">{errors.password}</p>
          )}
          <Input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            image={Password}
            placeholder="Confirm Password"
            password={true}
            togglePassword={toggleConfirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-[-10px]">
              {errors.confirmPassword}
            </p>
          )}
          {isLoading ? (
            <Button
              type="submit"
              disabled={true}
              cssClasses="w-full rounded-[20px] bg-gray-500 text-gray-300 cursor-not-allowed px-5 py-2"
            >
              Signing...
            </Button>
          ) : (
            <Button
              type="submit"
              cssClasses="w-full rounded-[20px] bg-amberColor hover:bg-amber-500 text-white cursor-pointer px-5 py-2"
            >
              Sign Up
            </Button>
          )}
        </form>
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="left-line rounded"></div>
          <div className="text-sm text-gray-500">OR</div>
          <div className="right-line rounded"></div>
        </div>
        <GoogleButton
          onSelect={handleGoogleLogin}
          cssClasses="w-full rounded-[20px] bg-white text-gray-500 px-5 py-2"
        >
          Login with Google
        </GoogleButton>
        <div className="flex items-center justify-center gap-2 mt-3">
          <p className="text-gray-500 text-base">Already have an account?</p>
          <Link
            to="/auth/login"
            className="text-amberColor text-base hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
