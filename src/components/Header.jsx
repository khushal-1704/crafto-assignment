import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChevronDownIcon, ChevronLeftIcon, UserIcon } from "@heroicons/react/16/solid";

import { resetQuotes } from "../store/quotes";
import { addUserName, resetUser } from "../store/users";

import DropDown from "./DropDown";
import { AUTH_TOKEN } from "../config";
import { getUserTokenLocal } from "../helpers";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => setShowDropDown(!showDropDown);

  useEffect(() => {
    const username = getUserTokenLocal()?.username
    if (username) {
      dispatch(addUserName(username))
    } else {
      dispatch(resetUser())
      dispatch(resetQuotes())
      navigate('/')
    }
  }, [])

  const handleLogoutClick = () => {
    dispatch(resetQuotes());
    dispatch(resetUser());
    localStorage.removeItem(AUTH_TOKEN)
    navigate("/login");
  };



  return (
    <header className="bg-blue-300 fixed top-0 right-0 left-0 z-50 flex shadow-md items-center justify-between px-3 py-4">
      {pathname === "/" ? (
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Crafto
        </div>
      ) : (
        <div
          className="text-xl flex items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="size-8" />
          <span>Back</span>
        </div>
      )}

      <div>
        <div className="flex items-center relative">
          <UserIcon className="size-5 " />
          <span className="text-lg mx-2 font-medium">{getUserTokenLocal()?.username}</span>
          <ChevronDownIcon
            className={`size-8 cursor-pointer transition ${showDropDown ? "rotate-180" : null
              }`}
            onClick={toggleDropDown}
          />
          {showDropDown ? (
            <DropDown
              dropDowndata={[
                {
                  title: "Logout",
                  onClick: handleLogoutClick,
                },
              ]}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
