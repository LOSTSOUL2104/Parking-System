

const Wallet = () => {
  return (
    <div className="bg-black">
    <div className="max-w-sm mx-auto my-10 p-5 bg-purple-600 border border-gray-300 shadow-lg rounded-lg text-center">
      <h1 className="text-white text-3xl mb-5">Wallet</h1>
      <div className="flex justify-between mb-5">
        <div className="flex-1 mx-2 p-4 bg-black border border-gray-300 rounded-lg">
          <h2 className="text-white text-lg">Total Balance</h2>
          <p className="amount text-2xl font-bold mt-2 text-green-400">
            $100.00
          </p>
        </div>
        <div className="flex-1 mx-2 p-4 bg-black border border-gray-300 rounded-lg">
          <h2 className="text-white text-lg">Available Balance</h2>
          <p className="amount text-2xl font-bold mt-2 text-green-400">
            $75.00
          </p>
        </div>
      </div>
      <button className="w-full p-2 mb-2 bg-green-600 text-black rounded hover:bg-green-700 transition duration-200">
        Add Funds
      </button>
      <button className="w-full p-2 bg-blue-600 text-black rounded hover:bg-blue-700 transition duration-200">
        View Transactions
      </button>
    </div>
    </div>
  );
};

export default Wallet;
