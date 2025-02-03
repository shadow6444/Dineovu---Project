import { useEffect, useState } from "react";
import axios from "axios";
import Success from "../../../assets/Image 5.svg";
import { BiSort } from "react-icons/bi";

const Orders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [oldOrders, setOldOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderType, setOrderType] = useState("");
  const [orderId, setOrderId] = useState("");
  const [sortState, setSortState] = useState({
    pending: "original",
    old: "original",
  });
  const [originalOrders, setOriginalOrders] = useState({
    pending: [],
    old: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setPendingOrders(res.data.pending);
        setOldOrders(res.data.old);
        setOriginalOrders((prevState) => ({
          old: res.data.old,
          pending: res.data.pending,
        }));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderDetails(res.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const formatTime = (dateTime) => new Date(dateTime).toLocaleTimeString();
  const formatDate = (dateTime) => new Date(dateTime).toLocaleDateString();

  const sortPendingOrdersByAmount = () => {
    if (sortState.pending === "original") {
      setPendingOrders(
        [...pendingOrders].sort((a, b) => a.totalAmount - b.totalAmount)
      );
      setSortState((prevState) => ({ ...prevState, pending: "ascending" }));
    } else if (sortState.pending === "ascending") {
      setPendingOrders(
        [...pendingOrders].sort((a, b) => b.totalAmount - a.totalAmount)
      );
      setSortState((prevState) => ({ ...prevState, pending: "descending" }));
    } else {
      setPendingOrders([...originalOrders.pending]);
      setSortState((prevState) => ({ ...prevState, pending: "original" }));
    }
  };

  const sortOldOrdersByAmount = () => {
    if (sortState.old === "original") {
      setOldOrders(
        [...oldOrders].sort((a, b) => a.totalAmount - b.totalAmount)
      );
      setSortState((prevState) => ({ ...prevState, old: "ascending" }));
    } else if (sortState.old === "ascending") {
      setOldOrders(
        [...oldOrders].sort((a, b) => b.totalAmount - a.totalAmount)
      );
      setSortState((prevState) => ({ ...prevState, old: "descending" }));
    } else {
      setOldOrders([...originalOrders.old]);
      setSortState((prevState) => ({ ...prevState, old: "original" }));
    }
  };

  const sortPendingOrdersByDate = () => {
    if (sortState.pending === "original") {
      setPendingOrders(
        [...pendingOrders].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
      setSortState((prevState) => ({ ...prevState, pending: "dateAscending" }));
    } else if (sortState.pending === "dateAscending") {
      setPendingOrders(
        [...pendingOrders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setSortState((prevState) => ({
        ...prevState,
        pending: "dateDescending",
      }));
    } else {
      setPendingOrders([...originalOrders.pending]);
      setSortState((prevState) => ({ ...prevState, pending: "original" }));
    }
  };

  const sortOldOrdersByDate = () => {
    if (sortState.old === "original") {
      setOldOrders(
        [...oldOrders].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
      setSortState((prevState) => ({ ...prevState, old: "dateAscending" }));
    } else if (sortState.old === "dateAscending") {
      setOldOrders(
        [...oldOrders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setSortState((prevState) => ({ ...prevState, old: "dateDescending" }));
    } else {
      setOldOrders([...originalOrders.old]);
      setSortState((prevState) => ({ ...prevState, old: "original" }));
    }
  };

  const cancelOrder = async (id) => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.delete(`http://localhost:3000/api/order/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setPendingOrders(pendingOrders.filter((res) => res._id !== id));
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.delete(`http://localhost:3000/api/order/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) {
        setOldOrders(oldOrders.filter((res) => res._id !== id));
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <section className="mt-8 w-full flex flex-col items-center justify-center px-20 pb-10">
      <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
        My Orders
      </h1>

      <div className="border border-amberColor rounded-lg w-full bg-white shadow-lg p-5">
        <h2 className="text-lg font-semibold mb-3 text-center text-[#000033]">
          Pending Orders
        </h2>
        {pendingOrders.length > 0 ? (
          <table className="w-full border-collapse border border-amberColor">
            <thead>
              <tr className="bg-amber-200">
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  User Name
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Order ID
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  <div className="flex justify-center items-center gap-1">
                    <h2>Order Date</h2>
                    <button
                      onClick={sortPendingOrdersByDate}
                      className="border-none hover:bg-amberColor transition-colors hover:text-white px-1 py-1 rounded-full"
                    >
                      <BiSort className="text-gray-600 text-inherit text-base" />
                    </button>
                  </div>
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Order Time
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Completion Time
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  <div className="flex justify-center items-center gap-1">
                    <h2>Total Amount</h2>
                    <button
                      onClick={sortPendingOrdersByAmount}
                      className="border-none hover:bg-amberColor transition-colors hover:text-white px-1 py-1 rounded-full"
                    >
                      <BiSort className="text-gray-600 text-inherit text-base" />
                    </button>
                  </div>
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-medium">
              {pendingOrders.map((res) => (
                <tr key={res._id} className="text-center">
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {res.userId.name}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {res._id}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {formatDate(res.createdAt)}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {formatTime(res.createdAt)}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {formatTime(res.expiredAt)}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    ${res.totalAmount}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => {
                          setOrderId(res._id);
                          fetchOrderDetails(res._id);
                          setIsViewModalOpen(true);
                        }}
                        className="px-2 py-1 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setOrderType("cancel");
                          setOrderId(res._id);
                          setIsConfirmationOpen(true);
                        }}
                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="w-full text-center text-gray-700 font-medium text-lg">
            There are no orders pending!
          </p>
        )}
      </div>

      <div className="border border-amberColor rounded-lg w-full bg-white shadow-lg p-5 mt-5">
        <h2 className="text-lg font-semibold mb-3 text-center text-[#000033]">
          Old Orders
        </h2>
        {oldOrders.length > 0 ? (
          <table className="w-full border-collapse border border-amberColor">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  User Name
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Order ID
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  <div className="flex justify-center items-center gap-1">
                    <h2>Order Date</h2>
                    <button
                      onClick={sortOldOrdersByDate}
                      className="border-none hover:bg-amberColor transition-colors hover:text-white px-1 py-1 rounded-full"
                    >
                      <BiSort className="text-gray-600 text-inherit text-base" />
                    </button>
                  </div>
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Order Time
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Completion Time
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  <div className="flex justify-center items-center gap-1">
                    <h2>Total Amount</h2>
                    <button
                      onClick={sortOldOrdersByAmount}
                      className="border-none hover:bg-amberColor transition-colors hover:text-white px-1 py-1 rounded-full"
                    >
                      <BiSort className="text-gray-600 text-inherit text-base" />
                    </button>
                  </div>
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-[14.28%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-medium">
              {oldOrders.map((res) => (
                <tr key={res._id} className="text-center">
                  <td className="border border-amberColor p-2 truncate">
                    {res.userId.name}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {res._id}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {formatDate(res.createdAt)}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {formatTime(res.createdAt)}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    {formatTime(res.expiredAt)}
                  </td>
                  <td className="border border-amberColor p-2 truncate w-[14.28%]">
                    ${res.totalAmount}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => {
                          setOrderId(res._id);
                          fetchOrderDetails(res._id);
                          setIsViewModalOpen(true);
                        }}
                        className="px-2 py-1 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setOrderType("delete");
                          setOrderId(res._id);
                          setIsConfirmationOpen(true);
                        }}
                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="w-full text-center text-gray-700 font-medium text-lg">
            There are no old orders!
          </p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">
                Order {orderType === "cancel" ? "Cancelled" : "Deleted"}
              </h2>
              <p className="text-center text-gray-600 mt-4">
                Your order has been{" "}
                {orderType === "cancel" ? "cancelled" : "deleted"} successfully!
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
            <h2 className="text-xl font-bold text-center">
              Confirm {orderType === "cancel" ? "Cacellation" : "Deletion"}
            </h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to{" "}
              {orderType === "cancel" ? "cancel" : "delete"} order?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-6 py-2 bg-white text-amberColor border-2 border-amberColor rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (orderType === "delete") deleteOrder(orderId);
                  else if (orderType === "cancel") cancelOrder(orderId);
                }}
                className="px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {isViewModalOpen && orderDetails && (
        <div className="fixed inset-0 w-full mt-12 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6">
            <h2 className="text-center text-2xl text-[#000033] font-bold">
              Dineovu
            </h2>
            <h3 className="text-center text-xl text-[#000033] font-semibold">
              Order Receipt
            </h3>
            <p className="text-gray-700">
              <strong className="font-semibold text-[#000033]">
                User Name:
              </strong>{" "}
              {orderDetails.userId.name}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold text-[#000033]">User ID:</strong>{" "}
              {orderDetails.userId._id}
            </p>
            <p className="text-gray-700">
              <strong className="font-semibold text-[#000033]">
                Order ID:
              </strong>{" "}
              {orderDetails._id}
            </p>
            <div className="max-h-52 overflow-y-auto mt-4">
              <table className="w-full border-collapse border border-amberColor mt-4 text-center">
                <thead>
                  <tr className="bg-amber-200">
                    <th className="border border-amberColor text-[#000033] p-2">
                      Item Name
                    </th>
                    <th className="border border-amberColor text-[#000033] p-2">
                      Item Id
                    </th>
                    <th className="border border-amberColor text-[#000033] p-2">
                      Item Price
                    </th>
                    <th className="border border-amberColor text-[#000033] p-2">
                      Quantity
                    </th>
                    <th className="border border-amberColor text-[#000033] p-2">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {orderDetails.items.map((item) => (
                    <tr key={item.itemId._id}>
                      <td className="border border-amberColor p-2">
                        {item.itemId.name}
                      </td>
                      <td className="border border-amberColor p-2">
                        {item.itemId._id}
                      </td>
                      <td className="border border-amberColor p-2">
                        ${item.itemId.price}
                      </td>
                      <td className="border border-amberColor p-2">
                        {item.quantity}
                      </td>
                      <td className="border border-amberColor p-2">
                        ${item.itemId.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-bold text-[#000033] w-full flex justify-end">
              Total Amount: ${orderDetails.totalAmount}
            </p>
            <div className="w-full flex justify-end">
              <button
                className="mt-6 px-6 py-2 bg-amberColor border-none text-white rounded-lg hover:bg-[#FF8D10]"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Orders;
