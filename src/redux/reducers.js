import Auth from "redux/auth/reducer";
import App from "redux/app/reducer";
import AdminRating from "redux/admin/ratingsManagement/reducer";
import AdminVendorProfile from "redux/admin/adminvendorprofile/reducer";
import Layouts from "redux/Layout/reducer";
import ListingLayout from "redux/ListingLayout/reducer";
import UserProfile from "redux/UserDetail/reducer";
import PartnerSignup from "redux/PartnerSignup/reducer";
import DetailPage from "redux/Details/reducer";
import VendorVoucher from "redux/vendor/Voucher/reducer";
import Administrator from "redux/admin/Administrator/reducer";
import Roles from "redux/admin/RolesManagement/reducer";
import Services from "redux/vendor/Services/reducers";
import Settings from "redux/Settings/reducers";
import PageContent from "redux/admin/PageContent/reducer";
import Staffs from "redux/vendor/Staff/reducers";
import Address from "redux/admin/address/reducer";
import AppSettings from "redux/admin/settings/reducers";
import Enquiry from "redux/admin/enquiryManagement/reducer";
import Customer from "redux/admin/customerManagement/reducer";
import Booking from "redux/admin/bookingManagement/reducer";
import Dashboard from "redux/admin/Dashboard/reducers";
import AddressBook from "redux/AddressBook/reducer";
import Partners from "redux/admin/partnersManagement/reducer";
import VendorRating from "redux/vendor/Ratings/reducer";
import Timeslot from "redux/vendor/Timeslot/reducers";
import AdminTimeslot from "redux/admin/Timeslot/reducers";
import Commission from "redux/admin/Commission/reducers";
import Category from "redux/vendor/Category/reducers";
import ViewNotification from "redux/Notifications/reducer";

export default {
  Auth,
  App,
  AdminRating,
  Layouts,
  ListingLayout,
  UserProfile,
  PartnerSignup,
  DetailPage,
  VendorVoucher,
  AdminVendorProfile,
  Administrator,
  Services,
  Settings,
  Roles,
  PageContent,
  Staffs,
  Address,
  AppSettings,
  Enquiry,
  Customer,
  Booking,
  Dashboard,
  AddressBook,
  Partners,
  VendorRating,
  Timeslot,
  AdminTimeslot,
  Commission,
  Category,
  ViewNotification,
};
