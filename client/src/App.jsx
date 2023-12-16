import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
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
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';

function App() {

  return (
    <>
      <AuthProvider>
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
      </AuthProvider>
    </>
  )
}

export default App