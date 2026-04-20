// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { WishlistProvider } from "./contexts/commerce/wishlist.context";
import { CartProvider } from "./contexts/commerce/cart.context";

// Import all your pages (keeping your existing imports)
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
import DeliveryProgramPage from "./Pages/deliveryProgramPage";
import { AuthProvider } from "./contexts/auth/auth";
import { ProtectedRoute } from "./contexts/auth/Protected.route";
import { SessionManager } from "./contexts/auth/sessionManager";
import TryOnExplainPage from "./Pages/Marketplace/fashion/explain";
import CartPage from "./Pages/dashboard/items/cart";
import Reviews from "./Pages/dashboard/items/reviews";
import SellerApplicationPage from "./Pages/dashboard/sellerTools.tsx/seller-application";
import SearchResultsPage from "./Pages/Marketplace/product/search";
import CategoriesPage from "./components/marketplace/Categories";
import MtushPage from "./Pages/Marketplace/product/mtush";
import StoresPage from "./Pages/Marketplace/store/storesPage";
import CheckoutPage from "./Pages/checkout";

// Helper to wrap routes that need cart & wishlist context
const withMarketplaceProviders = (Component: React.ComponentType) => (
  <WishlistProvider>
    <CartProvider category="marketplace">
      <Component />
    </CartProvider>
  </WishlistProvider>
);

const withFarmersProviders = (Component: React.ComponentType) => (
  <WishlistProvider>
    <CartProvider category="farmers">
      <Component />
    </CartProvider>
  </WishlistProvider>
);

// For other categories if needed (food, stays, boda, services) – add when they use CategoryNavbar
const withFoodProviders = (Component: React.ComponentType) => (
  <WishlistProvider>
    <CartProvider category="food">
      <Component />
    </CartProvider>
  </WishlistProvider>
);

const withStaysProviders = (Component: React.ComponentType) => (
  <WishlistProvider>
    <CartProvider category="stays">
      <Component />
    </CartProvider>
  </WishlistProvider>
);

const withServicesProviders = (Component: React.ComponentType) => (
  <WishlistProvider>
    <CartProvider category="services">
      <Component />
    </CartProvider>
  </WishlistProvider>
);

const withBodaProviders = (Component: React.ComponentType) => (
  <WishlistProvider>
    <CartProvider category="boda">
      <Component />
    </CartProvider>
  </WishlistProvider>
);

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <SessionManager />
      <Routes>
        {/* Public Routes - No authentication required */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/daily-updates" element={<DailyUpdates />} />

        {/* Auth Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Marketplace Routes – wrapped with cart/wishlist providers */}
        <Route path="/marketplace" element={withMarketplaceProviders(MarketplaceHome)} />
        <Route path="/marketplace/categories" element={withMarketplaceProviders(CategoriesPage )} />

        <Route path="/marketplace/category/:slug" element={withMarketplaceProviders(CategoryPage)} />
        <Route path="/marketplace/product/:id" element={withMarketplaceProviders(ProductDetailPage)} />
        <Route path="/marketplace/stores" element={withMarketplaceProviders(StoresPage)} />
        <Route path="/marketplace/store/:id" element={withMarketplaceProviders(StoreDetailPage)} />
        <Route path="/marketplace/try-on-explain" element={withMarketplaceProviders(TryOnExplainPage)} />
        <Route path="/marketplace/search" element={withMarketplaceProviders(SearchResultsPage)} />
        <Route path="/marketplace/mtush" element={withMarketplaceProviders(MtushPage)} />
        <Route path="/checkout" element={withMarketplaceProviders(CheckoutPage)} />



        {/* Farmers Routes */}
        <Route path="/farmers" element={withFarmersProviders(FarmersHome)} />
        <Route path="/farmers/category/:slug" element={withFarmersProviders(FarmersCategoryPage)} />
        <Route path="/farmers/farmer/:id" element={withFarmersProviders(FarmerDetailPage)} />
        <Route path="/farmers/product/:id" element={withFarmersProviders(FarmerProductDetailPage)} />
        <Route path="/farmers/livestock" element={withFarmersProviders(LivestockPage)} />
        <Route path="/farmers/livestock/:id" element={withFarmersProviders(LivestockPage)} />
        <Route path="/farmers/livestock/inquire/:id" element={withFarmersProviders(LivestockInquirePage)} />

        {/* Boda Routes */}
        <Route path="/boda" element={withBodaProviders(BodaHome)} />
        <Route path="/boda/pricing" element={withBodaProviders(PricingPage)} />

        {/* Services Routes */}
        <Route path="/services" element={withServicesProviders(ServicesHome)} />
        <Route path="/services/category/:slug" element={withServicesProviders(ServiceCategoryPage)} />
        <Route path="/services/provider/:id" element={withServicesProviders(ServiceProviderPage)} />

        {/* Food Routes */}
        <Route path="/food" element={withFoodProviders(FoodHome)} />
        <Route path="/food/cuisine/:slug" element={withFoodProviders(FoodCategoryPage)} />
        <Route path="/food/restaurant/:id" element={withFoodProviders(RestaurantDetailPage)} />

        {/* Stays Routes */}
        <Route path="/stays" element={withStaysProviders(StaysHome)} />
        <Route path="/stays/category/:slug" element={withStaysProviders(StayCategoryPage)} />
        <Route path="/stays/property/:id" element={withStaysProviders(PropertyDetailPage)} />

        {/* Public info pages */}
        <Route path="/become-seller" element={<BecomeSellerPage />} />
        <Route path="/delivery-program" element={<DeliveryProgramPage />} />
        <Route path="/partnership" element={<PartnerPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Dashboard Routes - Require authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireAuth={true}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="wishlist"
            element={
              <WishlistProvider>
                <WishlistPage />
              </WishlistProvider>
            }
          />
          <Route path="addresses" element={<AddressesPage />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="seller-application" element={<SellerApplicationPage />} />
        </Route>

        {/* Seller Tools - Require seller role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireAuth={true} requiredRole="seller">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductNewPage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="sales/:id" element={<SalesOrderDetailPage />} />
          <Route path="earnings" element={<EarningsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Route>

        {/* Admin Routes - Require admin role */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAuth={true} requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="sellers" element={<SellerApprovals />} />
        </Route>

        {/* Not Found Wildcard */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};