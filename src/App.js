import React, { useEffect, useState } from "react";
import { store, history } from "redux/store";
import PublicRoutes from "router";
import { Provider, useSelector } from "react-redux";
import ErrorBoundary from "containers/Pages/ErrorBoundary";
import I18nProvider from "i18n/I18nProvider";
import { ConfigProvider } from "antd";
import Boot from "boot";
import authAction from "redux/auth/actions";
import IdleTimer from "react-idle-timer";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ConfigProviderComponent />
        <IdleTimerComponent />
      </Provider>
    </ErrorBoundary>
  );
}

const IdleTimerComponent = (props) => {
  const token = localStorage.getItem("jwtToken");
  const login_type = localStorage.getItem("login_type");
  const [isUserLoggedIn, setisUserLoggedIn] = useState(token ? true : false);
  const onIdle = () => {
    if (isUserLoggedIn) {
      if (login_type == "user") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user_data");
        localStorage.removeItem("login_type");
        window.location.href = "/auth?type=login";
      }
      if (login_type == "admin") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user_data");
        localStorage.removeItem("login_type");
        window.location.href = "/admin/login";
      }
      if (login_type == "vendor") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user_data");
        localStorage.removeItem("login_type");
        window.location.href = "/vendor/login";
      }
    }
    console.log("The value id Idle");
  };
  return (
    <>
      <IdleTimer timeout={1 * 900000} onIdle={onIdle}></IdleTimer>
      {/* <IdleTimer timeout={1 * 5000} onIdle={onIdle}></IdleTimer> */}
    </>
  );
};

const ConfigProviderComponent = () => {
  let locale = useSelector(({ Auth }) => Auth.subLang);
  locale = ["/admin/login", "/vendor/login"].includes(history.location.pathname)
    ? "en"
    : locale;

  useEffect(() => {
    if (!localStorage.getItem("lastpath")) {
      localStorage.setItem("lastpath", "/");
    }
    if (!localStorage.getItem("site_language")) {
      localStorage.setItem("site_language", "en");
      localStorage.setItem("site_language_full", "English");
      localStorage.setItem("language_id", 1);
      store.dispatch({
        type: authAction.CHANGE_LANGUAGE,
        payload: "en",
      });
    } else {
      store.dispatch({
        type: authAction.CHANGE_LANGUAGE,
        payload: localStorage.getItem("site_language"),
      });
    }
    store.dispatch({
      type: authAction.GET_APP_LANGUAGE_LIST,
    });
  }, []);

  return (
    <I18nProvider>
      <ConfigProvider direction={locale === "ar" ? "rtl" : "ltr"}>
        <PublicRoutes history={history} />
      </ConfigProvider>
    </I18nProvider>
  );
};

Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
