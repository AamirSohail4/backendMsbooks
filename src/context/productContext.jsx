import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext({});

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/getProducts");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProductsByKeyword = async (search_query) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/searchProductByName/${search_query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      console.log("Data Response", data);
      setSearchProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProductsByKeyword();
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    console.log("This is productId", productId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/deleteProduct/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      fetchProducts();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  // console.log("Response", products);
  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProduct,
        fetchProducts,
        fetchProductsByKeyword,
        searchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
