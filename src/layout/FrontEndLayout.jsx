import { Outlet } from "react-router-dom";
import { AsideBar } from "./AsideBar";
import { Footer } from "./Footer";
import { Navebar } from "./Navebar";

export const FrontEndLayout = () => {
  return (
    <>
      <div className="screen-overlay"></div>
      <AsideBar />
      <main className="main-wrap">
        <Navebar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};
