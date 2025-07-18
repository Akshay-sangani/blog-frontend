import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.jpg";
import ThemeToggle from "./ThemeToggle";
import UserPng from "../assets/user.jpg";
import writePic from "../assets/write.jpg";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Popup } from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/User/userSlice";
import { SearchResult } from "./SearchResult";
import { axiosInstance } from "../api";

const debounce = (
  func: { (text: string): Promise<void>; (arg0: any): any },
  wait: number | undefined
) => {
  let timeout: number | undefined;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(args), wait);
  };
};

export const Navbar: React.FC = () => {
  const inputElem = useRef<HTMLInputElement>(null);
  const [filterData, setFilterData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const fetchNameResults = async (text: string) => {
    try {
      if (text !== "") {
        setIsLoading(true);
        const { data } = await axiosInstance.get(
          `/post/Searchfilter/postUser?query=${text}`
        );
        setFilterData(data);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    console.table(filterData);
  }, [filterData]);
  const handleSearch = useCallback(
    debounce((inputVal) => fetchNameResults(inputVal), 500),
    []
  );

  const auth = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      dispatch(logout());
    }
  },[]);

  
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const notifySuccess = () => toast.success("Logout...");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  console.log(show);

  const togglePopup = () => {
    setShow(!show);
  };
  function handleLogout() {
    dispatch(logout()), notifySuccess();
    navigate("/");
    toggleDropdown();
  }
  var inputLength: number = 0;
  if (inputElem.current && inputElem.current.value) {
    inputLength = inputElem.current.value.length;
  }
  return (
    <>
      <nav className="  bg-white border-gray-200 dark:bg-[#0f172a]  flex flex-wrap items-center mx-auto p-4 gap-4">
        <div className="ml-12 flex items-center  gap-2 justify-center">
          <Link to="/" className="flex gap-2">
            <img src={Logo} className="h-9 rounded-full" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap cursor-pointer dark:text-white">
              Blog
            </span>
          </Link>
        </div>

        <div className="flex self-center justify-center flex-col items-center relative left-[20px]">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <div>
              <input
                ref={inputElem}
                type="text"
                onChange={() => handleSearch(inputElem.current?.value)}
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        <div className="flex gap-1 flex-1 text-[15px] absolute right-[170px]">
          <ThemeToggle />
        </div>

        {auth ? (
          <>
            <div className="absolute flex gap-4 text-left right-[60px]">
              {/* Green-colored text above the dropdown */}
              <div>
                <button
                  className="flex justify-center w-full  rounded-full 
                    border 
                    text-sm font-medium  
                    focus:outline-none"
                  onClick={togglePopup}
                >
                  <img
                    src={writePic}
                    alt="write"
                    width={35}
                    height={35}
                    className="rounded-full "
                  />
                </button>
              </div>
              <div>
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center w-full  rounded-full 
                    border 
                    text-sm font-medium  
                    focus:outline-none"
                >
                  <img
                    src={UserPng}
                    alt="User"
                    width={35}
                    height={35}
                    className="rounded-full "
                  />
                </button>
              </div>
              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-10 w-56 
                rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                focus:outline-none z-50"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700
                            hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex absolute right-[80px] text-white  rounded-sm md:bg-transparent items-center justify-center">
            <Link to="/login">
              <button className=" text-white  rounded-sm md:bg-transparent items-center justify-center hover:text-blue-600 text-xl">
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>

      <div className="flex ml-[203px] -mt-2 z-50 absolute">
        {inputLength > 0 && (
          <SearchResult filterData={filterData} inputElem={inputElem} />
        )}
      </div>

      <div>{show && <Popup postdata={undefined} setShow={setShow} />}</div>
    </>
  );
};
