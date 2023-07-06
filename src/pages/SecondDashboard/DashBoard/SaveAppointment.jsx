import React, { useEffect, useState } from "react";
import "./saveAptData.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { TfiAngleRight } from "react-icons/tfi";

const SaveAppointment = () => {
  const Navigate = useNavigate();
  const goToPreviousPage = () => {
    Navigate("/dashboard");
  };
  // useEffect(() => {
  //   const userBookingData = localStorage.getItem("UserBookingData");
  //   if (!userBookingData) {
  //     Navigate("/services/women");
  //   }
  // }, []);
  const [totalAmount, setTotalAmount] = useState(0);
  const [appointmentDate, setAppointmentDate] = useState(""); // Add this line
  const [appointmentTime, setAppointmentTime] = useState(""); // Add this line
  const [status, setStatus] = useState(""); // Add this line
  const [customer, setCustomer] = useState(null); // Add this line

  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [subServices, setSubServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showStylistSlider, setShowStylistSlider] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedStylistId, setSelectedStylistId] = useState(null);

  const [showProductsSlider, setshowProductsSlider] = useState(null);

  const [products, setProducts] = useState([]);
  const [stylistName, setStylistName] = useState("");

  const [showDiv2nd, setShowDiv2nd] = useState(false);
  const [appointments, setAppointments] = useState(null);
  useEffect(() => {
    // Fetch data from localStorage
    const data = localStorage.getItem("appointmentData");

    // Parse the JSON data
    const parsedData = JSON.parse(data);

    // Update the state with the fetched data
    setAppointments(parsedData);

    if (parsedData && parsedData.customer_id) {
      fetch('https://admin.obwsalon.com/api/customers')
        .then(response => response.json())
        .then(data => {
          // Apply filter to fetch a particular user by ID
          const filteredCustomer = data.find(
            customer => customer.id === parsedData.customer_id
          );

          setCustomer(filteredCustomer);
        })
        .catch(error => {
          console.error('Error fetching customer details:', error);
        });
    }
  }, []);
  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem("SelectedData");
    const appointmentData = localStorage.getItem("appointmentData");

    if (storedData && appointmentData) {
      const parsedData = JSON.parse(storedData);
      const appointmentDataObj = JSON.parse(appointmentData);
      const { customer_id, appointment_date, appointment_time, status } =
        appointmentDataObj;

      setAppointmentDate(appointment_date);
      setAppointmentTime(appointment_time);
      setStatus(status);

      // Fetch customer details
      fetch("https://admin.obwsalon.com/api/customers")
        .then((response) => response.json())
        .then((data) => {
          const customer = data.filter(
            (customer) => customer.id === customer_id
          )[0];
          setCustomer(customer);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching customer details:", error);
          setLoading(false);
        });

      setSubServices(
        parsedData
          .map(({ subServices }) =>
            subServices.map((subService) => ({ ...subService, quantity: 1 }))
          )
          .flat()
      );
    } else {
      setLoading(false);
    }
  }, []);

  //

  const handleAddSubService = (subServiceId) => {
    const updatedSubServices = subServices.map((subService) => {
      if (subService.id === subServiceId) {
        const updatedSubService = {
          ...subService,
          quantity: subService.quantity + 1,
        };
        updateLocalStorage(subServiceId, updatedSubService);
        return updatedSubService;
      }
      return subService;
    });
    setSubServices(updatedSubServices);
  };

  const handleRemoveSubService = (subServiceId) => {
    const updatedSubServices = subServices.map((subService) => {
      if (subService.id === subServiceId && subService.quantity > 0) {
        const updatedSubService = {
          ...subService,
          quantity: subService.quantity - 1,
        };
        updateLocalStorage(subServiceId, updatedSubService);
        return updatedSubService;
      }
      return subService;
    });
    setSubServices(updatedSubServices);
  };

  const updateLocalStorage = (subServiceId, updatedSubService) => {
    const storedData = localStorage.getItem("SelectedData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedData = parsedData.map((data) => {
        const updatedSubServices = data.subServices.map((subService) => {
          if (subService.id === subServiceId) {
            return updatedSubService;
          }
          return subService;
        });
        return {
          ...data,
          subServices: updatedSubServices,
        };
      });
      localStorage.setItem("SelectedData", JSON.stringify(updatedData));
    }
  };

  const handleDeleteSubService = (subServiceId) => {
    const updatedSubServices = subServices.filter(
      (subService) => subService.id !== subServiceId
    );
    setSubServices(updatedSubServices);

    const storedData = localStorage.getItem("SelectedData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const updatedData = parsedData.map((data) => {
        const updatedSubServices = data.subServices.filter(
          (subService) => subService.id !== subServiceId
        );
        return {
          ...data,
          subServices: updatedSubServices,
        };
      });

      localStorage.setItem("SelectedData", JSON.stringify(updatedData));
    }

    window.location.reload();
  };

  const handleAddStylist = () => {
    setShowStylistSlider(true);
    setIsButtonClicked(true);
    setIsSliderVisible(true);
  };
  const handleAddStylist2O = () => {
    const selectedStylist = stylists.find(
      (stylist) => stylist.id === selectedStylistId
    );

    if (selectedStylist) {
      localStorage.setItem("selectedStylist", JSON.stringify(selectedStylist));
    }

    setIsSliderVisible(false);
    setIsButtonClicked(false);
    setShowStylistSlider(false);
    setshowProductsSlider(false);
  };

  const handleAddProducts = () => {
    setshowProductsSlider(true);
    setIsButtonClicked(true);

    setIsSliderVisible(true);
  };

  const [stylists, setStylists] = useState([]);

  const [showDiv, setShowDiv] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://admin.obwsalon.com/api/stylists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
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

    // const fetchProducts = async () => {
    //   try {
    //     const token = localStorage.getItem("token"); // Get the token from localStorage
    //     const response = await axios.get(
    //       "https://admin.obwsalon.com/api/products",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    //         },
    //       }
    //     );
    //     console.log(response.data);
    //     setProducts(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const branchID = localStorage.getItem("branchName");
        const num2f = parseInt(branchID);

        console.log(branchID);
        const response = await axios.get(
          "https://admin.obwsalon.com/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        // Filter the products based on branch_id = 1
        const filteredProducts = response.data.filter(
          (product) => product.branch_id === num2f
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    setShowDiv2nd(true);
    setshowProductsSlider(false);
  }, []);

  const handleCrossClick = () => {
    setIsSliderVisible(false);
    setIsButtonClicked(false);
    setShowStylistSlider(false);
    setshowProductsSlider(false);

    window.location.reload();
  };
  const handleClick = (stylistId) => {
    setSelectedStylistId(stylistId);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // to cal final status

  // select products
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const storedSelectedProducts = localStorage.getItem("selectedProducts");
    if (storedSelectedProducts) {
      setSelectedProducts(JSON.parse(storedSelectedProducts));
    }
  }, []);

  // products data

  const handleDivSelection = (product) => {
    if (product.quantity === 0) {
      return; // Do nothing if the product is out of stock
    }

    const updatedProduct = {
      ...product,
      selectedQuantity: 1,
      selectedStylist: "No stylist selected",
    };

    setSelectedProducts((prevSelectedProducts) => {
      const updatedSelectedProducts = prevSelectedProducts.some(
        (selectedProduct) => selectedProduct.id === product.id
      )
        ? prevSelectedProducts.filter(
            (selectedProduct) => selectedProduct.id !== product.id
          )
        : [...prevSelectedProducts, updatedProduct];

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(updatedSelectedProducts)
      );

      return updatedSelectedProducts;
    });
  };

  useEffect(() => {
    const storedSelectedProducts = localStorage.getItem("selectedProducts");
    if (storedSelectedProducts) {
      setSelectedProducts(JSON.parse(storedSelectedProducts));
    }
  }, []);

  useEffect(() => {
    const storedSelectedProducts = localStorage.getItem("selectedProducts");
    if (storedSelectedProducts) {
      setSelectedProducts(JSON.parse(storedSelectedProducts));
    }
  }, []);

  const handleDeleteProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProducts);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));

    window.location.reload();
  };
  const handleAddProduct = (productId) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, selectedQuantity: product.selectedQuantity + 1 };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === productId && product.selectedQuantity > 1) {
        return { ...product, selectedQuantity: product.selectedQuantity - 1 };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    // Calculate the total price
    const priceSum = subServices.reduce(
      (sum, subService) =>
        sum + parseFloat(subService.price_including_gst) * subService.quantity,
      0
    );
    setTotalPrice(priceSum);

    localStorage.setItem("TotalAmountBookOFser", priceSum);
  }, [subServices]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach((product) => {
      const productTotal = product.amount_with_gst * product.selectedQuantity;
      totalPrice += productTotal;
    });
    localStorage.setItem("TotalAmountBook", totalPrice);
    return totalPrice.toFixed(2);

    // const totalAmount = (
    //   parseFloat(calculateTotalPrice()) + parseFloat(totalPrice)
    // ).toFixed(2)
  };

  //

  useEffect(() => {
    const selectedStylist = localStorage.getItem("selectedStylist");
    if (selectedStylist) {
      const stylist = JSON.parse(selectedStylist);
      setStylistName(stylist.first_name + " " + stylist.last_name);
    }
  }, []);

  // .

  return (
    <>
      <div id="checkoutsec" className={isButtonClicked ? "my-css-class" : ""}>
        <div id="fixpose">
          <div id="TopHeader">
            <div id="backbtn" onClick={goToPreviousPage}>
              <AiOutlineArrowLeft />
            </div>
            <h1>Appointment</h1>
            <div id="lastRes"></div>
          </div>
          <div id="buttonsforcheckout">
            <Link to={"/appointment/services/women"}>
              <button>Add Service</button>
            </Link>
            <button onClick={handleAddProducts}>Add Product</button>
          </div>
          {appointments && (
            <div id="Cus" style={{justifyContent:"space-between"}}>
              <span id="nameContFeil">Name: </span>
              <span id="nameContFeil">Contact NO: </span>
              {/* <span id="nameContFeil">{appointments.customer_id}</span> */}
              <span id="nameContFeil">{appointments.appointment_time}</span>
              <span id="nameContFeil">{appointments.appointment_date}</span>
              {/* {name} &nbsp; {contactNo && contactNo.substr(0, 6)}**** */}
            </div>
          )}
          {customer  && (
            <div id="Cus" style={{justifyContent:"space-between"}}>
              <span>{customer.first_name}</span>
              {/* {name} &nbsp; {contactNo && contactNo.substr(0, 6)}**** */}
            </div>
          )}
          <div id="toplinescheck">
            <h2 id="firsttoplinech">Item</h2>
            <h2 id="ndtoplinech">Qty</h2>
            <h2 id="rdtoplinech">Price</h2>
            <h2 id="thtoplinech">Total</h2>
            <div id="afdsasdfdssd">
              <MdDelete />
            </div>
          </div>
        </div>

        <div id="mainsecforcheck">
          <div id="ordersSec">
            {subServices.map((subService) => (
              <div key={subService.id} id="OrderCHeck">
                <div id="firstrowCheck">
                  <p>{subService.service_name}</p>
                  <div id="incdec">
                    <div>
                      <button
                        onClick={() => handleRemoveSubService(subService.id)}
                      >
                        -
                      </button>
                      <span>{subService.quantity}</span>
                      <button
                        onClick={() => handleAddSubService(subService.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div id="rdPrice">
                    <p>{subService.price_including_gst}/-</p>
                  </div>
                  <div id="thtotalprice">
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
                    <MdDelete />
                  </div>
                </div>
                <div id="belowFirstrowCheck">
                  <button onClick={handleAddStylist}>Add Stylist</button>
                  <span>Stylist : {subService.stylist} Rohan</span>
                  <div id="thtotalprice02">
                    {/* <p>
                    {(
                      subService.price_including_gst * subService.quantity
                    ).toFixed(2)}
                    /-
                  </p> */}
                    {/* <p>
                      GST {subService.gst}% ={" "}
                      {(
                        subService.price_including_gst *
                        subService.quantity *
                        (subService.gst / 100)
                      ).toFixed(2)}
                      /-
                    </p> */}
                  </div>
                </div>
              </div>
            ))}

            {/* new fetching  */}

            {selectedProducts.map((product) => (
              <div key={product.id} id="OrderCHeck">
                <div id="firstrowCheck">
                  <p>{product.product_name}</p>
                  <div id="incdec">
                    <div style={{ justifyContent: "center" }}>
                      <button onClick={() => handleRemoveProduct(product.id)}>
                        -
                      </button>
                      <span>{product.selectedQuantity}</span>
                      <button onClick={() => handleAddProduct(product.id)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div id="rdPrice">
                    <p>{product.amount_with_gst}/-</p>
                  </div>
                  <div id="thtotalprice">
                    <p>
                      {(
                        product.amount_with_gst * product.selectedQuantity
                      ).toFixed(2)}
                      /-
                    </p>
                  </div>
                  <div
                    id="deletesubserv"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <MdDelete />
                  </div>
                </div>
                <div id="belowFirstrowCheck">
                  <button onClick={handleAddStylist}>Add Stylist</button>
                  <span>
                    Stylist :{stylistName ? stylistName : "No stylist selected"}
                  </span>
                  <div id="thtotalprice02">
                    {/* <p>
                    {(
                      product.amount_with_gst * product.selectedQuantity
                    ).toFixed(2)}
                    /-
                  </p> */}
                  </div>
                </div>
              </div>
            ))}

            {/* new fetching closed */}

            <div id="totalwithgst">
              <div id="totalwithgstF1">
                <div>
                  <p style={{ flexBasis: "50%" }}>Sub Total</p>
                  <p style={{ flexBasis: "50%" }}>
                    {(Math.round(
                      (parseFloat(calculateTotalPrice()) +
                        parseFloat(totalPrice)) *
                        100
                    ) -
                      Math.round(
                        selectedProducts.reduce(
                          (total, product) =>
                            total +
                            product.amount_with_gst *
                              product.selectedQuantity *
                              (product.gst / 100) *
                              100,
                          0
                        ) +
                          subServices.reduce(
                            (total, subService) =>
                              total +
                              subService.price_including_gst *
                                subService.quantity *
                                (subService.gst / 100) *
                                100,
                            0
                          )
                      )) /
                      100}
                    .00 /-
                  </p>
                  {/* </div> */}
                </div>

                <div id="gstmanipulation">
                  <p>
                    <span style={{ flexBasis: "50%" }}>Total GST</span>
                    <span style={{ flexBasis: "50%" }}>
                      {(
                        selectedProducts.reduce(
                          (total, product) =>
                            total +
                            product.amount_with_gst *
                              product.selectedQuantity *
                              (product.gst / 100),
                          0
                        ) +
                        subServices.reduce(
                          (total, subService) =>
                            total +
                            subService.price_including_gst *
                              subService.quantity *
                              (subService.gst / 100),
                          0
                        )
                      ).toFixed(2)}
                      /-
                    </span>
                  </p>
                </div>
              </div>
              <div id="totalwithgstF2">
                <span style={{ flexBasis: "50%" }} id="fspanoftgst">
                  Total :
                </span>{" "}
                <span style={{ flexBasis: "50%" }} id="sspanoftgst">
                  {(
                    parseFloat(calculateTotalPrice()) + parseFloat(totalPrice)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="secondCheck">
        {showStylistSlider && (
          <div className={`overlay ${showDiv ? "show" : ""}`}>
            {/* Slider content */}
            <div className="content">
              <div className="service-details">
                <div id="topLayerForSerBook">
                  <div id="middledataforserbook"></div>
                  <h1>Stylists</h1>
                  <div className="back-button" onClick={handleCrossClick}>
                    <RxCross2 />
                  </div>
                </div>

                {/* Self-coded */}
                <div id="middleFetchedData">
                  {stylists.map((stylist) => (
                    <div
                      id="newmidfddiv"
                      key={stylist.id}
                      className={
                        selectedStylistId === stylist.id ? "selected" : ""
                      }
                      onClick={() => handleClick(stylist.id)}
                    >
                      <div id="f1midfd">
                        <img
                          src="https://www.mygreentrends.in/wp-content/uploads/2022/03/Men-Hair-Service-Category-Page.jpg"
                          alt=""
                        />
                        <div id="s1midfd">
                          <p>
                            {stylist.first_name} {stylist.last_name}
                          </p>{" "}
                          <span>Experience - {stylist.experience}</span>
                        </div>
                      </div>
                      <div id="f2midfd">
                        <li>Available</li>
                      </div>
                    </div>
                  ))}
                </div>
                <div id="lastbtnofserviceadd">
                  <a
                    className="book-button"
                    href="/checkout"
                    onClick={handleAddStylist2O}
                  >
                    Add Stylist
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* new data */}
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

      {/* new data */}

      <div>
        <div id="lastbtnscheck">
          <Link to={"/create/appointment/success"}>
            <button style={{ padding: "1rem 2rem" }} id="secondbtn">
              Book now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SaveAppointment;
