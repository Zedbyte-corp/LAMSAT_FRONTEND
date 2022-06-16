import asyncComponent from "helpers/asyncComponent";

const privateRoutes = {
  user: [
    {
      path: "/",
      component: asyncComponent(() => import("containers/Layouts/Home")),
    },
    {
      path: "listing",
      component: asyncComponent(() => import("containers/Layouts/Listing")),
    },
    {
      path: "details/:saloonid",
      component: asyncComponent(() => import("containers/Layouts/Detail")),
    },
    {
      path: "map",
      component: asyncComponent(() => import("containers/Layouts/FullMap")),
    },
    {
      path: "services/:saloonid",
      component: asyncComponent(() => import("containers/Layouts/Services")),
    },
    {
      path: "staff",
      component: asyncComponent(() => import("containers/Layouts/Staff")),
    },
    {
      path: "time",
      component: asyncComponent(() => import("containers/Layouts/Time")),
    },
    {
      path: "checkout/:saloonid",
      component: asyncComponent(() => import("containers/Layouts/Checkout")),
    },
    {
      path: "confirmation",
      component: asyncComponent(() =>
        import("containers/Layouts/Confirmation")
      ),
    },
    {
      path: "edit-profile",
      component: asyncComponent(() => import("containers/Layouts/EditProfile")),
    },
    {
      path: "change-password",
      component: asyncComponent(() =>
        import("containers/Layouts/ChangePassword")
      ),
    },
    {
      path: "address-book",
      component: asyncComponent(() => import("containers/Layouts/AddressBook")),
    },
    {
      path: "bookings",
      component: asyncComponent(() => import("containers/Layouts/Bookings")),
    },
    {
      path: "rate-reviews",
      component: asyncComponent(() => import("containers/Layouts/RateReviews")),
    },
    {
      path: "favourites",
      component: asyncComponent(() => import("containers/Layouts/Favourites")),
    },
    {
      path: "user-dashboard",
      component: asyncComponent(() => import("containers/Layouts/Dashboard")),
    },
    {
      path: "terms-and-condition",
      component: asyncComponent(() => import("containers/Layouts/Terms")),
    },
    {
      path: "cmspage/:cmsid",
      component: asyncComponent(() => import("containers/Layouts/Cmspage")),
    },
    {
      path: "faq",
      component: asyncComponent(() => import("containers/Layouts/FAQ")),
    },
    {
      path: "become-partner",
      component: asyncComponent(() =>
        import("containers/Layouts/become-partner")
      ),
    },
    //sss
    {
      path: "partner-register",
      component: asyncComponent(() =>
        import("containers/Layouts/become-partner")
      ),
    },
    {
      path: "bookingdetails/:bookingid",
      component: asyncComponent(() =>
        import("containers/Layouts/Bookingdetails")
      ),
    },
    //
    //   {
    //   path: 'dashboard',
    //   component: asyncComponent(() => import('containers/Admin/DashBoard/AdminDashboard')),
    // },
    // {
    //   path: 'listing',
    //   component: asyncComponent(() => import('containers/Admin/Listing/AdminListing')),
    // },
    // {
    //   path: 'listing-help',
    //   component: asyncComponent(() => import('containers/Admin/HelpListing/HelpListing')),
    // },
    {
      path: "*",
      component: asyncComponent(() => import("containers/Pages/NotFound")),
    },
  ],
  admin: [
    //    component: asyncComponent(() => import('components/Admin/VendorProfile/AdminVendorProfile')),
    {
      path: "AdminVendorProfile",
      component: asyncComponent(() =>
        import("containers/Admin/DashBoard/AdminDashboard")
      ),
    },
    {
      path: "dashboard",
      component: asyncComponent(() =>
        import("containers/Admin/DashBoard/AdminDashboard")
      ),
    },
    {
      path: "AppConfiguration",
      component: asyncComponent(() =>
        import(
          "components/Admin/ApplicationConfigiration/ApplicationConfigiration"
        )
      ),
    },
    {
      path: "SocialMedia",
      component: asyncComponent(() =>
        import("components/Admin/SocialMedia/SocialMedia")
      ),
    },
    {
      path: "Smtp",
      //component: asyncComponent(() => import('containers/Admin/SMTP/Smtp')),
      component: asyncComponent(() => import("components/Admin/SMTP/Smtp")),
    },
    {
      path: "sms",
      component: asyncComponent(() => import("components/Admin/SMS/Sms")),
    },
    {
      path: "PushNotification",
      component: asyncComponent(() =>
        import("containers/Admin/PushNotification/PushNotification")
      ),
    },
    // {
    //   path: 'ProfileUpdate',
    //   component: asyncComponent(() => import('containers/Admin/ProfileUpdation/ProfileUpdate')),
    // },
    {
      path: "VoucherManagement",
      component: asyncComponent(() =>
        import("containers/Admin/VoucherManagement/VoucherManagement")
      ),
    },
    {
      path: "VoucherManagement/update",
      component: asyncComponent(() =>
        import("containers/Admin/VoucherManagement/UpdateVoucher")
      ),
    },
    {
      path: "vendorManagement",
      component: asyncComponent(() =>
        import("containers/Admin/VendorManagement/vendorManagement")
      ),
    },
    {
      path: "Services",
      component: asyncComponent(() =>
        import("containers/Admin/ServiceManagement/Services/ServiceManagement")
      ),
    },
    //aa
    {
      path: "Timeslot",
      component: asyncComponent(() => import("components/Admin/Timeslot/Time")),
      //component: asyncComponent(() => import('containers/Admin/ServiceManagement/Services/ServiceManagement')),
    },
    {
      path: "Category",
      component: asyncComponent(() =>
        import(
          "containers/Admin/ServiceManagement/AdminCategory/CategoryManagement"
        )
      ),
    },
    {
      path: "Category/update",
      component: asyncComponent(() =>
        import(
          "containers/Admin/ServiceManagement/AdminCategory/UpdateCategory"
        )
      ),
    },
    {
      path: "Services/update",
      component: asyncComponent(() =>
        import("containers/Admin/ServiceManagement/Services/UpdateService")
      ),
    },
    {
      path: "servicePackages",
      component: asyncComponent(() =>
        import(
          "containers/Admin/ServiceManagement/ServicePackage/PackageManagement"
        )
      ),
    },
    {
      path: "StafManagement",
      component: asyncComponent(() =>
        import("containers/Admin/StafManagement/StafManagement")
      ),
    },
    {
      path: "StafTime",
      component: asyncComponent(() =>
        import("containers/Admin/StafManagement/StafTime")
      ),
    },
    {
      path: "CreateStafTime",
      component: asyncComponent(() =>
        import("containers/Admin/StafManagement/CreateStafftime")
      ),
    },
    {
      path: "StafManagement/update",
      component: asyncComponent(() =>
        import("containers/Admin/StafManagement/UpdateStaff")
      ),
    },
    {
      path: "enquiryManagement",
      component: asyncComponent(() =>
        import("containers/Admin/EnquiryManagement/EnquiryManagement")
      ),
    },
    {
      path: "partnersapplication",
      component: asyncComponent(() =>
        import("containers/Admin/PartnersManagement/Partnersview")
      ),
    },
    {
      path: "partnersManagement",
      component: asyncComponent(() =>
        import("containers/Admin/PartnersManagement/PartnersManagement")
      ),
    },
    {
      path: "bookingManagement",
      component: asyncComponent(() =>
        import("containers/Admin/BookingManagement/BookingManagement")
      ),
    },
    {
      path: "customer",
      component: asyncComponent(() =>
        import("containers/Admin/Customer/Customer")
      ),
    },
    {
      path: "city",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/City/City")
      ),
    },
    {
      path: "city/update",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/City/UpdateCity")
      ),
    },
    {
      path: "area",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/Area/Area")
      ),
    },
    {
      path: "area/update",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/Area/UpdateArea")
      ),
    },
    {
      path: "RatingAndReview",
      //component: asyncComponent(() => import('containers/Admin/RatingAndReview/RatingAndReview')),
      component: asyncComponent(() =>
        import("components/Admin/Ratings/RatingAndReview")
      ),
    },
    /*{
    path: 'CMS',
    component: asyncComponent(() => import('containers/Admin/PageManagement/Cms')),
  },
  {
    path: 'FAQ',
    component: asyncComponent(() => import('containers/Admin/PageManagement/faq')),
  },*/
    {
      path: "city",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/Country/Country")
      ),
    },
    {
      path: "country",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/Country/Country")
      ),
    },
    {
      path: "country/update",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/Country/UpdateCountry")
      ),
    },
    {
      path: "area",
      component: asyncComponent(() =>
        import("containers/Admin/Addresses/Country/Country")
      ),
    },
    {
      path: "profile",
      component: asyncComponent(() =>
        import("containers/Admin/ProfileUpdation/ProfileUpdate")
      ),
    },
    {
      path: "settings",
      component: asyncComponent(() =>
        import("containers/Admin/Settings/SettingsUpdate")
      ),
    },
    {
      path: "activelog",
      component: asyncComponent(() =>
        import("containers/Admin/ActiveLog/ActiveLog")
      ),
    } /*
  {
    path: 'roles',
    component: asyncComponent(() => import('containers/Admin/Roles/Roles')),
  },*/,
    {
      path: "report",
      component: asyncComponent(() => import("containers/Admin/Report/Report")),
    },
    {
      path: "vendororderreport",
      component: asyncComponent(() =>
        import("containers/Admin/VendorOrderReport/VendorOrderReport")
      ),
    },
    // aa
    {
      path: "vendor",
      component: asyncComponent(() =>
        import("components/Admin/VendorProfile/home")
      ),
    },
    //aaa
    {
      path: "vendor/create",
      component: asyncComponent(() =>
        import("components/Admin/VendorProfile/create")
      ),
    },
    //aaaaa
    {
      path: "vendor/update",
      component: asyncComponent(() =>
        import("components/Admin/VendorProfile/update")
      ),
    },
    // aaaaaaaaa
    {
      path: "commission",
      component: asyncComponent(() =>
        import("containers/Admin/Commission/commision")
      ),
    },
    {
      path: "administrator/create",
      component: asyncComponent(() =>
        import("components/Admin/Administrator/create")
      ),
    },
    {
      path: "administrator/update",
      component: asyncComponent(() =>
        import("components/Admin/Administrator/update")
      ),
    },
    {
      path: "administrator",
      component: asyncComponent(() =>
        import("components/Admin/Administrator/home")
      ),
    },
    {
      path: "roles/create",
      component: asyncComponent(() => import("components/Admin/Roles/create")),
    },
    {
      path: "roles/update",
      component: asyncComponent(() => import("components/Admin/Roles/update")),
    },
    {
      path: "roles",
      component: asyncComponent(() => import("components/Admin/Roles/home")),
    },
    {
      path: "cms/create",
      component: asyncComponent(() => import("components/Admin/Cms/create")),
    },
    {
      path: "cms/update",
      component: asyncComponent(() => import("components/Admin/Cms/update")),
    },
    {
      path: "cms",
      component: asyncComponent(() => import("components/Admin/Cms/home")),
    },
    {
      path: "faq/create",
      component: asyncComponent(() => import("components/Admin/Faq/create")),
    },
    {
      path: "faq/update",
      component: asyncComponent(() => import("components/Admin/Faq/update")),
    },
    {
      path: "faq",
      component: asyncComponent(() => import("components/Admin/Faq/home")),
    },
    {
      path: "cmspage",
      component: asyncComponent(() => import("containers/Layouts/Cmspage")),
    },
    {
      path: "faq1",
      component: asyncComponent(() => import("containers/Layouts/FAQ")),
    },
    {
      path: "Calendar",
      component: asyncComponent(() =>
        import("components/Admin/Calendar/homeday")
      ),
      //aaa
      //component: asyncComponent(() => import('containers/Layouts/FAQ')),
    },
    {
      path: "Notificationview/:id",
      component: asyncComponent(() =>
        import("containers/Admin/Notifications/ViewNotification")
      ),
      //aaa
      //component: asyncComponent(() => import('containers/Layouts/FAQ')),
    },
    {
      path: "*",
      component: asyncComponent(() => import("containers/Pages/NotFound")),
    },
  ],
  vendor: [
    {
      path: "dashboard",
      component: asyncComponent(() =>
        import("containers/Vendor/Dashboard/Dashboard")
      ),
    },
    {
      path: "setup",
      component: asyncComponent(() => import("containers/Vendor/Setup/setup")),
    },
    {
      path: "booking",
      component: asyncComponent(() =>
        import("containers/Vendor/Booking/Bookings")
      ),
    },
    {
      path: "ratings",
      component: asyncComponent(() =>
        import("containers/Vendor/Ratings/Ratings")
      ),
    },
    {
      path: "report",
      component: asyncComponent(() =>
        import("containers/Vendor/VendorOrderReport/VendorOrderReport")
      ),
    },
    {
      path: "Services",
      component: asyncComponent(() =>
        import("containers/Vendor/ServiceManagement/Services/ServiceManagement")
      ),
    },
    {
      path: "customer",
      component: asyncComponent(() =>
        import("containers/Vendor/Customer/Customer")
      ),
    },
    {
      path: "Category",
      component: asyncComponent(() =>
        import(
          "containers/Vendor/ServiceManagement/Category/CategoryManagement"
        )
      ),
    },
    {
      path: "Timeslot",
      component: asyncComponent(() =>
        import("containers/Vendor/Timeslot/Time")
      ),
    },
    {
      path: "Category/update",
      component: asyncComponent(() =>
        import("containers/Vendor/ServiceManagement/Category/UpdateCategory")
      ),
    },
    {
      path: "Services/update",
      component: asyncComponent(() =>
        import("containers/Vendor/ServiceManagement/Services/UpdateService")
      ),
    },
    {
      path: "calendar",
      component: asyncComponent(() =>
        import("containers/Vendor/Calendar/homeday")
      ),
    },
    {
      path: "voucher",
      component: asyncComponent(() =>
        import("containers/Vendor/Voucher/voucher")
      ),
    },
    {
      path: "voucher/update",
      component: asyncComponent(() =>
        import("containers/Vendor/Voucher/UpdateVoucher")
      ),
    },
    {
      path: "clients",
      component: asyncComponent(() =>
        import("containers/Vendor/Clients/clients")
      ),
    },
    {
      path: "staff",
      component: asyncComponent(() => import("containers/Vendor/Staff/staff")),
    },
    // fsdf
    {
      path: "StafTime",
      component: asyncComponent(() =>
        import("containers/Vendor/Staff/StafTime")
      ),
    },
    {
      path: "CreateStafTime",
      component: asyncComponent(() =>
        import("containers/Vendor/Staff/CreateStafftime")
      ),
    },
    {
      path: "staff/update",
      component: asyncComponent(() =>
        import("containers/Vendor/Staff/UpdateStaff")
      ),
    },
    {
      path: "analyticsdashboard",
      component: asyncComponent(() =>
        import("containers/Vendor/Analytics/AnalyticsDashboard")
      ),
    },
    {
      path: "profile",
      //component: asyncComponent(() => import('components/Vendor/VendorProfile/vendorProfile')),
      component: asyncComponent(() =>
        import("components/Vendor/VendorProfile/update")
      ),
    },
    //aa
    {
      path: "ViewNotification/:id",
      //component: asyncComponent(() => import('components/Vendor/VendorProfile/vendorProfile')),
      component: asyncComponent(() =>
        import("containers/Vendor/Notification/ViewNotification")
      ),
    },
    {
      path: "*",
      component: asyncComponent(() => import("containers/Pages/NotFound")),
    },
  ],
  common: [
    {
      path: "/",
      component: asyncComponent(() => import("containers/Layouts/Home")),
    },
    {
      path: "listing",
      component: asyncComponent(() => import("containers/Layouts/Listing")),
    },
    {
      path: "details/:saloonid",
      component: asyncComponent(() => import("containers/Layouts/Detail")),
    },
    {
      path: "staff",
      component: asyncComponent(() => import("containers/Layouts/Staff")),
    },
    {
      path: "time",
      component: asyncComponent(() => import("containers/Layouts/Time")),
    },
    {
      path: "cmspage",
      component: asyncComponent(() => import("containers/Layouts/Cmspage")),
    },

    {
      path: "/partner-register",
      component: asyncComponent(() =>
        import("containers/Layouts/become-partner")
      ),
    },
    {
      path: "*",
      component: asyncComponent(() => import("containers/Pages/NotFound")),
    },
  ],
};

export default privateRoutes;
