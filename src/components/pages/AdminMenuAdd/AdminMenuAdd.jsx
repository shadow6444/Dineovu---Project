import { useState } from "react";
import Input from "../../common components/Input";
import Success from "../../../assets/Image 5.svg";
import axios from "axios";

const AdminMenuAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    tags: "",
    ingredients: "",
    rating: "",
    type: "starter",
    isavailable: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.price.trim() || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.tags.trim()) newErrors.tags = "Tags are required";
    if (!formData.ingredients.trim())
      newErrors.ingredients = "Ingredients are required";
    if (
      !formData.rating.trim() ||
      isNaN(formData.rating) ||
      formData.rating < 0 ||
      formData.rating > 5
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

  const handleConfirmAdd = async () => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.post(
        "http://localhost:3000/api/menu/add",
        formData
      );
      if (res.data.success) setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <section className="mt-8 w-full flex flex-col items-center px-20 pb-10">
        <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
          Add a New Menu Item
        </h1>
        <form
          className="border-2 border-amberColor rounded-lg shadow-md p-6 bg-white w-[40rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-bold mb-6">Item Form</h1>
          {Object.keys(formData).map((key) =>
            key === "description" ? (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                <textarea
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${key}`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none resize-none h-24"
                />
                {errors[key] && (
                  <p className="text-sm text-red-600">{errors[key]}</p>
                )}
              </div>
            ) : key !== "isavailable" && key !== "type" ? (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                <Input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${key}`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-amberColor focus:border-amberColor"
                />
                {errors[key] && (
                  <p className="text-sm text-red-600">{errors[key]}</p>
                )}
              </div>
            ) : null
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="border rounded p-2 w-full focus:outline-none"
            >
              <option value="starter">Starter</option>
              <option value="beverage">Beverage</option>
              <option value="maincourse">Main Course</option>
            </select>
          </div>
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
              Add Item
            </button>
          </div>
        </form>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">Item Added</h2>
              <p className="text-center text-gray-600 mt-4">
                Item has been added successfully!
              </p>
              <button
                className="mt-6 px-6 py-2 bg-amberColor border-none text-white rounded-lg hover:bg-[#FF8D10]"
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
            <h2 className="text-xl font-bold text-center">Confirm Add Item</h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to add item?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-6 py-2 bg-white text-amberColor border-2 border-amberColor rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
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

export default AdminMenuAdd;
