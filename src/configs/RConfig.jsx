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
import UserEndBooking from "../pages/Home/NewCreateBooking";
import Test02 from "../pages/test/Test2";
import WomenserApt from "../pages/SecondDashboard/creates/CreateApt/ServicesOfApt/WomenserApt";
import ChildServicesApt from "../pages/SecondDashboard/creates/CreateApt/ServicesOfApt/ChilservicesApt";
import MenservicesApt from "../pages/SecondDashboard/creates/CreateApt/ServicesOfApt/MenservicesApt";
import CheckoutOfApt from "../pages/SecondDashboard/creates/CreateApt/checkoutsofApt/CheckoutOfApt";
import AddCustomer from "../pages/SecondDashboard/pagesForDashboard/customers/AddCustomer/AddCustomer";
import CustomerDetails from "../pages/SecondDashboard/pagesForDashboard/customers/CustomerDetails/CustomerBookDetails";
import BillDetails from "../pages/SecondDashboard/pagesForDashboard/bills/BillsDetail.jsx/BillDetails";
import CreateCusForNewBook from "../pages/SecondDashboard/pagesForDashboard/bookings/CreateCusForNewBook";
import BookWomenServices from "../pages/SecondDashboard/pagesForDashboard/bookings/servicesForbooking/BookWomenser";
import BookMenServices from "../pages/SecondDashboard/pagesForDashboard/bookings/servicesForbooking/BookMenservices";
import BookChildServices from "../pages/SecondDashboard/pagesForDashboard/bookings/servicesForbooking/BookChilservices";
import SalonEndBooking from "../pages/SecondDashboard/pagesForDashboard/bookings/HandleCrnbok/SalonCreateBooking";
import SalonEndCancelBooking from "../pages/SecondDashboard/pagesForDashboard/bookings/HandleCrnbok/SalonCancelBook";
import Dashboard from "../pages/SecondDashboard/DashBoard/Dashboard";
import ConfirmCreateBooking from "../pages/SecondDashboard/creates/CreateBooking/ConfirmCreateBooking";
import UserEndBooking2O from "../pages/SecondDashboard/creates/CreateBooking/BookCOm";
import ApointmentSuces from "../pages/SecondDashboard/creates/CreateApt/login/ApointmentSuces";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLogin />,
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
  


  // Salon Dashboard
  {
    path: "/dashboard",
    // element: <CorrectedDashBoard />,
    element: <Dashboard />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: "/bookings/services/women",
    element: <BookWomenServices />,
  },
  {
    path: "/bookings/services/men",
    element: <BookMenServices />,
  },
  {
    path: "/bookings/services/child",
    element: <BookChildServices />,
  },
  {
    path: "/create-new-booking/customer-details",
    element: <CreateCusForNewBook />,
  },
  {
    path: "/create-new-booking/customer-details/booking",
    element: <SalonEndBooking />,
  },
  {
    path: "/create-new-booking/customer-details/cancel-booking",
    element: <SalonEndCancelBooking />,
  },

  {
    path: "/bills",
    element: <Bills />,
  },
  {
    path: "/bill/:billId",
    element: <BillDetails />,
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
  // add a customer
  {
    path: "/add/customer",
    element: <AddCustomer />,
  },

// create a booking

{
  path: "/create/booking",
  element: <CreateBooking />,
},
{
  path: "/confirm/create/booking",
  element: <ConfirmCreateBooking />,
},

{
  path: "/bookings/booking/processing",
  element:<UserEndBooking2O />,
},

  // creates
  {
    path: "/create/appointment",
    element: <Login />,
  },
  {
    path: "/create/appointment/success",
    element: <ApointmentSuces />,
  },
  {
    path: "/create/appointment",
    element: <CheckoutOfApt />,
  },
  {
    path: "/appointment/services/women",
    element: <WomenserApt />,
  },
  {
    path: "/appointment/services/men",
    element: <MenservicesApt />,
  },
  {
    path: "/appointment/services/child",
    element: <ChildServicesApt />,
  },
  // {
  //   path: "/dashboard01",
  //   element: <Dashboard />,
  // },

  {
    path: "/save/appointment/:id",
    element: <SaveAppointment />,
  },

  // store for dashboard users
  // booking with dashboard
  


  // end

  // {
  //   path: "/create/appointment",
  //   element: <CreateApt />,
  // },
  
  // creates
  {
    path: "/create/appointment",
    element: <CreateApt />,
  },

  
]);

export default router;
