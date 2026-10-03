import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";


const DashboardLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);


  return (

    <div className="min-h-screen bg-gray-50">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >

        <TopNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>

  );

};


export default DashboardLayout;