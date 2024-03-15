import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { FrontEndLayout } from "../layout/FrontEndLayout";
import { Products } from "../pages/products/Products";
import { User } from "../pages/user/User";
import { Category } from "../pages/category/Category";
import { AddProduct } from "../pages/products/AddProduct";
import { AddUser } from "../pages/user/AddUser";
import { AddCategory } from "../pages/category/AddCategory";
import { Order } from "../pages/order/Order";
import { UpdateCategory } from "../pages/category/UpdateCategory";
import { UpdateProduct } from "../pages/products/UpdateProduct";
import { UserUpdate } from "../pages/user/UserUpdate";
import { LogIn } from "../pages/user/LogIn";
import { OrderDetail } from "../pages/order/OrderDetail";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<FrontEndLayout />}>
        <Route index element={<Home />} />
        <Route path="addproducts" element={<AddProduct />} />
        <Route path="addUser" element={<AddUser />} />
        <Route path="addcategory" element={<AddCategory />} />
        <Route
          path="updateCategory/:id/:parentId"
          element={<UpdateCategory />}
        />
        <Route path="updateUser/:id" element={<UserUpdate />} />
        <Route path="products" element={<Products />} />
        <Route path="updateProduct/:id" element={<UpdateProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="user" element={<User />} />
        <Route path="orders" element={<Order />} />
        <Route path="orderDetails/:id" element={<OrderDetail />} />
        <Route path="login" element={<LogIn />} />
      </Route>
    </Routes>
  );
};
