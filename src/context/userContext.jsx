import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  const [users, setUsers] = useState([]);
  const [userCity, setuserCity] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/getAllUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://www.weberp.pk/app/msbooks/weberp_api.php?mask=msbooks&tag=get_city&intCountryID=1&intCompanyID=1"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();

      setuserCity(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const userDelete = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/deletuserByID/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCities();
  }, []);
  const updateUser = async (categoryId, Category_Name) => {
    console.log("This a good response", categoryId, Category_Name);
  };
  return (
    <UserContext.Provider
      value={{
        users,
        userDelete,
        updateUser,
        userCity,
        fetchUsers,
        userId,
        setUserId,
        setUserRole,
        userRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
