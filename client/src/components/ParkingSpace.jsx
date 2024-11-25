/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaCar, FaParking } from "react-icons/fa";
import axios from "axios";

const ParkingSpace = () => {
  const [parkingStatus, setParkingStatus] = useState(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => Math.random() < 0.5)
    )
  );
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [reservationMessage, setReservationMessage] = useState("");

  const handleParkingSpotClick = async (sectionIndex, spotIndex) => {
    try {
      const userId = "6487a15ed56f9f001234abcd";
      const response = await axios.post(
        "http://localhost:5000/api/reserve-parking",
        {
          section: sectionIndex,
          spot: spotIndex,
          userId,
        }
      );

      if (response.data.success) {
        setParkingStatus((prev) =>
          prev.map((section, sIdx) =>
            sIdx === sectionIndex
              ? section.map((spot, spIdx) =>
                  spIdx === spotIndex ? true : spot
                )
              : section
          )
        );
        setReservationMessage(response.data.message);
      }
    } catch (error) {
      setReservationMessage(
        error.response?.data?.message || "Failed to reserve parking spot"
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-emerald-900 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-center mb-8">
          <FaParking className="+w-12 h-12 text-white mr-4" />
          <h1 className="text-white text-5xl font-extrabold tracking-tight">
            Parking Space Status
          </h1>
        </div>

        {reservationMessage && (
          <div className="text-center mb-6 text-white text-xl">
            {reservationMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingStatus.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white/10 rounded-xl p-4 border border-white/20 transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-white text-2xl font-bold text-center mb-4 flex items-center justify-center">
                <span className="mr-2">Section {sectionIndex + 1}</span>
                <FaCar className="w-6 h-6" />
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {section.map((isOccupied, spotIndex) => (
                  <div
                    key={spotIndex}
                    onClick={() =>
                      handleParkingSpotClick(sectionIndex, spotIndex)
                    }
                    className={`relative h-16 rounded-lg flex items-center justify-center
                      transition-all duration-300 ease-in-out cursor-pointer
                      ${
                        isOccupied
                          ? "bg-green-500/50 text-red-100 hover:bg-green-500/70"
                          : "bg-green-500/50 text-green-100 hover:bg-green-500/70"
                      }
                      ${
                        selectedSpot?.section === sectionIndex &&
                        selectedSpot?.spot === spotIndex
                          ? "ring-4 ring-yellow-500"
                          : ""
                      }
                    `}
                  >
                    <span className="text-xl font-bold z-10">
                      {spotIndex + 1}
                    </span>
                    {isOccupied && (
                      <div className="absolute inset-0 bg-red-500/30 rounded-lg"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingSpace;