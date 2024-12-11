import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Layout from "./layout/Layout";
import AccountPage from "./pages/AccountPage/AccountPage";
import BookingsPage from "./pages/BookingsPage/BookingsPage";
import CartPage from "./pages/CartPage/CartPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition";

// Lazy load your components
const CategoryProductPage = lazy(() => import("./pages/CategoryProductPage/CategoryProductPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Registration/Register"));

// const Loader = () => <div>Loading...</div>;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
   
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<LayoutWrapper />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const LayoutWrapper = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category-product/:cid" element={<CategoryProductPage />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/account" element={<AccountPage/>} />
          <Route path="/bookings" element={<BookingsPage/>} />
          <Route path="/help-page" element={<HelpPage/>}/>
          <Route path="/terms-condition" element={<TermsAndCondition/>} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
