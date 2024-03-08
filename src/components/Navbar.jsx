// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  useLocation,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import useGlobal from "../hooks/useGlobal";

function Navbar(props) {
  const { auth, setAuth } = useAuth();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const {searchResults, setSearchResults} = useGlobal()

  const navigate = useNavigate();

  const HandleNavigate = (path) => {
    navigate(path);
    setSearch(true);
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        withCredentials: true,
        credentials: "include",
      });

      const response = await res.json();

      if (res.ok) {
        setAuth(null);
        console.log("auth", auth);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const query = async () => {
      try {
       const res = await fetch("http://localhost:5000/search-notes", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
        });

        const results = await res.json();
        if (res.ok) {
          setSearchResults(results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    query();
  }, [searchQuery]);

  useEffect(() => {
    console.log("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <div className="">
      <div className="flex flex-row  h-[64px] w-full border-b-[1px]">
        <div className="flex mt-[5px] ml-[10px] h-[48px] w-[232px]">
          <div
            onClick={props.HandleClick}
            className="flex flex-row items-center h-[48px] w-[48px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200"
          >
            <svg className="mt-[5px] pl-[5px] mb-[5px] ml-[8px] text-white text-xl h-[24px] w-[24px] cursor-pointer">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>

          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
          <div className="pl-[20px] pt-[12px]">
            <span>Notify</span>
          </div>
        </div>
        <div className="absolute flex flex-row left-[250px] top-[6px] rounded-lg bg-gray-100 h-[47px] w-[722px]">
          <svg className="absolute top-[12px] left-[15px] h-[40px] w-[40px] cursor-pointer">
            <path
              className=""
              d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"
            ></path>
          </svg>
          <form className="">
            <input
              onFocus={() => {
                HandleNavigate("/searchpage");
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" pl-[60px] mt-[15px] w-[650px] h-[47px] outline-none bg-gray-100"
              value={searchQuery}
              placeholder="Search"
            />
          </form>
          {search === true && (
            <svg
              onClick={() => {
                HandleNavigate("/");
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[24px] h-[24px] mt-[12px] ml-[10px] mr-[10px] cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <div className=" flex flex-row pt-[5px] justify-between items-center bg-white w-[150px] h-[40px] lg:ml-[900px] ml-[780px] mt-[10px]">
          <div className="flex flex-row items-center justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200">
            <svg
              onClick={props.refresh}
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer h-[23px]"
              version="1.1"
              viewBox="0 0 1200 1200"
            >
              <path d="m1e3 475v-250l-87.5 87.5c-77.5-85-190-137.5-312.5-137.5-235 0-425 190-425 425s190 425 425 425c120 0 227.5-50 305-130l-70-72.5c-57.5 62.5-142.5 102.5-235 102.5-180 0-325-145-325-325s145-325 325-325c95 0 182.5 42.5 242.5 107.5l-92.5 92.5z" />
            </svg>
          </div>

          <div className="flex flex-row items-center justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200">
            <svg
              onClick={props.portraitView}
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer h-[23px]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
              />
            </svg>
          </div>

          <div className="flex flex-row items-center justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer h-[23px]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
        <div
          onClick={logout}
          className="flex ml-[60px] cursor-pointer justify-center items-center"
        >
          <div className="flex flex-row items-center justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
