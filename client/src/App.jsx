import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SigninSignUp from "./components/SigninSignUp";
import ParkingSpace from "./components/ParkingSpace";
import Wallet from "./components/Wallet";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/SigninSignUp" element={<SigninSignUp />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
      <ParkingSpace />
      <Footer />
    </Router>
  );
}

export default App;
