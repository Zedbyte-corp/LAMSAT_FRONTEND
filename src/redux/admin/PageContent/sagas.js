import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import {
  getRequest,
//   patchRequest,
   postRequest,
   putRequest,
   deleteRequest,
} from 'helpers/axiosClient';
import swal from 'sweetalert';
import { getLocalData, getLocaleMessages } from 'redux/helper';
// import { getLocalData } from 'redux/helper';

export function* getLangList(params) {
  try {
      const response = yield call(() => getRequest('public/auth/get_language?status=1'))
      yield put({
          type: actions.GET_LANG_LIST_RESPONSE,
          payload: response.data,
      })
  } catch (error) {
      swal({
          title: getLocaleMessages({ id: "Language Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* getCmsList(params) {
  try {
      yield put({
          type: actions.LOADER_SHOW,
      });
      const response = yield call(() => getRequest('admin/pagemanage/getall'))
      yield put({
          type: actions.GET_CMS_LIST_RESPONSE,
          payload: response.data,
      })
      yield put({
          type: actions.LOADER_SHOW,
      });
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "CMS List Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* getSingleFaqList(params) {
  try {
      yield put({
          type: actions.LOADER_SHOW,
      });
      const response = yield call(() => getRequest('admin/faqmanage/get?id='+params.value))
      yield put({
          type: actions.GET_SINGLE_FAQ_LIST_RESPONSE,
          payload: response.data,
      })
      yield put({
          type: actions.LOADER_SHOW,
      });
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "FAQ List Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* getSingleCmsList(params) {
  try {
      yield put({
          type: actions.LOADER_SHOW,
      });
      const response = yield call(() => getRequest('admin/pagemanage/get?id='+params.value))
      yield put({
          type: actions.GET_SINGLE_CMS_LIST_RESPONSE,
          payload: response.data,
      })
      yield put({
          type: actions.LOADER_SHOW,
      });
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "CMS Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}



export function* getFaqList(params) {
  try {
      yield put({
          type: actions.LOADER_SHOW,
      });
      const response = yield call(() => getRequest('admin/faqmanage/getall'))
      yield put({
          type: actions.GET_FAQ_LIST_RESPONSE,
          payload: response.data,
      })
      yield put({
          type: actions.LOADER_SHOW,
      });
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "FAQ Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* postCms(params) {
  try {
      let response;
      yield put({
          type: actions.LOADER_SHOW,
      });
      if (params && params.form_data_cms && params.form_data_cms.id) {
          response = yield call(() => putRequest('admin/pagemanage/update', params.update_data))

          if (response) {


              swal({
                  title: getLocaleMessages({ id: "CMS Updated" }),
                  text: `${response.data.name}`,
                  icon: "success",
                  button: false,
                  timer: 1500,
              });

          yield put({
            type: actions.CMS_REDIRECT,
        })

          }
      } else {
          response = yield call(() => postRequest('admin/pagemanage/create', params.payload))

          if (response.data) {
              swal({
                  title: getLocaleMessages({ id: "CMS Created" }),
                  text: `${response.data.name}`,
                  icon: "success",
                  button: false,
                  timer: 1500,
              });

          yield put({
            type: actions.CMS_REDIRECT,
        })
          }
      }

      if (response) {
          yield put({
              type: actions.GET_CMS_LIST,
          })
          yield put({
              type: actions.MODAL_SHOW_CMS,
          })
          yield put({
              type: actions.LOADER_SHOW,
          });
      }
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "CMS Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* postFaq(params) {
  try {
      let response;
      yield put({
          type: actions.LOADER_SHOW,
      });
      if (params && params.form_data_faq && params.form_data_faq.id) {
          response = yield call(() => putRequest('admin/faqmanage/update', params.update_data))

          if (response) {
              swal({
                  title: getLocaleMessages({ id: "FAQ Updated" }),
                  text: `${response.data.name}`,
                  icon: "success",
                  button: false,
                  timer: 1500,
              });
          }
      } else {
          response = yield call(() => postRequest('admin/faqmanage/create', params.payload))

         /* if (response.data) {
              swal({
                  title: getLocaleMessages("FAQ Created"),
                  text: `${response.data.name}`,
                  icon: "success",
                  button: false,
                  timer: 1500,
              });
          }*/
      }
      if(response) {
          yield put({
              type: actions.LOADER_SHOW,
          });
      }
    /*  if (response) {
          yield put({
              type: actions.GET_FAQ_LIST,
          })
          yield put({
              type: actions.MODAL_SHOW_FAQ,
          })
      }*/
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title:  getLocaleMessages({ id: "FAQ Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* createFAQ(params) {
  try {
      let response;
      yield put({
          type: actions.LOADER_SHOW,
      });
      response = yield call(() => postRequest('admin/faqmanage/create', params.payload))
      if (response.data) {
          swal({
              title: getLocaleMessages({ id: "FAQ Created" }),
              text: `${response.data.name}`,
              icon: "success",
              button: false,
              timer: 1500,
          });
      }
      if (response) {
          yield put({
              type: actions.GET_FAQ_LIST,
          })
          yield put({
              type: actions.FAQ_REDIRECT,
          })
          yield put({
              type: actions.LOADER_SHOW,
          });
      }
  } catch (error) {
      let newErrorCustomization = '';
      if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
          error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
              newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
              return errorMessage;
          })
      } else {
          newErrorCustomization = error.response && error.response.data && error.response.data.message;
      }
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "FAQ Error" }),
          text: newErrorCustomization,
          icon: "error",
          button: false,
          //timer: 1500,
      });
  }
}


export function* deleteCms(params) {

  try {
      yield put({
          type: actions.LOADER_SHOW,
      });
      yield call(() => deleteRequest(`admin/pagemanage/remove?id=${params.id}`))
      swal({
          title: getLocaleMessages({ id: "Delete CMS" }),
          text: getLocaleMessages({ id: "Delete CMS Successfully" }),
          icon: "success",
          button: false,
          timer: 1500,
      })
      yield put({
          type: actions.GET_CMS_LIST,
      })
      yield put({
          type: actions.LOADER_SHOW,
      });
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "CMS Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}

export function* deleteFAQ(params) {
  try {
      yield put({
          type: actions.LOADER_SHOW,
      });
      const response = yield call(() => deleteRequest(`admin/faqmanage/remove?id=${params.id}`))

      if(response.data.code === 200) {
            swal({
                title: "Delete FAQ",//getLocaleMessages({ id: "Delete FAQ" }),
                text: "Delete FAQ successfully",//getLocaleMessages({ id: "Delete FAQ successfully" }),
                icon: "success",
                button: false,
                timer: 1500,
            })
            yield put({
                type: actions.GET_FAQ_LIST,
            })
            yield put({
                type: actions.LOADER_SHOW,
            });
        }
  } catch (error) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "FAQ Error" }),
          text: `${error.response && error.response.data && error.response.data.message}`,
          icon: "error",
          button: true,
          //timer: 1500,
      });
  }
}


export function* createCMS(params) {
  try {
    if (params) {
      yield put({
          type: actions.LOADER_SHOW,
      });
      const response = yield call(() =>postRequest('admin/pagemanage/create' ,  params.payload))

      if (response.data) {
          swal({
              title:getLocaleMessages({ id: "CMS Created" }),
              text: `${response.data.name}`,
              icon: "success",
              button: false,
              timer: 1500,
          });
          yield put({
              type: actions.CMS_REDIRECT
          })
          yield put({
              type: actions.LOADER_SHOW,
          });
          yield put({
            type: actions.GET_CMS_LIST,
          })
          yield put({
            type: actions.CREATE_CMS_SUCCESS,
          })        
      }
    }
  } catch (error) {
    yield put({
        type: actions.CREATE_CMS_FAILURE,
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
      yield put({
          type: actions.LOADER_SHOW,
      });
    swal({
      title:getLocaleMessages({ id: "CMS Error" }),
     // text: newErrorCustomization,
      icon: "error",
      button: false,
      //timer: 1500,
    });
  }

}


export function* updateCMS(params) {
    try {
      if (params) {
          yield put({
              type: actions.LOADER_SHOW,
          });
          const response = yield call(() =>putRequest('admin/pagemanage/update' ,  params.payload))
          if (response.data) {
              swal({
                  title: getLocaleMessages({ id: "CMS Updated" }),
                  text: `${response.data.name}`,
                  icon: "success",
                  button: false,
                  timer: 1500,
              });

          yield put({
            type: actions.CMS_REDIRECT,
        })

            /*  yield put({
              type: actions.CMS_REDIRECT
              })
              yield put({
                  type: actions.LOADER_SHOW,
              });*/
          }
      }
    } catch (error) {
      let newErrorCustomization = '';
      if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
        error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
          newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
          return errorMessage;
        })
      } else {
        newErrorCustomization = error.response && error.response.data && error.response.data.message;
      }
      yield put({
          type: actions.LOADER_SHOW,
      });
      swal({
          title: getLocaleMessages({ id: "CMS Error" }),
          text: newErrorCustomization,
          icon: "error",
          button: false,
          //timer: 1500,
      });
    }
}

export function* updateFAQ(params) {
  try {
          if (params) {
              yield put({
                  type: actions.LOADER_SHOW,
              });
          const response = yield call(() =>putRequest('admin/faqmanage/update' ,  params.payload))
          if (response.data) {
              swal({
                  title: getLocaleMessages({ id: "FAQ Updated" }),
                  text: `${response.data.name}`,
                  icon: "success",
                  button: false,
                  timer: 1500,
              });

          yield put({
            type: actions.GET_FAQ_LIST,
        })
              yield put({
                  type: actions.FAQ_REDIRECT
              })
              yield put({
                  type: actions.LOADER_SHOW,
              });
          }
      }
  } catch (error) {


      let newErrorCustomization = '';
      if(error.response && error.response.data && error.response.data.name === 'ValidationError'){
          error.response && error.response.data && error.response.data.data && error.response.data.data.map((errorMessage)=>{
              newErrorCustomization =`${newErrorCustomization}${errorMessage['message']}`
              return errorMessage;
          })
      } else {
          newErrorCustomization = error.response && error.response.data && error.response.data.message;
      }
      yield put({
          type: actions.LOADER_SHOW,
      });
          swal({
          title:  getLocaleMessages({ id: "FAQ Error" }),
          text:  newErrorCustomization,
          icon: "error",
          button: false,
          // timer: 1500,
      });
  }
}

export default function* pageContentSaga() {
  yield all([
    takeEvery(actions.GET_CMS_LIST, getCmsList),
    takeEvery(actions.GET_FAQ_LIST, getFaqList),
    takeEvery(actions.POST_CMS, postCms),
    takeEvery(actions.POST_FAQ, postFaq),
    takeEvery(actions.DELETE_CMS, deleteCms),
    takeEvery(actions.DELETE_FAQ, deleteFAQ),
    takeEvery(actions.GET_LANG_LIST, getLangList),
    takeEvery(actions.CREATE_CMS, createCMS),
    takeEvery(actions.GET_SINGLE_CMS, getSingleCmsList),
    takeEvery(actions.UPDATE_CMS, updateCMS),
    takeEvery(actions.CREATE_FAQ, createFAQ),
    takeEvery(actions.UPDATE_FAQ, updateFAQ),
    takeEvery(actions.GET_SINGLE_FAQ, getSingleFaqList),
]);
}
