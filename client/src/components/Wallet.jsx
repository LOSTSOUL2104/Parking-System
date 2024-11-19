import { useState, useEffect } from "react";
import { FaPlus, FaHistory } from "react-icons/fa";
import axios from "axios";

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState({
    totalBalance: 0,
    availableBalance: 0,
  });

  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/balance");
      setBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleAddFunds = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/add-funds", {
        amount: parseFloat(amount),
      });
      setBalance(response.data);
      setShowModal(false);
      setAmount("");
    } catch (error) {
      console.error("Error adding funds:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-sm mx-auto my-10 p-5 bg-purple-700 border border-gray-400 shadow-lg rounded-lg text-center">
        <h1 className="text-white text-4xl mb-5">Wallet</h1>
        <div className="flex justify-between mb-5">
          <div className="flex-1 mx-2 p-4 bg-gray-900 border border-gray-500 rounded-lg">
            <h2 className="text-white text-lg">Total Balance</h2>
            <p className="amount text-2xl font-bold mt-2 text-green-400">
              ${balance.totalBalance.toFixed(2)}
            </p>
          </div>
          <div className=" flex-1 mx-2 p-4 bg-gray-900 border border-gray-500 rounded-lg">
            <h2 className="text-white text-lg">Available Balance</h2>
            <p className="amount text-2xl font-bold mt-2 text-green-400">
              ${balance.availableBalance.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          className={`w-full p-2 mb-2 bg-green-600 text-black rounded hover:bg-green-700 transition duration-200 flex items-center justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setShowModal(true)}
          disabled={loading}
        >
          <FaPlus className="mr-2" />
          {loading ? "Adding..." : "Add Funds"}
        </button>
        <button
          className="w-full p-2 bg-blue-600 text-black rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          onClick={() => alert("View Transactions")}
        >
          <FaHistory className="mr-2" />
          View Transactions
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Add Funds</h2>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="border border-gray-300 rounded p-2 w-full mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition duration-200"
                  onClick={handleAddFunds}
                  disabled={loading || !amount}
                >
                  {loading ? "Loading..." : "Confirm"}
                </button>
                <button
                  className="bg-red-500 text-white rounded p-2 hover:bg-red-600 transition duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
