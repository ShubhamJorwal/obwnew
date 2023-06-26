import React, { useState, useEffect } from "react";
import "./services.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../../redux/Actions/ServicesAction";
import { ToastContainer, toast } from "react-toastify";
import LoaderFirst from "../../../../components/Loaders/LoaderFirst";

const Womenservices = () => {
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const loading = useSelector((state) => state.services.loading);
  const error = useSelector((state) => state.services.error);
  const [showDiv, setShowDiv] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // const handleServiceClick = (service) => {
  //   setSelectedService(service);
  //   setIsButtonClicked(true); // for background opacity
  //   setIsSliderVisible(true);
  // };
  const handleSubServiceClick = (subService) => {
    // Check if the sub-service is already selected
    const isSubServiceSelected = selectedSubServices.find(
      (service) => service.id === subService.id
    );

    if (isSubServiceSelected) {
      // If the sub-service is already selected, remove it from the selected sub-services
      setSelectedSubServices((prevSelectedSubServices) =>
        prevSelectedSubServices.filter(
          (service) => service.id !== subService.id
        )
      );
    } else {
      // If the sub-service is not selected, add it to the selected sub-services
      setSelectedSubServices((prevSelectedSubServices) => [
        ...prevSelectedSubServices,
        subService,
      ]);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setSelectedSubServices([]);
    setIsButtonClicked(true); // for background opacity
    setIsSliderVisible(true);
  };

  const handleCrossClick = () => {
    setIsButtonClicked(false);
    setSelectedService(null);
    setIsSliderVisible(false);
  };

  useEffect(() => {
    dispatch(fetchServices());
    setShowDiv(true);
  }, [dispatch]);

  if (loading) {
    return <LoaderFirst />;
  }

  if (error) {
    return toast("Something went wrong");
  }

  return (
    <>
      <div
        className={isButtonClicked ? "my-css-class" : ""}
        id="servicesForSal"
      >
        <div id="TopHeader">
          <div>
            <AiOutlineArrowLeft />
          </div>
          <h1>SERVICES</h1>
          <div id="lastRes"></div>
        </div>
        <div>
          <div id="midcomp">
            <h3>Select Customer type</h3>
            <div id="SecCompForServices">
              <Link to={"/services/women"}>
                <div id="FeMaleService">
                  <span>
                    <img id="centerIconOnser" src="/icons/01.png" alt="" />
                  </span>
                  <p>Women</p>
                </div>
              </Link>

              <Link to={"/services/men"}>
                <div id="MaleService">
                  <span>
                    <img id="centerIconOnser" src="/icons/01.png" alt="" />
                  </span>
                  <p>Men</p>
                </div>
              </Link>

              <Link to={"/services/child"}>
                <div id="ChildService">
                  <span>
                    <img id="centerIconOnser" src="/icons/01.png" alt="" />
                  </span>
                  <p>Child</p>
                </div>
              </Link>
            </div>
          </div>

          <h3
            style={{
              textAlign: "center",
              margin: "1rem",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Select a Service
          </h3>
          <div id="servicesoptions">
            {services.map((service) => (
              <div key={service.id} onClick={() => handleServiceClick(service)}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqxC_9BoBHx70zR-_RYWlf_rP7LlUSIVTNA&usqp=CAU"
                  alt=""
                />
                <p> {service.service_name}</p>
              </div>
            ))}
          </div>
        </div>
        {selectedService && isSliderVisible && (
          <div className={`overlay ${showDiv ? "show" : ""}`}>
            {/* Slider content */}
            <div className="content">
              <div className="service-details">
                <div id="topLayerForSerBook">
                  <img
                    style={{
                      width: "10vw",
                      height: "10vw",
                      objectFit: "cover",
                      borderRadius: "2vw",
                    }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqxC_9BoBHx70zR-_RYWlf_rP7LlUSIVTNA&usqp=CAU"
                    alt=""
                  />
                  <div id="middledataforserbook">
                    <h3 style={{ color: "gray" }}>{selectedService.type}</h3>
                    <h2>{selectedService.service_name}</h2>
                  </div>
                  <div className="back-button" onClick={handleCrossClick}>
                    <RxCross2 />
                  </div>
                </div>

                {/* Self-coded */}
                <div id="middleFetchedData">
                  {/* {services.map((service) => (
                  <div key={service.id} id="servicesList">
                    <p>{service.service_name}<span style={{color: "gray",fontSize: "1.7vw",marginLeft: "1.2vw",}}>{service.duration}min</span></p>
                    <p><span style={{color: "#18959E",fontSize: "unset",marginRight: "3vw",}}>{service.category}</span>
                      <span onClick={handleClick}className={addClass ? "pricetag" : ""}>${service.price_including_gst}</span></p>
                  </div>
                ))} */}
                  {services.map((service) => (
                    <div
                      onClick={() => handleSubServiceClick(service)}
                      key={service.id}
                      id="servicesList"
                      className={`pricetag ${
                        selectedSubServices.find(
                          (subService) => subService.id === service.id
                        )
                          ? "selected"
                          : ""
                      }`}
                    >
                      <p>
                        {service.service_name}
                        <span
                          style={{
                            color: "gray",
                            fontSize: "1.7vw",
                            marginLeft: "1.2vw",
                          }}
                        >
                          {service.duration}min
                        </span>
                      </p>
                      <p>
                        <span
                          style={{
                            color: "#18959E",
                            fontSize: "unset",
                            marginRight: "3vw",
                          }}
                        >
                          {service.category}
                        </span>
                        <span>${service.price_including_gst}</span>
                      </p>
                    </div>
                  ))}
                </div>
                {/* End of self-coded section */}

                <Link
                  to="/checkout"
                  className="book-button"
                  onClick={() => {
                    // Combine the selected service and sub-services into an object
                    const selectedData = {
                      service: selectedService,
                      subServices: selectedSubServices,
                    };

                    // Retrieve existing data from localStorage
                    const existingData = localStorage.getItem("SelectedData");

                    if (existingData) {
                      // Parse the existing data as an array
                      const dataArray = JSON.parse(existingData);

                      // Push the new selected data to the array
                      dataArray.push(selectedData);

                      // Save the updated array back to localStorage
                      localStorage.setItem(
                        "SelectedData",
                        JSON.stringify(dataArray)
                      );
                    } else {
                      // Create a new array with the selected data
                      const dataArray = [selectedData];

                      // Save the array to localStorage
                      localStorage.setItem(
                        "SelectedData",
                        JSON.stringify(dataArray)
                      );
                    }
                  }}
                >
                  Add Services
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Womenservices;
