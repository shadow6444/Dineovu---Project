import { useEffect, useState } from "react";
import axios from "axios";
import Success from "../../../assets/Image 5.svg";

const Reservations = () => {
  const [pendingReservations, setPendingReservations] = useState([]);
  const [oldReservations, setOldReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [reservationType, setReservationType] = useState("");
  const [reservationId, setReservationId] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setPendingReservations(res.data.pending);
        setOldReservations(res.data.old);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const cancelReservation = async (id) => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.delete(
        `http://localhost:3000/api/booking/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        setPendingReservations(
          pendingReservations.filter((res) => res._id !== id)
        );
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      setIsConfirmationOpen(false);
      const res = await axios.delete(
        `http://localhost:3000/api/booking/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        setOldReservations(oldReservations.filter((res) => res._id !== id));
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <section className="mt-8 w-full flex flex-col items-center justify-center px-20 pb-10">
      <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
        My Reservations
      </h1>

      <div className="border border-amberColor rounded-lg w-full max-w-4xl bg-white shadow-lg p-5">
        <h2 className="text-lg font-semibold mb-3 text-center text-[#000033]">
          Pending Reservations
        </h2>
        {pendingReservations.length > 0 ? (
          <table className="w-full border-collapse border border-amberColor">
            <thead>
              <tr className="bg-amber-200">
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Name
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Persons
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Date
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Time
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-medium">
              {pendingReservations.map((res) => (
                <tr key={res._id} className="text-center">
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.name}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.persons}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.date}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.time}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    <button
                      onClick={() => {
                        setReservationType("cancel");
                        setReservationId(res._id);
                        setIsConfirmationOpen(true);
                      }}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="w-full text-center text-gray-700 font-medium text-lg">
            There are no reservations pending!
          </p>
        )}
      </div>

      <div className="border border-amberColor rounded-lg w-full max-w-4xl bg-white shadow-lg p-5 mt-5">
        <h2 className="text-lg font-semibold mb-3 text-center text-[#000033]">
          Old Reservations
        </h2>
        {oldReservations.length > 0 ? (
          <table className="w-full border-collapse border border-amberColor">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Name
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Persons
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Date
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Time
                </th>
                <th className="border border-amberColor text-[#000033] p-2 w-1/5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 font-medium">
              {oldReservations.map((res) => (
                <tr key={res._id} className="text-center">
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.name}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.persons}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.date}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    {res.time}
                  </td>
                  <td className="border border-amberColor p-2 w-1/5 truncate">
                    <button
                      onClick={() => {
                        setReservationType("delete");
                        setReservationId(res._id);
                        setIsConfirmationOpen(true);
                      }}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="w-full text-center text-gray-700 font-medium text-lg">
            There is no reservation history!
          </p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">
                Reservation{" "}
                {reservationType === "cancel" ? "Cancelled" : "Deleted"}
              </h2>
              <p className="text-center text-gray-600 mt-4">
                Your reservation has been{" "}
                {reservationType === "cancel" ? "cancelled" : "deleted"}{" "}
                successfully!
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
              Confirm{" "}
              {reservationType === "cancel" ? "Cacellation" : "Deletion"}
            </h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to{" "}
              {reservationType === "cancel" ? "cancel" : "delete"} reservation?
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
                  if (reservationType === "delete")
                    deleteReservation(reservationId);
                  else if (reservationType === "cancel")
                    cancelReservation(reservationId);
                }}
                className="px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reservations;
