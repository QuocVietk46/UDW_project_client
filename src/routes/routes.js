const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/AboutPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/register/RegisterPage.vue'),
  },
  {
    path: '/forgot-password',
    name: 'Forgot-password',
    component: () => import('../pages/ForgotPassword.vue'),
  },
];

export default routes;
