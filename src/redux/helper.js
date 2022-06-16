import { IntlProvider } from "react-intl";
import { store } from "redux/store";
import DetailPageAction from "redux/Details/actions";
import { defaultMessages } from "i18n/I18nProvider";
import authAction from "redux/auth/actions";

const dataReturnValue = {
  string: "",
  array: [],
  object: {},
  nullKey: null,
};

export function getLocaleMessages({ id, localeLanguage }) {
  let locale = localeLanguage || store.getState().Auth.subLang;
  const { getAppLanguageList } = store.getState().Auth;
  let newMessages = {};
  let allMessages = { ...defaultMessages };
  if (!defaultMessages[locale]) {
    newMessages = getLocalizationMessage(getAppLanguageList, locale);
  }
  if (Object.keys(newMessages).length > 0) {
    allMessages = { ...allMessages, ...newMessages };
  }
  if (!allMessages[locale]) {
    locale = "en";
  }
  const { intl } = new IntlProvider(
    { locale, messages: allMessages[locale] },
    {}
  ).state;
  let messages = intl.formatMessage({ id });
  return messages;
}

export function checkValid() {
  return localStorage.getItem("user_data");
}

export function getLocalData(key) {
  console.log(
    "this is the value of the key passed in the api",
    checkValid() != undefined
  );
  return checkValid()
    ? JSON.parse(localStorage.getItem("user_data"))[key]
    : undefined;
}

export function getLocalDataType() {
  return localStorage.getItem("login_type");
}

export function storeValue({
  key = "",
  reducerName = "",
  returnValue = "string",
}) {
  if (store && key && reducerName) {
    return store.getState()[`${reducerName}`] &&
      store.getState()[`${reducerName}`][`${key}`]
      ? store.getState()[`${reducerName}`][`${key}`]
      : dataReturnValue[`${returnValue}`];
  }
  return dataReturnValue[`${returnValue}`];
}

export function setCategoryAndServices(servicesArray, categoryArray) {
  let newServicesArray = servicesArray;
  let newCategoryArray = categoryArray;
  if (newServicesArray.length === 0) {
    newServicesArray = storeValue({
      key: "detailServices",
      reducerName: "DetailPage",
      returnValue: "array",
    });
  }
  if (newCategoryArray.length === 0) {
    newCategoryArray = storeValue({
      key: "detailCategory",
      reducerName: "DetailPage",
      returnValue: "array",
    });
  }
  if (newServicesArray.length > 0 && newCategoryArray.length > 0) {
    let newCategoryArrayList = [];
    newCategoryArray.map((categoryArrayList) => {
      let servicesList = [];
      newServicesArray.map((servicesArrayList) => {
        if (servicesArrayList.categoryid === categoryArrayList.id) {
          servicesList.push(servicesArrayList);
        }
        return servicesArrayList;
      });
      if (servicesList.length) {
        newCategoryArrayList.push({
          ...categoryArrayList,
          servicesListDetail: servicesList,
        });
      }
      return categoryArrayList;
    });
    store.dispatch({
      type: DetailPageAction.SET_NEW_CATEGORY_SERVICE_DATA,
      payload: newCategoryArrayList,
    });
    store.dispatch({
      type: DetailPageAction.SET_NEW_CATEGORY_SERVICE_LOADER,
      payload: false,
    });
  } else {
    store.dispatch({
      type: DetailPageAction.SET_NEW_CATEGORY_SERVICE_DATA,
      payload: [],
    });
    store.dispatch({
      type: DetailPageAction.SET_NEW_CATEGORY_SERVICE_LOADER,
      payload: false,
    });
  }
}

export function getLocalizationMessage(getAppLanguageList, locale) {
  let allMessages = {};
  if (getAppLanguageList.length > 0) {
    getAppLanguageList.filter((listLanguage) => {
      if (!["en", "ar"].includes(listLanguage["languageshortname"])) {
        allMessages[
          `${listLanguage["languageshortname"]}`
        ] = require(`i18n/messages/${listLanguage["languageshortname"]}`);
      }
      return listLanguage;
    });
  }
  return allMessages;
}

export function jwtTokenAdd({ token, user_data, type }) {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("user_data", user_data);
  localStorage.setItem("login_type", type);
}

export function adminVendorLanguageChanged() {
  localStorage.removeItem("site_language");
  localStorage.removeItem("site_language_full");
  localStorage.setItem("site_language", "en");
  localStorage.setItem("site_language_full", "english");
  store.dispatch({
    type: authAction.CHANGE_LANGUAGE,
    payload: "en",
  });
  store.dispatch({
    type: authAction.SET_SELECTED_LANGUAGE,
    payload: {},
  });
  store.dispatch({
    type: authAction.GET_APP_LANGUAGE_LIST,
  });
}

export function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate;
}
