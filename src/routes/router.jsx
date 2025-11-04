import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage/Homepage";
import AllProducts from "../pages/AllProducts/AllProducts";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import MyBidsPage from "../pages/MyBidsPage/MyBidsPage";
import CreateProductPage from "../pages/CreateProductPage/CreateProductPage";
import MyProductsPage from "../pages/MyProductsPage/MyProductsPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <p>Loading..</p>,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Homepage />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "",
            element: <PrivateRoute />,
            children: [
              {
                path: "product-details/:productId",
                element: <ProductDetails />,
              },
              {
                path: "my-products",
                element: <MyProductsPage />,
              },
              {
                path: "my-bids",
                element: <MyBidsPage />,
              },
              {
                path: "create-product",
                element: <CreateProductPage />,
              },
            ],
          },
        ],
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
    ],
  },
]);
