import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cartItems, removeItem }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(cartItems);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(cartItems);
    calculateTotal(cartItems);
  }, [cartItems]);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleIncrementQuantity = (itemIndex) => {
    const updatedItems = [...cart];
    if (updatedItems[itemIndex].quantity < 5) {
      updatedItems[itemIndex].quantity += 1;
      setCart(updatedItems);
      calculateTotal(updatedItems);
    }
  };

  const handleDecrementQuantity = (itemIndex) => {
    const updatedItems = [...cart];
    if (updatedItems[itemIndex].quantity > 1) {
      updatedItems[itemIndex].quantity -= 1;
      setCart(updatedItems);
      calculateTotal(updatedItems);
    }
  };

  const handleRemoveAllItems = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <>
      {/* Shopping Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-5 right-5 bg-amberColor text-white p-4 rounded-full shadow-lg z-40"
      >
        <FaShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
            •
          </span>
        )}
      </button>

      {/* Side Menu */}
      <div
        className={`fixed overflow-y-auto top-0 right-0 w-[420px] h-full pt-16 bg-[#F9F9F9] shadow-lg transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <button
          onClick={toggleCart}
          className="text-lg text-gray-500 flex items-center gap-1 pt-6 px-4 hover:underline"
        >
          Close Cart{" "}
          <IoClose className="bg-amberColor rounded-full text-white h-5 w-5" />
        </button>
        <div className="px-4 space-y-4">
          <h2 className="text-xl font-semibold py-4">My Order</h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[52px] w-20 rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm font-medium">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDecrementQuantity(index)}
                    disabled={item.quantity === 1}
                    className={`${
                      item.quantity === 1 ? "cursor-not-allowed" : ""
                    } bg-white text-base text-gray-500 font-medium shadow-inner shadow-slate-300 flex items-center justify-center px-2 rounded-md`}
                  >
                    -
                  </button>
                  <p className="bg-white text-base text-gray-500 font-medium shadow-slate-300 shadow-inner flex items-center justify-center px-2 rounded-md">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => handleIncrementQuantity(index)}
                    disabled={item.quantity === 5}
                    className={`${
                      item.quantity === 5 ? "cursor-not-allowed" : ""
                    } bg-white text-base text-gray-500 font-medium shadow-inner shadow-slate-300 flex items-center justify-center px-2 rounded-md`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 ml-2"
                  >
                    <MdDelete className="text-red text-2xl hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Amount & Buttons */}
        {cart.length > 0 && (
          <div className="px-4 my-8 w-full">
            {/* Total Amount Display */}
            <div className="flex justify-end items-center pb- gap-4">
              <h3 className="text-lg font-medium">Total:</h3>
              <p className="text-lg font-medium text-gray-500">Rs. {total}</p>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  navigate("/order/payment", { state: { cart, total } });
                }}
                className=" bg-amberColor text-white py-2 px-7 border-none text-sm rounded-md hover:bg-[#FF8D10]"
              >
                Pay Now
              </button>
              <button
                onClick={handleRemoveAllItems}
                className=" bg-white text-amberColor py-2 px-9 border-amberColor border-2 text-sm rounded-md hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
