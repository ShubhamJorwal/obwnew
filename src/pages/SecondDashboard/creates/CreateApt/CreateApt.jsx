import React, { useEffect, useState } from "react";
import "./createApt.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import {TfiAngleRight} from 'react-icons/tfi'

const CreateApt = () => {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [subServices, setSubServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [showStylistSlider, setShowStylistSlider] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedStylistId, setSelectedStylistId] = useState(null);

  const [showProductsSlider, setshowProductsSlider] = useState(null);

  const [isSelected, setIsSelected] = useState(false);
  const [products, setProducts] = useState([]);

  const [showDiv2nd, setShowDiv2nd] = useState(false);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem("SelectedData");
    const bookingData = localStorage.getItem("BookingData");

    if (storedData && bookingData) {
      const parsedData = JSON.parse(storedData);
      const { service, subServices: storedSubServices } = parsedData[0];
      const { first_name, last_name, contact_no } = JSON.parse(bookingData)[0];

      // Update state with fetched data
      setName(`${first_name} ${last_name}`);
      setContactNo(contact_no);
      setSubServices(
        storedSubServices.map((subService) => ({ ...subService, quantity: 1 }))
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Calculate the total price
    const priceSum = subServices.reduce(
      (sum, subService) =>
        sum + parseFloat(subService.price_including_gst) * subService.quantity,
      0
    );
    setTotalPrice(priceSum);
  }, [subServices]);

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
    const storedData = localStorage.getItem("SelectedData");
    if (storedData) {
      // Parse the stored data into an array
      const parsedData = JSON.parse(storedData);
      // Update the subServices array in the first object of the parsedData array
      parsedData[0].subServices = updatedSubServices;
      // Update the SelectedData in localStorage with the updated parsedData
      localStorage.setItem("SelectedData", JSON.stringify(parsedData));
    }
  };
  function deleteService(index) {
    selectedData.splice(index, 1);
    localStorage.setItem("selectedData", JSON.stringify(selectedData));

    // Check if all services are deleted
    if (selectedData.length === 0) {
      localStorage.removeItem("selectedData");
    }
  }

  const handleAddStylist = () => {
    setShowStylistSlider(true);
    setIsButtonClicked(true);

    setIsSliderVisible(true);
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
        setProducts(response.data);
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

  const handleProductSelection = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const isSelected = prevSelectedProducts.some(
        (selectedProduct) => selectedProduct.id === product.id
      );

      if (isSelected) {
        return prevSelectedProducts.filter(
          (selectedProduct) => selectedProduct.id !== product.id
        );
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleAddItem = () => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loader while fetching data
  }

  if (subServices.length === 0) {
    return (
      <>
        <div id="TopHeader">
          <div>
            <AiOutlineArrowLeft />
          </div>
          <h1>CHECKOUT</h1>
          <div id="lastRes"></div>
        </div>
        <div>
          You have not chosen any services, or there may be an error. Please go
          back and attempt to select services once more.
        </div>
      </>
    ); // Display a message if no services are selected
  }

  return (
    <>
      <div id="checkoutsec" className={isButtonClicked ? "my-css-class" : ""}>
        <div id="TopHeader">
          <div>
            <AiOutlineArrowLeft />
          </div>
          <h1>CHECKOUT</h1>
          <div id="lastRes"></div>
        </div>
        <div id="Cus">
          <RiAccountCircleLine size={"2.5rem"} color="#058DA6" />
          <span id="customer">Customer:</span>
          <span id="nameContFeil">
            {name} &nbsp; {contactNo && contactNo.substr(0, 6)}****
          </span>
        </div>

        <div id="buttonsforcheckout">
          <button>Add Service</button>{" "}
          <button onClick={handleAddProducts}>Add Product</button>
        </div>

        <div id="mainsecforcheck">
          <div id="toplinescheck">
            <h2 id="firsttoplinech">Item</h2>
            <h2 id="ndtoplinech">Qty</h2>
            <h2 id="rdtoplinech">Price</h2>
            <h2 id="thtoplinech">Total</h2>
            <div id="afdsasdfdssd">
              <MdDelete />
            </div>
          </div>

          <div id="ordersSec">
            {subServices.map((subService) => (
              <div key={subService.id} id="OrderCHeck">
                <div id="firstrowCheck">
                  <p>{subService.service_name}</p>
                  <div id="incdec">
                    <div>
                      <button
                        onClick={() => handleAddSubService(subService.id)}
                      >
                        +
                      </button>
                      <span>{subService.quantity}</span>
                      <button
                        onClick={() => handleRemoveSubService(subService.id)}
                      >
                        -
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
                  <span>
                    {selectedStylist
                      ? selectedStylist.name
                      : "No stylist selected"}
                  </span>
                </div>
              </div>
            ))}

            <div id="totalwithgst">
              <div id="totalwithgstF1">
                <div>
                  <p>Fake Data</p>
                  <p>12321/-</p>
                </div>
                <div>
                  <p>Fake Data</p>
                  <p>12321/-</p>
                </div>
                <div>
                  <p>Fake Data</p>
                  <p>12321/-</p>
                </div>
              </div>
              <div id="totalwithgstF2">
                <span id="fspanoftgst"> Total:</span>{" "}
                <span id="sspanoftgst">{totalPrice.toFixed(2)}/-</span>
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
                <Link to="/checkout">Add Services</Link>
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
                <div id="searchbarforproducts">
                  <input
                    type="text"
                    placeholder="Search for products & brands"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div id="topLayerForSerBook">
                  <div id="middledataforserbook"></div>
                  <h1>Product List</h1>
                  <div className="back-button" onClick={handleCrossClick}>
                    <RxCross2 />
                  </div>
                </div>

                {/* Self-coded */}
                <div id="middleFetchedData">
                  {filteredProducts.map((product) => (
                    <div id="productDIvSC" key={product.id}>
                      <div id="divscf1">
                        <input
                          type="checkbox"
                          checked={selectedProducts.some(
                            (selectedProduct) =>
                              selectedProduct.id === product.id
                          )}
                          onChange={() => handleProductSelection(product)}
                        />
                        <h3>{product.product_name}</h3>{" "}
                        <div id="childofdivsc">
                          <p>{product.sku}</p>
                          <p style={{ color: "#0B8F00" }}>
                            {product.Quantity} Stocks left
                          </p>
                          <p>L'Oreal</p>
                        </div>
                      </div>
                      <div id="divscf2">{product.amount_with_gst}</div>
                    </div>
                  ))}
                </div>
                <Link to="/checkout" onClick={handleAddItem}>
                  Add Item
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* new data */}

      <div>
        <div id="lastbtnscheck">
          <Link to={"/home"}>
            <button style={{ width: " unset", padding: "1rem 2rem", display:"flex",  }} id="firstbtn">
              Create Appointment <TfiAngleRight style={{marginLeft:"1rem"}}/>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateApt;
