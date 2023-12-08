const routes = [
  {
    path: "/",
    component: () => import("../layouts/defaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../pages/HomePage.vue"),
      },
      {
        path: "error_payment",
        name: "ErrorPayment",
        component: () => import("../pages/ErrorPayment.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("../pages/AboutPage.vue"),
      },
      {
        path: "thanks",
        name: "Thanks",
        component: () => import("../pages/ThanksPage.vue"),
      },
      {
        path: "products",
        name: "Products",
        component: () => import("../pages/products/ProductsPage.vue"),
      },
      {
        path: "products/:id",
        name: "Product",
        component: () => import("../pages/products/ProductPage.vue"),
      },
      {
        path: "cart",
        name: "Cart",
        component: () => import("../pages/CartPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "checkout",
        name: "Checkout",
        component: () => import("@/pages/CheckoutPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/order/payment_vnpay_return",
        name: "PaymentReturn",
        component: () => import("@/pages/PaymentReturn.vue"),
      },
      {
        path: "profile",
        component: () => import("@/pages/profilePage.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "ProfileAccount",
            component: () => import("@/pages/profile/ProfileAccount.vue"),
          },
          {
            path: "order",
            name: "ProfileOrder",
            component: () => import("@/pages/profile/ProfileOrder.vue"),
          },
          {
            path: "order_detail/:id",
            name: "OrderDetail",
            component: () => import("@/pages/profile/ProfileOrderDetail.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/register/RegisterPage.vue"),
  },
  {
    path: "/forgot-password",
    name: "Forgot-password",
    component: () => import("../pages/ForgotPassword.vue"),
  },
  {
    path: "/admin",
    component: () => import("../layouts/adminLayout.vue"),
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        name: "DashBoard",
        component: () => import("../pages/admin/DashBoard.vue"),
      },
      {
        path: "orders",
        name: "ManagerOrders",
        component: () => import("../pages/admin/ManagerOrders.vue"),
      },
      {
        path: "products",
        name: "ManagerProducts",
        component: () => import("../pages/admin/ManagerProducts.vue"),
      },
      {
        path: "user",
        name: "ManagerUsers",
        component: () => import("../pages/admin/ManagerUsers.vue"),
      },
      {
        path: "profit",
        name: "ManagerProfit",
        component: () => import("../pages/admin/ManagerProfit.vue"),
      },
    ],
  },
];

export default routes;
