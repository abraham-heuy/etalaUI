import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AboutPage from "./Pages/AboutPage";
import DailyUpdates from "./components/about/DailyUpdates";
import SignIn from "./components/getStarted/signin";
import ForgotPassword from "./components/getStarted/forgot-password";
import SignUp from "./components/getStarted/signup";
import MarketplaceHome from "./Pages/Marketplace";
import CategoryPage from "./Pages/Marketplace/category/[slug]";
import ProductDetailPage from "./Pages/Marketplace/product/[id]";
import StoreDetailPage from "./Pages/Marketplace/store/[id]";
import FarmersCategoryPage from "./Pages/Farmers/category/[slug]";
import FarmerDetailPage from "./Pages/Farmers/farmer/[id]";
import FarmerProductDetailPage from "./Pages/Farmers/product/[id]";
import FarmersHome from "./Pages/Farmers";
import LivestockPage from "./Pages/Farmers/livestock";
import LivestockInquirePage from "./Pages/Farmers/livestock/inquire/[id]";
import BodaHome from "./Pages/Rides";
import PricingPage from "./Pages/Rides/pricing";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="daily-updates" element={<DailyUpdates />} />

      {/* get started routes */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/marketplace">
        <Route index element={<MarketplaceHome />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="store/:id" element={<StoreDetailPage />} />
      </Route>

      <Route path="/farmers">
        <Route index element={<FarmersHome />} />
        <Route path="category/:slug" element={<FarmersCategoryPage />} />
        <Route path="farmer/:id" element={<FarmerDetailPage />} />
        <Route path="product/:id" element={<FarmerProductDetailPage />} />
      </Route>

      <Route path="/farmers/livestock">
        <Route index element={<LivestockPage />} />
        <Route path=":id" element={<LivestockPage />} /> 
        <Route path="inquire/:id" element={<LivestockInquirePage />} />
      </Route>

      <Route path="/boda">
  <Route index element={<BodaHome />} />
  <Route path="pricing" element={<PricingPage />} />
</Route>
    </Routes>
  );
};
