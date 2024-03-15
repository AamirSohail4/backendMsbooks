import { useContext } from "react";
import user from "../assets/imgs/people/avatar-2.png";
import { UserContext } from "../context/userContext";
export const Navebar = () => {
  const { userId, userRole } = useContext(UserContext);
  return (
    <>
      <header className="main-header navbar">
        <div className="col-search">
          <form className="searchform">
            <div className="input-group">
              {userRole && (
                <h1>
                  Welcome {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </h1>
              )}
            </div>
            <datalist id="search_terms">
              <option value="Products"></option>
              <option value="New orders"></option>
              <option value="Apple iphone"></option>
              <option value="Ahmed Hassan"></option>
            </datalist>
          </form>
        </div>
        <div className="col-nav">
          <button
            className="btn btn-icon btn-mobile me-auto"
            data-trigger="#offcanvas_aside"
          >
            <i className="material-icons md-apps"></i>
          </button>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link btn-icon" href="#">
                <i className="material-icons md-notifications animation-shake"></i>
                <span className="badge rounded-pill">3</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn-icon darkmode" href="#">
                {" "}
                <i className="material-icons md-nights_stay"></i>{" "}
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="requestfullscreen nav-link btn-icon">
                <i className="material-icons md-cast"></i>
              </a>
            </li>
            <li className="dropdown nav-item">
              <a
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                id="dropdownLanguage"
                aria-expanded="false"
              >
                <i className="material-icons md-public"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownLanguage"
              ></div>
            </li>
            <li className="dropdown nav-item">
              <a
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                id="dropdownAccount"
                aria-expanded="false"
              >
                <img className="img-xs rounded-circle" src={user} alt="User" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownAccount"
              >
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-perm_identity"></i>Edit
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-settings"></i>Account Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-account_balance_wallet"></i>
                  Wallet
                </a>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-receipt"></i>Billing
                </a>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-help_outline"></i>Help center
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item text-danger" href="#">
                  <i className="material-icons md-exit_to_app"></i>Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};
