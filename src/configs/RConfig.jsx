import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Womenservices from "../pages/Home/homeComps/Services/Womenser";
import Mensservices from "../pages/Home/homeComps/Services/Menservices";
import Childservices from "../pages/Home/homeComps/Services/Chilservices";

import PaymentSec from "../pages/Home/homeComps/PaymentsSer/Checkout";
import Stylist from "../pages/Home/homeComps/PaymentsSer/Stylist";
import Login from "../pages/SecondDashboard/login/Login";
import Dashboard from "../pages/SecondDashboard/DashBoard/Dashboard";
import Test from "../pages/test/Test";
import Bookings from "../pages/SecondDashboard/pagesForDashboard/bookings/Bookings";
import Bills from "../pages/SecondDashboard/pagesForDashboard/bills/Bills";
import Products from "../pages/SecondDashboard/pagesForDashboard/products/Products";
import Customers from "../pages/SecondDashboard/pagesForDashboard/customers/Customers";
import StylistList from "../pages/SecondDashboard/pagesForDashboard/Stylists/StylistList";
import MainLogin from "../pages/Login/Main-Login";
import CreateApt from "../pages/SecondDashboard/creates/CreateApt/CreateApt";

const router = createBrowserRouter([
  // {
  //   path: "/01",
  //   element: <FetchSelectedProd />,
  // },
  {
    path: "/",
    element: <MainLogin />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/services/women",
    element: <Womenservices />,
  },
  {
    path: "/services/men",
    element: <Mensservices />,
  },
  {
    path: "/services/child",
    element: <Childservices />,
  },
  {
    path: "/checkout",
    element: <PaymentSec />,
  },
  {
    path: "/checkout/1",
    element: <Stylist />,
  },

  // Second Dashboard
  {
    path: "/appointment",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: "/bills",
    element: <Bills />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
  {
    path: "/stylist",
    element: <StylistList />,
  },
  {
    path: "/create/appointment",
    element: <CreateApt />,
  },
]);

export default router;
