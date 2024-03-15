import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/imgs/msbooks_logo.png";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

export const AsideBar = () => {
  const { userId, userRole } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove userId and role from local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.reload();
    navigate("/login");
  };
  return (
    <>
      <aside className="navbar-aside ps ps--active-y" id="offcanvas_aside">
        <div className="aside-top">
          <a href="/" className="brand-wrap">
            <img src={img1} className="logo" alt="Nest Dashboard" />
          </a>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted material-icons md-menu_open"></i>
            </button>
          </div>
        </div>
        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <Link className="menu-link" to="/">
                <i className="icon material-icons md-home"></i>
                <span className="text">Dashboard</span>
              </Link>
            </li>

            {userId && userRole === "admin" && (
              <>
                <li className="menu-item has-submenu ">
                  <Link className="menu-link" to="products">
                    <i className="icon material-icons md-shopping_bag"></i>
                    <span className="text">Products</span>
                  </Link>
                </li>
                <li className="menu-item has-submenu">
                  <Link className="menu-link" to="category">
                    <i className="icon material-icons md-shopping_basket"></i>
                    <span className="text">Category</span>
                  </Link>
                </li>
                <li className="menu-item has-submenu ">
                  <Link className="menu-link" to="user">
                    <i className="icon material-icons md-person"></i>
                    <span className="text">User</span>
                  </Link>
                </li>
                <li className="menu-item has-submenu ">
                  <Link className="menu-link" to="orders">
                    <i className="icon material-icons md-shopping_cart"></i>
                    <span className="text">Order</span>
                  </Link>
                </li>
              </>
            )}

            {!userId && (
              <li className="menu-item has-submenu">
                <Link className="menu-link" to="/login">
                  <i className="icon material-icons md-exit_to_app"></i>
                  <span className="text">LogIn</span>
                </Link>
              </li>
            )}
            {userId && (
              <li className="menu-item has-submenu">
                <Link className="menu-link" onClick={handleLogout}>
                  <i className="icon material-icons md-exit_to_app"></i>
                  <span className="text">Logout</span>
                </Link>
              </li>
            )}
          </ul>
          <hr />
        </nav>
        <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
          <div
            className="ps__thumb-x"
            tabIndex="0"
            style={{ left: "0px", width: "0px" }}
          ></div>
        </div>
        <div
          className="ps__rail-y"
          style={{ top: "0px", height: "662px", right: "0px" }}
        >
          <div
            className="ps__thumb-y"
            tabIndex="0"
            style={{ top: "0px", height: "491px" }}
          ></div>
        </div>
      </aside>
    </>
  );
};
