import { useState, createContext } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import ShoppingCart from "../../pages/ShoppingCart";

export const SearchContext = createContext();

const MenuLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      if (updatedItems[existingItemIndex].quantity === 5) {
        alert("You can't add more than 5 items");
        return;
      }
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <SearchContext.Provider value={searchQuery}>
      <div className="w-full flex flex-col">
        {/* Hero Section */}
        <section className="w-full flex items-center bg-gradient-to-r from-[#FD9727] to-[#F1B500] h-56">
          <h1 className="text-white font-medium text-2xl pl-24">
            Delight in Every Bite – A <br /> Menu Full of Flavors to Explore!
          </h1>
        </section>

        {/* Main Content */}
        <section className="mt-5 w-full flex flex-col items-center py-8">
          <div className="flex w-full justify-between items-center mb-8 pl-16">
            <h1 className="font-bold text-left flex-1 w-full text-[#000033] text-2xl">
              Our Menu!
            </h1>
            <div className="flex items-center flex-1 gap-4">
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
              {/* NavLinks */}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-amberColor text-base font-medium px-2 py-1"
                    : "hover:text-white hover:bg-amberColor px-2 py-1 font-medium rounded-md transition-colors"
                }
                to="/menu/starter"
              >
                Starter
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-amberColor text-base font-medium px-2 py-1"
                    : "hover:text-white hover:bg-amberColor font-medium px-2 py-1 rounded-md transition-colors"
                }
                to="/menu/beverage"
              >
                Beverages
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-amberColor text-base font-medium px-2 py-1"
                    : "hover:text-white hover:bg-amberColor font-medium px-2 py-1 rounded-md transition-colors"
                }
                to="/menu/maincourse"
              >
                Main Course
              </NavLink>
            </div>
          </div>
          <Outlet context={{ addToCart }} />
        </section>

        {/* Shopping Cart */}
        <ShoppingCart cartItems={cartItems} removeItem={removeItem} />
      </div>
    </SearchContext.Provider>
  );
};

export default MenuLayout;
