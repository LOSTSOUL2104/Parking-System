/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaPlus, FaHistory, FaWallet } from "react-icons/fa";
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
      const amountToAdd = parseFloat(amount);
      const response = await axios.post("http://localhost:5000/api/add-funds", {
        amount: amountToAdd,
      });

      setBalance((prevBalance) => ({
        totalBalance: prevBalance.totalBalance + amountToAdd,
        availableBalance: prevBalance.availableBalance + amountToAdd,
      }));

      setShowModal(false);
      setAmount("");
    } catch (error) {
      console.error("Error adding funds:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-800 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaWallet className="text-3xl" />
            <h1 className="text-2xl font-bold">My Wallet</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
              <h2 className="text-sm uppercase tracking-wider text-white/70 mb-2">
                Total Balance
              </h2>
              <p className="text-3xl font-bold text-emerald-400">
                ${balance.totalBalance.toFixed(2)}
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
              <h2 className="text-sm uppercase tracking-wider text-white/70 mb-2">
                Available Balance
              </h2>
              <p className="text-3xl font-bold text-emerald-400">
                ${balance.availableBalance.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold uppercase tracking-wider 
              transition duration-300 ease-in-out transform hover:scale-105 hover:bg-emerald-600 
              flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            <FaPlus className="mr-2" />
            {loading ? "Adding..." : "Add Funds"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-96 rounded-2xl shadow-2xl p-6 transform transition-all">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">
              Add Funds
            </h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex space-x-4">
              <button
                className="flex-1 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddFunds}
                disabled={loading || !amount}
              >
                {loading ? "Loading..." : "Confirm"}
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
