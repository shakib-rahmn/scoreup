import { useState } from "react";
import Publish from "./pages/Publish";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import EditForm from "./components/EditFOrm";
import Published from "./pages/Published";

const App = () => {
  const navigate = useNavigate();
  const [activeMenu, setactiveMenu] = useState(true);

  const handleMenu = () => {
    setactiveMenu(!activeMenu);
  };

  window.location.pathname === "/" ? navigate('/dashboard') : ''

  return (
    <>
      <Navbar handleMenu={handleMenu} active={activeMenu} />

      <div className="container mt-10 pb-10">
        <div className="flex h-screen overflow-hidden relative mt-[120px]">
          <Sidebar
            menu={activeMenu}
            handleMenu={handleMenu}
          />

          <div className="max-lg:w-full lg:w-[calc(100%-280px)] h-[80vh] ml-auto overflow-y-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/:id" element={<EditForm />} />
              <Route path="/published" element={<Published />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
