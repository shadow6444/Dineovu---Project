import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { SearchContext } from "../../../layout/MenuLayout/MenuLayout.jsx";
import { useOutletContext } from "react-router-dom";

const Beverage = () => {
  const [beverages, setBeverages] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const searchQuery = useContext(SearchContext);
  // const { addToCart } = useOutletContext();

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

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const filteredBeverages = beverages.filter(
    (beverage) =>
      beverage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
                <button
                  // onClick={() => addToCart(beverage)}
                  className="bg-amberColor px-4 py-2 w-fit border-none text-sm rounded-md text-white hover:bg-[#FF8D10] mt-4"
                >
                  Add Item
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
  );
};

export default Beverage;
