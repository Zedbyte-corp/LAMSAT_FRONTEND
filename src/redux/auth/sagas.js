import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "redux/auth/actions";
import {
  deleteRequest,
  postRequest,
  putRequest,
  getRequest,
} from "helpers/axiosClient";
import { history, store } from "redux/store";
import {
  // handleException,
  getLocaleMessages,
  getLocalDataType,
  checkValid,
  getLocalData,
  jwtTokenAdd,
  adminVendorLanguageChanged,
} from "redux/helper";
import { message } from "antd";
import OneSignal from "react-onesignal";
import responsiveObserve from "antd/lib/_util/responsiveObserve";
const lastPath = localStorage.getItem("lastpath");

export function* userAuth(params) {
  try {
    const response = yield call(() =>
      postRequest("public/user/login", { ...params.payload })
    );
    if (response.data.user_data[0].isverifiedemail === 0) {
      message.warning("Please Verify With Email");
    }
    jwtTokenAdd({
      token: response.data.data,
      user_data: JSON.stringify(response.data.user_data[0]),
      type: "user",
    });
    yield put({
      type: actions.AUTHENTICATE_USER_SUCCESS,
    });
    message.success("User Login Successfully");
    if (localStorage.getItem("loginData") !== null) {
      localStorage.removeItem("");
    }
    //props.history.push(lastPath);
    window.location.href = lastPath;
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.AUTHENTICATE_USER_FAILURE });
  }
}

export function* getSaloonDetails(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/website/vendor_get?status=1&id=${params.vendorid}&userid=${params.userid}`
      )
    );

    if (response.data.code == 200) {
      //const saloon = JSON.parse(localStorage.getItem("saloonDetails"));
      localStorage.removeItem("saloonDetails");
      localStorage.removeItem("saloonId");
      localStorage.setItem(
        "saloonDetails",
        JSON.stringify(response.data.data[0])
      );
      localStorage.setItem("saloonId", parseInt(params.vendorid));

      history.push({
        pathname: "/services",
      });
      /*yield put({
        type: actions.GET_VENDORDETAIL_SUCCESS,
        payload: response.data.data,
      });*/
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.GET_APP_LANGUAGE_LIST_FAILURE });
  }
}

export function* getUserBookings(params) {
  try {
    const response = yield call(() =>
      getRequest(`user/userbooking/getall?status=1&&customerid=${params.id}`)
    );
    if (response.data.code == 200) {
      yield put({
        type: actions.GET_USER_BOOKING_LIST_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.GET_APP_LANGUAGE_LIST_FAILURE });
  }
}

export function* getUserBookingsCount(params) {
  try {
    const response = yield call(() =>
      getRequest(`user/userbooking/dashboard?status=1&&id=${params.id}`)
    );
    if (response.data.code == 200) {
      yield put({
        type: actions.GET_USER_BOOKING_LISTCOUNT_SUCCESS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.GET_APP_LANGUAGE_LIST_FAILURE });
  }
}
export function* paymentCheckout(params) {
  // console.log("this is the value of params in the api", params);
  // return;
  try {
    const response = yield call(() =>
      postRequest("common/createtnxkey", {
        customerid: JSON.parse(localStorage.getItem("user_data")).id,
      })
    );
    var transactionKey = response.data.data.transactionkey;
    localStorage.setItem("transactionKey", transactionKey);
    if (response) {
      const responseData = postRequest("common/checkoutinit", {
        ...params.payload,
        transactionkey: transactionKey,
        customeremail: JSON.parse(localStorage.getItem("user_data")).email,
        customerfirstname: JSON.parse(localStorage.getItem("user_data"))
          .firstname,
        customerlastname: JSON.parse(localStorage.getItem("user_data"))
          .lastname,
      });
      if (responseData) {
        responseData.then((res) => {
          localStorage.setItem("checkoutIdd", res.data.data.id);
        });
        console.log("this is the value of responseint he api", responseData);
        params.callBackAction(responseData);
      }
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    // yield put({ type: actions.GET_APP_LANGUAGE_LIST_FAILURE });
  }
}

export function* putUserBookingsCancel(params) {
  try {
    const response = yield call(() =>
      getRequest(`user/userbooking/update?booking_status=3&&id=${params.id}`)
    );
    if (response.data.code == 200) {
      message.success("Booking Canceled successfully!");

      store.dispatch({
        type: actions.GET_USER_BOOKING_LIST,
        id: getLocalData("id"),
      });
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.GET_APP_LANGUAGE_LIST_FAILURE });
  }
}
export function* paymentfinalbooking(params) {
  try {
    const response = yield call(() =>
      postRequest(`common/completepayment`, params.payload)
    );
    if (response) {
      console.log("this is the value of the data completepayment");
      console.log(response);
      params.callBackAction(response);
      // message.success("Booking is Created successfully!");
    }
  } catch (error) {
    message.error(
      "payment failed"
      //error.response && error.response.data && error.response.data.message
    );
  }
}

export function* getUserFavourites(params) {
  try {
    const response = yield call(() =>
      getRequest(`user/user/favhotels?status=1&&userid=${params.id}`)
    );
    if (response) {
      yield put({
        type: actions.GET_USER_FAV_LIST_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.GET_USER_FAV_LIST_FAILURE });
  }
}

export function* createUserAuth(params) {
  try {
    yield call(() => postRequest("public/user/create", { ...params.payload }));
    yield put({
      type: actions.CREATE_AUTHENTICATE_USER_SUCCESS,
      payload: params.payload,
      // type: actions.AUTH_SINGUP_SUCCESS,
    });
    message.success("Please Enter the OTP to sign in");
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.CREATE_AUTHENTICATE_USER_FAILURE });
  }
}

export function* resendOTP(params) {
  try {
    const response = yield call(() =>
      putRequest("public/user/otp_resend", { ...params.payload })
    );

    message.success("OTP Resent");
    yield put({
      type: actions.RESEND_OTP_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    message
      .error
      // error.response && error.response.data && error.response.data.message
      ();
    yield put({ type: actions.RESEND_OTP_FAILURE });
  }
}

export function* verifyOTP(params) {
  try {
    const response = yield call(() =>
      putRequest("public/user/otp_verify", { ...params.payload })
    );

    message.success("OTP Verified");
    yield put({
      type: actions.VERIFY_OTP_SUCCESS,
    });
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    yield put({
      type: actions.AUTHENTICATE_USER,
      payload: loginData,
    });
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.VERIFY_OTP_FAILURE });
  }
}

export function* sendPasswordReset(params) {
  try {
    yield call(() => putRequest("public/user/forgetpassword", params.payload));
    message.success(
      "Reset password email sent successfully. Please check your mail."
    );
    params.callBackAction();
    yield put({ type: actions.SEND_PASSWORD_RESET_LINK_SUCCESS });
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.SEND_PASSWORD_RESET_LINK_FAILURE });
  }
}

export function* logout() {
  try {
    const { isurl } = store.getState().Auth;
    if (isurl === "/" || isurl === "/vendor") {
      yield call(() =>
        deleteRequest(
          `public/logout?authtoken=${localStorage.getItem("jwtToken")}`
        )
      );
    } else if (isurl === "/admin") {
      yield call(() =>
        deleteRequest(
          `public/logout?authtoken=${localStorage.getItem("jwtToken")}`
        )
      );
    }
    let url = "/";
    if (isurl === "/admin") {
      OneSignal.removeExternalUserId();
      message.success("Admin Logout Successfully.");
      url = "/admin/login";
    } else if (isurl === "/vendor") {
      OneSignal.removeExternalUserId();
      message.success("Saloon logout successfully.");
      url = "/vendor/login";
    } else if (isurl === "/") {
      OneSignal.removeExternalUserId();
      message.success("User Logout successfully");
    }
    localStorage.clear();
    window.location.href = url;
  } catch (error) {
    yield put({ type: actions.LOGOUT_USER_FAILURE });
  }
}

export function* sendPasswordResetLinkAdmin(params) {
  try {
    yield call(() =>
      putRequest("public/auth/reset/admin_reset", params.payload)
    );
    message.success("Admin Reset Password link sended.");
    yield put({ type: actions.ADMIN_SEND_PASSWORD_RESET_LINK_SUCCESS });
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.ADMIN_SEND_PASSWORD_RESET_LINK_FAILURE });
  }
}

export function* sendPasswordResetLinkVendor(params) {
  try {
    yield call(() =>
      putRequest("public/vendor/forgetpassword", params.payload)
    );
    message.success("Saloon Reset Password link sended.");
    yield put({ type: actions.VENDOR_SEND_PASSWORD_RESET_LINK_SUCCESS });
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.VENDOR_SEND_PASSWORD_RESET_LINK_FAILURE });
  }
}

export function* adminAuth(params) {
  try {
    const response = yield call(() =>
      postRequest("public/login", { ...params.payload })
    );
    jwtTokenAdd({
      token: response.data.data,
      user_data: JSON.stringify(response.data.user_data[0]),
      type: "admin",
    });
    adminVendorLanguageChanged();
    yield put({
      type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
      payload: response.data.user_data[0],
      getLanguageDetails: getLocalData("language"),
    });
    message.success("Admin Login Successfully");
    OneSignal.setExternalUserId(response.data.user_data[0].adminkey);
    history.push({
      pathname: "/admin",
    });
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.ADMIN_AUTHENTICATE_USER_FAILURE });
  }
}

export function* vendorAuth(params) {
  try {
    const response = yield call(() =>
      postRequest("public/vendor/login", { ...params.payload })
    );
    jwtTokenAdd({
      token: response.data.data,
      user_data: JSON.stringify(response.data.user_data[0]),
      type: "vendor",
    });
    yield put({
      type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
      payload: response.data.user_data[0],
      getLanguageDetails: getLocalData("language"),
    });
    adminVendorLanguageChanged();
    message.success("Saloon Login Successfully");
    history.push({
      pathname: "/vendor/dashboard",
    });
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.VENDOR_AUTHENTICATE_USER_FAILURE });
  }
}

export function* adminProfile(params) {
  try {
    const response = yield call(() =>
      putRequest("admin/administrator/admin_profile", { ...params.payload })
    );
    yield put({
      type: actions.ADMIN_EDIT_PROFILE_SUCCESS,
      // payload: response.data.user_data[0],
    });
    if (response.data.code === 200) {
      message.success("Admin Profile Successfully Updated!");
      var user_data = JSON.parse(localStorage.getItem("user_data"));
      var res = response.data.data[0];
      user_data.firstname = res.firstname;
      user_data.lastname = res.lastname;
      user_data.email = res.email;
      localStorage.setItem("user_data", JSON.stringify(user_data));
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.ADMIN_EDIT_PROFILE_FAILURE });
  }
}

export function* adminPassword(params) {
  try {
    const response = yield call(() =>
      putRequest("admin/auth/changepassword", {
        id: getLocalData("id"),
        ...params.payload,
      })
    );
    yield put({
      type: actions.ADMIN_CHANGE_PASSWORD_SUCCESS,
      // payload: response.data.user_data[0],
    });
    message.success("Admin Password Updated Successfully!");
  } catch (error) {
    //message.error("Something Went Wrong, Please Try Later");
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.ADMIN_CHANGE_PASSWORD_FAILURE });
  }
}

export function* validateAuthToken() {
  try {
    if (
      ![
        "/",
        "/listing",
        "/detail",
        "/terms-of-use",
        "/services",
        "/staff",
        "/time",
        "/checkout",
      ].includes(history.location.pathname) &&
      !history.location.pathname.startsWith("/admin") &&
      !history.location.pathname.startsWith("/vendor")
    ) {
      if (checkValid()) {
        if (getLocalDataType() === "vendor") {
          yield put({
            type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
            getLanguageDetails: getLocalData("language"),
          });
          history.push("/vendor/dashboard");
        } else if (getLocalDataType() === "admin") {
          yield put({
            type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/admin/dashboard");
        } else if (getLocalDataType() === "user") {
          yield put({
            type: actions.AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
        }
      } else {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
      }
    } else if (
      [
        "/",
        "/listing",
        "/detail",
        "/terms-of-use",
        "/services",
        "/staff",
        "/time",
        "/checkout",
      ].includes(history.location.pathname) &&
      !history.location.pathname.startsWith("/admin") &&
      !history.location.pathname.startsWith("/vendor")
    ) {
      if (checkValid()) {
        if (getLocalDataType() === "vendor") {
          yield put({
            type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
            getLanguageDetails: getLocalData("language"),
          });
        } else if (getLocalDataType() === "admin") {
          yield put({
            type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
        } else if (getLocalDataType() === "user") {
          yield put({
            type: actions.AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
        }
      } else {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
      }
    } else if (
      history.location.pathname === "/admin" ||
      history.location.pathname === "/admin/login"
    ) {
      if (checkValid()) {
        if (getLocalDataType() === "admin") {
          yield put({
            type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/admin/dashboard");
        } else if (getLocalDataType() === "vendor") {
          yield put({
            type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
            getLanguageDetails: getLocalData("language"),
          });
          history.push("/vendor/dashboard");
        } else if (getLocalDataType() === "user") {
          yield put({
            type: actions.AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/");
        }
      } else if (!checkValid() && history.location.pathname === "/admin") {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
        history.push({
          pathname: "/admin/login",
        });
      } else {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
      }
    } else if (
      history.location.pathname !== "/admin/login" &&
      history.location.pathname !== "/admin" &&
      history.location.pathname.startsWith("/admin/")
    ) {
      if (checkValid()) {
        if (getLocalDataType() === "admin") {
          yield put({
            type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
        } else if (getLocalDataType() === "vendor") {
          yield put({
            type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
            getLanguageDetails: getLocalData("language"),
          });
          history.push("/vendor/dashboard");
        } else if (getLocalDataType() === "user") {
          yield put({
            type: actions.AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/");
        }
      } else {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
      }
    } else if (
      history.location.pathname === "/vendor" ||
      history.location.pathname === "/vendor/login"
    ) {
      if (checkValid()) {
        if (getLocalDataType() === "vendor") {
          yield put({
            type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
            getLanguageDetails: getLocalData("language"),
          });
          history.push("/vendor/dashboard");
        } else if (getLocalDataType() === "admin") {
          yield put({
            type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/admin/dashboard");
        } else if (getLocalDataType() === "user") {
          yield put({
            type: actions.AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/");
        }
      } else if (!checkValid() && history.location.pathname === "/vendor") {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
        history.push({
          pathname: "/vendor/login",
        });
      } else {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
      }
    } else if (
      history.location.pathname !== "/vendor/login" &&
      history.location.pathname !== "/vendor" &&
      history.location.pathname.startsWith("/vendor/")
    ) {
      if (checkValid()) {
        if (getLocalDataType() === "vendor") {
          yield put({
            type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
            getLanguageDetails: getLocalData("language"),
          });
        } else if (getLocalDataType() === "admin") {
          yield put({
            type: actions.ADMIN_AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/admin/dashboard");
        } else if (getLocalDataType() === "user") {
          yield put({
            type: actions.AUTHENTICATE_USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem("user_data")),
          });
          history.push("/");
        }
      } else {
        yield put({
          type: actions.AUTHENTICATE_USER_FAILURE,
        });
      }
    } else {
      yield put({
        type: actions.AUTHENTICATE_USER_FAILURE,
      });
    }
  } catch (error) {
    yield put({ type: actions.AUTHENTICATE_USER_FAILURE });
  }
}

export function* saloonVendorProfile(params) {
  try {
    const response = yield call(() =>
      putRequest("vendor/vendor/update", { ...params.payload })
    );

    params.callBackAction(true);
    yield put({
      type: actions.VENDOR_EDIT_PROFILE_SUCCESS,
      // payload: response.data.user_data[0],
    });
    message.success("Saloon Profile Updated Successfully");
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.VENDOR_EDIT_PROFILE_FAILURE });
  }
}

export function* imageRemovedVendor(params) {
  try {
    const response = yield call(() =>
      deleteRequest(`admin/adminvendor/imageremove?id=${params.payload}`)
    );
    if (response) {
      message.success("Image deleted Successfully");
    }
    /*let images = getLocalData('images');
    images.filter(image=> image.id !== params.payload);
    let newLocalStorage = JSON.parse(localStorage.getItem('user_data'));
    newLocalStorage['images'] = images;
    localStorage.removeItem('user_data');
    localStorage.setItem('user_data',JSON.stringify(newLocalStorage))*/
    //message.success('Image deleted Successfully')
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    yield put({ type: actions.VENDOR_IMAGE_REMOVED_FAILURE });
  }
}

export function* getAppLanguageList() {
  try {
    const response = yield call(() =>
      getRequest(`public/language/getall?status=1`)
    );

    yield put({
      type: actions.GET_APP_LANGUAGE_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_APP_LANGUAGE_LIST_FAILURE });
  }
}

export function* createPartner(params) {
  try {
    const response = yield call(() =>
      postRequest("public/partneraccount/createnewsalon", { ...params.payload })
    );
    if (response.data.data) {
      yield put({
        type: actions.CREATE_PARTNER_ACCOUNT_RESPONSE,
        payload: response.data.data,
      });
      let loginPayload = {
        username: params.payload.email,
        password: params.payload.password,
      };
      message.success(
        "Partner Signup Successfully, Please wait for Admin Approval"
      );
      params.callBackActionPartner(true);
      try {
        const responseLogin = yield call(() =>
          postRequest("public/vendor/login", loginPayload)
        );
        jwtTokenAdd({
          token: responseLogin.data.data,
          user_data: JSON.stringify(responseLogin.data.user_data[0]),
          type: "vendor",
        });
        yield put({
          type: actions.VENDOR_AUTHENTICATE_USER_SUCCESS,
          payload: response.data.user_data[0],
          getLanguageDetails: getLocalData("language"),
        });
        adminVendorLanguageChanged();
        message.success("Saloon Login Successfully");
        history.push({
          pathname: "/vendor/dashboard",
        });
      } catch (error) {
        // message.error(
        //   error.response && error.response.data && error.response.data.message
        // );
        yield put({ type: actions.VENDOR_AUTHENTICATE_USER_FAILURE });
      }

      // message.success(
      //   "Partner Signup Successfully, Please wait for Admin Approval"
      // );
      //message.success("Please wait for Admin Approval");

      //window.location.reload();
      history.push({
        pathname: "/vendor/login",
      });
    } else {
      message.error(response.data.name);
    }
  } catch (error) {
    message.error(
      error.response && error.response.data && error.response.data.message
    );
    params.callBackActionPartner(true);
    yield put({ type: actions.CREATE_PARTNER_ACCOUNT_FAILURE });
  }
}

export function* validatePartnerDetails(params) {
  try {
    const response = yield call(() =>
      postRequest("public/partneraccount/isemailexist", { ...params.payload })
    );
    yield put({
      type: actions.VALIDATE_PARTNER_EMAIL_SUCCESS,
      payload: response,
    });

    if (response.data) {
      params.callBackAction(response);
    }
  } catch (error) {
    params.callBackAction(error);
    yield put({ type: actions.VALIDATE_PARTNER_EMAIL_FAILURE });
  }
}

export function* verifyMailId(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/user/verifymailid?emailverificationkey=${params.emailverificationkey}`
      )
    );
    yield put({
      type: actions.VERIFY_MAILID_SUCCESS,
      payload: response,
    });

    if (response.data) {
      params.callBackAction(response);
    }
  } catch (error) {
    params.callBackAction(error);
    yield put({ type: actions.VERIFY_MAILID_FAILURE });
  }
}

export function* getSettings(params) {
  try {
    const response = yield call(() => getRequest(`admin/settings/getall`));
    yield put({
      type: actions.GET_SETTINGS_SUCCESS,
      payload: response,
    });

    if (response.data) {
      params.callBackAction(response);
    }
  } catch (error) {
    params.callBackAction(error);
    yield put({ type: actions.GET_SETTINGS_FAILURE });
  }
}

export function* getuserEmailVerification(params) {
  try {
    var url;
    if (params.payload.usertype == "user") {
      url = `public/user/verifymailid?emailverificationkey=${params.payload.id}`;
    } else if (params.payload.usertype == "vendor") {
      url = `public/partner/partnerverifyMailId?emailverificationkey=${params.payload.id}`;
    }
    const response = yield call(() => getRequest(url));

    if (params.callBackAction) {
      params.callBackAction(true);
    }
  } catch (error) {
    if (params.callBackAction) {
      params.callBackAction(false);
    }
  }
}

export function* getResetforgotPassword(params) {
  try {
    var url = `public/user/changeforgetpassword`;
    const response = yield call(() => putRequest(url,params.payload));
    if (params.callBackAction) {
      params.callBackAction(true);
    }
    yield put({ type: actions.RESET_FORGOT_PASSWORD_SUCCESS });
    message.success(response.data.name);
  } catch (error) {
    if (params.callBackAction) {
      params.callBackAction(false);
    }
    yield put({ type: actions.RESET_FORGOT_PASSWORD_FAILURE });
    message.error(error.response.data.message);
  }
}

export function* getVendorResetforgotPassword(params) {
  try {
    var url = `public/vendor/changeforgetpassword`;
    const response = yield call(() => putRequest(url,params.payload));
    if (params.callBackAction) {
      params.callBackAction(true);
    }
    yield put({ type: actions.RESET_FORGOT_PASSWORD_SUCCESS });
    message.success(response.data.name);
  } catch (error) {
    if (params.callBackAction) {
      params.callBackAction(false);
    }
    yield put({ type: actions.RESET_FORGOT_PASSWORD_FAILURE });
    message.error(error.response.data.message);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ADMIN_AUTHENTICATE_USER, adminAuth),
    takeEvery(actions.VENDOR_AUTHENTICATE_USER, vendorAuth),
    takeEvery(actions.AUTHENTICATE_USER, userAuth),
    takeEvery(actions.LOGOUT_USER, logout),
    takeEvery(actions.VALIDATE_AUTH_TOKEN, validateAuthToken),
    takeEvery(
      actions.ADMIN_SEND_PASSWORD_RESET_LINK,
      sendPasswordResetLinkAdmin
    ),
    takeEvery(
      actions.VENDOR_SEND_PASSWORD_RESET_LINK,
      sendPasswordResetLinkVendor
    ),
    takeEvery(actions.ADMIN_EDIT_PROFILE, adminProfile),
    takeEvery(actions.CREATE_PAYMENT_ACCOUNT, paymentCheckout),
    takeEvery(actions.ADMIN_CHANGE_PASSWORD, adminPassword),
    takeEvery(actions.CREATE_AUTHENTICATE_USER, createUserAuth),
    takeEvery(actions.VERIFY_OTP, verifyOTP),
    takeEvery(actions.RESEND_OTP, resendOTP),
    takeEvery(actions.SEND_PASSWORD_RESET_LINK, sendPasswordReset),
    takeEvery(actions.VENDOR_EDIT_PROFILE, saloonVendorProfile),
    takeEvery(actions.VENDOR_IMAGE_REMOVED, imageRemovedVendor),
    takeEvery(actions.GET_APP_LANGUAGE_LIST, getAppLanguageList),
    takeEvery(actions.GET_USER_BOOKING_LIST, getUserBookings),
    takeEvery(actions.GET_USER_FAV_LIST, getUserFavourites),
    takeEvery(actions.CREATE_PARTNER_ACCOUNT, createPartner),
    takeEvery(actions.GET_USER_BOOKING_COUNT, getUserBookingsCount),
    takeEvery(actions.USER_BOOKING_CANCEL, putUserBookingsCancel),
    takeEvery(actions.FINAL_PAYMENT_SUCCESS_CALL, paymentfinalbooking),
    takeEvery(actions.USER_BOOKING_REORDER, getSaloonDetails),
    takeEvery(actions.VALIDATE_PARTNER_EMAIL, validatePartnerDetails),
    takeEvery(actions.VERIFY_MAILID, verifyMailId),
    takeEvery(actions.GET_SETTINGS, getSettings),
    takeEvery(actions.VERIFY_EMAIL, getuserEmailVerification),
    takeEvery(actions.RESET_FORGOT_PASSWORD, getResetforgotPassword),
    takeEvery(actions.RESET_VENDOR_FORGOT_PASSWORD, getVendorResetforgotPassword),
  ]);
}
