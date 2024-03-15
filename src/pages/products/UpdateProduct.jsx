import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/categoryContext";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import { UserContext } from "../../context/userContext";

export const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { categories } = useContext(CategoryContext);
  const { fetchProducts } = useContext(ProductContext);
  const { userId, userRole } = useContext(UserContext);

  useEffect(() => {
    // If userId doesn't exist or userRole is not admin, redirect to login
    if (!userId && userRole !== "admin") {
      navigate("/login");
    }
  }, [userId, userRole]);
  const [proData, setProData] = useState();
  const [PrName, setPrName] = useState("");
  const [PrPrice, setPrPrice] = useState("");
  const [PrQty, setPrQty] = useState("");
  const [Grade, setGrade] = useState("");
  const [Author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [Description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/getProduct/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await response.json();
        setProData(productData);
        setPrName(productData.PrName);
        setPrPrice(productData.PrPrice);
        setPrQty(productData.PrQty);
        setGrade(productData.Grade);
        setAuthor(productData.Author);
        setCategory(productData.category);
        setStock(productData.stock);
        setDescription(productData.Description);
        // Assuming productData.img is the file object
        setImg(productData.img);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("PrName", PrName);
      formDataToSend.append("PrPrice", PrPrice);
      formDataToSend.append("PrQty", PrQty);
      formDataToSend.append("Grade", Grade);
      formDataToSend.append("Author", Author);
      formDataToSend.append("category", category);
      formDataToSend.append("Description", Description);
      formDataToSend.append("stock", stock);
      formDataToSend.append("img", img);

      const response = await fetch(
        `http://localhost:3000/api/v1/updateProduct/${id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        alert("Product Updated");
        fetchProducts();
        navigate("/products");
      } else {
        alert("Dublicate Product ");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
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
              <h2 className="content-title">Update Product</h2>
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
                    onSubmit={handleUpdateSubmit}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Product title
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Product title"
                        type="text"
                        name="name"
                        id="name"
                        value={PrName}
                        onChange={(e) => setPrName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Product Price
                      </label>
                      <input
                        className="form-control"
                        placeholder="Enter Product Price"
                        type="number"
                        name="price"
                        id="price"
                        value={PrPrice}
                        onChange={(e) => setPrPrice(e.target.value)}
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
                        id="qty"
                        name="qty"
                        value={PrQty}
                        onChange={(e) => setPrQty(e.target.value)}
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
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
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
                        value={Grade}
                        onChange={(e) => setGrade(e.target.value)}
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
                        value={Author}
                        onChange={(e) => setAuthor(e.target.value)}
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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Select Category</option>
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
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="img" className="form-label">
                        Product img
                      </label>
                      <p style={{ height: "50px", width: "50px" }}>
                        <img
                          src={`${import.meta.env.VITE_IMG_SERVER_URL}${
                            proData?.img
                          }`}
                          alt="product_img"
                        />
                      </p>
                      <input
                        className="form-control"
                        type="file"
                        name="img"
                        id="img"
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginRight: "8px" }}
                      >
                        Update
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
