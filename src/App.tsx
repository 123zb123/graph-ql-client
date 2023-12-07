import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Login/Login";
import Sign_up from "./components/SignUp/Sign_up";
import Products from "./components/Products/Products";
import AddProduct from "./components/AddProduct/AddProduct";
import Product from "./components/Product/Product";
import EditProduct from "./components/EditProduct/EditProduct";
import ElementHighlights from "./graphQL/graph";
import Recharts from "./components/Rechrts/Rechrts"

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";



function App() {
  if ("__DEV__") {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/erp/Sign_up" element={<Sign_up />} />
          <Route path="/erp/graph" element={<ElementHighlights />} />
          <Route path="/erp" element={<Layout />}>
            <Route path="/erp/Products" element={<Products />} />
            <Route path="/erp/Recharts" element={<Recharts />} />

            <Route path="/erp/Product/:id" element={<Product />} />
            <Route path="/erp/AddProduct" element={<AddProduct />} />
            <Route path="/erp/EditProduct/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
