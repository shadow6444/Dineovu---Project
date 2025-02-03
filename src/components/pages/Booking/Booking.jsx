import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../common components/Input";
import Profile from "../../../assets/profile.svg";
import Mail from "../../../assets/Mail.svg";
import Phone from "../../../assets/Phone fill.svg";
import Calendar from "../../../assets/Calendar.svg";
import Time from "../../../assets/Timer.svg";
import Persons from "../../../assets/Persons.svg";

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    persons: "",
    seating: "",
    additionalInfo: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    const today = new Date();
    const enteredDate = new Date(formData.date);
    const enteredTime = formData.time;

    if (!formData.firstname.trim())
      newErrors.firstname = "First Name is required.";

    if (!formData.lastname.trim())
      newErrors.lastname = "Last Name is required.";

    if (!formData.email.trim()) newErrors.email = "Valid Email is required.";

    if (!/^03\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter Valid Number 03XXXXXXXXX.";

    if (!formData.date) {
      newErrors.date = "Date is required.";
    } else if (enteredDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      newErrors.date = "Date cannot be in the past.";
    }

    if (!formData.time) {
      newErrors.time = "Time is required.";
    } else if (
      formData.date &&
      enteredDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
    ) {
      const currentTime = today.toTimeString().slice(0, 5);
      if (enteredTime < currentTime) {
        newErrors.time = "Time cannot be in the past.";
      }
    }

    if (!formData.persons || formData.persons <= 0)
      newErrors.persons = "People should be greater than 0.";

    if (!formData.terms)
      newErrors.terms = "You must agree to the Terms and Conditions.";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    navigate("/booking/payment", {
      state: { formData: formData },
    });
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex items-center bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
        <h1 className="text-white font-medium text-2xl pl-24">
          Book your table now for <br /> an unforgettable dining <br />{" "}
          experience!
        </h1>
      </section>

      {/* Booking Form Section */}
      <section className="mt-8 w-full flex flex-col items-center justify-center px-20 pb-10">
        <div className="w-full flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 ">Book Your Table</h2>
          <p className="flex items-center justify-center gap-8">
            <span className="flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Available: 12
            </span>
            <span className="flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
              Unavailable: 16
            </span>
          </p>
        </div>
        <form
          className="border-2 border-amberColor rounded-lg shadow-md p-6 bg-white w-[40rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-bold mb-6">
            Reservation Form
          </h1>
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
          {/* Reservation Details */}
          <h2 className="text-lg font-semibold mb-2">Reservation Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {[
              { label: "Date", name: "date", type: "date", icon: Calendar },
              { label: "Time", name: "time", type: "time", icon: Time },
              {
                label: "Number of People",
                name: "persons",
                type: "number",
                placeholder: "1",
                icon: Persons,
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Additional Info
            </label>
            <textarea
              name="additionalInfo"
              placeholder="Any Additional Info..."
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
              I agree to the Terms and Conditions, including the cancellation
              and no-show policy.
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
              Reset
            </button>
            <button
              type="submit"
              className="w-28 py-2 bg-amberColor rounded-md text-sm font-medium text-white hover:bg-[#FF8D10]"
            >
              Pay Now
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Booking;
