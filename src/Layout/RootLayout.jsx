import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import useGlobal from "../hooks/useGlobal";

function RootLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const {searchResults, setSearchResults} = useGlobal()

  const HandleClick = () => {
    setIsOpen((current) => !current);
  };

  // const getNotes = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("http://localhost:5000/all-notes", {
  //       method: "GET",
  //       headers: { "Content-type": "application/json" },
  //       credentials: "include",
  //     });
  //     const notes = await res.json();
  //     if (notes.length == 0) {
  //       setBackendPinnedData(null);
  //       setIsLoading(false);
  //     } else {
  //       setBackendPinnedData(notes);
  //       setIsLoading(false);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const portraitView = () => {
    setIsOn((current) => !current);
    console.log("functon call");
  };

  const refresh = () => {
    window.location.reload();
  }

  useEffect(()=> {
    console.log('isOpen', isOpen)
  }, [isOpen])

  return (
    <div className="h-full w-full text-black">
      <Navbar HandleClick={HandleClick} portraitView={portraitView} refresh={refresh}  />
      <div className="flex flex-row flex-1 w-full h-full">
        <div
          className={`flex flex-col w-[60px] shrink ${
            isOpen ? "sm:w-[280px]" : "pl-[12px]"
          }`}
        >
          <Sidebar isOpen={isOpen} />
        </div>
        <div className="h-full w-full overflow-y-auto flex-1 shrink-0">
          <Outlet context={[isOn, setIsOn, isOpen, setIsOpen ]} />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
