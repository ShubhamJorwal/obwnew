import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Womenservices from "../pages/Home/homeComps/Services/Womenser";
import Mensservices from "../pages/Home/homeComps/Services/Menservices";
import Childservices from "../pages/Home/homeComps/Services/Chilservices";

import PaymentSec from "../pages/Home/homeComps/PaymentsSer/Checkout"
import Stylist from "../pages/Home/homeComps/PaymentsSer/Stylist";
import Login from "../pages/SecondDashboard/login/Login";
import Dashboard from "../pages/SecondDashboard/DashBoard/Dashboard";
import Test from "../pages/test/Test";
import StylistList from "../pages/Home/homeComps/PaymentsSer/StylistSlider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/01",
    element: <StylistList />,
  },
  // {
  //   path: "/asdf",
  //   element: <Test/>,
  // },
  {
    path: "/services/women",
    element: <Womenservices/>,
  },
  {
    path: "/services/men",
    element: <Mensservices/>,
  },
  {
    path: "/services/child",
    element: <Childservices/>,
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
  
]);

export default router;
