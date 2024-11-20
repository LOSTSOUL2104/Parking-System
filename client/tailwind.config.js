export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    animation: {
      "fade-in": "fadeIn 0.5s ease-out",
      "pulse-subtle": "pulseSub 2s infinite",
      "parking-occupied": "parkingOccupied 1s infinite alternate",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0", transform: "scale(0.95)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
      pulseSub: {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.02)" },
      },
      parkingOccupied: {
        "0%": { opacity: "0.4" },
        "100%": { opacity: "0.6" },
      },
    },
  },
};
export const plugins = [];
