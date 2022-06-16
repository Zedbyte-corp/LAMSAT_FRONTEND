import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Modal,
  Button,
  Popconfirm,
  Card,
  Skeleton,
  message,
} from "antd";
import { times } from "lodash";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import "assets/css/myaccount.scss";
import {
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  StarFilled,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ListingLayoutAction from "redux/ListingLayout/actions";
import CommonHeader from "./CommonHeader";
import actions from "redux/auth/actions";
// import actions from "redux/Details/actions";
import { store, history } from "redux/store";
import {
  getLocalData,
  getLocaleMessages,
  getLocalDataType,
  checkValid,
} from "redux/helper";
import NO_IMAGE from "../../assets/img/no-image.png";

const LoginForm = (props) => {
  const { isLoggedIn, userFavList, initLoader } = useSelector(
    (state) => state.Auth
  );
  console.log("fffff", userFavList);
  const [getLatitude, setLatitude] = useState(23.880877208);
  const [getLongitude, setLongitude] = useState(45.375830859);
  const [locationLoader, setLocationLoader] = useState(true);
  const [sortbyVal, setSortbyVal] = useState("");
  const [toggle, settoggle] = useState(true);

  function errorLocation() {
    setLatitude(23.880877208);
    setLongitude(45.375830859);
    setLocationLoader(false);
  }
  function successLocation(pos) {
    var crd = pos.coords;
    setLongitude(crd.longitude);
    setLatitude(crd.latitude);
    setLocationLoader(false);
  }

  useEffect(() => {
    store.dispatch({
      type: actions.GET_USER_FAV_LIST,
      id: getLocalData("id"),
    });
  }, []);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastpath", location.pathname);
    let urlParams = new URLSearchParams(history.location.search);
    if (urlParams.get("categoryid")) {
      store.dispatch({
        type: ListingLayoutAction.GET_CATEGORY_SALOON_DETAILS,
        payload: parseInt(urlParams.get("categoryid")),
        userid: getLocalData("id"),
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.watchPosition(successLocation, errorLocation, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });
    }
  }, []);

  useEffect(() => {
    //if (!locationLoader) {
    store.dispatch({
      type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
      payload: {
        latitude: getLatitude,
        longitude: getLongitude,
        userid: getLocalData("id"),
        sortby: sortbyVal,
      },
      initialLoader: true,
    });
    //}
  }, [locationLoader, getLatitude, getLongitude, sortbyVal]);

  const LayoutListing = useSelector((state) => state.ListingLayout);

  const {
    initialListingLoader,
    listingSaloonLoader,
    listingSaloonData,
    categorysaloonDetail,
    locationName,
  } = LayoutListing;

  userFavList.filter((list) => {
    if (toggle) {
      list.favourite = 1;
    } else {
      list.favourite = 0;
    }
  });

  const { Content } = Layout;
  const dispatch = useDispatch();
  const { saloonDetail } = useSelector((state) => state.DetailPage);
  // ggg
  const onFavouriteChange = ({ favourite, vendorid }) => {
    settoggle(!toggle);
    if (checkValid()) {
      if (getLocalDataType() === "user") {
        dispatch({
          type: ListingLayoutAction.SET_SALOON_FAVOURITE,
          payload: {
            favourite: favourite,
            vendorid: vendorid,
            userid: getLocalData("id"),
            page: "listing",
          },
          userid: getLocalData("id"),
        });

        setTimeout(() => {
          store.dispatch({
            type: actions.GET_USER_FAV_LIST,
            id: getLocalData("id"),
          });
        }, 2000);
      } else {
        message.warning("User only added favourite");
      }
    } else {
      message.warning("Please Login, after only added favourite");
    }
  };

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-1000">
              {/*Profile*/}
              <CommonHeader selectedKey={"fav"} />
              {/*Rate Reviews*/}
              <div className="main-box-account">
                <Row gutter={30}>
                  {userFavList.length == 0 && initLoader ? (
                    times(5, {}).map((key, index) => (
                      <Col sm={12} md={8} key={`${key}${index}`}>
                        <Card hoverable>
                          <Skeleton loading={true} avatar active />
                        </Card>
                      </Col>
                    ))
                  ) : userFavList.length > 0 ? (
                    userFavList.map((favList, index) => (
                      <Col md={8} span={15} key={index}>
                        <Card
                          hoverable
                          cover={
                            <Link
                              onClick={() => {
                                localStorage.setItem(
                                  "saloonId",
                                  parseInt(favList["id"])
                                );
                              }}
                              to={{
                                pathname: `/details/${favList["id"]}`,
                              }}
                            >
                              <img
                                alt="example"
                                //src={favList['image_url']}
                                src={
                                  favList.image_url && favList.image_url !== ""
                                    ? favList.image_url
                                    : favList.images
                                    ? (favList.images[0] ? favList.images[0].image_url : NO_IMAGE)
                                    : NO_IMAGE
                                }
                              />
                            </Link>
                          }
                          className="listing-ui-1"
                        >
                          <Button className="btn-fav">
                            {isLoggedIn &&
                            checkValid() &&
                            getLocalDataType() === "user" &&
                            1 ? (
                              <HeartFilled
                                onClick={() =>
                                  onFavouriteChange({
                                    favourite: 1 ? 0 : 1,
                                    vendorid: favList["id"],
                                  })
                                }
                              />
                            ) : (
                              ""
                            )}
                          </Button>
                          <Link
                            className="title"
                            onClick={() => {
                              localStorage.setItem(
                                "saloonId",
                                parseInt(favList["id"])
                              );
                            }}
                            to={{
                              pathname: `/details/${favList["id"]}`,
                            }}
                          >
                            {favList["vendorname"]}
                          </Link>
                          <p className="desc">{favList["vendordescription"]}</p>
                          {favList["reviews"] &&
                          favList["reviews"]["rating"] > 0 &&
                          favList["reviews"]["count"] > 0 ? (
                            <p className="rating">
                              {favList["reviews"]["rating"].toFixed(1)}{" "}
                              <StarFilled /> ({favList["reviews"]["count"]})
                            </p>
                          ) : (
                            <p className={"rating"}>No Review</p>
                          )}
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col md={24}>
                      <div className="no_saloon">
                        <div>
                          <img
                            src={require("../../assets/img/nosalon.jpg")}
                            alt="no salon"
                          />
                          <h2>No Favourite salon found !</h2>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
              {/*Rate Reviews*/}
            </div>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
