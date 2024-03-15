import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const User = () => {
  const navigate = useNavigate();
  const { userDelete, userId, userRole } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const handleDeleteClick = (userId) => {
    userDelete(userId);
  };
  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/getAllUsers?limit=2&page=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);

  const fetchUserDetails = async (currentPage) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/getAllUsers?limit=1&page=${currentPage}`
    );
    const data = await response.json();
    return data;
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const currentData = await fetchUserDetails(currentPage);
    setUsers(currentData);
  };
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">User List</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search order ID"
              className="form-control bg-white"
            />
          </div>
        </div>
        <div className="card mb-4">
          <header className="card-header">
            <div className="row gx-3">
              <div className="col-lg-4 col-md-6 me-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <div className="text-right">
                  <a href="addUser" className="btn btn-primary btn-sm rounded">
                    Create new
                  </a>
                </div>
              </div>
            </div>
          </header>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">City</th>
                    <th scope="col">Role</th>
                    <th scope="col">Address</th>

                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) &&
                    users?.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user._id}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.city}</td>
                          <td>{user.role}</td>
                          <td>{user.address}</td>

                          <td
                            className="text-end"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end", // Align items to the end of the container
                              gap: "5px",
                            }}
                          >
                            <Link
                              to={`/updateUser/${user._id}`}
                              className="btn btn-sm font-sm rounded btn-brand"
                            >
                              <i className="material-icons md-edit"></i> Edit
                            </Link>

                            <a
                              className="btn btn-sm font-sm btn-danger rounded"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteClick(user._id);
                              }}
                            >
                              <i className="material-icons md-delete_forever"></i>
                              Delete
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={10}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-start"}
          pageClassName={"page-item "}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item "}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          activeLinkClassName={"active"}
        />
      </section>
    </>
  );
};
