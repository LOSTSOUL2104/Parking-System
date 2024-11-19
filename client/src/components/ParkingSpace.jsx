
const ParkingSpace = () => {
  return (
    <div className="bg-black">
      <div className="max-w-2xl mx-auto my-10 p-5 bg-purple-600 border border-gray-300 shadow-lg">
        <h1 className="text-white text-3xl mb-5">Parking Space Status</h1>
        <div className="flex flex-wrap justify-between">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-full md:w-1/3 p-2">
              <h2 className="text-white text-2xl mb-2">Section {index + 1}</h2>
              <div className="flex flex-wrap justify-between">
                {[...Array(5)].map((_, spotIndex) => {
                  const isOccupied = Math.random() < 0.5; 
                  return (
                    <div
                      key={spotIndex}
                      className={`w-1/5 m-1 p-2 text-center text-2xl border ${
                        isOccupied
                          ? "bg-red-200 text-red-700 border-red-300"
                          : "bg-green-200 text-green-700 border-green-300"
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
