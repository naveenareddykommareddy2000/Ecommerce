import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext,  useState } from 'react';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import OrderSummary from "./OrderSummary/OrderSummary";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Checkout from "./Checkout/Checkout";
import { AuthContext } from "./context/AuthContext";
import Loading from "./components/Loading";

function App() {
  const [searchItem, setSearchItem] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const {isAuthenticated, logout } = useContext(AuthContext); 

  const location = useLocation();

  const hideLoading = 
  location.pathname === '/login' || 
  location.pathname === '/signup' || 
  location.pathname === '/home' || 
  location.pathname === '/cart' || 
  location.pathname === '/order-summary' || 
  location.pathname === '/checkout' || 
  location.pathname.startsWith('/product/'); 
 
 return (
    <>
      <Navbar 
        onSearch={setSearchItem}  
        onSort={setSortBy}        
        onCategorySelect={setCategory}  
        onMinRangeChange={setMinPrice}
        onMaxRangeChange={setMaxPrice}
      />

      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={<Home searchItem={searchItem} sortBy={sortBy} category={category} minPrice={minPrice} maxPrice={maxPrice}/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order-summary" element={<OrderSummary/>}/>
        <Route path="/logout" element={<Navigate to="/login" onClick={logout} />} /> 
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>

      {!hideLoading && <Loading />}
      </>
  );
}

export default App;
