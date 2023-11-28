import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Camera, Home, Search, User } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../slices/authSlice";

const Nav = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  let links = [];

  if (!auth) {
    links = [
      { name: "Login", link: "login" },
      { name: "Register", link: "register" },
    ];
  }

  if (auth) {
    links = [
      { name: Home, link: "/" },
      { name: Camera, link: `/users/${user?._id}` },
      { name: User, link: `/profile` },
      { name: "Sair", link: `/login` },
    ];
  }

  //clean up
  useState(() => {
    dispatch(reset());
  }, [dispatch]);

  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full sticky top-0 left-0 h-20 items-center">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
        <div
          className="font-bold text-xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-xl text-red-600 mr-2">+88</span>
          <Link to={"/"}>RomimGram</Link>
        </div>
        {auth && (
          <form className="flex items-center justify-end w-full">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 rounded-full py-2 px-4 outline-none md:block w-full mt-4 md:mt-0 md:w-auto"
            />
            <button>
              <Search className="text-gray-500 md:block ml-2 mt-4 md:mt-0" />
            </button>
          </form>
        )}
        <div
          onClick={() => setOpen(!open)}
          className="text-lg absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <div className="text-black">{open ? <X /> : <Menu />}</div>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-30 " : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li key={link.link} className="md:ml-8 md:my-0 my-7">
              <NavLink
                to={link.link}
                className="text-gray-800 hover:text-gray-400 text-md duration-500"
                onClick={link.name === "Sair" ? handleLogout : () => {}}
              >
                {typeof link.name !== "string" ? <link.name /> : link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
