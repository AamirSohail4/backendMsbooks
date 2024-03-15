import { useContext, useState } from "react";
import { OrderContext } from "../../context/ordrContext";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export const OrderDetail = () => {
  const [ordersDetails, setOrdersDetails] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { id } = useParams();

  const fetchOrdersByUserId = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getOrderDetailsBYOrderID/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      console.log("Response Data,", data?.data);
      setOrdersDetails(data?.data);
    } catch (error) {
      console.error(error);
      // Handle error state or display an error message to the user
    }
  };

  useEffect(() => {
    fetchOrdersByUserId();
  }, []);

  console.log("It is a Order detail Section ", ordersDetails);
  const calculateSubtotal = () => {
    let subtotal = 0;
    ordersDetails?.mainProductName?.forEach((item, index) => {
      subtotal += item.PrPrice * ordersDetails.qty[index];
    });
    return subtotal;
  };

  // Function to calculate grand total
  const calculateGrandTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shippingCost = 10; // Assuming shipping cost is $10
    return formatCurrency(subtotal + shippingCost);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected status:", selectedValue);
    setSelectedStatus(selectedValue);
  };
  const updateOrderStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/updateOrderBYOrderID/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: selectedStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      fetchOrdersByUserId();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">Order detail</h2>
            <p>Details for Order ID:{ordersDetails?.OrderId} </p>
          </div>
        </div>
        <div className="card">
          <header className="card-header">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 mb-lg-0 mb-15">
                <span>
                  <i className="material-icons md-calendar_today"></i>
                  <b>Wed, Aug 13, 2020, 4:34PM</b>
                </span>
                <br />
                <small className="text-muted">Order ID: 3453012</small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto text-md-end">
                <select
                  className="form-select d-inline-block mb-lg-0 mr-5 mw-200"
                  onChange={handleStatusChange}
                  value={selectedStatus}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <Link className="btn btn-primary" onClick={updateOrderStatus}>
                  Save
                </Link>
                <a className="btn btn-secondary print ms-2" href="#">
                  <i className="icon material-icons md-print"></i>
                </a>
              </div>
            </div>
          </header>

          <div className="card-body">
            <div className="row mb-50 mt-20 order-info-wrap">
              <div className="col-md-4">
                <article className="icontext align-items-start">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <i className="text-primary material-icons md-person"></i>
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Customer</h6>
                    <p className="mb-1">
                      {ordersDetails?.userName} <br />
                      {ordersDetails?.userEmail} <br />
                      {ordersDetails?.userPhone}
                    </p>
                    <a href="#">View profile</a>
                  </div>
                </article>
              </div>

              <div className="col-md-4">
                <article className="icontext align-items-start">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <i className="text-primary material-icons md-local_shipping"></i>
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Order info</h6>
                    <p className="mb-1">
                      Shipping: Fargo express <br />
                      Pay method: {ordersDetails?.paymentMethodName} <br />
                      Status: {ordersDetails?.Status}
                    </p>
                  </div>
                </article>
              </div>

              <div className="col-md-4">
                <article className="icontext align-items-start">
                  <span className="icon icon-sm rounded-circle bg-primary-light">
                    <i className="text-primary material-icons md-place"></i>
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Deliver to</h6>
                    <p className="mb-1">{ordersDetails?.shippingAddress}</p>
                    <a href="#">View profile</a>
                  </div>
                </article>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th width="40%">Product</th>
                        <th width="20%">Unit Price</th>
                        <th width="20%">Quantity</th>
                        <th width="20%" className="text-end">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersDetails?.mainProductName?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <a className="itemside" href="#">
                              <div className="left">
                                <img
                                  src={`http://localhost:3000${item?.img}`}
                                  width="40"
                                  height="40"
                                  className="img-xs"
                                  alt="Item"
                                />
                              </div>
                              <div className="info">{item?.PrName}</div>
                            </a>
                          </td>
                          <td>{item?.PrPrice}</td>
                          <td>{ordersDetails?.qty[index]}</td>

                          <td className="text-end">
                            {formatCurrency(
                              ordersDetails?.qty[index] * item?.PrPrice
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4">
                          <article className="float-end">
                            <dl className="dlist">
                              <dt>Subtotal:</dt>
                              <dd>Rs:{calculateSubtotal()}</dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Shipping cost:</dt>
                              <dd>10.00</dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Grand total:</dt>
                              <dd>
                                <b className="h5">{calculateGrandTotal()}</b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt className="text-muted">Status:</dt>
                              <dd>
                                <span className="badge rounded-pill alert-success text-success">
                                  Payment done
                                </span>
                              </dd>
                            </dl>
                          </article>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-1"></div>
              <div className="col-lg-4">
                <div className="box shadow-sm bg-light">
                  <h6 className="mb-15">Payment info</h6>
                  <p>
                    <img
                      src="assets/imgs/card-brands/2.png"
                      className="border"
                      height="20"
                    />{" "}
                    Master Card **** **** 4768 <br />
                    Business name: Grand Market LLC <br />
                    Phone: +1 (800) 555-154-52
                  </p>
                </div>
                <div className="h-25 pt-4">
                  <div className="mb-3">
                    <label>Notes</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      id="notes"
                      placeholder="Type some note"
                    ></textarea>
                  </div>
                  <button className="btn btn-primary">Save note</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
