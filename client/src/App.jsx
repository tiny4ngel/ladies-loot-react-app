import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as authService from './services/authService';
import AuthContext from './contexts/authContext';
import Path from './paths';
import { Toaster } from 'react-hot-toast';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Home from "./components/Home/Home"
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import ProductDetails from './components/Products/ProductDetails';
import AccountInformation from './components/AccountInformation/AccountInformation';
import { getMyBillingInfo } from './services/billingService';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    return {
      accessToken: localStorage.getItem('accessToken'),
      userId: localStorage.getItem('userId'),
      email: '',
      username: '',
      isAuthenticated: !!localStorage.getItem('accessToken'),
      billInfoId: localStorage.getItem('billInfoId'),
    };
  });

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);
    const billingInfo = await getMyBillingInfo(result._id);

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('userId', result._id);
      setAuth({ ...result, userId: result._id, isAuthenticated: true });
      localStorage.setItem('userId', result._id);
      try {
        const billingInfo = await getMyBillingInfo(result._id);

        if (billingInfo) {
          localStorage.setItem('billInfoId', billingInfo._id);
        }

      } catch (error) {
        console.error('Error fetching billing information:', error);
      }

      navigate(Path.Home);
    }

    navigate(Path.Home)
  };

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(values.email, values.password);

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('userId', result._id);
      setAuth({ ...result, userId: result._id, isAuthenticated: true });
      navigate(Path.Home);
    } else {
      // Handle registration failure, show error message, etc.
      console.error('Registration failed');
    }
  };


  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('billInfoId');
    setAuth({ accessToken: null, userId: null, isAuthenticated: false, billInfoId: null });
    navigate(Path.Home);

  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    ...auth,
  };

  return (
    <>
      <AuthContext.Provider value={values}>
        <Header />
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            marginTop: '100px' // or however much margin you want
          }}
        />
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<AccountInformation />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App