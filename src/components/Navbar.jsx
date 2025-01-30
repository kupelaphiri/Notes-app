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
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchIcon from '@mui/icons-material/Search';

function Navbar(props) {
  const { auth, setAuth } = useAuth();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { setSearchResults } = useGlobal();
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 707);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 794)
  const [isSearchClicked, setIsSearchClicked] = useState(false)
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false)
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

  const updateIcon = () => {
    setIsWideScreen(window.innerWidth > 794)
  }

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

  useEffect(() => {
    window.addEventListener("resize", updateIcon);
    return () => window.removeEventListener("resize", updateIcon);
  });


  return (
    <div
      className={`flex flex-row ${
        isDark ? "bg-dim" : ""
      } h-[64px] w-full mb-0 border-b-[1px]`}
    >
      <div className={`absolute ${isMobileSearchActive? 'visible': 'invisible'} flex flex-row ${
            isDark ? "bg-light-dim" : "bg-gray-100"
          } mt-[5px] z-10 ml-[5px] w-[270px] rounded-lg h-[50px]`}>
       <input 
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          HandleNavigate("/searchpage");
          setSearch(true);
        }}
        value={searchQuery}
        className="bg-inherit p-1 h-full text-xs w-[240px] outline-none"
        placeholder="Search" />
       <svg
              onClick={() => {
                HandleNavigate("/");
                setIsMobileSearchActive(false);
              
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
      </div>
        <div
          onClick={props.HandleClick}
          className={`flex flex-row items-center justify-center ${isDark? 'text-gray-400' : 'text-gray-600'} ml-[18px] mt-[10px] h-[40px] w-[40px]  mr-[10px] cursor-pointer rounded-full hover:bg-gray-200`}
        >
          <MenuOutlinedIcon sx={{fontSize: 23}} />
        </div>
      <div className={`flex mt-[5px] items-center max-w-full pl-[5px] mr-[20px] h-[48px]`}>

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
          <div className={`${isDark? 'text-gray-400' : 'text-gray-600'} mt-[6px] ml-[7px] mr-[5px] cursor-pointer`}>
          <SearchIcon sx={{fontSize: 25}}/>
          </div>

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
        <div className={`flex items-center ${isDesktop ? '': 'ml-[100px]'}  ml-[50px] m:ml-[80px] mx:ml-[150px] sx:ml-[220px] ms:ml-[280px]`}>
  
          <svg onClick={()=>{
            setIsMobileSearchActive(true)
            HandleNavigate("/searchpage");
            setSearch(true);
            props.collapse()
          }} 
           xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
             fill="currentColor" className={`h-[22px] ${isDark? 'text-gray-400' : ''} mt-[2px] mr-[15px] cursor-pointer`}>
           <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
          </svg>


        </div>
      
        </>
      )}
      <div className={`flex flex-row pt-[5px] ${isWideScreen ? 'justify-between': ''}  items-center bg-inherit w-[150px] h-[40px] s:ml-0 lg:ml-[900px] mt-[10px]`}>
        <div
          className={`flex flex-row ${isDark? 'text-gray-400' : 'text-gray-600'} items-center justify-center h-[40px] w-[40px] ml-0 sm:ml-[15px] cursor-pointer rounded-full hover:bg-gray-200`}
        >
         <RefreshOutlinedIcon sx={{fontSize: 23}} onClick={props.refresh} />
        </div>
        <div onClick={props.portraitView} className={`flex flex-row items-center ${isDark? 'text-gray-400' : 'text-gray-600'} ${isWideScreen ? 'block': 'hidden'} justify-center h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200`}>
         <DnsOutlinedIcon sx={{fontSize: 23}}/>
        </div>
        <div
          onClick={settings}
          className={`flex flex-row items-center justify-center ${isDark? 'text-gray-400' : 'text-gray-600'} h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200`}
        >
        <SettingsOutlinedIcon sx={{fontSize: 23}}/>
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
        <div className={`flex flex-row items-center justify-center ${isDark? 'text-gray-400' : 'text-gray-600'} mt-[2px] h-[40px] w-[40px] ml-[2px] cursor-pointer rounded-full hover:bg-gray-200`}>
         <LogoutOutlinedIcon sx={{fontSize: 23}}/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
