import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../common components/Input";
import Password from "../../../assets/password.svg";
import Button from "../../common components/Button";
import axios from "axios";

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      navigate("/auth/forgotpassword");
    } else {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [navigate]);

  const handleFormPasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

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
      const response = await axios.put(
        "http://localhost:3000/api/user/update",
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("passwordResetSuccessful", "true");
        console.log("navigating to success page from newpassword")
        navigate("/auth/newpassword/successful");
      } else {
        console.error("Update Password failed:", response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("different")) {
          newErrors.newPassword = message;
          setErrors(newErrors);
        } else {
          console.error("Unexpected error:", message);
        }
      } else console.error("Update Password Error:", error);
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
        <div className="w-full my-2 flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">Create New Password</h3>
          <p className="text-sm text-gray-400">
            Your new password must be different from previous used password
          </p>
        </div>
        <form
          onSubmit={handleFormPasswordReset}
          className="w-full flex flex-col gap-4"
        >
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
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-[-10px]">
              {errors.newPassword}
            </p>
          )}
          <p className="text-sm text-gray-400 text-right">
            Both Password Must Match
          </p>
          {isLoading ? (
            <Button
              type="submit"
              disabled={true}
              cssClasses="w-full rounded-[20px] bg-gray-500 text-gray-300 cursor-not-allowed px-5 py-2"
            >
              Continuing...
            </Button>
          ) : (
            <Button
              type="submit"
              cssClasses="w-full rounded-[20px] bg-amberColor hover:bg-amber-500 text-white cursor-pointer px-5 py-2"
            >
              Continue
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
