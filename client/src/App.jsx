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


function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result)

    navigate(Path.Home)
  };

  const values = {
    loginSubmitHandler,
    username: auth.username,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
  }

  return (
    <>
      <AuthContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App
