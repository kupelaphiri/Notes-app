import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Trashpage from "./components/Trashpage";
import Archivepage from "./components/Archivepage";
import App from "./App";
import Signup from "./components/Signup";
import RootLayout from "./Layout/RootLayout";
import { useState } from "react";
import Loginpage from "./components/Loginpage";
import RequireAuth from "./RequireAuth";


function AppRoutes() {
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
    <Routes>
      <Route>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes */}
      <Route element={<RequireAuth >
        <RootLayout />
      </RequireAuth>}>
   
        <Route index element={<Mainpage isOn={isOn} isOpen={isOpen} />} />
        <Route path="/archivepage" element={<Archivepage isOn={isOn} />} />
        <Route path="/trashpage" element={<Trashpage isOn={isOn} />} />
    
      </Route>
    </Routes>
  );
}

export default AppRoutes;
