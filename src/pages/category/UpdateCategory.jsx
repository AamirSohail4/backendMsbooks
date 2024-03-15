import { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const UpdateCategory = () => {
  const navigate = useNavigate();
  const { fetchCategories, categories } = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState("1");
  const { id } = useParams();
  // Fetch category data based on categoryId
  const { userId, userRole } = useContext(UserContext);

  useEffect(() => {
    // If userId doesn't exist or userRole is not admin, redirect to login
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/getSingleCategory/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const categoryData = await response.json();
        console.log("That is a Response againse id", categoryData);
        setCategoryName(categoryData.category_name);
        setLevel(categoryData.level);
        setParentCategoryId(categoryData.parent_id);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setErrorMessage("Failed to fetch category data");
      }
    };
    fetchCategoryData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      setErrorMessage("Category name is required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/getUpdateCategories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parent_id: parentCategoryId,
            category_name: categoryName,
            level: level,
          }),
        }
      );

      if (!response.ok) {
        alert("Dublicate Value");
        throw new Error("Failed to update category");
      }
      fetchCategories();

      setErrorMessage("");

      // You may want to update the UI or perform any other actions upon successful submission
    } catch (error) {
      console.error("Error updating category:", error);
      setErrorMessage("Failed to update category");
    }
  };
  const handleCancel = () => {
    navigate("/category");
  };

  return (
    <>
      <section className="content-main">
        <div className="row">
          <div className="col-6">
            <div className="content-header">
              <h2 className="content-title">Update Category</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div
                className="card"
                style={{ backgroundColor: "white", border: "1px solid #ccc" }}
              >
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        placeholder="Enter Category Name"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        required
                      >
                        <option value="0">None</option>
                        {categories.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {errorMessage && (
                      <div className="text-danger mb-3">{errorMessage}</div>
                    )}
                    <div className="mb-3">
                      <select
                        className="form-select"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                      >
                        <option value="1">Level 1</option>
                        <option value="2">Level 2</option>
                        <option value="3">Level 3</option>
                      </select>
                    </div>
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
