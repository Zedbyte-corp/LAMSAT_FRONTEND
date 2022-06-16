import asyncComponent from "helpers/asyncComponent";

const publicRoutes = [
  {
    path: "/",
    component: asyncComponent(() => import("containers/Layouts/Home")),
  },
  // aa
  {
    path: "/listing",
    component: asyncComponent(() => import("containers/Layouts/Listing")),
  },
  {
    path: "/details/:saloonid",
    component: asyncComponent(() => import("containers/Layouts/Detail")),
  },
  /// aaa
  {
    path: "/map",
    component: asyncComponent(() => import("containers/Layouts/FullMap")),
  },
  {
    path: "/services/:saloonid",
    component: asyncComponent(() => import("containers/Layouts/Services")),
  },
  //dd
  {
    path: "/staff",
    component: asyncComponent(() => import("containers/Layouts/Staff")),
  },
  {
    path: "/time",
    component: asyncComponent(() => import("containers/Layouts/Time")),
  },
  {
    path: "/checkout/:saloonid",
    component: asyncComponent(() => import("containers/Layouts/Checkout")),
  },
  {
    path: "/confirmation",
    component: asyncComponent(() => import("containers/Layouts/Confirmation")),
  },
  {
    path: "/terms-and-condition",
    component: asyncComponent(() => import("containers/Layouts/Terms")),
  },
  {
    path: "/faq",
    component: asyncComponent(() => import("containers/Layouts/FAQ")),
  },
  {
    path: "/signup",
    component: asyncComponent(() => import("containers/Layouts/signup")),
  },
  {
    path: "/forgot-password",
    component: asyncComponent(() =>
      import("containers/Layouts/ForgotPassword")
    ),
  },
  {
    path: "/verify-mail/:emailverificationkey",
    component: asyncComponent(() => import("containers/Layouts/VerifyMail")),
  },
  {
    path: "/resetpassword/:id",
    component: asyncComponent(() => import("containers/Layouts/Resetpassword")),
  },
  {
    path: "/partner/resetpassword/:id",
    component: asyncComponent(() => import("containers/Layouts/VendorResetpassword")),
  },
  {
    path: "/become-partner",
    component: asyncComponent(() =>
      import("containers/Layouts/become-partner")
    ),
  },

  {
    path: "/auth",
    component: asyncComponent(() => import("containers/Layouts/Auth")),
  },

  {
    path: "/login",
    component: asyncComponent(() => import("containers/Layouts/login")),
  },

  {
    path: "/partner-register",
    component: asyncComponent(() =>
      import("containers/Layouts/become-partner")
    ),
  },
  //dddkfjdskf

  {
    path: "/admin/login",
    component: asyncComponent(() => import("containers/Admin/Login/Login")),
  },
  {
    path: "/vendor/login",
    component: asyncComponent(() => import("containers/Admin/Login/Login")),
  },
  {
    path: "/cmspage/:cmsid",
    component: asyncComponent(() => import("containers/Layouts/Cmspage")),
  },
  {
    path: "/bookingdetails/:bookingid",
    component: asyncComponent(() =>
      import("containers/Layouts/Bookingdetails")
    ),
  },
  {
    path: "/emailverification/:id/:usertype",
    component: asyncComponent(() =>
      import("containers/Layouts/EmailVerification")
    ),
  },
  {
    path: "*",
    component: asyncComponent(() => import("containers/Pages/NotFound")),
  },
];

export default publicRoutes;
