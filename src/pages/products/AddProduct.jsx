import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { ProductContext } from "../../context/productContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const AddProduct = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchProducts } = useContext(ProductContext);
  const { userId, userRole } = useContext(UserContext);

  useEffect(() => {
    // If userId doesn't exist or userRole is not admin, redirect to login
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    qty: "",
    grade: "",
    author: "",
    category: "",
    desc: "",
    img: null,
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.qty ||
      !formData.grade ||
      !formData.author ||
      !formData.category ||
      !formData.stock ||
      !formData.img
    ) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("PrName", formData.name);
      formDataToSend.append("PrQty", formData.qty);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("PrPrice", formData.price);
      formDataToSend.append("Grade", formData.grade);
      formDataToSend.append("Author", formData.author);
      formDataToSend.append("Description", formData.desc);
      formDataToSend.append("img", formData.img);
      formDataToSend.append("categoryId", formData.category);

      const response = await fetch(
        "http://localhost:3000/api/v1/addProduct/new",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          price: "",
          qty: "",
          grade: "",
          stock: "",
          author: "",
          category: "",
          desc: "",
          img: "",
        });
        setErrorMessage("");
        alert("Product Inserted");
        fetchProducts();
      } else {
        // Handle error response from server
        setErrorMessage("Dublicate  Product");

        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };
  const handleCancel = () => {
    navigate("/products");
  };
  return (
    <>
      <section className="content-main">
        <div className="row">
          <div className="col-6">
            <div className="content-header">
              <h2 className="content-title">Add New Product</h2>
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
                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Product title
                      </label>
                      <input
                        className="form-control "
                        placeholder="Enter Product title"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {errorMessage && (
                        <div className="text-danger mb-3">{errorMessage}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Product Price
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Product Price"
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="qty" className="form-label">
                        Product Qty
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Product Quantity"
                        type="number"
                        name="qty"
                        id="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="stock" className="form-label">
                        Product Stock
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Product Quantity"
                        type="number"
                        name="stock"
                        id="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Product Grade
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Product Grade"
                        type="text"
                        name="grade"
                        id="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="author" className="form-label">
                        Product Author
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Author name"
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Product Category
                      </label>
                      <select
                        className="form-select"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
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
                    <div className="mb-3">
                      <label htmlFor="desc" className="form-label">
                        Product Description
                      </label>
                      <textarea
                        placeholder="Type here"
                        className="form-control"
                        rows="4"
                        name="desc"
                        id="desc"
                        value={formData.desc}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="img" className="form-label">
                        Product img
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        name="img"
                        id="img"
                        onChange={handleFileChange}
                      />
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
