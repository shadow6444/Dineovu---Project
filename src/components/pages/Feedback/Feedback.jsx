import { Link } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Input from "../../common components/Input";
import Profile from "../../../assets/profile.svg";
import Mail from "../../../assets/Mail.svg";
import Phone from "../../../assets/Phone fill.svg";
import Success from "../../../assets/Image 5.svg";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    overallExperience: 0,
    foodQuality: 0,
    serviceQuality: 0,
    cleanliness: 0,
    additionalInfo: "",
    terms: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim())
      newErrors.firstname = "First Name is required.";
    if (!formData.lastname.trim())
      newErrors.lastname = "Last Name is required.";
    if (!formData.email) newErrors.email = "Valid Email is required.";
    if (!/^03\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter Valid Number 03XXXXXXXXX.";
    if (!formData.terms)
      newErrors.terms = "You must agree to the Terms and Conditions.";
    if (
      formData.overallExperience === 0 ||
      formData.foodQuality === 0 ||
      formData.serviceQuality === 0 ||
      formData.cleanliness === 0
    )
      newErrors.ratings = "All rating fields must be filled.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleStarClick = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        "http://localhost:3000/api/feedback",
        formData,
        config
      );
      console.log(response.data);
      if (response.data.success) {
        setIsModalOpen(true);
      } else {
        console.error("Feedback submission failed");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response.data.message || "Something went wrong.");
    }
  };

  const renderStars = (field, currentValue) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <FaStar
            key={value}
            className={`cursor-pointer text-lg ${
              value <= currentValue ? "text-amberColor" : "text-gray-300"
            }`}
            onClick={() => handleStarClick(field, value)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex items-center bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
        <h1 className="text-white font-medium text-2xl pl-24">
          Is There Any <br /> Improvement Needed? <br /> Give Us Feedback
        </h1>
      </section>

      {/* Feedback Form Section */}
      <section className="mt-8 w-full flex flex-col items-center justify-center px-20 pb-10">
        <form
          className="border-2 border-amberColor rounded-lg shadow-md p-6 bg-white w-[40rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-bold mb-6">Feedback Form</h1>
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {[
              {
                label: "First Name",
                name: "firstname",
                type: "text",
                placeholder: "Enter Your First Name",
                icon: Profile,
              },
              {
                label: "Last Name",
                name: "lastname",
                type: "text",
                placeholder: "Enter Your Last Name",
                icon: Profile,
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "abc@gmail.com",
                icon: Mail,
              },
              {
                label: "Phone no.",
                name: "phone",
                type: "tel",
                placeholder: "03XXXXXXXXX",
                icon: Phone,
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  image={field.icon}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Details */}
          <h2 className="text-lg font-semibold mb-4">Feedback Details</h2>
          <div className="space-y-4 w-full">
            {[
              { label: "Overall Experience", field: "overallExperience" },
              { label: "Food Quality", field: "foodQuality" },
              { label: "Service Quality", field: "serviceQuality" },
              { label: "Cleanliness", field: "cleanliness" },
            ].map((item) => (
              <div
                key={item.field}
                className="flex items-center justify-between w-3/6"
              >
                <label className="text-base font-medium text-gray-700">
                  {item.label}
                </label>
                {renderStars(item.field, formData[item.field])}
              </div>
            ))}
          </div>

          <div className="mb-6 mt-6">
            <label className="block text-base font-medium text-gray-700">
              Comments
            </label>
            <textarea
              name="additionalInfo"
              placeholder="Add Comments..."
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6 flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mt-1"
              checked={formData.terms}
              onChange={handleInputChange}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-gray-700"
            >
              I agree to the Terms and Conditions to use information of feedback
              for improvement.
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600 mt-[-1rem] mb-2">
              {errors.terms}
            </p>
          )}
          <div className="flex justify-end gap-6">
            <button
              type="reset"
              className="w-28 py-2 border border-amberColor rounded-md text-sm font-medium text-amberColor hover:underline"
            >
              Clear
            </button>
            <button
              type="submit"
              className="w-28 py-2 bg-amberColor rounded-md text-sm font-medium text-white hover:bg-[#FF8D10]"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">Thank You!</h2>
              <p className="text-center text-gray-600 mt-4">
                Your Feedback has been submitted successfully.
              </p>
              <Link
                to="/home"
                className="mt-6 px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
                onClick={() => setIsModalOpen(false)}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
