import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const AddUser = () => {
  const navigate = useNavigate();
  const { userCity, fetchUsers, userId, userRole } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // If userId doesn't exist or userRole is not admin, redirect to login
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.role
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/addNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          address: "",
          role: "",
        });
        setErrorMessage("");
        navigate("/user");
        alert("User Added Successfully");
        fetchUsers();
      } else {
        const data = await response.json();
        if (response.status === 409) {
          // Assuming 409 represents duplicate entry error
          setErrorMessage(data.message);
        } else {
          setErrorMessage("An error occurred while adding the user.");
          console.error("Error:", data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("An error occurred while adding the user.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate("/user");
  };

  return (
    <>
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
                        value={formData.firstName}
                        onChange={handleChange}
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
                        value={formData.lastName}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errorMessage.email && (
                        <div className="text-danger">{errorMessage.email}</div>
                      )}
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      {errorMessage.phone && (
                        <div className="text-danger">{errorMessage.phone}</div>
                      )}
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
                        value={formData.address}
                        onChange={handleChange}
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
                        value={formData.city}
                        onChange={handleChange}
                        required
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
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select User Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    {errorMessage && (
                      <div className="text-danger mb-3">{errorMessage}</div>
                    )}
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
    </>
  );
};
