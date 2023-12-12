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
import AddPeripheral from './components/AddProductForm/AddPeripheral'


function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem('accessToken');

    return {};
  });

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result)

    navigate(Path.Home)
  };

  const registerSubmitHandler = async (values) => {
    const result = await authService.register(values.email, values.password);
    
    setAuth(result)

    navigate(Path.Home)
  };

  const logoutHandler = () => {
    setAuth({});

    navigate(Path.Home)

    localStorage.removeItem('accessToken');
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
  };

  return (
    <>
      <AuthContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/add-product' element={<AddPeripheral />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App
