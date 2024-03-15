import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext({});

// eslint-disable-next-line react/prop-types
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/getAllCategories/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getDeleteCategories/${categoryId}`,
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
      // If deletion is successful, fetch the updated list of categories
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async (categoryId, Category_Name) => {
    console.log("This a good response", categoryId, Category_Name);
  };
  return (
    <CategoryContext.Provider
      value={{
        deleteCategory,
        categories,
        fetchCategories,
        updateCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
