import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/ordrContext";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
export const Order = () => {
  const { handleDeleteItem } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const handleDelete = (OrderId) => {
    handleDeleteItem(OrderId);
  };
  const fetchOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/handleGetAllOrdersDetails?limit=3&page=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setOrders(data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrderDetails = async (currentPage) => {
    const response = await fetch(
      `http://localhost:3000/api/handleGetAllOrdersDetails?limit=3&page=${currentPage}`
    );
    const data = await response.json();
    return data?.data;
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const currentData = await fetchOrderDetails(currentPage);
    setOrders(currentData);
  };
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">Order List</h2>
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
            </div>
          </header>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>OrderID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">PaymentMethod</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">SubTotal</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(orders) &&
                    orders?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item?.OrderId}</td>
                          <td>
                            <b>{item?.userName}</b>
                          </td>
                          <td>{item?.paymentMethodName}</td>
                          <td>{item?.totalQty}</td>
                          <td>{item?.SubTotal}</td>

                          <td>
                            <span
                              className={`badge rounded-pill ${
                                item.Status === "Shipped"
                                  ? "alert-success"
                                  : "alert-warning"
                              }`}
                            >
                              {item?.Status}
                            </span>
                          </td>

                          <td>{item?.createdAt}</td>

                          <td
                            className="text-end"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "5px",
                            }}
                          >
                            <Link
                              to={`/orderDetails/${item?.OrderId}`}
                              className="btn btn-sm font-sm rounded btn-brand"
                            >
                              <i className="material-icons md-edit"></i> Edit
                            </Link>
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                if (
                                  window.confirm(
                                    "Are you sure to Delete Order?"
                                  )
                                )
                                  handleDelete(item?.OrderId);
                              }}
                              className="btn btn-sm font-sm btn-danger rounded"
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
