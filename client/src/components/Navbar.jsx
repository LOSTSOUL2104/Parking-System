import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-[60px] bg-black bg-opacity-50 backdrop-blur-md text-white flex justify-between items-center sticky top-0 z-50 gap-3">
      <h1 className="text-lg pl-[2%] font-bold">
        <Link to="/" className="text-white no-underline hover:underline">
          Parking System
        </Link>
      </h1>
      <ul className="flex gap-3 mr-[5%]">
        <li className="ml-[3%]">
          <Link
            to="/wallet"
            className="text-white no-underline hover:underline"
          >
            Wallet
          </Link>
        </li>
        <li className="ml-[3%]">
          <Link
            to="/SigninSignUp"
            className="text-white no-underline hover:underline"
          >
            <User size={24} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
