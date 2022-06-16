import { all, put, call, takeEvery } from "redux-saga/effects";
import actions from "./actions";
import { history, store } from "redux/store";
import swal from "sweetalert";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "helpers/axiosClient";
import { message } from "antd";
import {
  getLocalData,
  getLocaleMessages,
  getLocalDataType,
} from "redux/helper";
import { deleteVendorVoucherdata } from "../Voucher/sagas";
// import { history, store } from 'redux/store';
export function* getCategorydata(params) {
  try {
    //?status=1
    const response = yield call(() => getRequest("public/category/getAll"));
    if (response) {
      yield put({
        type: actions.CATEGORY_LIST_RESPONSE,
        payload: response.data.data,
      });
    }
    if(params.callBackAction){
      params.callBackAction(true);
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}
export function* postCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("admin/category/update", params.payload)
      );

      if (response) {
        params.callBackAction(true);
        message.success(response.data.name);
        yield put({
          type: actions.CALL_CATEGORY_UPDATE_SUCESS,
        });
        yield put({
          type: actions.CALL_LOADER,
        });
      }
    } else {
      response = yield call(() =>
        postRequest("admin/category/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success(response.data.name);
        } else {
          params.callBackAction(false);
        }

        yield put({
          type: actions.CALL_LOADER,
        });
        yield put({
          //type: actions.GET_CATEGORY_LIST,
          type: actions.GET_CATEGORY_LIST_ADMIN,
        });
        yield put({
          type: actions.CALL_CATEGORY_SUCESS,
        });
      }
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    let newErrorCustomization = "";
    if (
      error.response &&
      error.response.data &&
      error.response.data.name === "ValidationError"
    ) {
      error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.map((errorMessage) => {
          newErrorCustomization = `${newErrorCustomization}${errorMessage["message"]}`;
          return errorMessage;
        });
    } else {
      newErrorCustomization =
        error.response && error.response.data && error.response.data.message;
    }
    message.error(newErrorCustomization);
  }
}

export function* deleteCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/category/remove?id=${params.id}`));

    yield put({
      //type: actions.GET_CATEGORY_LIST,
      type: actions.GET_CATEGORY_LIST_ADMIN,
    });
    message.success("Service category has been deleted successfully");
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* deleteServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/service/remove?id=${params.id}`));

    // yield put({
    //   type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST,
    //   vendorid: getLocalData("id"),
    //   languageid: 1,
    // });
    message.success("Service has been deleted successfully");
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}
export function* deleteServicedatalatest(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      deleteRequest(`vendor/vendorservice/delete?id=${params.id}`)
    );

    // yield put({
    //   type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST,
    //   vendorid: getLocalData("id"),
    //   languageid: 1,
    // });
    if (response) {
      message.success("Category and Service has been deleted successfully");
      yield put({
        type: actions.CALL_LOADER,
      });
    }
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* deleteServicedatalatestOnlyService(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      deleteRequest(`admin/service/remove?id=${params.id}`)
    );

    // yield put({
    //   type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST,
    //   vendorid: getLocalData("id"),
    //   languageid: 1,
    // });
    if (response) {
      message.success("Service has been deleted successfully");
      yield put({
        type: actions.CALL_LOADER,
      });
    }
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* getHotelList(params) {
  try {
    const response = yield call(() =>
      getRequest("public/hotel/getAll?status=1")
    );
    yield put({
      type: actions.GET_ADMIN_SERVICE_VENDOR_LIST_RESPONSE,
      payload: response.data,
    });
  } catch (error) {
    swal({
      title: "Hotel List Error",
      text: `${
        error.response && error.response.data && error.response.data.message
      }`,
      icon: "error",
      button: true,
      //timer: 1500,
    });
  }
}
export function* getServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(`public/service/getall?status=1&vendorid=${params.vendorid}`)
    );
    yield put({
      type: actions.GET_SERVICES_LIST_RESPONSE,
      payload: response.data.data,
    });
    params.callBackAction(response);
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    params.callBackAction(error);
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}

export function* getVendordata(params) {
  try {
    const response = yield call(() =>
      getRequest("common/common/saloon_getall?status=1")
    );
    yield put({
      type: actions.GET_VENDOR_LIST_RESPONSE,
      payload: response.data.data,
    });
    if(params.callBackAction){
      params.callBackAction(true);
    }
  } catch (error) {
    message.error(getLocaleMessages({ id: "vendor.list.error" }));
  }
}

export function* getvendorStaffdata(params) {
  try {
    const response = yield call(() =>
      getRequest(`public/adminstaff/getall?vendorid=${params.id}`)
    );
    yield put({
      type: actions.GET_VENDORSTAFF_LIST_RESPONSE,
      payload: response.data.data,
    });
    if (response) {
      params.callBackAction(response);
    }
  } catch (error) {
    // message.error(getLocaleMessages({ id: "staff.list.error" }));
  }
}

export function* getvendorStaffTime(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `?status=1&&vendorid=${params.vendorid}&&staffid=${params.staffid}`
      )
    );
    yield put({
      type: actions.GET_VENDORSTAFFTIME_LIST_RESPONSE,
      payload: response.data.data,
    });
  } catch (error) {
    //  message.error(getLocaleMessages({id:"staff.list.error"}));
  }
}

export function* getCategory(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield put({
      type: actions.STOP_LOOP,
    });
    yield call(() => getRequest(`public/category/get?id=${params.id}`));

    yield put({
      type: actions.CATEGORY_RESPONSE,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

//vendor apis
export function* getVendorCategorydata(params) {
  try {
    const response = yield call(() =>
      getRequest("public/category/getAll?status=1")
    );
    yield put({
      type: actions.VENDOR_CATEGORY_LIST_RESPONSE,
      payload: response.data,
    });
  } catch (error) {
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

//getVendorCategoryServicesdata

export function* getVendorCategoryServicesdata(params) {
  try {
    let paramsLoad = { categoryid: params.categoryid };
    const response = yield call(() =>
      postRequest("vendor/category/getallVendor", paramsLoad)
    );
    yield put({
      type: actions.GET_VAENDOE_CATEGORY_SERVICES_LIST_RES,
      payload: response.data,
    });
  } catch (error) {
    // message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export function* postVendorCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("vendor/category/update", params.payload)
      );

      if (response) {
        params.callBackAction(true);
        message.success(response.data.name);
      }
    } else {
      response = yield call(() =>
        postRequest("vendor/category/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success(response.data.name);
        } else {
          params.callBackAction(false);
        }
        yield put({
          type: actions.GET_VENDOR_CATEGORY_LIST,
        });
      }
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    let newErrorCustomization = "";
    if (
      error.response &&
      error.response.data &&
      error.response.data.name === "ValidationError"
    ) {
      error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.map((errorMessage) => {
          newErrorCustomization = `${newErrorCustomization}${errorMessage["message"]}`;
          return errorMessage;
        });
    } else {
      newErrorCustomization =
        error.response && error.response.data && error.response.data.message;
    }
    message.error(newErrorCustomization);
  }
}

export function* deleteVendorCategorydata(params) {
  try {
    yield call(() => deleteRequest(`admin/category/remove?id=${params.id}`));

    yield put({
      type: actions.GET_CATEGORY_LIST,
    });
    message.success("Service category has been deleted successfully");
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* deleteVendorCreateCategorydata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => deleteRequest(`admin/category/remove?id=${params.id}`));

    yield put({
      type: actions.GET_CATEGORY_LISTDATA_VENDOR,
    });
    message.success("Category has been deleted successfully");
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}
export function* getVendorCategory(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() => getRequest(`public/category/get?id=${params.id}`));

    yield put({
      type: actions.VENDOR_CATEGORY_RESPONSE,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* getVendorServicedata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/vendorservice/getall?status=1")
    );
    yield put({
      type: actions.GET_VENDOR_SERVICES_LIST_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}
export function* postVendorServicesdata(params) {
  try {
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("vendor/vendorservice/update", params.payload)
      );

      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success("Service Updated Successfully!");
        } else {
          params.callBackAction(false);
        }
      }
    } else {
      response = yield call(() =>
        postRequest("vendor/vendorservice/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success("Service Created Successfully!");
        } else {
          params.callBackAction(false);
        }
      }
    }
    if (response) {
      // yield put({
      //   type: actions.GET_SERVICES_LIST,
      //   vendorid: 0,
      // });
      /*  store.dispatch({
                type:actions.GET_VENDOR_SERVICE_LISTDATA,
                vendorid: getLocalData('id')
              });

              yield put({
                  type: actions.GET_SERVICES_LIST,
              })*/
    }
  } catch (error) {
    params.callBackAction(false);
    let newErrorCustomization = "";
    if (
      error.response &&
      error.response.data &&
      error.response.data.name === "ValidationError"
    ) {
      error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.map((errorMessage) => {
          newErrorCustomization = `${newErrorCustomization}${errorMessage["message"]}`;
          return errorMessage;
        });
    } else {
      // newErrorCustomization =
      //   error.response && error.response.data && error.response.data.message;
    }
    // message.error(newErrorCustomization);
  }
  /*try {
        let response;
        yield put({
            type: actions.CALL_LOADER,
        })
        if (params && params.payload && params.payload.id) {
            response = yield call(() => putRequest('vendor/service/update', params.payload))

            if (response.data) {
                if(response.data.code === 200) {
                    params.callBackAction(true);
                    message.success(response.data.name);
                } else {
                    params.callBackAction(false);
                }

                yield put({
                    type: actions.CALL_LOADER,
                })
                yield put({
                    type: actions.GET_VENDOR_SERVICES_LIST
                })
            }
        } else {

            response = yield call(() => postRequest('vendor/vendorservice/create', params.payload))
            if (response.data) {
                if(response.data.code === 200) {
                    params.callBackAction(true);
                    message.success(response.data.name);
                } else {
                    params.callBackAction(false);
                }

                yield put({
                    type: actions.GET_VENDOR_SERVICES_LIST
                })
            }
        }
    } catch (error) {
        yield put({
            type: actions.CALL_LOADER,
        })
        let newErrorCustomization = '';
        if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
            error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
                newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
                return errorMessage;
            })
        } else {
            newErrorCustomization = error.response && error.response.data && error.response.data.message;
        }
        message.error(newErrorCustomization);
    }*/
}

export function* deleteVendorServicedata(params) {

  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    yield call(() =>
      deleteRequest(`vendor/vendorservice/delete?id=${params.id}`)
    );

    // store.dispatch({
    //   type: actions.GET_VENDOR_SERVICE_LISTDATA,
    //   vendorid: getLocalData("id"),
    // });
    if(params.vendorid)
    {
      yield put({
        type: actions.GET_SERVICES_LIST,
        vendorid: params.vendorid,
        callBackAction: (data) => {}
      });
    } else {
      yield put({
        type: actions.GET_SERVICES_LIST,
        vendorid: 0,
        callBackAction: (data) => {}
      });
    }
    if(params.callBackAction)
    {
      params.callBackAction(true)
    }
   
    /*yield put({
            type: actions.GET_VENDOR_SERVICES_LIST,

        })*/
    message.success("Service has been deleted successfully");
    /*yield put({
            type: actions.CALL_LOADER,
        })*/
  } catch (error) {
    if(params.callBackAction)
    {
      params.callBackAction(false)
    }
    message.error(
      `${error.response && error.response.data && error.response.data.message}`
    );
    /*yield put({
            type: actions.CALL_LOADER,
        })*/
  }
}

export function* getVendorServiceListData(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(
        "vendor/vendorservice/getvendorservice?vendorid=" + params.vendorid
      )
    );
    yield put({
      type: actions.GET_VENDOR_SERVICE_LISTDATA_RES,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}

export function* getVendorStaff_Service_List(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(
        "vendor/vendorservice/getVendorStaffService?vendorid=" + params.vendorid
      )
    );
    yield put({
      type: actions.GET_VENDOR_STAFF_SERVICE_RES,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}
export function* getVendorDropdownListData(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest(
        "vendor/vendorservice/get?id=" + params.vendorid
      )
    );
        console.log(response.data.data)
    yield put({
      type: actions.GET_VENDOR_DROPDOWN_LISTDATA_RES,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "service.list.error" }));
  }
}

export function* postVendorCategoryCreateRequestdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    let response;
    if (params && params.payload && params.payload.id) {
      response = yield call(() =>
        putRequest("vendor/category/update", params.payload)
      );

      if (response) {
        params.callBackAction(true);
        message.success(response.data.name);
        yield put({
          type: actions.CALL_LOADER,
        });

        yield put({
          type: actions.GET_CATEGORY_LISTDATA_VENDOR,
        });
      }
    } else {
      response = yield call(() =>
        postRequest("vendor/category/create", params.payload)
      );
      if (response.data) {
        if (response.data.code === 200) {
          params.callBackAction(true);
          message.success(response.data.name);
        } else {
          params.callBackAction(false);
        }

        yield put({
          type: actions.CALL_LOADER,
        });
        yield put({
          type: actions.GET_CATEGORY_LISTDATA_VENDOR,
        });
      }
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    let newErrorCustomization = "";
    if (
      error.response &&
      error.response.data &&
      error.response.data.name === "ValidationError"
    ) {
      error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.map((errorMessage) => {
          newErrorCustomization = `${newErrorCustomization}${errorMessage["message"]}`;
          return errorMessage;
        });
    } else {
      newErrorCustomization =
        error.response && error.response.data && error.response.data.message;
    }
    message.error(newErrorCustomization);
  }
}

export function* getVendorCategoryListdata(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/category/getAll?vendorid=" + params.vendorid)
    );
    yield put({
      type: actions.GET_CATEGORY_LISTDATA_VENDOR_RESPONSE,
      payload: response.data.data,
    });
    yield put({
      type: actions.CALL_LOADER,
    });
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export function* getVendorServiceData(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      getRequest("vendor/vendorservice/getbyid?id=" + params.id)
    );
    if (response) {
      yield put({
        type: actions.CALL_LOADER,
      });
    }
    params.callBackAction(response);
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
  }
}

export function* getVendorCategoryList(params) {
  try {
    const response = yield call(() =>
      getRequest("admin/adminvendor/get?id=" + params.id)
    );
    yield put({
      type: actions.GET_VENDORCATEGORY_LIST_RES,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_VENDORCATEGORY_LIST_FAILUE });
  }
}

export function* getCatServiceByVendor(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `vendor/category/getCatServiceByVendor?languageid=${params.languageid}&&vendorid=${params.vendorid}`
      )
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_FAILURE });
  }
}

export function* getCatServiceByAdmin(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `public/admincategory`
      )
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.GET_CATEGORY_SERVICE_BY_ADMIN_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_CATEGORY_SERVICE_BY_ADMIN_LIST_FAILURE });
  }
}

export function* getCatServiceByVendorLatest(params) {
  //https:api.lamsat.app/api/v1/vendor/category/getCatServiceByVendorId?languageid=1&&vendorid=1
  try {
    const response = yield call(() =>
      getRequest(
        `vendor/category/getCatServiceByVendorId?languageid=${params.languageid}&&vendorid=${params.vendorid}`
      )
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    yield put({ type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_FAILURE });
  }
}

export function* getCatServiceByVendorWithLanguage(params) {
  try {
    const response = yield call(() =>
      getRequest(
        `vendor/category/getCatServiceAllByVendor?vendorid=${params.vendorid}`
      )
    );
    if (response) {
      params.callBackAction(response);
    }
    yield put({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_WITH_LANGUAGET_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    // message.error(error.response)
    // yield put({ type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_FAILURE });
  }
}

export function* putAdminServiceEntry(params) {
  try {
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      putRequest("admin/service/serviceApprovalReject", params)
    );

    if (response) {
      yield put({
        type: actions.GET_SERVICES_LIST,
      });
      message.success("Service has been updated successfully");
      yield put({
        type: actions.CALL_LOADER,
      });
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export function* putAdminCategoryEntry(params) {
  try {
    let args = {
      id: params.id,
      field: params.field,
      vendorid: params.vendorid,
    };
    yield put({
      type: actions.CALL_LOADER,
    });
    const response = yield call(() =>
      putRequest("admin/category/categoryApprovalReject", args)
    );
    if (response) {
      yield put({
        type: actions.GET_CATEGORY_LIST,
      });
      message.success("Category has been updated successfully");
      yield put({
        type: actions.CALL_LOADER,
      });
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export function* getAdminCategory(params) {
  try {
    //?status=1
    const response = yield call(() =>
      getRequest("admin/category/getadmincats")
    );
    if (response) {
      yield put({
        type: actions.CATEGORY_LIST_RESPONSE,
        payload: response.data.data,
      });
    }
  } catch (error) {
    yield put({
      type: actions.CALL_LOADER,
    });
    message.error(getLocaleMessages({ id: "category.list.error" }));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.POST_CATEGORY, postCategorydata),
    //    takeEvery(actions.POST_SERVICES, postServicesdata),
    takeEvery(actions.GET_SERVICES_LIST, getServicedata),
    takeEvery(actions.GET_VENDOR_LIST, getVendordata),
    takeEvery(actions.DELETE_CATEGORY, deleteCategorydata),
    takeEvery(actions.GET_CATEGORY_LIST, getCategorydata),
    takeEvery(actions.GET_CATEGORY, getCategory),
    takeEvery(actions.GET_VENDORSTAFF_LIST, getvendorStaffdata),
    takeEvery(actions.DELETE_SERVICE, deleteServicedata),
    takeEvery(actions.DELETE_SERVICE_LATEST, deleteServicedatalatest),
    takeEvery(
      actions.DELETE_SERVICE_LATEST_UNIQUE_SERVICE,
      deleteServicedatalatestOnlyService
    ),

    takeEvery(actions.POST_VENDOR_CATEGORY, postVendorCategorydata),
    takeEvery(actions.GET_VENDOR_CATEGORY_LIST, getVendorCategorydata),
    takeEvery(actions.DELETE_VENDOR_CATEGORY, deleteVendorCategorydata),

    takeEvery(actions.GET_VENDOR_SERVICES_LIST, getVendorServicedata),
    takeEvery(actions.POST_VENDOR_SERVICES, postVendorServicesdata),
    takeEvery(actions.DELETE_VENDOR_SERVICE, deleteVendorServicedata),
    takeEvery(actions.GET_VENDOR_SERVICE_LISTDATA, getVendorServiceListData),
    takeEvery(actions.GET_VENDOR_STAFF_SERVICE,getVendorStaff_Service_List),
    takeEvery(actions.GET_VENDOR_DROPDOWN_LISTDATA, getVendorDropdownListData),
    takeEvery(
      actions.POST_VENDOR_CREATE_CATEGORY,
      postVendorCategoryCreateRequestdata
    ),
    takeEvery(
      actions.POST_VENDOR_UPDATE_CATEGORY,
      postVendorCategoryCreateRequestdata
    ),
    takeEvery(actions.GET_CATEGORY_LISTDATA_VENDOR, getVendorCategoryListdata),
    takeEvery(actions.GET_VENDOR_BY_ID, getVendorServiceData),
    takeEvery(
      actions.DELETE_VENDORCREATED_CATEGORY,
      deleteVendorCreateCategorydata
    ),
    takeEvery(
      actions.GET_VAENDOE_CATEGORY_SERVICES_LIST,
      getVendorCategoryServicesdata
    ),
    takeEvery(actions.GET_VENDOR_STAFFTIME_LIST, getvendorStaffTime),
    takeEvery(actions.UPDATE_ADMIN_SERVICE_ENTRY, putAdminServiceEntry),
    takeEvery(actions.UPDATE_ADMIN_CATEGORY_ENTRY, putAdminCategoryEntry),
    takeEvery(actions.GET_VENDORCATEGORY_LIST, getVendorCategoryList),
    takeEvery(
      actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST,
      getCatServiceByVendor
    ),
    takeEvery(
      actions.GET_CATEGORY_LIST_ADMIN,
      getCatServiceByAdmin
    ),
    takeEvery(
      actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_LATEST,
      getCatServiceByVendorLatest
    ),
    takeEvery(
      actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_WITH_LANGUAGE,
      getCatServiceByVendorWithLanguage
    ),
    takeEvery(actions.GET_CATEGORY_LIST_ADMIN, getAdminCategory),
  ]);
}
