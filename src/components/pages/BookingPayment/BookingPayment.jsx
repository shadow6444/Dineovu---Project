import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Input from "../../common components/Input";
import Profile from "../../../assets/profile.svg";
import Card from "../../../assets/Credit card.svg";
import Code from "../../../assets/Code.svg";
import Dollar from "../../../assets/Dollar.svg";
import DollarCoin from "../../../assets/DollarCoin.svg";
import Persons from "../../../assets/Persons.svg";
import Calendar from "../../../assets/Calendar.svg";
import Success from "../../../assets/Image 5.svg";
import axios from "axios";

const BookingPayment = () => {
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    card: "",
    expiredate: "",
    zipcode: "",
    billingaddress: "",
    countryname: "",
    total: "",
    terms: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name on Card is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only alphabets.";
    }

    if (!formData.card.trim()) {
      newErrors.card = "Card Number is required.";
    } else if (!/^\d{16}$/.test(formData.card)) {
      newErrors.card = "Card Number must be 16 digits.";
    }

    if (!formData.expiredate.trim()) {
      newErrors.expiredate = "Expiration Date is required.";
    } else {
      const currentDate = new Date();
      const enteredDate = new Date(formData.expiredate);
      if (enteredDate < currentDate) {
        newErrors.expiredate = "Expiration Date cannot be in the past.";
      }
    }

    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "ZIP/Postal Code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipcode)) {
      newErrors.zipcode = "Enter a valid ZIP Code (e.g., 12345 or 12345-6789).";
    }

    if (!formData.billingaddress.trim()) {
      newErrors.billingaddress = "Billing Address is required.";
    } else if (formData.billingaddress.length < 10) {
      newErrors.billingaddress =
        "Enter a complete address (e.g., Street, City, State).";
    }

    if (!formData.countryname.trim()) {
      newErrors.countryname = "Country Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.countryname)) {
      newErrors.countryname = "Country Name must contain only alphabets.";
    }

    if (!formData.total.trim()) {
      newErrors.total = "Total Amount is required.";
    } else if (
      isNaN(Number(formData.total)) ||
      Number(formData.total) < state?.formData.total
    ) {
      newErrors.total = "More Amount Required.";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms and Conditions.";
    }

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
    setIsConfirmationOpen(true);
  };

  const handleOpenConfirmationDailog = async (e) => {
    try {
      setIsConfirmationOpen(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await axios.post(
        "http://localhost:3000/api/booking",
        state.formData,
        config
      );
      console.log(response.data);
      if (response.data.success) {
        try {
          const bookingPaymentForm = {
            ...formData,
            bookingId: response.data.booking._id,
          };
          const bookingResponse = await axios.post(
            "http://localhost:3000/api/booking/payment",
            bookingPaymentForm,
            config
          );
          console.log(bookingResponse.data);
          if (bookingResponse.data.success) {
            setIsModalOpen(true);
          } else {
            console.error("Payment failed");
            alert("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert(error.response.data.message);
        }
      } else {
        console.error("Payment failed");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
        <Link
          to="/booking"
          className="flex items-center gap-2 text-lg text-white pt-6 pl-8 font-medium hover:underline whitespace-nowrap"
        >
          <span className="bg-white p-2 rounded-full">
            <FaArrowLeft className="text-amberColor" />
          </span>
          Go Back
        </Link>
        <h1 className="text-white font-medium text-2xl pt-6 pl-24">
          Book your table now for <br /> an unforgettable dining <br />{" "}
          experience!
        </h1>
      </section>

      {/* Booking Form Section */}
      <section className="mt-8 w-full flex flex-col items-center justify-center px-20 pb-10">
        <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
          Reservation Payment
        </h1>
        <form
          className="border-2 border-amberColor rounded-lg shadow-md p-6 bg-white w-[40rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-bold mb-6">Payment Form</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {[
              {
                label: "Name on Card",
                name: "name",
                type: "text",
                placeholder: "Enter Your Name",
                icon: Profile,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {[
              {
                label: "Card Number",
                name: "card",
                type: "text",
                placeholder: "Enter Card no.",
                icon: Card,
              },
              {
                label: "Expiration Date",
                name: "expiredate",
                type: "date",
                icon: Calendar,
              },
              {
                label: "ZIP/Postal Code",
                name: "zipcode",
                type: "text",
                icon: Code,
                placeholder: "Enter ZIP Code (e.g., 12345 or 12345-6789)",
              },
              {
                label: "Billing Address",
                name: "billingaddress",
                type: "text",
                icon: DollarCoin,
                placeholder:
                  "Enter Address (e.g., 123 Main St, Springfield, IL)",
              },
              {
                label: "Country",
                name: "countryname",
                type: "text",
                icon: Persons,
                placeholder: "Enter Country Name",
              },
              {
                label: `Total: ${1000 * state?.formData.persons}`,
                name: "total",
                type: "number",
                icon: Dollar,
                placeholder: "Enter Amount to Pay",
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
          <div className="mb-6 flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-gray-700"
            >
              I authorize the payment and agree to the payment terms.
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">Thank You!</h2>
              <p className="text-center text-gray-600 mt-4">
                Payment Successful! Your reservation is booked with{" "}
                <strong>
                  {state?.formData.firstname + " " + state?.formData.lastname}
                </strong>
                . Be there on <strong>{state?.formData.date}</strong> at{" "}
                <strong>{state?.formData.time}</strong>.
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
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <h2 className="text-xl font-bold text-center">Confirm Payment</h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to proceed with the payment?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-6 py-2 bg-white text-amberColor border-2 border-amberColor rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleOpenConfirmationDailog}
                className="px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPayment;
