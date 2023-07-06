import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./saveAptData.scss";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const SaveAppointment = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [showProductsSlider, setshowProductsSlider] = useState(null);
  const [products, setProducts] = useState(null);


  const [showDiv2nd, setShowDiv2nd] = useState(false);

  const [subServices, setSubServices] = useState([]);
  
  const [showStylistSlider, setShowStylistSlider] = useState(false);
  const [stylistName, setStylistName] = useState("");

  const [stylists, setStylists] = useState([]);

  const [showDiv, setShowDiv] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get(
          "https://admin.obwsalon.com/api/stylists",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        setStylists(response.data);
      } catch (error) {
        console.log("Error fetching stylists:", error);
      }
    };

    fetchStylists();
    setShowDiv(true);
    setIsSliderVisible(true);
    setShowStylistSlider(false);

    const storedStylistName = localStorage.getItem("SelectedStylist");
    setStylistName(storedStylistName);
    if (storedStylistName) {
      const stylist = JSON.parse(storedStylistName);
      setStylistName(stylist.first_name + " " + stylist.last_name);
    }

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await axios.get(
          "https://admin.obwsalon.com/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    setShowDiv2nd(true);
    setshowProductsSlider(false);
  }, []);
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    // Fetch appointment data using the appointmentId parameter
    const token = localStorage.getItem("token");
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          "https://admin.obwsalon.com/api/appointments",
          {
            params: {
              filter: {
                id: appointmentId,
              },
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length > 0) {
          setAppointment(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  useEffect(() => {
    // Fetch customer data using the customer ID from the appointment data
    if (appointment) {
      const token = localStorage.getItem("token");
      const fetchCustomer = async () => {
        try {
          const response = await axios.get(
            `https://admin.obwsalon.com/api/customers?filter[id]=${appointment.customer_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.length > 0) {
            setCustomer(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };

      fetchCustomer();
    }
  }, [appointment]);

  const goToPreviousPage = () => {
    window.history.back();
  };

  const formatTime = (timeString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
  };

  // Render the customer and appointment data
  useEffect(() => {
    // Fetch DashSelectedData from localStorage
    const dashSelectedData = localStorage.getItem("DashSelectedData");
    console.log("Stored DashSelectedData:", dashSelectedData);

    // Parse the stored data as JSON and access the first element of the array
    const parsedData = JSON.parse(dashSelectedData);
    const selectedData = parsedData[0];

    // Set the subServices state
    if (selectedData && selectedData.subServices) {
      setSubServices(selectedData.subServices);
    }
    setSubServices(
      parsedData
        .map(({ subServices }) =>
          subServices.map((subService) => ({ ...subService, quantity: 1 }))
        )
        .flat()
    );
  }, []);

  const handleAddSubService = (subServiceId) => {
    const updatedSubServices = subServices.map((subService) => {
      if (subService.id === subServiceId) {
        return { ...subService, quantity: subService.quantity + 1 };
      }
      return subService;
    });
    setSubServices(updatedSubServices);
  };

  const handleRemoveSubService = (subServiceId) => {
    const updatedSubServices = subServices.map((subService) => {
      if (subService.id === subServiceId && subService.quantity > 0) {
        return { ...subService, quantity: subService.quantity - 1 };
      }
      return subService;
    });
    setSubServices(updatedSubServices);
  };


  const handleDeleteSubService = (subServiceId) => {
    const updatedSubServices = subServices.filter(
      (subService) => subService.id !== subServiceId
    );
    setSubServices(updatedSubServices);

    // Get the stored SelectedData from localStorage
    const storedData = localStorage.getItem("DashSelectedData");
    if (storedData) {
      // Parse the stored data into an array
      const parsedData = JSON.parse(storedData);

      // Find the object containing the subServiceId
      const updatedData = parsedData.map((data) => {
        const updatedSubServices = data.subServices.filter(
          (subService) => subService.id !== subServiceId
        );
        return {
          ...data,
          subServices: updatedSubServices,
        };
      });

      // Update the SelectedData in localStorage with the updated data
      localStorage.setItem("DashSelectedData", JSON.stringify(updatedData));
    }

    window.location.reload();
  };

  const handleAddProductsApt = () => {
    setshowProductsSlider(true);
    setIsButtonClicked(true);

    setIsSliderVisible(true);
  };

  const handleCrossClick = () => {
    setIsSliderVisible(false);
    setIsButtonClicked(false);
    setShowStylistSlider(false);
    setshowProductsSlider(false);

    window.location.reload();
  };

  return (
    <div>
      <div id="TopHeader">
        <div id="backbtn" onClick={goToPreviousPage}>
          <AiOutlineArrowLeft />
        </div>
        <h1>Appointment</h1>
        <div id="lastRes"></div>
      </div>
      {appointment && customer ? (
        <div id="Cus">
          <p className="detailssd">
            {customer.first_name} {customer.last_name}
          </p>
          <p className="detailssd">{customer.contact_no.substr(0, 7)}***</p>
          <p className="detailssd"> {appointment.appointment_date}</p>
          <p className="detailssd">
            {" "}
            {formatTime(appointment.appointment_time)}
          </p>
          {/* Add other appointment details as needed */}
        </div>
      ) : (
        // <p>Loading...</p>
        <p></p>
      )}

      <div id="buttonsforappointment">
        <Link to={"/dashboard/women/services"}>
          <button>Add Service</button>
        </Link>
        <button onClick={handleAddProductsApt}>Add Product</button>
      </div>

      <div id="ordersection">
        {subServices.length > 0 ? (
          subServices.map((subService) => (
            <div key={subService.id} id="OrderCheckforapt">
              <div id="firstRowaptch">
                <p>{subService.service_name}</p>
                <div id="incdecapt">
                  <div>
                    <button
                      onClick={() => handleRemoveSubService(subService.id)}
                    >
                      -
                    </button>
                    <span>{subService.quantity}</span>
                    <button onClick={() => handleAddSubService(subService.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div id="aptrdPrice">
                  <p>{subService.price_including_gst}/-</p>
                </div>
                <div id="aptthtotalprice">
                  <p>
                    {(
                      subService.price_including_gst * subService.quantity
                    ).toFixed(2)}
                    /-
                  </p>
                </div>
                <div
                  id="deletesubserv"
                  onClick={() => handleDeleteSubService(subService.id)}
                >
                  <MdDelete color="red" size={"1.3rem"} />
                </div>
              </div>
              <div id="belowFirstrowapt">
                {/* <button onClick={handleAddStylist}>Add Stylist</button> */}
                <button>Add Stylist</button>
                <span>Stylist : {subService.stylist}</span>
                <div id="thtotalprice02">
                  <p>
                    GST {subService.gst}% ={" "}
                    {(
                      subService.price_including_gst *
                      subService.quantity *
                      (subService.gst / 100)
                    ).toFixed(2)}
                    /-
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No sub-services found.</p>
        )}
      </div>
      
      {/* fetch products */}
      <div id="secondCheck">
        {showProductsSlider && (
          <div className={`overlay ${showDiv2nd ? "show" : ""}`}>
            {/* Slider content */}
            <div className="content">
              <div
                className="service-details"
                style={{
                  height: "inherit",
                }}
              >
                <div id="topLayerForSerBook">
                  <div id="middledataforserbook"></div>
                  <h1>Product List</h1>
                  <div className="back-button" onClick={handleCrossClick}>
                    <RxCross2 />
                  </div>
                </div>
                <div style={{ margin: "1rem 0" }} id="searchbarforproducts">
                  <input
                    type="text"
                    placeholder="Search for products & brands"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                {/* Self-coded */}
                <div id="middleFetchedData">
                  {filteredProducts.map((product, index) => (
                    <div
                      id="productDIvSC"
                      key={`${product.id}-${index}`}
                      className={`product-div ${
                        selectedProducts.some(
                          (selectedProduct) => selectedProduct.id === product.id
                        )
                          ? "selectedProduct"
                          : ""
                      }`}
                      onClick={() => handleDivSelection(product)}
                    >
                      <div id="divscf1">
                        <h3>{product.product_name}</h3>{" "}
                        <div id="childofdivsc">
                          <p>{product.sku}</p>
                          <p style={{ color: "#0B8F00" }}>
                            {product.quantity === 0 ? (
                              <p className="out-of-stock">Out of Stock</p>
                            ) : (
                              <p>{product.quantity} Stocks left</p>
                            )}
                          </p>
                          <p>{product.brand}</p>
                        </div>
                      </div>
                      <div style={{ border: "none" }} id="divscf2">
                        {product.amount_with_gst}
                      </div>
                    </div>
                  ))}
                </div>

                <div id="lastbtnofserviceadd">
                  <Link
                    className="book-button"
                    to="/checkout"
                    // onClick={handleAddItem}
                    onClick={handleCrossClick}
                  >
                    Add Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
    
  );
};

export default SaveAppointment;







