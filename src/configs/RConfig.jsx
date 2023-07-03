import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Womenservices from "../pages/Home/homeComps/Services/Womenser";
import Mensservices from "../pages/Home/homeComps/Services/Menservices";
import Childservices from "../pages/Home/homeComps/Services/Chilservices";

import PaymentSec from "../pages/Home/homeComps/PaymentsSer/Checkout";
import Login from "../pages/SecondDashboard/creates/CreateApt/login/Login";
import Bookings from "../pages/SecondDashboard/pagesForDashboard/bookings/Bookings";
import Bills from "../pages/SecondDashboard/pagesForDashboard/bills/Bills";
import Products from "../pages/SecondDashboard/pagesForDashboard/products/Products";
import Customers from "../pages/SecondDashboard/pagesForDashboard/customers/Customers";
import StylistList from "../pages/SecondDashboard/pagesForDashboard/Stylists/StylistList";
import MainLogin from "../pages/Login/Main-Login";
import CreateApt from "../pages/SecondDashboard/creates/CreateApt/CreateApt";
import CorrectedDashBoard from "../pages/SecondDashboard/DashBoard/CorrectedDashBoard";
import SaveAppointment from "../pages/SecondDashboard/DashBoard/SaveAppointment";

import CreateBooking from '../pages/SecondDashboard/creates/CreateBooking/CreateBooking'
import ProtectedRouteForUser from "./AuthRoutes";
import UserEndBooking from "../pages/Home/CreateBooking";
import Test02 from "../pages/test/Test2";
import WomenservicesApt from "../pages/SecondDashboard/creates/CreateApt/ServicesOfApt/WomenserApt";
import ChildservicesApt from "../pages/SecondDashboard/creates/CreateApt/ServicesOfApt/ChilservicesApt";
import MenservicesApt from "../pages/SecondDashboard/creates/CreateApt/ServicesOfApt/MenservicesApt";
import CheckoutOfApt from "../pages/SecondDashboard/creates/CreateApt/checkoutsofApt/CheckoutOfApt";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLogin />,
  },
  {
    path: "/02",
    element: <Test02 />,
  },
  {
    path: "/01",
    element: <UserEndBooking />,
  },
  {
    path: "/home",
    element:<ProtectedRouteForUser> <Home /> </ProtectedRouteForUser>,
  },  
  {
    path: "/services/women",
    element:<ProtectedRouteForUser> <Womenservices /> </ProtectedRouteForUser>,
  },
  {
    path: "/services/men",
    element:<ProtectedRouteForUser> <Mensservices /> </ProtectedRouteForUser>,
  },
  {
    path: "/services/child",
    element:<ProtectedRouteForUser> <Childservices /> </ProtectedRouteForUser>,
  },

  {
    path: "/checkout",
    element:<ProtectedRouteForUser> <PaymentSec /> </ProtectedRouteForUser>,
  },
  {
    path: "/checkout/booking/processing",
    element:<ProtectedRouteForUser> <UserEndBooking /> </ProtectedRouteForUser>,
  },


  // Second Dashboard
  {
    path: "/appointment",
    element: <Login />,
  },
  {
    path: "/create/appointment",
    element: <CheckoutOfApt />,
  },
  {
    path: "/appointment/services/women",
    element: <WomenservicesApt />,
  },
  {
    path: "/appointment/services/men",
    element: <MenservicesApt />,
  },
  {
    path: "/appointment/services/child",
    element: <ChildservicesApt />,
  },
  // {
  //   path: "/dashboard01",
  //   element: <Dashboard />,
  // },
  {
    path: "/dashboard",
    element: <CorrectedDashBoard />,
  },
  {
    path: "/save/appointment/:id",
    element: <SaveAppointment />,
  },

  // store for dashboard users
  // booking with dashboard
  


  // end
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
  // {
  //   path: "/create/appointment",
  //   element: <CreateApt />,
  // },
  
  // creates
  {
    path: "/create/appointment",
    element: <CreateApt />,
  },
  {
    path: "/create/booking",
    element: <CreateBooking />,
  },
  
]);

export default router;
