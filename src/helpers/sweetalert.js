// SweetAlert Component

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { store } from "redux/store";
import { getLocaleMessages } from "redux/helper";
import serviceActions from "redux/vendor/Services/actions";
import PageContent from "redux/admin/PageContent/actions";
import Administrator from "redux/admin/Administrator/actions";
import Roles from "redux/admin/RolesManagement/actions";
import adminvendorprofile from "redux/admin/adminvendorprofile/actions";
import staffActions from "redux/vendor/Staff/actions";
import addressActions from "redux/admin/address/actions";
import voucherActions from "redux/vendor/Voucher/actions";
import enquiryActions from "redux/admin/enquiryManagement/actions";
import AppSettings from "redux/admin/settings/actions";
import CustomerActions from "redux/admin/customerManagement/actions";
import partnersActions from "redux/admin/partnersManagement/actions";

export default {
  sweetConfirmHandler: function (id, module, action) {
    try {
      var root;
      var action = action;
      switch (module) {
        case "service":
          root = serviceActions;
          break;
        case "address":
          root = addressActions;
          break;
        case "PageContent":
          root = PageContent;
          break;
        case "Administrator":
          root = Administrator;
          break;
        case "Roles":
          root = Roles;
          break;
        case "adminvendorprofile":
          root = adminvendorprofile;
          break;
        case "staff":
          root = staffActions;
          break;
        case "voucher":
          root = voucherActions;
          break;
        case "AppSettings":
          root = AppSettings;
          break;
        case "enquiry":
          root = enquiryActions;
          break;
        case "customer":
          root = CustomerActions;
          break;
        case "activitylog":
          root = Administrator;
          break;
        case "partners":
          root = partnersActions;
          break;
        default:
          break;
      }
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: getLocaleMessages({ id: "Are you sure?" }),
        text: getLocaleMessages({
          id: "Once deleted, you will not be able to recover this data!",
        }),
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: getLocaleMessages({ id: "OK" }),
        cancelButtonText: getLocaleMessages({ id: "Cancel" }),
      }).then((willDelete) => {
        if (willDelete.value) {
          console.log("value og hte delete in the staff");
          store.dispatch({
            type: root[`${action}`],
            id: id,
            // callBackAction: (response) => {
            //   if (response.data.data.code === 200) {
            //     store.dispatch({
            //       type: actions.CALL_LOADER,
            //     });
            //   }
            //   console.log(
            //     "this is the value of the callBack response in the delte staff",
            //     response
            //   );
            // },
          });
        } else {
          return MySwal.fire({
            title: getLocaleMessages({ id: "Safe" }),
            text: getLocaleMessages({ id: "Your data is safe!" }),
            icon: "info",
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (e) {
      return null;
    }
  },
  // sweetLogoutConfirmHandler: function (history) {
  //     try {
  //         const MySwal = withReactContent(Swal);
  //         MySwal.fire({
  //             title: 'Are you sure?',
  //             text: 'Do you want to logout?',
  //             // icon: 'warning',
  //             showCloseButton: true,
  //             showCancelButton: true
  //         }).then((willDelete) => {
  //             if (willDelete.value) {

  //                 // LogoutActions.userLogout(history);

  //                 // return MySwal.fire('', 'Poof! Your data has been deleted!', 'success');
  //             } else {
  //                 // return MySwal.fire('', 'Your data is safe!', 'error');
  //                 return MySwal.fire({
  //                     title: 'Safe',
  //                     text: 'Your data is safe!',
  //                     icon:'info'
  //                 });
  //             }
  //         });
  //     } catch (e) {
  //         return null;
  //     }
  // },
  customConfirmHandler: function (rowData, actions, key) {
    try {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: getLocaleMessages("Are you sure?"),
        text: getLocaleMessages(
          "Once deleted, you will not be able to recover this data!"
        ),
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: getLocaleMessages("OK"),
        cancelButtonText: getLocaleMessages("Cancel"),
      }).then((willDelete) => {
        if (willDelete.value) {
          store.dispatch({
            type: actions[`${key}`],
            payload: rowData,
          });
        } else {
          return MySwal.fire({
            title: getLocaleMessages("Safe"),
            text: getLocaleMessages("Your data is safe!"),
            icon: "info",
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (e) {
      return null;
    }
  },
  customNewsLetterConfirmHandler: function (rowData, actions, key) {
    try {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: getLocaleMessages("Are you sure?"),
        text: getLocaleMessages("This NewsLetter can be send to all subscribe"),
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: getLocaleMessages("OK"),
        cancelButtonText: getLocaleMessages("Cancel"),
      }).then((willDelete) => {
        if (willDelete.value) {
          store.dispatch({
            type: actions[`${key}`],
            payload: rowData,
          });
        }
      });
    } catch (e) {
      return null;
    }
  },
};
