// Ví dụ trong một file sử dụng các thành phần từ AdminPage
import {
  AddCoupon,
  AddBlog,
  AddBlogCat,
  AddBrand,
  AddCategory,
  AddColor,
  AddProduct,
  BlogList,
  BlogCatList,
  BrandList,
  CategoryList,
  ColorList,
  CouponList,
  Customers,
  Dashboard,
  Enquiries,
  Orders,
  ProductList,
  ViewEnq,
  ViewOrder
} from "../pages/AdminPage";

import BlogDetail from "../pages/BlogDetail";
import BlogPage from "../pages/BlogPage";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";
import CompareProductPage from "../pages/CompareProductPage";
import ContactPage from "../pages/ContactPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OurStore from "../pages/OurStorePage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import ProductDetail from "../pages/ProductDetail";
import RefundPolicyPage from "../pages/RefundPolicyPage";
import RegisterPage from "../pages/RegisterPage";
import ResetPassword from "../pages/ResetPasswordPage";
import ShippingPolicyPage from "../pages/ShippingPolicyPage";
import TermAndConditionsPage from "../pages/TermsandConditionsPage";
import WishlistPage from "../pages/WishListPage";

const privateRouter = [
  { path: "", component: Dashboard },
  { path: "enquiries", component: Enquiries },
  { path: "orders", component: Orders },
  { path: "orders/:id", component: ViewOrder },
  { path: "blog", component: AddBlog },
  { path: "blog-category", component: AddBlogCat },
  { path: "category", component: AddCategory },
  { path: "color", component: AddColor },
  { path: "brand", component: AddBrand },
  { path: "product", component: AddProduct },
  { path: "coupon", component: AddCoupon },
  { path: "blog-category/:id", component: AddBlogCat },
  { path: "category/:id", component: AddCategory },
  { path: "color/:id", component: AddColor },
  { path: "brand/:id", component: AddBrand },
  { path: "product/:id", component: AddProduct },
  { path: "coupon/:id", component: AddCoupon },
  { path: "blog/:id", component: AddBlog },
  { path: "customers", component: Customers },
  { path: "list-blog", component: BlogList },
  { path: "list-color", component: ColorList },
  { path: "list-category", component: CategoryList },
  { path: "list-brand", component: BrandList },
  { path: "list-product", component: ProductList },
  { path: "list-coupon", component: CouponList },
  { path: "enquiries/:id", component: ViewEnq },
  { path: "blog-category-list", component: BlogCatList },
  { path: "blog-category-l", component: BlogCatList, layout: null }
];

/*
 * Public Route
 */
const publicRoute = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/upload", component: RegisterPage, layout: null },
  { path: "/product", component: OurStore },
  { path: "/blogs", component: BlogPage },
  { path: "/blog/:id", component: BlogDetail },
  { path: "/contact", component: ContactPage },
  { path: "/compare", component: CompareProductPage },
  { path: "/wishlist", component: WishlistPage },
  { path: "/cart", component: CartPage },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword },
  { path: "/privacy-policy", component: PrivacyPolicyPage },
  { path: "/refund-policy", component: RefundPolicyPage },
  { path: "/shipping-policy", component: ShippingPolicyPage },
  { path: "/terms-conditions", component: TermAndConditionsPage },
  { path: "/product/:id", component: ProductDetail },
  { path: "/checkout", component: Checkout }
];

export { privateRouter, publicRoute };
