import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const UserUpdate = () => {
  const { id } = useParams();

  const { userCity, userRole, userId, fetchUsers } = useContext(UserContext);

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    // If userId doesn't exist or userRole is not admin, redirect to login
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/getusersByID/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await response.json();
        console.log("Response of  User on product id ", productData);
        setFirstName(productData.firstName);
        setLastName(productData.lastName);
        setEmail(productData.email);
        setPhone(productData.phone);
        setCity(productData.city);
        setAddress(productData.address);
        setRole(productData.role);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        firstName,
        lastName,
        email,
        city,
        phone,
        address,
        role,
      };

      const response = await fetch(
        `http://localhost:3000/api/v1/updateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        alert("User Updated");
        fetchUsers();
        navigate("/user");
      } else {
        alert("Duplicate User ");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCancel = () => {
    navigate("/user");
  };
  return (
    <section className="content-main">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div
              className="card"
              style={{ backgroundColor: "white", border: "1px solid #ccc" }}
            >
              <div className="card-body">
                <h2 className="content-title">Add New User</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Your First Name"
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Your Last Name"
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Your Email"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter Phone Number"
                      type="text"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="4"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      User City
                    </label>
                    <select
                      className="form-select"
                      id="city"
                      name="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {userCity.map((item, index) => (
                        <option key={index} value={item.intID}>
                          {item?.strDesc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Select role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="">Select User Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginRight: "8px" }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
