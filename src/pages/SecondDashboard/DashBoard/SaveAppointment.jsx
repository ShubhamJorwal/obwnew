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







// import React, { useEffect, useState } from "react";
// // import "./checkout.scss";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import { RiAccountCircleLine } from "react-icons/ri";
// import { RxCross2 } from "react-icons/rx";
// import { BsSearch } from "react-icons/bs";
// import axios from "axios";
// import { TfiAngleRight } from "react-icons/tfi";

// const SaveAppointment = () => {
//   const Navigate = useNavigate();
//   const goToPreviousPage = () => {
//     Navigate("/services/women");
//   };
//   const [name, setName] = useState("");
//   const [contactNo, setContactNo] = useState("");
//   const [subServices, setSubServices] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [selectedStylist, setSelectedStylist] = useState(null);
//   const [showStylistSlider, setShowStylistSlider] = useState(false);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [selectedStylistId, setSelectedStylistId] = useState(null);

//   const [showProductsSlider, setshowProductsSlider] = useState(null);

//   const [isSelected, setIsSelected] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [stylistName, setStylistName] = useState("");

//   const [selectedStylistName, setSelectedStylistName] = useState("");

//   const [showDiv2nd, setShowDiv2nd] = useState(false);
//   useEffect(() => {
//     // Fetch data from localStorage
//     const storedData = localStorage.getItem("SelectedData");
//     const bookingData = localStorage.getItem("BookingData");

//     if (storedData && bookingData) {
//       const parsedData = JSON.parse(storedData);
//       // const parsedBookingData = JSON.parse(bookingData);
//       const { first_name, last_name, contact_no } = JSON.parse(bookingData);

//       // Update state with fetched data
//       // setName(parsedBookingData.map(data => `${data.first_name} ${data.last_name}`));
//       // setContactNo(parsedBookingData.map(data => data.contact_no.toString()));
//       // setContactNo(contact_no);
//       setName(`${first_name} ${last_name}`);
//       setContactNo(contact_no);

//       setSubServices(
//         parsedData
//           .map(({ subServices }) =>
//             subServices.map((subService) => ({ ...subService, quantity: 1 }))
//           )
//           .flat()
//       );
//       setLoading(false);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // data for products

//   //   // Retrieve the data from local storage
//   // const data = localStorage.getItem("selectedProducts");

//   // // Parse the JSON data into an object
//   // const selectedProduct = JSON.parse(data);

//   // // Access specific properties within the selectedProduct object
//   // console.log(selectedProduct.property1);
//   // console.log(selectedProduct.property2);
//   // // ...

//   // // You can also loop through the object properties
//   // for (let key in selectedProduct) {
//   //   if (selectedProduct.hasOwnProperty(key)) {
//   //     console.log(key + ": " + selectedProduct[key]);
//   //   }
//   // }

//   //

//   const handleAddSubService = (subServiceId) => {
//     const updatedSubServices = subServices.map((subService) => {
//       if (subService.id === subServiceId) {
//         return { ...subService, quantity: subService.quantity + 1 };
//       }
//       return subService;
//     });
//     setSubServices(updatedSubServices);
//   };

//   const handleRemoveSubService = (subServiceId) => {
//     const updatedSubServices = subServices.map((subService) => {
//       if (subService.id === subServiceId && subService.quantity > 0) {
//         return { ...subService, quantity: subService.quantity - 1 };
//       }
//       return subService;
//     });
//     setSubServices(updatedSubServices);
//   };

//   const handleDeleteSubService = (subServiceId) => {
//     const updatedSubServices = subServices.filter(
//       (subService) => subService.id !== subServiceId
//     );
//     setSubServices(updatedSubServices);

//     // Get the stored SelectedData from localStorage
//     const storedData = localStorage.getItem("SelectedData");
//     if (storedData) {
//       // Parse the stored data into an array
//       const parsedData = JSON.parse(storedData);

//       // Find the object containing the subServiceId
//       const updatedData = parsedData.map((data) => {
//         const updatedSubServices = data.subServices.filter(
//           (subService) => subService.id !== subServiceId
//         );
//         return {
//           ...data,
//           subServices: updatedSubServices,
//         };
//       });

//       // Update the SelectedData in localStorage with the updated data
//       localStorage.setItem("SelectedData", JSON.stringify(updatedData));
//     }

//     window.location.reload();
//   };

//   function deleteService(index) {
//     selectedData.splice(index, 1);
//     localStorage.setItem("selectedData", JSON.stringify(selectedData));

//     // Check if all services are deleted
//     if (selectedData.length === 0) {
//       localStorage.removeItem("selectedData");
//     }
//   }

//   const handleStylistClick = (stylist) => {
//     setSelectedStylist(stylist);
//   };

//   const handleAddStylist = () => {
//     // if (selectedStylist) {
//     //   localStorage.setItem("SelectedStylist", JSON.stringify(selectedStylist));
//     //   setSelectedStylistName(`${selectedStylist.first_name} ${selectedStylist.last_name}`);
//     // }

//     setShowStylistSlider(true);
//     setIsButtonClicked(true);
//     setIsSliderVisible(true);
//   };
//   const handleAddStylist2O = () => {
//     const selectedStylist = stylists.find(
//       (stylist) => stylist.id === selectedStylistId
//     );

//     if (selectedStylist) {
//       localStorage.setItem("selectedStylist", JSON.stringify(selectedStylist));
//     }

//     setIsSliderVisible(false);
//     setIsButtonClicked(false);
//     setShowStylistSlider(false);
//     setshowProductsSlider(false);
//   };

//   const handleAddProducts = () => {
//     setshowProductsSlider(true);
//     setIsButtonClicked(true);

//     setIsSliderVisible(true);
//   };

//   const [stylists, setStylists] = useState([]);

//   const [showDiv, setShowDiv] = useState(false);
//   const [isSliderVisible, setIsSliderVisible] = useState(false);
//   useEffect(() => {
//     const fetchStylists = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get the token from localStorage
//         const response = await axios.get(
//           "https://admin.obwsalon.com/api/stylists",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//             },
//           }
//         );
//         setStylists(response.data);
//       } catch (error) {
//         console.log("Error fetching stylists:", error);
//       }
//     };

//     fetchStylists();
//     setShowDiv(true);
//     setIsSliderVisible(true);
//     setShowStylistSlider(false);

//     const storedStylistName = localStorage.getItem("SelectedStylist");
//     setStylistName(storedStylistName);
//     if (storedStylistName) {
//       const stylist = JSON.parse(storedStylistName);
//       setStylistName(stylist.first_name + " " + stylist.last_name);
//     }

//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get the token from localStorage
//         const response = await axios.get(
//           "https://admin.obwsalon.com/api/products",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//             },
//           }
//         );
//         console.log(response.data);
//         setProducts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProducts();
//     setShowDiv2nd(true);
//     setshowProductsSlider(false);
//   }, []);

//   const handleCrossClick = () => {
//     setIsSliderVisible(false);
//     setIsButtonClicked(false);
//     setShowStylistSlider(false);
//     setshowProductsSlider(false);

//     window.location.reload();
//   };
//   const handleClick = (stylistId) => {
//     setSelectedStylistId(stylistId);
//   };

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);

//     const filteredProducts = products.filter((product) =>
//       product.product_name.toLowerCase().includes(searchTerm)
//     );
//     setFilteredProducts(filteredProducts);
//   };

//   useEffect(() => {
//     setFilteredProducts(products);
//   }, [products]);

//   // to cal final status

//   // select products
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   useEffect(() => {
//     const storedSelectedProducts = localStorage.getItem("selectedProducts");
//     if (storedSelectedProducts) {
//       setSelectedProducts(JSON.parse(storedSelectedProducts));
//     }
//   }, []);

//   const handleProductSelection = (product) => {
//     setSelectedProducts((prevSelectedProducts) => {
//       const isSelected = prevSelectedProducts.some(
//         (selectedProduct) => selectedProduct.id === product.id
//       );

//       if (isSelected) {
//         return prevSelectedProducts.filter(
//           (selectedProduct) => selectedProduct.id !== product.id
//         );
//       } else {
//         return [...prevSelectedProducts, product];
//       }
//     });
//   };

//   const handleAddItem = () => {
//     localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
//   };

//   // products data

//   const [selectedDivs, setSelectedDivs] = useState([]);
//   const handleDivSelection = (product) => {
//     if (product.quantity === 0) {
//       return; // Do nothing if the product is out of stock
//     }

//     const updatedProduct = {
//       ...product,
//       selectedQuantity: 1,
//       selectedStylist: "No stylist selected",
//     };

//     setSelectedProducts((prevSelectedProducts) => {
//       const updatedSelectedProducts = prevSelectedProducts.some(
//         (selectedProduct) => selectedProduct.id === product.id
//       )
//         ? prevSelectedProducts.filter(
//             (selectedProduct) => selectedProduct.id !== product.id
//           )
//         : [...prevSelectedProducts, updatedProduct];

//       localStorage.setItem(
//         "selectedProducts",
//         JSON.stringify(updatedSelectedProducts)
//       );

//       return updatedSelectedProducts;
//     });
//   };

//   // Fetch the previously selected products from localStorage on component mount
//   useEffect(() => {
//     const storedSelectedProducts = localStorage.getItem("selectedProducts");
//     if (storedSelectedProducts) {
//       setSelectedProducts(JSON.parse(storedSelectedProducts));
//     }
//   }, []);

//   // useEffect(() => {
//   //   localStorage.setItem("selectedProducts", JSON.stringify(filteredProducts.filter(product => selectedDivs.includes(product.id))));

//   // }, [selectedDivs, filteredProducts]);

//   //  code for new products purchase

//   // const [selectedProducts, setSelectedProducts] = useState([]);

//   useEffect(() => {
//     const storedSelectedProducts = localStorage.getItem("selectedProducts");
//     if (storedSelectedProducts) {
//       setSelectedProducts(JSON.parse(storedSelectedProducts));
//     }
//   }, []);

//   const handleDeleteProduct = (productId) => {
//     const updatedProducts = selectedProducts.filter(
//       (product) => product.id !== productId
//     );
//     setSelectedProducts(updatedProducts);

//     localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));

//     window.location.reload();
//   };
//   const handleAddProduct = (productId) => {
//     const updatedProducts = selectedProducts.map((product) => {
//       if (product.id === productId) {
//         return { ...product, selectedQuantity: product.selectedQuantity + 1 };
//       }
//       return product;
//     });
//     setSelectedProducts(updatedProducts);

//     localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
//   };

//   const handleRemoveProduct = (productId) => {
//     const updatedProducts = selectedProducts.map((product) => {
//       if (product.id === productId && product.selectedQuantity > 1) {
//         return { ...product, selectedQuantity: product.selectedQuantity - 1 };
//       }
//       return product;
//     });
//     setSelectedProducts(updatedProducts);

//     localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
//   };

//   useEffect(() => {
//     // Calculate the total price
//     const priceSum = subServices.reduce(
//       (sum, subService) =>
//         sum + parseFloat(subService.price_including_gst) * subService.quantity,
//       0
//     );
//     setTotalPrice(priceSum);
//   }, [subServices]);

//   const calculateTotalPrice = () => {
//     let totalPrice = 0;
//     selectedProducts.forEach((product) => {
//       const productTotal = product.amount_with_gst * product.selectedQuantity;
//       totalPrice += productTotal;
//     });
//     return totalPrice.toFixed(2);
//   };

//   //

//   useEffect(() => {
//     const selectedStylist = localStorage.getItem("selectedStylist");
//     if (selectedStylist) {
//       const stylist = JSON.parse(selectedStylist);
//       setStylistName(stylist.first_name + " " + stylist.last_name);
//     }
//   }, []);
//   //

//   // if (loading) {
//   //   return <div>Loading...</div>; // Render a loader while fetching data
//   // }

//   return (
//     <>
//       <div id="checkoutsec" className={isButtonClicked ? "my-css-class" : ""}>
//         <div id="TopHeader">
//           <div id="backbtn" onClick={goToPreviousPage}>
//             <AiOutlineArrowLeft />
//           </div>
//           <h1>Appointment</h1>
//           <div id="lastRes"></div>
//         </div>
//         <div id="Cus">
//           <RiAccountCircleLine size={"2.5rem"} color="#058DA6" />
//           <span id="customer">Customer:</span>
//           <span id="nameContFeil">
//             {name} &nbsp; {contactNo && contactNo.substr(0, 6)}****
//           </span>
//         </div>

//         <div id="buttonsforcheckout">
//           <Link to={"/services/women"}>
//             <button>Add Service</button>
//           </Link>
//           <button onClick={handleAddProducts}>Add Product</button>
//         </div>

//         <div id="mainsecforcheck">
//           <div id="toplinescheck">
//             <h2 id="firsttoplinech">Item</h2>
//             <h2 id="ndtoplinech">Qty</h2>
//             <h2 id="rdtoplinech">Price</h2>
//             <h2 id="thtoplinech">Total</h2>
//             <div id="afdsasdfdssd">
//               <MdDelete />
//             </div>
//           </div>

//           <div id="ordersSec">
//             {subServices.map((subService) => (
//               <div key={subService.id} id="OrderCHeck">
//                 <div id="firstrowCheck">
//                   <p>{subService.service_name}</p>
//                   <div id="incdec">
//                     <div>
//                       <button
//                         onClick={() => handleRemoveSubService(subService.id)}
//                       >
//                         -
//                       </button>
//                       <span>{subService.quantity}</span>
//                       <button
//                         onClick={() => handleAddSubService(subService.id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <div id="rdPrice">
//                     <p>{subService.price_including_gst}/-</p>
//                   </div>
//                   <div id="thtotalprice">
//                     <p>
//                       {(
//                         subService.price_including_gst * subService.quantity
//                       ).toFixed(2)}
//                       /-
//                     </p>
//                   </div>
//                   <div
//                     id="deletesubserv"
//                     onClick={() => handleDeleteSubService(subService.id)}
//                   >
//                     <MdDelete />
//                   </div>
//                 </div>
//                 <div id="belowFirstrowCheck">
//                   <button onClick={handleAddStylist}>Add Stylist</button>
//                   <span>Stylist : {subService.stylist}</span>
//                   <div id="thtotalprice02">
//                     {/* <p>
//                     {(
//                       subService.price_including_gst * subService.quantity
//                     ).toFixed(2)}
//                     /-
//                   </p> */}
//                     <p>
//                       GST {subService.gst}% ={" "}
//                       {(
//                         subService.price_including_gst *
//                         subService.quantity *
//                         (subService.gst / 100)
//                       ).toFixed(2)}
//                       /-
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* new fetching  */}

//             {selectedProducts.map((product) => (
//               <div key={product.id} id="OrderCHeck">
//                 <div id="firstrowCheck">
//                   <p>{product.product_name}</p>
//                   <div id="incdec">
//                     <div style={{ justifyContent: "center" }}>
//                       <button onClick={() => handleRemoveProduct(product.id)}>
//                         -
//                       </button>
//                       <span>{product.selectedQuantity}</span>
//                       <button onClick={() => handleAddProduct(product.id)}>
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <div id="rdPrice">
//                     <p>{product.amount_with_gst}/-</p>
//                   </div>
//                   <div id="thtotalprice">
//                     <p>
//                       {(
//                         product.amount_with_gst * product.selectedQuantity
//                       ).toFixed(2)}
//                       /-
//                     </p>
//                   </div>
//                   <div
//                     id="deletesubserv"
//                     onClick={() => handleDeleteProduct(product.id)}
//                   >
//                     <MdDelete />
//                   </div>
//                 </div>
//                 <div id="belowFirstrowCheck">
//                   <button onClick={handleAddStylist}>Add Stylist</button>
//                   <span>
//                     Stylist :{stylistName ? stylistName : "No stylist selected"}
//                   </span>
//                   <div id="thtotalprice02">
//                     {/* <p>
//                     {(
//                       product.amount_with_gst * product.selectedQuantity
//                     ).toFixed(2)}
//                     /-
//                   </p> */}
//                     <p>
//                       GST:{product.gst}% ={" "}
//                       {(
//                         product.amount_with_gst *
//                         product.selectedQuantity *
//                         (product.gst / 100)
//                       ).toFixed(2)}
//                       /-
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* new fetching closed */}

//             <div id="totalwithgst">
//               <div id="totalwithgstF1">
//                 <div>
//                   <p>Sub Total</p>
//                   <p>
//                     {(Math.round(
//                       (parseFloat(calculateTotalPrice()) +
//                         parseFloat(totalPrice)) *
//                         100
//                     ) -
//                       Math.round(
//                         selectedProducts.reduce(
//                           (total, product) =>
//                             total +
//                             product.amount_with_gst *
//                               product.selectedQuantity *
//                               (product.gst / 100) *
//                               100,
//                           0
//                         ) +
//                           subServices.reduce(
//                             (total, subService) =>
//                               total +
//                               subService.price_including_gst *
//                                 subService.quantity *
//                                 (subService.gst / 100) *
//                                 100,
//                             0
//                           )
//                       )) /
//                       100}
//                     /-
//                   </p>
//                   {/* </div> */}
//                 </div>

//                 <div id="gstmanipulation">
//                   <p>
//                     <span>Total GST:</span>
//                     <span>
//                       {(
//                         selectedProducts.reduce(
//                           (total, product) =>
//                             total +
//                             product.amount_with_gst *
//                               product.selectedQuantity *
//                               (product.gst / 100),
//                           0
//                         ) +
//                         subServices.reduce(
//                           (total, subService) =>
//                             total +
//                             subService.price_including_gst *
//                               subService.quantity *
//                               (subService.gst / 100),
//                           0
//                         )
//                       ).toFixed(2)}
//                       /-
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div id="totalwithgstF2">
//                 <span id="fspanoftgst">Total:</span>{" "}
//                 <span id="sspanoftgst">
//                   {(
//                     parseFloat(calculateTotalPrice()) + parseFloat(totalPrice)
//                   ).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div id="secondCheck">
//         {showStylistSlider && (
//           <div className={`overlay ${showDiv ? "show" : ""}`}>
//             {/* Slider content */}
//             <div className="content">
//               <div className="service-details">
//                 <div id="topLayerForSerBook">
//                   <div id="middledataforserbook"></div>
//                   <h1>Stylists</h1>
//                   <div className="back-button" onClick={handleCrossClick}>
//                     <RxCross2 />
//                   </div>
//                 </div>

//                 {/* Self-coded */}
//                 <div id="middleFetchedData">
//                   {stylists.map((stylist) => (
//                     <div
//                       id="newmidfddiv"
//                       key={stylist.id}
//                       className={
//                         selectedStylistId === stylist.id ? "selected" : ""
//                       }
//                       onClick={() => handleClick(stylist.id)}
//                     >
//                       <div id="f1midfd">
//                         <img
//                           src="https://www.mygreentrends.in/wp-content/uploads/2022/03/Men-Hair-Service-Category-Page.jpg"
//                           alt=""
//                         />
//                         <div id="s1midfd">
//                           <p>
//                             {stylist.first_name} {stylist.last_name}
//                           </p>{" "}
//                           <span>Experience - {stylist.experience}</span>
//                         </div>
//                       </div>
//                       <div id="f2midfd">
//                         <li>Available</li>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div id="lastbtnofserviceadd">
//                   <a
//                     className="book-button"
//                     href="/checkout"
//                     onClick={handleAddStylist2O}
//                   >
//                     Add Stylist
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* new data */}
//       <div id="secondCheck">
//         {showProductsSlider && (
//           <div className={`overlay ${showDiv2nd ? "show" : ""}`}>
//             {/* Slider content */}
//             <div className="content">
//               <div
//                 className="service-details"
//                 style={{
//                   height: "inherit",
//                 }}
//               >
//                 <div id="topLayerForSerBook">
//                   <div id="middledataforserbook"></div>
//                   <h1>Product List</h1>
//                   <div className="back-button" onClick={handleCrossClick}>
//                     <RxCross2 />
//                   </div>
//                 </div>
//                 <div style={{ margin: "1rem 0" }} id="searchbarforproducts">
//                   <input
//                     type="text"
//                     placeholder="Search for products & brands"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                   />
//                 </div>
//                 {/* Self-coded */}
//                 <div id="middleFetchedData">
//                   {filteredProducts.map((product, index) => (
//                     <div
//                       id="productDIvSC"
//                       key={`${product.id}-${index}`}
//                       className={`product-div ${
//                         selectedProducts.some(
//                           (selectedProduct) => selectedProduct.id === product.id
//                         )
//                           ? "selectedProduct"
//                           : ""
//                       }`}
//                       onClick={() => handleDivSelection(product)}
//                     >
//                       <div id="divscf1">
//                         <h3>{product.product_name}</h3>{" "}
//                         <div id="childofdivsc">
//                           <p>{product.sku}</p>
//                           <p style={{ color: "#0B8F00" }}>
//                             {product.quantity === 0 ? (
//                               <p className="out-of-stock">Out of Stock</p>
//                             ) : (
//                               <p>{product.quantity} Stocks left</p>
//                             )}
//                           </p>
//                           <p>{product.brand}</p>
//                         </div>
//                       </div>
//                       <div style={{ border: "none" }} id="divscf2">
//                         {product.amount_with_gst}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div id="lastbtnofserviceadd">
//                   <Link
//                     className="book-button"
//                     to="/checkout"
//                     // onClick={handleAddItem}
//                     onClick={handleCrossClick}
//                   >
//                     Add Product
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* new data */}

//       <div>
//         <div id="lastbtnscheck">
//           <Link to={"/home"}>
//             <button
//               style={{ width: " unset", padding: "1rem 2rem", display: "flex" }}
//               id="firstbtn"
//             >
//               Save Appointment <TfiAngleRight style={{ marginLeft: "1rem" }} />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SaveAppointment;
