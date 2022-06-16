import { all } from "redux-saga/effects";
import auth from "redux/auth/sagas";
import adminRatingSagas from "redux/admin/ratingsManagement/sagas";
import AdminVendorProfileSagas from "redux/admin/adminvendorprofile/sagas";
import AdministratorSaga from "redux/admin/Administrator/sagas";
import RolesSaga from "redux/admin/RolesManagement/sagas";
import PageContentSagas from "redux/admin/PageContent/sagas";
import layoutSaga from "redux/Layout/sagas";
import listingLayoutSaga from "redux/ListingLayout/sagas";
import userProfileSagas from "redux/UserDetail/sagas";
import partnerSignupSagas from "redux/PartnerSignup/sagas";
import detailPageSaga from "redux/Details/sagas";
import vendorVoucherSaga from "redux/vendor/Voucher/sagas";
import serviceSaga from "redux/vendor/Services/sagas";
import settingSaga from "redux/Settings/sagas";
import staffSaga from "redux/vendor/Staff/sagas";
import addressSaga from "redux/admin/address/sagas";
import appsettingSaga from "redux/admin/settings/sagas";
import enquirySaga from "redux/admin/enquiryManagement/sagas";
import customerSaga from "redux/admin/customerManagement/sagas";
import bookingSaga from "redux/admin/bookingManagement/sagas";
import dashboardSaga from "redux/admin/Dashboard/sagas";
import AddressBookSaga from "redux/AddressBook/sagas";
import partnersSaga from "redux/admin/partnersManagement/sagas";
import vendorRatingSagas from "redux/vendor/Ratings/sagas";
import TimeslotSagas from "redux/vendor/Timeslot/sagas";
import AdminTimeslotSagas from "redux/admin/Timeslot/sagas";
import CommissionSagas from "redux/admin/Commission/sagas";
import NotificationSagas from "redux/Notifications/sagas";

export default function* rootSaga(getState) {
  yield all([
    auth(),
    adminRatingSagas(),
    layoutSaga(),
    listingLayoutSaga(),
    userProfileSagas(),
    partnerSignupSagas(),
    detailPageSaga(),
    vendorVoucherSaga(),
    AdminVendorProfileSagas(),
    AdministratorSaga(),
    serviceSaga(),
    settingSaga(),
    RolesSaga(),
    PageContentSagas(),
    staffSaga(),
    addressSaga(),
    appsettingSaga(),
    enquirySaga(),
    customerSaga(),
    bookingSaga(),
    dashboardSaga(),
    AddressBookSaga(),
    partnersSaga(),
    vendorRatingSagas(),
    TimeslotSagas(),
    AdminTimeslotSagas(),
    CommissionSagas(),
    NotificationSagas(),
  ]);
}
