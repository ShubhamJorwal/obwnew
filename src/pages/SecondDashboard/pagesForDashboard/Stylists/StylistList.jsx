import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // Fetch data from localStorage
    const selectedProductsData = localStorage.getItem("selectedProducts");

    if (selectedProductsData) {
      const parsedSelectedProductsData = JSON.parse(selectedProductsData);
      setSelectedProducts(parsedSelectedProductsData);
    }
  }, []);

  return (
    <div>
      <h1>Selected Products</h1>
      {selectedProducts.map((product, index) => (
        <div key={index}>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          {/* Add more JSX elements to display other properties of the product */}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
