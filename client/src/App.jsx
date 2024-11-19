import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SigninSignUp from "./components/SigninSignUp";
import ParkingSpace from "./components/ParkingSpace";
import Wallet from "./components/Wallet";


function App() {
  return (
    <>
      <Navbar />
      <SigninSignUp/>
      <ParkingSpace/>
      <Wallet/>
      <Footer />
    </>
  );
}

export default App;
