import { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Success from "../../../assets/Image 5.svg";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [starters, setStarters] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [mainCourse, setMainCourse] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemType, setItemType] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const deleteItem = async (id) => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.delete(`http://localhost:3000/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        if (itemType === "starter")
          setStarters(starters.filter((res) => res._id !== id));
        else if (itemType === "beverage")
          setBeverages(beverages.filter((res) => res._id !== id));
        else if (itemType === "maincourse")
          setMainCourse(mainCourse.filter((res) => res._id !== id));
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchStarters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/menu/starter"
        );
        console.log(response.data.data);
        setStarters(response.data.data);
      } catch (error) {
        console.error("Error fetching starters:", error);
      }
    };

    fetchStarters();
  }, []);

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/menu/beverage"
        );
        console.log(response.data.data);
        setBeverages(response.data.data);
      } catch (error) {
        console.error("Error fetching beverages:", error);
      }
    };

    fetchBeverages();
  }, []);

  useEffect(() => {
    const fetchMainCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/menu/maincourse"
        );
        console.log(response.data.data);
        setMainCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching mainCourse:", error);
      }
    };

    fetchMainCourse();
  }, []);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const filteredStarters = starters.filter(
    (starter) =>
      starter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      starter.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBeverages = beverages.filter(
    (beverage) =>
      beverage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMainCourse = mainCourse.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Main Content */}
      <section className="mt-5 w-full flex flex-col items-center py-8">
        <div className="flex w-full justify-between items-center mb-8 pl-16">
          <h1 className="font-bold text-left flex-1 w-full text-[#000033] text-2xl">
            Starters
          </h1>
          <div className="flex items-center justify-end pr-16 flex-1 gap-4">
            {/* Search Input */}
            <div className="px-2 py-2 bg-amberColor text-white rounded-full mr-[-6px]">
              <FaSearch />
            </div>
            <input
              type="search"
              placeholder="Search by name or tag"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-b-2 border-b-amberColor px-2 py-2 focus:outline-none shadow-inner rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 px-4 max-w-7xl mx-auto pb-8">
          {filteredStarters.length > 0 ? (
            filteredStarters.map((starter) => (
              <div
                key={starter._id}
                className="relative flex flex-col bg-white rounded-md font-medium shadow-lg p-4 w-[335px]"
                onMouseEnter={() => handleMouseEnter(starter)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={starter.image}
                  alt={starter.name}
                  className="rounded-md mb-4 h-[209px] w-[335px]"
                />
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex flex-1 flex-col justify-between h-full">
                    <h4 className="text-[#000033] font-semibold text-lg">
                      {starter.name}
                    </h4>
                    <div className="flex text-lg text-gray-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < starter.rating
                              ? "text-amberColor"
                              : "text-gray-400"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-1 justify-end items-center flex-col">
                    <h4 className="text-[#000033] w-full text-right font-semibold text-lg">
                      Rs. {starter.price}
                    </h4>
                    <Link
                      to="/menu/update"
                      state={starter}
                      className="bg-amberColor px-4 py-2 text-center w-full border-none text-sm rounded-md text-white hover:bg-[#FF8D10] mt-4"
                    >
                      Update Item
                    </Link>
                    <button
                      onClick={() => {
                        setItemId(starter._id);
                        setItemType("starter");
                        setIsConfirmationOpen(true);
                      }}
                      className="bg-red-500 px-4 py-2 w-full border-none text-sm rounded-md text-white hover:bg-red-600 mt-4"
                    >
                      Delete Item
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredItem?._id === starter._id && (
                    <motion.div
                      className="absolute top-0 left-0 bg-white shadow-lg rounded-lg p-4 w-full z-40"
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-lg font-bold">{hoveredItem.name}</h4>
                      <p className="text-sm mt-2 text-gray-500">
                        {hoveredItem.description}
                      </p>
                      <p className="text-sm mt-2 text-gray-900 font-semibold">
                        Ingredients:{" "}
                        <span className="text-gray-500 font-medium">
                          {hoveredItem.ingredients}
                        </span>
                      </p>
                      <p className=" mt-2 text-gray-900 flex flex-wrap text-sm font-semibold items-center gap-2">
                        Tags:
                        {starter.tags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 text-amberColor rounded-[4px] bg-white border-amberColor border-2"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg text-center">
              No items match your search.
            </p>
          )}
        </div>
        <section className="flex w-full flex-col justify-between items-center] py-8 bg-[#F9F9F9]">
          <h1 className="font-bold text-left flex-1 w-full text-[#000033] mb-8 pl-16 text-2xl">
            Beverages
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 px-4 max-w-7xl mx-auto">
            {filteredBeverages.length > 0 ? (
              filteredBeverages.map((beverage) => (
                <div
                  key={beverage._id}
                  className="relative flex flex-col bg-white rounded-md font-medium shadow-lg p-4 w-[335px]"
                  onMouseEnter={() => handleMouseEnter(beverage)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={beverage.image}
                    alt={beverage.name}
                    className="rounded-md mb-4 h-[209px] w-[335px]"
                  />
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex flex-1 flex-col justify-between h-full">
                      <h4 className="text-[#000033] font-semibold text-lg">
                        {beverage.name}
                      </h4>
                      <div className="flex text-lg text-gray-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < beverage.rating
                                ? "text-amberColor"
                                : "text-gray-400"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-1 justify-end items-end flex-col">
                      <h4 className="text-[#000033] w-full text-right font-semibold text-lg mb-4">
                        Rs. {beverage.price}
                      </h4>
                      <Link
                        to="/menu/update"
                        state={beverage}
                        className="bg-amberColor px-4 py-2 text-center w-full border-none text-sm rounded-md text-white hover:bg-[#FF8D10] mt-4"
                      >
                        Update Item
                      </Link>
                      <button
                        onClick={() => {
                          setItemId(beverage._id);
                          setItemType("beverage");
                          setIsConfirmationOpen(true);
                        }}
                        className="bg-red-500 px-4 py-2 w-full border-none text-sm rounded-md text-white hover:bg-red-600 mt-4"
                      >
                        Delete Item
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {hoveredItem?._id === beverage._id && (
                      <motion.div
                        className={`absolute top-0 left-0 bg-white shadow-lg rounded-lg p-4 w-full z-40`}
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-lg font-bold">
                          {hoveredItem.name}
                        </h4>
                        <p className="text-sm mt-2 text-gray-500">
                          {hoveredItem.description}
                        </p>
                        <p className="text-sm mt-2 text-gray-900 font-semibold">
                          Ingredients:{" "}
                          <span className="text-gray-500 font-medium">
                            {hoveredItem.ingredients}
                          </span>
                        </p>
                        <p className=" mt-2 text-gray-900 flex flex-wrap text-sm font-semibold items-center gap-2">
                          Tags:
                          {beverage.tags.split(",").map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 text-amberColor rounded-[4px] bg-white border-amberColor border-2"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg text-center">
                No items match your search.
              </p>
            )}
          </div>
        </section>
        <section className="flex w-full flex-col justify-between items-center] py-8">
          <h1 className="font-bold text-left flex-1 w-full text-[#000033] mb-8 pl-16 text-2xl">
            Main Course
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 px-4 max-w-7xl mx-auto">
            {filteredMainCourse.length > 0 ? (
              filteredMainCourse.map((mainCourse) => (
                <div
                  key={mainCourse._id}
                  className="relative flex flex-col bg-white rounded-md font-medium shadow-lg p-4 w-[335px]"
                  onMouseEnter={() => handleMouseEnter(mainCourse)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={mainCourse.image}
                    alt={mainCourse.name}
                    className="rounded-md mb-4 h-[209px] w-[335px]"
                  />
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex flex-1 flex-col justify-between h-full">
                      <h4 className="text-[#000033] font-semibold text-lg">
                        {mainCourse.name}
                      </h4>
                      <div className="flex text-lg text-gray-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < mainCourse.rating
                                ? "text-amberColor"
                                : "text-gray-400"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-1 justify-end items-end flex-col">
                      <h4 className="text-[#000033] w-full text-right font-semibold text-lg mb-4">
                        Rs. {mainCourse.price}
                      </h4>
                      <Link
                        to="/menu/update"
                        state={mainCourse}
                        className="bg-amberColor text-center px-4 py-2 w-full border-none text-sm rounded-md text-white hover:bg-[#FF8D10] mt-4"
                      >
                        Update Item
                      </Link>
                      <button
                        onClick={() => {
                          setItemId(mainCourse._id);
                          setItemType("maincourse");
                          setIsConfirmationOpen(true);
                        }}
                        className="bg-red-500 px-4 py-2 w-full border-none text-sm rounded-md text-white hover:bg-red-600 mt-4"
                      >
                        Delete Item
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {hoveredItem?._id === mainCourse._id && (
                      <motion.div
                        className={`absolute top-0 left-0 bg-white shadow-lg rounded-lg p-4 w-full z-40`}
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-lg font-bold">
                          {hoveredItem.name}
                        </h4>
                        <p className="text-sm mt-2 text-gray-500">
                          {hoveredItem.description}
                        </p>
                        <p className="text-sm mt-2 text-gray-900 font-semibold">
                          Ingredients:{" "}
                          <span className="text-gray-500 font-medium">
                            {hoveredItem.ingredients}
                          </span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg text-center">
                No items match your search.
              </p>
            )}
          </div>
        </section>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">
                {itemType === "starter"
                  ? "Starter"
                  : itemType === "beverage"
                  ? "Beverage"
                  : "Main Course"}
                Deleted
              </h2>
              <p className="text-center text-gray-600 mt-4">
                {itemType === "starter"
                  ? "Starter"
                  : itemType === "beverage"
                  ? "Beverage"
                  : "Main Course"}{" "}
                has been deleted successfully!
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
            <h2 className="text-xl font-bold text-center">Confirm Deletion</h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to delete{" "}
              {itemType === "starter"
                ? "starter"
                : itemType === "beverage"
                ? "beverage"
                : "main course"}
              ?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-6 py-2 bg-white text-amberColor border-2 border-amberColor rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteItem(itemId)}
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

export default AdminMenu;
