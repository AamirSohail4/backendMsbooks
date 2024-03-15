import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CategoryContext } from "../../context/categoryContext";
import { UserContext } from "../../context/userContext";

export const Category = () => {
  const { categories, deleteCategory } = useContext(CategoryContext);
  const { userId, userRole } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    // If userId doesn't exist or userRole is not admin, redirect to login
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);
  const handleDeleteClick = (item) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // If user confirms deletion
    if (isConfirmed) {
      deleteCategory(item);
    } else {
      // If user cancels deletion
      console.log("Deletion canceled");
    }
  };

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">Category List</h2>
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
                  <Link
                    to="/addcategory"
                    className="btn btn-primary btn-sm rounded"
                  >
                    Create new
                  </Link>
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
                    <th scope="col">Parient_id</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Level</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>
                          <b>{item.parent_id}</b>
                        </td>
                        <td>{item.category_name}</td>
                        <td>{item.level}</td>
                        <td
                          className="text-end"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end", // Align items to the end of the container
                            gap: "5px",
                          }}
                        >
                          <Link
                            to={`/updateCategory/${item._id}/${item.parent_id}`}
                            className="btn btn-sm font-sm rounded btn-brand"
                          >
                            <i className="material-icons md-edit"></i> Edit
                          </Link>

                          <Link
                            className="btn btn-sm font-sm btn-danger rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteClick(item._id);
                            }}
                          >
                            <i className="material-icons md-delete_forever"></i>
                            Delete
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <div className="pagination-area mt-15 mb-50">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-start">
              <li className="page-item active">
                <a className="page-link" href="#">
                  01
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  02
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  03
                </a>
              </li>
              <li className="page-item">
                <a className="page-link dot" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  16
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="material-icons md-chevron_right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
      </section>
    </>
  );
};
