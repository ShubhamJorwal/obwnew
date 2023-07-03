import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaReceipt } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineContentCut } from "react-icons/md";
import "./products.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://admin.obwsalon.com/api/products",
          { headers }
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <div id="ProductsOfDash">
        <div id="topmegamenu">
          <Link to={"/dashboard"} className="megamenuLinks" id="Option1">
            <CiCalendarDate />
            <p>Appointments</p>
          </Link>
          <Link to={"/bookings"} className="megamenuLinks" id="Option2">
            <IoCheckmarkDoneSharp />
            <p>Bookings</p>
          </Link>
          <Link to={"/bills"} className="megamenuLinks" id="Option3">
            <FaReceipt />
            <p>Bills</p>
          </Link>
          <Link to={"/products"} className="megamenuLinks" id="Option4">
            <IoCubeSharp />
            <p>Products</p>
          </Link>
          <Link to={"/customers"} className="megamenuLinks" id="Option5">
            <RiAccountCircleLine />
            <p>Customer</p>
          </Link>
          <Link to={"/stylist"} className="megamenuLinks" id="Option6">
            <MdOutlineContentCut />

            <p>Stylist</p>
          </Link>
        </div>
      </div>
      <div id="searchbarforprod">
        <input
          type="text"
          id="searchstylistbar"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div id="productslist">
      {filteredProducts.map((product) => (
          <div id="productsListRow" key={product.id} >
            <div id="firstlistrow">
              <p>{product.product_name}</p>
              <div id="secobelrow">
                <p>{product.sku}</p>
                <p className={product.quantity === 0 ? "out-of-stock" : "in-stock"}>{product.quantity} stocks left</p>
                <p>{product.brand}</p>
              </div>
            </div>
            <div id="secondlistrow">
              <p>{product.amount_with_gst}</p>
            </div>
            {/* Render other product details */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
