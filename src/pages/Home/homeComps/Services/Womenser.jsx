import React, { useState, useEffect } from "react";
import "./services.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../../../redux/Actions/ServicesAction";
import { ToastContainer, toast } from "react-toastify";
import LoaderFirst from "../../../../components/Loaders/LoaderFirst";
import { FiX } from "react-icons/fi";

const Womenservices = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const loading = useSelector((state) => state.services.loading);
  const error = useSelector((state) => state.services.error);
  const [showDiv, setShowDiv] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsButtonClicked(true); // for background opacity
    setIsSliderVisible(true);
  };

  const handleCrossClick = () => {
    setIsButtonClicked(false);
    setSelectedService(null);
    setIsSliderVisible(false);
  };

  const handleClick = () => {
    setAddClass(true);
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

          <h3 style={{ textAlign: "center", margin: "1rem", fontSize: "24px" }}>
            Select Customer type
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
                  <img style={{width: "10vw",height: "10vw",objectFit: "cover",borderRadius: "2vw",}}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqxC_9BoBHx70zR-_RYWlf_rP7LlUSIVTNA&usqp=CAU" alt=""/>
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
                {services.map((service) => (
                  <div key={service.id} id="servicesList">
                    <p>{service.service_name}<span style={{color: "gray",fontSize: "1.7vw",marginLeft: "1.2vw",}}>{service.duration}min</span></p>
                    <p><span style={{color: "#18959E",fontSize: "unset",marginRight: "3vw",}}>{service.category}</span>
                      <span onClick={handleClick}className={addClass ? "pricetag" : ""}>${service.price_including_gst}</span></p>
                  </div>
                ))}
                </div>
                {/* End of self-coded section */}
                
                <Link to="/checkout" className="book-button">
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
