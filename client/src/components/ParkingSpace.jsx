const ParkingSpace = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto my-10 p-5 bg-purple-700 border border-gray-400 rounded-lg shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center mb-6">
          Parking Space Status
        </h1>
        <div className="flex flex-wrap justify-between">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-full md:w-1/3 p-2">
              <h2 className="text-white text-3xl font-semibold text-center mb-3">
                Section {index + 1}
              </h2>
              <div className="flex flex-wrap justify-between">
                {[...Array(5)].map((_, spotIndex) => {
                  const isOccupied = Math.random() < 0.5;
                  return (
                    <div
                      key={spotIndex}
                      className={`w-1/5 m-1 p-4 text-center text-xl border rounded-lg transition-transform transform hover:scale-105 ${
                        isOccupied
                          ? "bg-red-300 text-red-800 border-red-500"
                          : "bg-green-300 text-green-800 border-green-500"
                      }`}
                    >
                      {spotIndex + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingSpace;
