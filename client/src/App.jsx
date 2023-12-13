import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as authService from './services/authService';
import AuthContext from './contexts/authContext';
import Path from './paths';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Home from "./components/Home/Home"
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import ProductDetails from './components/Products/ProductDetails';
import AccountInformation from './components/AccountInformation/AccountInformation';


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

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('userId', result._id); 
      setAuth({ ...result, userId: result._id, isAuthenticated: true });
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
    }
    try {
      const billingInfoResponse = await fetch('http://localhost:3030/data/billingInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': result.accessToken
        },
        body: JSON.stringify({
          email: '',
          phone: '',
          city: '',
          address: '',
          zip: ''
        })
      });

      if (!billingInfoResponse.ok) {
        throw new Error('Failed to create billing information');
      }

      const billingInfoData = await billingInfoResponse.json();
      console.log('Billing information created:', billingInfoData);
      localStorage.setItem('billInfoId', billingInfoData._id);
      setAuth(prevState => ({
        ...prevState,
        billInfoId: billingInfoData._id, 
      }));
    } catch (error) {
      console.error('Error creating billing information:', error);
    }
    navigate(Path.Home)
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
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<AccountInformation />} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App
