import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

export const LogIn = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userId, userRole } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        // User exists, save userId and role in local storage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);

        // Navigate to the home page
        navigate("/");
        window.location.reload();
      } else {
        // User does not exist, navigate to the add user page
        setError("Invalid phone number. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  if (userId && userRole) {
    navigate("/");
    return <p>You are already logged in!</p>;
  }
  return (
    <>
      <section className="content-main mt-80 mb-80">
        <div className="card mx-auto card-login">
          <div className="card-body">
            <h4 className="card-title mb-4">Sign in</h4>
            {error && <p className="text-danger">{error}</p>}{" "}
            {/* Display error message */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="User Phone Number 030004747564"
                  name="phone"
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required="true"
                  pattern="\d{11}"
                  title="Please enter a valid 11-digit phone number"
                />
              </div>

              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mb-4"> Please Give Your Login Details</p>
          </div>
        </div>
      </section>
    </>
  );
};
