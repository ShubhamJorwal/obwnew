import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from "react-router-dom";
import router from "./configs/RConfig";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
