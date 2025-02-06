import { useState } from "react";
import Input from "../../common components/Input";
import Success from "../../../assets/Image 5.svg";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AdminMenuUpdate = () => {
  const location = useLocation();
  const { state } = location;
  const [formData, setFormData] = useState({
    id: state?._id || "",
    price: state?.price || "",
    rating: state?.rating || "",
    isavailable: state?.isavailable || false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.id = "ID is required";

    const hasOtherFields = Object.keys(formData).some(
      (key) => key !== "id" && formData[key] !== "" && formData[key] !== false
    );

    if (!hasOtherFields)
      newErrors.general = "At least one field (other than ID) must be updated";

    if (formData.price && (isNaN(formData.price) || formData.price <= 0))
      newErrors.price = "Valid price is required";

    if (
      formData.rating &&
      (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)
    )
      newErrors.rating = "Rating must be between 0 and 5";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsConfirmationOpen(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.put(
        `http://localhost:3000/api/menu/update`,
        formData
      );
      if (res.data.success) setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Failed to update item");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <section className="mt-8 w-full flex flex-col items-center px-20 pb-10">
        <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
          Update Menu Item
        </h1>
        <form
          className="border-2 border-amberColor rounded-lg shadow-md p-6 bg-white w-[40rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-bold mb-6">Item Form</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <Input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="Enter item ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.id && <p className="text-sm text-red-600">{errors.id}</p>}
          </div>

          {["price", "rating"].map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              <Input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                placeholder={`Enter ${key} (optional)`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              {errors[key] && (
                <p className="text-sm text-red-600">{errors[key]}</p>
              )}
            </div>
          ))}

          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="isavailable"
              name="isavailable"
              checked={formData.isavailable}
              onChange={handleInputChange}
            />
            <label
              htmlFor="isavailable"
              className="text-sm font-medium text-gray-700"
            >
              Available
            </label>
          </div>

          {errors.general && (
            <p className="text-sm text-red-600">{errors.general}</p>
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
              Update Item
            </button>
          </div>
        </form>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">Item Updated</h2>
              <p className="text-center text-gray-600 mt-4">
                Item has been updated successfully!
              </p>
              <button
                className="mt-6 px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
                onClick={() => setIsModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <h2 className="text-xl font-bold text-center">
              Confirm Update Item
            </h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to update this item?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-6 py-2 bg-white text-amberColor border-2 border-amberColor rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
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

export default AdminMenuUpdate;
