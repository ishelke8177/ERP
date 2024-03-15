import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Error from "./components/Error";
import Footer from "./components/Footer";
import Body from "./Pages/Body";
import Orders from "./Pages/Orders";
import EditItem from "./Pages/EditItem";
import ProceedOrder from "./Pages/ProceedOrder";
import Products from "./Pages/Products";
import store from "./app/store";
import { useEffect } from "react";
import { fetchFoodItems, getOrderItems } from "./features/apiCalls";

function Home() {
  return (
    <>
      <div><Toaster/></div>
      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/proceed-order/:orderId',
        element: <ProceedOrder />,
      },
      {
        path: '/edit-order/:itemId',
        element: <EditItem />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);