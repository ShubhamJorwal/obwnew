import React, { useState, useEffect } from "react";
import "./services.scss";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesForChild } from "../../../../../../redux/Actions/ServicesAction";
import { ToastContainer, toast } from "react-toastify";
import LoaderFirst from "../../../../../../components/Loaders/LoaderFirst";

const HandleChildSer = () => {
  const {id} = useParams()
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const loading = useSelector((state) => state.services.loading);
  const error = useSelector((state) => state.services.error);
  const [showDiv, setShowDiv] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleSubServiceClick = (subService) => {
    const isSubServiceSelected = selectedSubServices.find(
      (service) => service.id === subService.id
    );

    if (isSubServiceSelected) {
      setSelectedSubServices((prevSelectedSubServices) =>
        prevSelectedSubServices.filter(
          (service) => service.id !== subService.id
        )
      );
    } else {
      setSelectedSubServices((prevSelectedSubServices) => [
        ...prevSelectedSubServices,
        subService,
      ]);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setSelectedSubServices([]);
    setIsButtonClicked(true);
    setIsSliderVisible(true);
  };

  const handleCrossClick = () => {
    setIsButtonClicked(false);
    setSelectedService(null);
    setIsSliderVisible(false);
  };

  useEffect(() => {
    dispatch(fetchServicesForChild());
    setShowDiv(true);
  }, [dispatch]);

  if (loading) {
    return <LoaderFirst />;
  }

  if (error) {
    return toast("Something went wrong");
  }

  const goToPreviousPage = () => {
    Navigate("/");
  };

  // Get unique subcategories from services
  const uniqueSubcategories = [
    ...new Set(services.map((service) => service.sub_category)),
  ];

  const handleAddServices2O = () => {
    const selectedData = {
      // service: selectedService,
      subServices: selectedSubServices.map(subService => ({ ...subService, stylist_id: 1 , quantity: 1})),
      
    };
  
    const existingData = localStorage.getItem("SelectedData");
  
    if (existingData) {
      const dataArray = JSON.parse(existingData);
      const filteredDataArray = dataArray.filter((item) => {
        const isDuplicate = item.subServices.some((sub) => {
          return selectedData.subServices.some((selectedSub) => {
            return sub.id === selectedSub.id;
          });
        });
        return !isDuplicate;
      });
  
      filteredDataArray.push(selectedData);
      localStorage.setItem("SelectedData", JSON.stringify(filteredDataArray));
    } else {
      const dataArray = [selectedData];
      localStorage.setItem("SelectedData", JSON.stringify(dataArray));
    }
  };

  return (
    <>
      <div
        className={isButtonClicked ? "my-css-class" : ""}
        id="servicesForSal"
      >
        <div id="TopHeader">
          <div id="backbtn" onClick={goToPreviousPage}>
            <AiOutlineArrowLeft />
          </div>
          <h1>SERVICES</h1>
          <div id="lastRes"></div>
        </div>
        <div id="midcomp">
          <h3>Select Customer type</h3>
          <div id="SecCompForServices">
            <Link to={`/customer/booking/services/women/${id}`}>
              <div id="MaleService">
                <span>
                  {/* <img id="centerIconOnser" src="/icons/01.png" alt="" /> */}
                  <svg
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4006 19.5527V7.38312C16.4006 -2.43823 1.59953 -2.48382 1.59953 7.38312V17.6454C1.59953 17.8664 1.77876 18.0457 1.99982 18.0457C2.22088 18.0457 2.40011 17.8664 2.40011 17.6454V7.38312C2.40011 -1.4182 15.6 -1.39408 15.6 7.38312V19.0822C15.4573 19.0235 15.599 19.0752 13.1179 18.2215C12.2001 17.9057 11.5559 17.0876 11.4501 16.1381C13.4847 15.2591 14.6991 13.4085 14.6975 10.9724V7.37011C14.6975 6.84052 13.8969 6.84052 13.8969 7.37011V7.96894C13.7455 8.13986 13.5358 8.24714 13.3061 8.26686C12.1474 8.36663 12.3366 7.98545 11.6241 7.30906C11.3811 7.0785 10.9781 7.23161 10.9497 7.5654C10.908 8.055 10.502 8.43168 10.0052 8.44158C8.24529 8.47666 6.46285 8.41822 4.70753 8.26761C4.47386 8.24754 4.26101 8.13936 4.10784 7.96709V7.37006C4.10784 6.84047 3.30727 6.84047 3.30727 7.37006V10.9721C3.30572 13.4474 4.55452 15.2721 6.55026 16.1361C6.44513 17.0864 5.80077 17.9053 4.88225 18.2214L2.58139 19.0131C1.25178 19.4707 0.357834 20.7224 0.356934 22.128V23.5996C0.356934 23.8207 0.536163 23.9999 0.757223 23.9999C0.978283 23.9999 1.15751 23.8207 1.15751 23.5996V22.1283C1.15821 21.0643 1.8351 20.1166 2.84188 19.7701C5.31472 18.9192 5.28595 18.9412 5.56885 18.7968C6.94365 19.771 8.02207 21.3935 8.61876 23.396C8.66934 23.5657 8.82535 23.682 9.00238 23.682C9.17941 23.682 9.33542 23.5657 9.38601 23.3959C9.82488 21.923 10.5334 20.6361 11.4348 19.6742C11.586 19.5129 11.5777 19.2596 11.4165 19.1084C11.2551 18.9572 11.0018 18.9654 10.8507 19.1268C10.71 19.2768 10.5738 19.4339 10.4421 19.5975C9.54733 20.0307 8.45989 20.0318 7.56419 19.6007C7.17056 19.1114 6.73609 18.6808 6.26716 18.3178C6.81885 17.8237 7.19543 17.1516 7.32052 16.4079C8.38213 16.7025 9.56184 16.7185 10.6797 16.4091C10.878 17.5847 11.7043 18.5817 12.8574 18.9785C14.88 19.6745 16.8411 19.9384 16.8426 22.1281V23.5997C16.8426 23.8208 17.0218 24 17.2428 24C17.4639 24 17.6431 23.8208 17.6431 23.5997V22.1278C17.6425 21.106 17.1695 20.1659 16.4006 19.5527ZM9.70029 20.6702C9.43905 21.1099 9.20538 21.5805 9.00253 22.0766C8.79944 21.5795 8.56602 21.1096 8.30533 20.6712C8.756 20.7483 9.22394 20.7524 9.70029 20.6702ZM4.10784 10.9724V8.93184C4.27442 9.00354 4.4533 9.04937 4.63913 9.06533C6.38614 9.21519 8.19695 9.27849 10.0212 9.24206C10.6498 9.2295 11.199 8.89386 11.5026 8.38999C11.8893 8.86524 12.2739 9.1591 13.3747 9.06448C13.5572 9.04877 13.7329 9.00379 13.8969 8.93354V10.9727C13.901 17.4571 4.10374 17.4671 4.10784 10.9724Z"
                      fill="#048AA3"
                    />
                    <path
                      d="M8.14946 10.873V10.1757C8.14946 9.95462 7.97023 9.77539 7.74917 9.77539C7.52811 9.77539 7.34888 9.95462 7.34888 10.1757V10.873C7.34888 11.094 7.52811 11.2733 7.74917 11.2733C7.97023 11.2733 8.14946 11.094 8.14946 10.873Z"
                      fill="#048AA3"
                    />
                    <path
                      d="M10.2509 9.77539C10.0298 9.77539 9.85059 9.95462 9.85059 10.1757V10.873C9.85059 11.094 10.0298 11.2733 10.2509 11.2733C10.4719 11.2733 10.6512 11.094 10.6512 10.873V10.1757C10.6512 9.95462 10.4719 9.77539 10.2509 9.77539Z"
                      fill="#048AA3"
                    />
                    <path
                      d="M9.59237 13.0841C9.26498 13.4114 8.7351 13.4114 8.40771 13.0841C8.2514 12.9277 7.99801 12.9277 7.8416 13.0841C7.68529 13.2404 7.68529 13.4938 7.8416 13.6502C8.48191 14.2905 9.51821 14.2905 10.1585 13.6502C10.3148 13.4938 10.3148 13.2404 10.1585 13.0841C10.0022 12.9277 9.74873 12.9277 9.59237 13.0841Z"
                      fill="#048AA3"
                    />
                  </svg>
                </span>
                <p>Women</p>
              </div>
            </Link>

            <Link to={`/customer/booking/services/men/${id}`}>
              <div id="MaleService">
                <span>
                  {/* <img id="centerIconOnser" src="/icons/01.png" alt="" /> */}
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 24 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 10.5C10.5 10.1022 10.342 9.72064 10.0607 9.43934C9.77936 9.15804 9.39782 9 9 9C8.60218 9 8.22064 9.15804 7.93934 9.43934C7.65804 9.72064 7.5 10.1022 7.5 10.5H8.5C8.5 10.3674 8.55268 10.2402 8.64645 10.1464C8.74021 10.0527 8.86739 10 9 10C9.13261 10 9.25979 10.0527 9.35355 10.1464C9.44732 10.2402 9.5 10.3674 9.5 10.5H10.5Z"
                      fill="#048AA3"
                    />
                    <path
                      d="M15 10C15.1326 10 15.2598 10.0527 15.3536 10.1464C15.4473 10.2402 15.5 10.3674 15.5 10.5H16.5C16.5 10.1022 16.342 9.72064 16.0607 9.43934C15.7794 9.15804 15.3978 9 15 9C14.6022 9 14.2206 9.15804 13.9393 9.43934C13.658 9.72064 13.5 10.1022 13.5 10.5H14.5C14.5 10.3674 14.5527 10.2402 14.6464 10.1464C14.7402 10.0527 14.8674 10 15 10Z"
                      fill="#048AA3"
                    />
                    <path
                      d="M20.645 20.7303L14.5 19.1153V17.4703C15.2462 17.1421 15.9245 16.6775 16.5 16.1003C17.4886 15.109 18.1499 13.8387 18.395 12.4603C18.9729 12.369 19.5004 12.0775 19.8852 11.6368C20.27 11.1961 20.4877 10.6341 20.5002 10.0492C20.5127 9.46422 20.3192 8.89349 19.9536 8.43671C19.588 7.97994 19.0735 7.66618 18.5 7.55027V6.49527C18.5002 6.41891 18.5179 6.34361 18.5517 6.27514C18.5855 6.20667 18.6345 6.14685 18.695 6.10027C19.2543 5.68118 19.7085 5.13778 20.0218 4.51301C20.335 3.88823 20.4988 3.19918 20.5 2.50027V0.500272C20.5006 0.409638 20.4762 0.320588 20.4295 0.242946C20.3827 0.165304 20.3154 0.102087 20.235 0.0602718C20.1562 0.016204 20.0666 -0.00481952 19.9764 -0.000398975C19.8862 0.00402157 19.7991 0.0337081 19.725 0.0852719L17.5 1.56527V0.500272C17.5007 0.412767 17.4779 0.326681 17.4339 0.25103C17.3899 0.175379 17.3264 0.112947 17.25 0.0702719C17.1745 0.0253304 17.0885 0.00119137 17.0007 0.000313063C16.9128 -0.00056524 16.8264 0.0218485 16.75 0.0652719L14.27 1.48527L14.485 0.620272C14.5029 0.546416 14.5041 0.469493 14.4886 0.395106C14.473 0.32072 14.441 0.250743 14.395 0.190272C14.3479 0.130682 14.2879 0.0826024 14.2194 0.0496812C14.151 0.01676 14.0759 -0.000137293 14 0.000271816H10C8.80709 0.00212313 7.66358 0.476823 6.82006 1.32034C5.97655 2.16385 5.50185 3.30737 5.5 4.50027V7.55027C4.93077 7.66844 4.42052 7.9813 4.05704 8.43503C3.69356 8.88875 3.49957 9.45497 3.50845 10.0363C3.51733 10.6176 3.72852 11.1776 4.10569 11.62C4.48286 12.0624 5.00243 12.3595 5.575 12.4603C5.73666 13.569 6.18334 14.6167 6.87134 15.501C7.55933 16.3854 8.46509 17.076 9.5 17.5053V19.1153L3.35 20.7303C2.39031 20.9866 1.54194 21.5522 0.936297 22.3395C0.330658 23.1269 0.00156447 24.092 0 25.0853V29.5003C0 29.6329 0.0526785 29.7601 0.146447 29.8538C0.240215 29.9476 0.367392 30.0003 0.5 30.0003H23.5C23.6326 30.0003 23.7598 29.9476 23.8536 29.8538C23.9473 29.7601 24 29.6329 24 29.5003V25.0853C23.9983 24.0913 23.6686 23.1256 23.0619 22.3381C22.4553 21.5507 21.6057 20.9855 20.645 20.7303ZM5.5 11.4103C5.29132 11.3356 5.10057 11.2181 4.94 11.0653C4.76079 10.8861 4.62987 10.6645 4.55946 10.4211C4.48906 10.1777 4.48146 9.92046 4.53738 9.67332C4.59329 9.42618 4.71091 9.19724 4.87924 9.00785C5.04757 8.81846 5.26113 8.6748 5.5 8.59027V11.4103ZM19.5 10.0003C19.501 10.3972 19.3446 10.7784 19.065 11.0603C18.9023 11.2165 18.7079 11.3359 18.495 11.4103C18.495 11.3803 18.5 11.3553 18.5 11.3253V8.59027C18.7914 8.69405 19.0437 8.88509 19.2226 9.13738C19.4016 9.38968 19.4984 9.69097 19.5 10.0003ZM6.5 4.50027C6.50106 3.57234 6.87015 2.68272 7.5263 2.02657C8.18244 1.37042 9.07207 1.00133 10 1.00027H13.36L13.015 2.38027C12.991 2.47556 12.9956 2.57579 13.0283 2.66847C13.0609 2.76114 13.1202 2.84214 13.1986 2.90135C13.277 2.96056 13.3711 2.99536 13.4692 3.00139C13.5672 3.00742 13.6649 2.98443 13.75 2.93527L16.5 1.36027V2.50027C16.4994 2.59091 16.5238 2.67996 16.5705 2.7576C16.6173 2.83524 16.6846 2.89846 16.765 2.94027C16.8438 2.98434 16.9334 3.00536 17.0236 3.00094C17.1138 2.99652 17.2009 2.96684 17.275 2.91527L19.5 1.43527V2.50027C19.4991 3.04347 19.3722 3.57904 19.1292 4.06489C18.8863 4.55074 18.534 4.97361 18.1 5.30027C17.9142 5.4393 17.7632 5.61963 17.6591 5.82703C17.555 6.03443 17.5005 6.2632 17.5 6.49527V7.50027H16.5C16.4988 7.10281 16.3404 6.72197 16.0593 6.44092C15.7783 6.15988 15.3975 6.00146 15 6.00027H9C8.60254 6.00146 8.2217 6.15988 7.94065 6.44092C7.6596 6.72197 7.50119 7.10281 7.5 7.50027H6.5V4.50027ZM8.11 15.3903C7.5971 14.881 7.19062 14.2748 6.91422 13.607C6.63782 12.9392 6.49701 12.223 6.5 11.5003V8.50027H7.5C7.76497 8.49948 8.01887 8.39387 8.20623 8.2065C8.3936 8.01914 8.49921 7.76524 8.5 7.50027C8.5 7.36766 8.55268 7.24049 8.64645 7.14672C8.74021 7.05295 8.86739 7.00027 9 7.00027H15C15.1326 7.00027 15.2598 7.05295 15.3536 7.14672C15.4473 7.24049 15.5 7.36766 15.5 7.50027C15.5008 7.76524 15.6064 8.01914 15.7938 8.2065C15.9811 8.39387 16.235 8.49948 16.5 8.50027H17.5V11.3253C17.4902 12.8521 16.8774 14.3133 15.795 15.3903C15.3002 15.896 14.71 16.2987 14.0586 16.5751C13.4072 16.8514 12.7076 16.9959 12 17.0003H11.99C11.2691 17.0008 10.5552 16.8588 9.8893 16.5825C9.22343 16.3062 8.61875 15.9011 8.11 15.3903ZM11.5 29.0003H1V25.0853C1.00038 24.3128 1.256 23.5621 1.7271 22.95C2.19821 22.3378 2.8584 21.8985 3.605 21.7003L9.5 20.1503V20.5003C9.50147 21.0762 9.70106 21.634 10.0653 22.0802C10.4294 22.5263 10.9361 22.8335 11.5 22.9503V29.0003ZM10.5 20.5003V17.8203C10.9862 17.9382 11.4847 17.9986 11.985 18.0003H12C12.5062 17.9983 13.0101 17.9328 13.5 17.8053V20.5003C13.5 20.8981 13.342 21.2796 13.0607 21.5609C12.7794 21.8422 12.3978 22.0003 12 22.0003C11.6022 22.0003 11.2206 21.8422 10.9393 21.5609C10.658 21.2796 10.5 20.8981 10.5 20.5003ZM23 29.0003H12.5V22.9503C13.0639 22.8335 13.5706 22.5263 13.9347 22.0802C14.2989 21.634 14.4985 21.0762 14.5 20.5003V20.1503L20.39 21.7003C21.1376 21.8974 21.799 22.3363 22.2711 22.9486C22.7432 23.5608 22.9995 24.3121 23 25.0853V29.0003Z"
                      fill="#048AA3"
                    />
                    <path d="M9.5 24H10.5V25H9.5V24Z" fill="#048AA3" />
                    <path d="M9.5 27H10.5V28H9.5V27Z" fill="#048AA3" />
                    <path d="M13.5 24H14.5V25H13.5V24Z" fill="#048AA3" />
                    <path d="M13.5 27H14.5V28H13.5V27Z" fill="#048AA3" />
                    <path
                      d="M14.5 13.5H13.5C13.5 13.6245 12.968 14 12 14C11.032 14 10.5 13.6245 10.5 13.5H9.5C9.5 14.355 10.5745 15 12 15C13.4255 15 14.5 14.355 14.5 13.5Z"
                      fill="#048AA3"
                    />
                  </svg>
                </span>
                <p>Men</p>
              </div>
            </Link>

            <Link to={`/customer/booking/services/child/${id}`}>
              <div id="FeMaleService">
                <span>
                  {/* <img id="centerIconOnser" src="/icons/01.png" alt="" /> */}
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.0825 11.9528C12.3033 12.0879 12.3728 12.3765 12.2376 12.5973C11.9794 13.0192 11.4687 13.2213 10.9926 13.2213C10.5309 13.2213 10.0397 13.0322 9.77352 12.6375C9.62878 12.4229 9.68543 12.1315 9.90007 11.9868C10.1147 11.8421 10.406 11.8987 10.5508 12.1133C10.5961 12.1805 10.749 12.2838 10.9926 12.2838C11.247 12.2838 11.3984 12.1726 11.438 12.1079C11.5731 11.8871 11.8617 11.8176 12.0825 11.9528Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.9665 10.8607C15.1815 11.1841 15.0937 11.6205 14.7703 11.8356L14.77 11.8357C14.4467 12.0508 14.0102 11.9629 13.7952 11.6396C13.5802 11.3162 13.668 10.8798 13.9914 10.6648L13.9916 10.6646C14.315 10.4496 14.7514 10.5374 14.9665 10.8607Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.20428 10.86C8.41968 11.1832 8.33237 11.6197 8.00927 11.8351L8.00899 11.8353C7.68588 12.0507 7.24934 11.9634 7.03393 11.6403C6.81853 11.3172 6.90584 10.8806 7.22895 10.6652L7.22923 10.665C7.55233 10.4496 7.98888 10.5369 8.20428 10.86Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.98082 15.7602C7.15643 15.9504 7.14458 16.2469 6.95436 16.4226C5.76754 17.5182 5.02344 19.0823 5.02344 20.8106V23.0625H16.9765V20.8106C16.9765 19.0823 16.2324 17.5182 15.0456 16.4226C14.8554 16.2469 14.8435 15.9504 15.0191 15.7602C15.1947 15.5699 15.4913 15.5581 15.6815 15.7337C17.0507 16.9977 17.914 18.8074 17.914 20.8106V23.5312C17.914 23.7901 17.7041 24 17.4453 24H4.55469C4.2958 24 4.08594 23.7901 4.08594 23.5312V20.8106C4.08594 18.8075 4.94927 16.9977 6.31844 15.7337C6.50866 15.5581 6.80522 15.5699 6.98082 15.7602Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.25 19.8643C7.50888 19.8643 7.71875 20.0741 7.71875 20.333V23.5316C7.71875 23.7905 7.50888 24.0003 7.25 24.0003C6.99112 24.0003 6.78125 23.7905 6.78125 23.5316V20.333C6.78125 20.0741 6.99112 19.8643 7.25 19.8643Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.75 19.8643C15.0089 19.8643 15.2188 20.0741 15.2188 20.333V23.2972C15.2188 23.5561 15.0089 23.7659 14.75 23.7659C14.4911 23.7659 14.2812 23.5561 14.2812 23.2972V20.333C14.2812 20.0741 14.4911 19.8643 14.75 19.8643Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.32031 21.4219C4.32031 21.163 4.53018 20.9531 4.78906 20.9531H7.01563C7.27451 20.9531 7.48438 21.163 7.48438 21.4219C7.48438 21.6808 7.27451 21.8906 7.01563 21.8906H4.78906C4.53018 21.8906 4.32031 21.6808 4.32031 21.4219Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.5156 21.4219C14.5156 21.163 14.7255 20.9531 14.9844 20.9531H17.211C17.4699 20.9531 17.6797 21.163 17.6797 21.4219C17.6797 21.6808 17.4699 21.8906 17.211 21.8906H14.9844C14.7255 21.8906 14.5156 21.6808 14.5156 21.4219Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.38281 8.55469C3.6417 8.55469 3.85156 8.76455 3.85156 9.02344V10.4297C3.85156 13.8919 7.00216 16.784 11 16.784C14.9978 16.784 18.1484 13.8919 18.1484 10.4297L18.1483 9.02345C18.1483 8.76457 18.3582 8.5547 18.6171 8.55469C18.8759 8.55468 19.0858 8.76454 19.0858 9.02342L19.0859 10.4297C19.0859 14.504 15.4158 17.7215 11 17.7215C6.58412 17.7215 2.91406 14.504 2.91406 10.4297V9.02344C2.91406 8.76455 3.12393 8.55469 3.38281 8.55469Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.14844 16.835C9.40732 16.835 9.61719 17.0448 9.61719 17.3037V17.3506C9.61719 18.11 10.2406 18.7334 11 18.7334H11C11.7595 18.7334 12.3829 18.1101 12.3829 17.3506V17.3037C12.3829 17.0448 12.5927 16.835 12.8516 16.835C13.1105 16.835 13.3204 17.0448 13.3204 17.3037V17.3506C13.3204 18.6278 12.2773 19.6709 11 19.6709H11C9.72282 19.6709 8.67969 18.6278 8.67969 17.3506V17.3037C8.67969 17.0448 8.88955 16.835 9.14844 16.835Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.0665 5.97656C14.3254 5.97656 14.5353 6.18643 14.5353 6.44531C14.5353 6.84136 14.833 7.30204 15.5322 7.69093C16.2145 8.07043 17.1867 8.3203 18.2805 8.3203H19.4926C20.7565 8.3203 21.7811 9.3449 21.7811 10.6088C21.7811 11.8728 20.7565 12.8974 19.4926 12.8974H18.2933C18.0344 12.8974 17.8246 12.6875 17.8246 12.4286C17.8246 12.1697 18.0344 11.9599 18.2933 11.9599H19.4926C20.2388 11.9599 20.8436 11.355 20.8436 10.6088C20.8436 9.86267 20.2388 9.2578 19.4926 9.2578H18.2805C17.0565 9.2578 15.9218 8.98033 15.0765 8.51023C14.6827 8.2912 14.3291 8.01555 14.0665 7.69067C13.8039 8.01556 13.4503 8.2912 13.0565 8.51023C12.2112 8.98033 11.0765 9.2578 9.85251 9.2578H2.50727C1.76112 9.2578 1.15625 9.86267 1.15625 10.6088C1.15625 11.355 1.76112 11.9599 2.50727 11.9599H3.70661C3.9655 11.9599 4.17536 12.1697 4.17536 12.4286C4.17536 12.6875 3.9655 12.8974 3.70661 12.8974H2.50727C1.24335 12.8974 0.21875 11.8728 0.21875 10.6088C0.21875 9.3449 1.24335 8.3203 2.50727 8.3203H9.85251C10.9462 8.3203 11.9185 8.07043 12.6008 7.69093C13.3 7.30204 13.5978 6.84136 13.5978 6.44531C13.5978 6.18643 13.8076 5.97656 14.0665 5.97656Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.33677 1.93253C5.72946 0.730578 7.54211 0 9.51745 0H12.4826C16.8546 0 20.4302 3.57538 20.4302 7.94763V8.68122C20.4302 8.9401 20.2203 9.14997 19.9614 9.14997C19.7026 9.14997 19.4927 8.9401 19.4927 8.68122V7.94763C19.4927 4.09316 16.3369 0.937501 12.4826 0.937501H9.51745C7.77731 0.937501 6.17972 1.58035 4.9493 2.64226C4.75331 2.81141 4.45731 2.78965 4.28817 2.59366C4.11902 2.39768 4.14078 2.10168 4.33677 1.93253ZM2.47914 5.38306C2.7273 5.45678 2.86872 5.71772 2.79499 5.96589C2.60817 6.59478 2.50733 7.25976 2.50733 7.94763V8.68122C2.50733 8.9401 2.29746 9.14997 2.03857 9.14997C1.77969 9.14997 1.56982 8.9401 1.56982 8.68122V7.94763C1.56982 7.16765 1.68423 6.4128 1.89631 5.69891C1.97003 5.45075 2.23098 5.30934 2.47914 5.38306Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.35938 21.3203C9.35938 21.0614 9.56924 20.8516 9.82813 20.8516H12.1719C12.4308 20.8516 12.6406 21.0614 12.6406 21.3203C12.6406 21.5792 12.4308 21.7891 12.1719 21.7891H9.82813C9.56924 21.7891 9.35938 21.5792 9.35938 21.3203Z"
                      fill="#048AA3"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.7627 3.9082C2.7627 3.64932 2.97256 3.43945 3.23144 3.43945H3.23177C3.49065 3.43945 3.70051 3.64932 3.70051 3.9082C3.70051 4.16708 3.49065 4.37694 3.23177 4.37694H3.23144C2.97256 4.37694 2.7627 4.16708 2.7627 3.9082Z"
                      fill="#048AA3"
                    />
                  </svg>
                </span>
                <p>Child</p>
              </div>
            </Link>
          </div>
        </div>
        <div id="thirdcomp">
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
            {services
              .filter(
                (service, index, self) =>
                  index ===
                  self.findIndex((s) => s.category === service.category)
              )
              .map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqxC_9BoBHx70zR-_RYWlf_rP7LlUSIVTNA&usqp=CAU"
                    alt=""
                  />
                  <p>{service.category}</p>
                </div>
              ))}
          </div>
        </div>
        {selectedService && isSliderVisible && (
          <div className={`overlay ${showDiv ? "show" : ""}`}>
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
                    <h2>{selectedService.category}</h2>
                  </div>
                  <div className="back-button" onClick={handleCrossClick}>
                    <RxCross2 />
                  </div>
                </div>
                <div id="middleFetchedData">
  {uniqueSubcategories.map((subcategory) => {
    const filteredServices = services.filter(
      (service) =>
        service.sub_category === subcategory &&
        service.category === selectedService.category
    );

    if (filteredServices.length === 0) {
      return null; // Skip rendering the heading if there are no services
    }

    return (
      <div key={subcategory}>
        <h2 id="HeadingForSubcateg">{subcategory}</h2>
        {filteredServices.map((service) => (
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
                {service.label}
              </span>
              <span>₹{service.price_including_gst}</span>
            </p>
          </div>
        ))}
      </div>
    );
  })}
</div>


                <div id="lastbtnofserviceadd">
                <Link
  to= {`/customer/booking/${id}`}
  className="book-button"
  onClick={handleAddServices2O}
>
  Add Services
</Link>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
      
      <div id="topcoverareadiv"></div>
    </>
  );
};

export default HandleChildSer;
