import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function RootLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOn, setIsOn] = useState(false);

  const HandleClick = () => {
    setIsOpen((current) => !current);
  };

  const portraitView = () => {
    setIsOn((current) => !current);
    console.log("functon call");
  };
  return (
    <div className="h-full w-full text-black">
      <Navbar HandleClick={HandleClick} portraitView={portraitView} />
      <div className="flex flex-row flex-1 w-full h-full">
        <div
          className={`flex flex-col shrink-0 pt-3 ${
            isOpen ? "w-[280px]" : "pl-[12px]"
          }`}
        >
          <Sidebar isOpen={isOpen} />
        </div>
        <div className="h-full w-full overflow-y-auto flex-1 shrink-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
