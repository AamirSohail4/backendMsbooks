import "./assets/css/main.css";
import { UserProvider } from "./context/userContext";
import { CategoryProvider } from "./context/categoryContext";
import { ProductProvider } from "./context/productContext";
import { Router } from "./router/Router";
import { OrderProvider } from "./context/ordrContext";

export const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CategoryProvider>
          <OrderProvider>
            <Router />
          </OrderProvider>
        </CategoryProvider>
      </ProductProvider>
    </UserProvider>
  );
};
