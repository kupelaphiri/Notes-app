// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useGlobal from "../hooks/useGlobal";
import {
  useLocation,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import { useUtilities } from "../hooks/useOutsideClickDetector";
import { BASE_URL } from "../constants";

function Navbar(props) {
  const { auth, setAuth } = useAuth();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { setSearchResults } = useGlobal();
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 707);
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const { isDark, setIsDark } = useGlobal();
  const { useOutsideClickDetector } = useUtilities();
  

  const setRef = useRef(null);

  const navigate = useNavigate();
  const home = "/";

  const HandleNavigate = (path) => {
    navigate(path);
    if (path === home) {
      setSearch(false);
    }
  };

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 707);
  };

  const settings = () => {
    setIsVisible(true);
  };

  const unfocus = () => {
    setIsVisible(false);
    // handleSubmit()
  };

  useOutsideClickDetector(setRef, unfocus);

  const darkMode = () => {
    setIsDark((current) => !current);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/logout`, {
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

  const query = async () => {
    try {
      const res = await fetch(`${BASE_URL}/search-notes/?q=${searchQuery}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      const results = await res.json();
      if (res.ok) {
        setSearchResults(results);
      } else if (!res.ok) {
        setSearchResults(results);
      } else if (!res.ok && results == "Internal server error") {
        setSearchResults(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    query();
  }, [searchQuery]);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // useEffect(() => {
  //   console.log("searchQuery", searchQuery);
  // }, [searchQuery]);

  return (
    <div
      className={`flex flex-row ${
        isDark ? "bg-dim" : ""
      } h-[64px] w-full mb-0 border-b-[1px]`}
    >
        <div
          onClick={props.HandleClick}
          className={`flex flex-row items-center justify-center ml-[18px] mt-[10px] h-[40px] w-[40px]  mr-[10px] cursor-pointer rounded-full hover:bg-gray-200`}
        >

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${
              isDark ? "text-gray-400" : ""
            } text-xl h-[23px] cursor-pointer`}>
              <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>

        </div>
      <div className="flex mt-[5px] items-center max-w-full pl-[5px] mr-[20px] h-[48px]">

        <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />

        <span
          className={` ${
            isDesktop ? "ml-[20px]" : "ml-[10px]"
          } hidden s:block font-semibold  ${isDark ? "text-white" : ""}`}
        >
          Notify
        </span>
      </div>
      {isDesktop ? (
       <div
          className={`flex flex-row ml-[40px] mt-[6px] rounded-lg ${
            isDark ? "bg-light-dim" : "bg-gray-100"
          } ${isSearchClicked? 'block ml-0 z-1' : ''} h-[47px] shrink w-full max-w-[800px]`}
        >
          <svg className="mt-[12px] ml-[15px] h-[40px] w-[40px] cursor-pointer">
            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
          </svg>

          <input
            onFocus={() => {
              HandleNavigate("/searchpage");
              setSearch(true);
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex items-center w-full h-[47px] outline-none rounded-lg shrink-1 ${
              isDark ? "bg-transparent" : "bg-gray-100"
            } `}
            value={searchQuery}
            placeholder="Search"
          />

          {search === true && (
            <svg
              onClick={() => {
                HandleNavigate("/");
                setSearch(false);
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
      ) : (
        <>
         {isSearchClicked && <div
          className={`flex flex-row mt-[6px] z-1 rounded-lg ${
            isDark ? "bg-light-dim" : "bg-gray-100"
          }  h-[47px] shrink w-[400px]`}
        >
          <svg className="mt-[12px] ml-[15px] h-[40px] w-[40px] cursor-pointer">
            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
          </svg>

          <input
            onFocus={() => {
              HandleNavigate("/searchpage");
              setSearch(true);
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex items-center w-full h-[47px] outline-none rounded-lg shrink-1 ${
              isDark ? "bg-transparent" : "bg-gray-100"
            } `}
            value={searchQuery}
            placeholder="Search"
          />

          {search === true && (
            <svg
              onClick={() => {
                HandleNavigate("/");
                setSearch(false);
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
        </div>}
        <div className="flex items-center ml-[50px] m:ml-[80px] mx:ml-[150px] sx:ml-[220px] ms:ml-[280px]">
  
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-[22px] ${isDark? 'text-gray-400' : ''} mt-[2px] mr-[15px] cursor-pointer`}>
           <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
          </svg>


        </div>
      
        </>
      )}
      <div className="flex flex-row pt-[5px] justify-between items-center bg-inherit w-[150px] h-[40px] s:ml-0 lg:ml-[900px] mt-[10px]">
        <div
          className={`flex flex-row items-center justify-center h-[40px] w-[40px] ml-0 sm:ml-[15px] cursor-pointer rounded-full hover:bg-gray-200`}
        >
         
          <svg  onClick={props.refresh} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`cursor-pointer ${isDark ? "text-gray-400" : ""} h-[23px]`}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>

        </div>

        <div className="flex flex-row items-center justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200">
          <svg
            onClick={props.portraitView}
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer ${
              isDark ? "text-gray-400" : ""
            } h-[23px]`}
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

        <div
          onClick={settings}
          className="flex flex-row items-center justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer ${
              isDark ? "text-gray-400" : ""
            } h-[23px]`}
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
        {isVisible == true && (
          <div
            ref={setRef}
            className={`h-[50px] w-[120px] ${
              isDark ? "bg-dim" : "bg-white"
            } absolute right-[20px] rounded-sm border-[1px] shadow-lg top-[55px]`}
          >
            <div
              onClick={darkMode}
              className={`flex items-center cursor-pointer justify-center w-full h-[30px] mt-[9px] ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
              } `}
            >
              {isDark ? (
                <p className="text-xs text-white">Light theme</p>
              ) : (
                <p className="text-xs text-gray-700">Dark theme</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        onClick={logout}
        className={`flex ${
          isDesktop ? "ml-[60px] mr-[5px]" : "ml-[5px]"
        }  cursor-pointer justify-center  items-center`}
      >
        <div className="flex flex-row items-center justify-center mt-[2px] h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-4 h-4  ${isDark ? "text-gray-400" : ""}`}
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
  );
}

export default Navbar;
