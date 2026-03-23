import { Routes, Route, Navigate } from "react-router-dom";
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
import NotFound from "./common/NotFound";
import ServicesHome from "./Pages/Freelancers";
import ServiceCategoryPage from "./Pages/Freelancers/category/[slug]";
import ServiceProviderPage from "./Pages/Freelancers/provider/[id]";
import FoodHome from "./Pages/Food";
import RestaurantDetailPage from "./Pages/Food/Restaurant/[id]";
import FoodCategoryPage from "./Pages/Food/cuisine/[slug]";
import StaysHome from "./Pages/stays";
import StayCategoryPage from "./Pages/stays/category/[slug]";
import PropertyDetailPage from "./Pages/stays/product/[id]";
import DashboardLayout from "./Pages/dashboard/layout";
import DashboardOverview from "./Pages/dashboard/items/overview";
import OrdersPage from "./Pages/dashboard/items/orders";
import WishlistPage from "./Pages/dashboard/items/WishList";
import AddressesPage from "./Pages/dashboard/items/addresses";
import PaymentsPage from "./Pages/dashboard/items/payment";
import SettingsPage from "./Pages/dashboard/items/settings";
import SalesPage from "./Pages/dashboard/sellerTools.tsx/sales";
import ProductsPage from "./Pages/dashboard/sellerTools.tsx/products";
import EarningsPage from "./Pages/dashboard/sellerTools.tsx/earnings";
import ReviewsPage from "./Pages/dashboard/sellerTools.tsx/Reviews";
import MessagesPage from "./Pages/dashboard/sellerTools.tsx/messages";
import ProductNewPage from "./Pages/dashboard/product/newProduct(listing)";
import ProductEditPage from "./Pages/dashboard/product/productEdit";
import SalesOrderDetailPage from "./Pages/dashboard/sales/[id]";
import BecomeSellerPage from "./Pages/becomeSeller";
import PartnerPage from "./Pages/patner";
import ContactPage from "./Pages/contact";
import OrderDetailPage from "./Pages/dashboard/orders/[id]";
import AdminLayout from "./Pages/admin/Layout";
import AdminOverview from "./Pages/admin/items/Overview";
import UserManagement from "./Pages/admin/items/UserManagement";
import SellerApprovals from "./Pages/admin/items/sellerApproval";

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
      <Route path="/become-seller" element={<BecomeSellerPage />}/>

      {/* communications routes  
       --for  partnerships 
       --or for reporting(contact)*/}
         
      <Route path="/partnership" element={<PartnerPage />}/>
      <Route path="/contact" element={<ContactPage />}/>

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
      <Route path="/services">
        <Route index element={<ServicesHome />} />
        <Route path="category/:slug" element={<ServiceCategoryPage />} />
        <Route path="provider/:id" element={<ServiceProviderPage />} />
      </Route>
      <Route path="/food">
        <Route index element={<FoodHome />} />
        <Route path="cuisine/:slug" element={<FoodCategoryPage />} />
        <Route path="restaurant/:id" element={<RestaurantDetailPage />} />
        {/* <Route path="blog" element={<FoodBlogPage />} />
        <Route path="blog/:id" element={<FoodBlogPostPage />} /> */}
      </Route>
      <Route path="/stays">
        <Route index element={<StaysHome />} />
        <Route path="category/:slug" element={<StayCategoryPage />} />
        <Route path="property/:id" element={<PropertyDetailPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="orders" element={<OrdersPage />} />
        {/* get a specific order by passing an id => in /[id] */}
        <Route path="orders/:id" element ={<OrderDetailPage />}/>
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="addresses" element={<AddressesPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Additional seller tools: we will add conditional checking later: 
        aslo there is another conditional checking in the  layout /layout check out */}
        <Route path="products" element={<ProductsPage />} />
        {/* post your products here(Listing components navigate to edit it there) */}
        <Route path="products/new" element={<ProductNewPage />} />
        {/* To edit a product that exists simply navigate to the route /product/edit :id */}
        <Route path="products/edit/:id" element={<ProductEditPage />} />
        <Route path="sales" element={<SalesPage />} />
        {/* fetch a single order  from /[id] */}
        <Route path="sales/:id" element={<SalesOrderDetailPage />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="messages" element={<MessagesPage />} />
      </Route>


      {/* admin routes => for the admin dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="sellers" element={<SellerApprovals />} />
          {/* Add other admin routes */}
        </Route>
      {/* Not Found Wildcard */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
