const Navbar = () => {
  return (
    <div className="w-full h-[60px] bg-black bg-opacity-50 backdrop-blur-md text-white flex justify-between items-center sticky top-0 z-50 gap-3">
      <h1 className="text-lg pl-[2%]">Parking System</h1>
      <ul className="flex gap-3 mr-[5%]">
        <li className="ml-[3%]">
          <a href="" className="text-white no-underline">
            home
          </a>
        </li>
        <li className="ml-[3%]">
          <a href="" className="text-white no-underline">
            about
          </a>
        </li>
        <li className="ml-[3%]">
          <a href="" className="text-white no-underline">
            content
          </a>
        </li>
        <li>
        <a href="" className="text-white no-underline">
          Sign 
        </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
