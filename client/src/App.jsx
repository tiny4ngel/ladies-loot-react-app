import { Routes, Route } from 'react-router-dom';

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
import PageNotFound from './components/PageNotFound/PageNotFound';


function App() {

  return (
    <>
      <AuthProvider>
        <Header />
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            marginTop: '100px'
          }}
        />
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.Products} element={<Products />} />
          <Route path={Path.ProductDetails} element={<ProductDetails />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path={Path.Account} element={<AccountInformation />} />
          <Route path={Path.Wishlist} element={<Wishlist />} />
          <Route path={Path.Cart} element={<Cart />} />
          <Route path={Path.Logout} element={<Logout />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App