import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/productContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import ReactPaginate from "react-paginate";
import { useState } from "react";
export const Products = () => {
  const { deleteProduct, fetchProductsByKeyword, searchProduct } =
    useContext(ProductContext);
  const { userId, userRole } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProductsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/getProducts/ByPagination/?limit=3&page=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProductsData();
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);

  const handleDeleteClick = (itemId) => {
    // Show confirmation alert
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // If user confirms deletion
    if (isConfirmed) {
      deleteProduct(itemId);
    } else {
      // If user cancels deletion
      console.log("Deletion canceled");
    }
  };
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const debouncedFetchProductsByKeyword = debounce(fetchProductsByKeyword, 300);

  const handleSearch = (search_query) => {
    debouncedFetchProductsByKeyword(search_query);
  };
  const fetchProducts = async (currentPage) => {
    const response = await fetch(
      `http://localhost:3000/api/v1/getProducts/ByPagination/?limit=3&page=${currentPage}`
    );
    const data = await response.json();
    return data;
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const currentData = await fetchProducts(currentPage);
    setProducts(currentData);
  };
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">Product List</h2>
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
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <div className="text-right">
                  <a
                    href="addproducts"
                    className="btn btn-primary btn-sm rounded"
                  >
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
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Available Stock</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Author</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchProduct && searchProduct.length > 0 ? (
                    searchProduct.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <b>{item.PrName}</b>
                        </td>
                        <td>{item.PrPrice}</td>
                        <td>{item.PrQty}</td>
                        <td>{item.stock}</td>
                        <td>{item.Grade}</td>
                        <td>
                          <b>{item.Author}</b>
                        </td>
                        <td>{item.category}</td>
                        <td>{item.Description}</td>
                        <td style={{ height: "50px", width: "50px" }}>
                          <img
                            src={`${import.meta.env.VITE_IMG_SERVER_URL}${
                              item.img
                            }`}
                            alt="product_img"
                          />
                        </td>
                        <td
                          className="text-end"
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            to={`/updateProduct/${item._id}`}
                            className="btn btn-sm font-sm rounded btn-brand"
                          >
                            <i className="material-icons md-edit"></i> Edit
                          </Link>
                          <Link
                            className="btn btn-sm font-sm btn-danger  rounded"
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
                    ))
                  ) : (
                    <tr></tr>
                  )}

                  {!searchProduct ||
                    (searchProduct.length === 0 &&
                      products &&
                      products.map((item, index) => (
                        <tr key={index} style={{ verticalAlign: "middle" }}>
                          <td>
                            <b>{item.PrName}</b>
                          </td>
                          <td>{item.PrPrice}</td>
                          <td>{item.PrQty}</td>
                          <td>
                            <span
                              className={`badge rounded-pill ${
                                item.stock === 0
                                  ? "alert alert-danger alert-dismissible"
                                  : item.stock <= 10
                                  ? "alert alert-warning alert-dismissible"
                                  : "alert alert-success alert-dismissible"
                              }`}
                            >
                              {item.stock}
                            </span>
                          </td>
                          <td>{item.Grade}</td>
                          <td>
                            <b>{item.Author}</b>
                          </td>
                          <td>{item.category}</td>
                          <td>{item.Description}</td>
                          <td style={{ height: "50px", width: "50px" }}>
                            <img
                              src={`${import.meta.env.VITE_IMG_SERVER_URL}${
                                item.img
                              }`}
                              alt="product_img"
                            />
                          </td>
                          <td
                            className=""
                            style={{
                              display: "flex",
                              gap: "15px",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Link
                                to={`/updateProduct/${item._id}`}
                                className="btn btn-sm font-sm rounded btn-brand"
                                style={{
                                  display: "flex",
                                  width: "80px",
                                  marginBottom: "5px",
                                }} // Set the width of the link
                              >
                                <i className="material-icons md-edit"></i> Edit
                              </Link>
                              <Link
                                className="btn btn-sm font-sm btn-danger rounded"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteClick(item._id);
                                }}
                                style={{ width: "80px" }} // Set the width of the link
                              >
                                <i className="material-icons md-delete_forever"></i>
                                Delete
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )))}
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
