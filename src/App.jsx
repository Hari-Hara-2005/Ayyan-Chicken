import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Hero";
import ProductPage from "./Pages/ProductPage";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
