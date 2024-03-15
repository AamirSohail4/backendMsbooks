import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext({});

// eslint-disable-next-line react/prop-types
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/handleGetAllOrders"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();

      setOrders(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (OrderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/handleDeleteOrderByOrderId/${OrderId}`,
        {
          method: "DELETE",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchOrders();
      }
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      throw new Error("Failed to delete user");
    }
  };

  handleDeleteItem();
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        handleDeleteItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
