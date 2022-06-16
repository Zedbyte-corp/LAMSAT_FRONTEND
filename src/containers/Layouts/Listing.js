import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Switch,
  Select,
  Radio,
  Checkbox,
  Button,
  Card,
  Skeleton,
  message,
  Empty,
  DatePicker,
  TimePicker,
} from "antd";
import StickyBox from "react-sticky-box";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import moment from "moment";
import "assets/css/listing.scss";
import { useSelector, useDispatch } from "react-redux";
import Geocode from "react-geocode";
import {
  HeartFilled,
  DownOutlined,
  StarFilled,
  HeartOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import ListingLayoutAction from "redux/ListingLayout/actions";
import { history, store } from "redux/store";
import { checkValid, getLocalData, getLocalDataType } from "redux/helper";
import { times } from "lodash";
import actions from "redux/auth/actions";
import mapactions from "redux/Details/actions";
import { getRandom } from "components/utility/helper";
import GoogleMap from "../../../src/components/Shared/google-map";
import NO_IMAGE from "../../assets/img/no-image.png";
const { Content } = Layout;

const { Option } = Select;
const format = "HH:mm";
function onChange(checked) {}

const LoginForm = () => {
  const { showMap } = useSelector((state) => state.DetailPage);
  const [isOpen, SetIsOpen] = useState(false);
  const [getLatitude, setLatitude] = useState(0);
  const [getLongitude, setLongitude] = useState(0);
  const [geoLatitude, setgeoLatitude] = useState(0);
  const [geoLongitude, setgeoLongitude] = useState(0);
  const [locationLoader, setLocationLoader] = useState(true);
  const [sortbyVal, setSortbyVal] = useState("");
  const [filterbyVal, setFilterbyVal] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [mainCheck, setMainCheck] = useState(false);
  const [searchdate, setsearchdate] = useState();
  const [searchtime, setsearchtime] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  const LayoutListing = useSelector((state) => state.ListingLayout);

  const {
    initialListingLoader,
    listingSaloonLoader,
    listingSaloonData,
    categorysaloonDetail,
    locationName,
    latlongData,
  } = LayoutListing;
  const { isLoggedIn, userFavList, initLoader } = useSelector(
    (state) => state.Auth
  );
  console.log("bbbbbb", userFavList);

  console.log("categorysaloonDetail", categorysaloonDetail);

  const [defaultsort, setdefaultsort] = useState("all");
  const [defaultFilter, setdefaultFilter] = useState(3);
  const formatted_address = localStorage.getItem("formatted_address");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState(false);
  const [saloonDataNext, setSaloonDataNext] = useState(0);
  const saloonData = listingSaloonData.slice(
    saloonDataNext,
    saloonDataNext + 6
  );
  const desideNext = () => {
    if (listingSaloonData.length > 6) {
      return setNext(true);
    } else {
      return setNext(false);
    }
  };
  useEffect(() => {
    localStorage.removeItem("formatted_address");
    localStorage.removeItem("cityName");
    setSortbyVal("nearest");
    setFilterbyVal(3);
    desideNext();
  }, []);
  useEffect(() => {
    setResultCount(categorysaloonDetail.length);
  }, [categorysaloonDetail]);
  useEffect(() => {
    setResultCount(listingSaloonData.length);
  }, [listingSaloonData]);

  const userData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    if (userData?.id) {
      store.dispatch({
        type: actions.GET_USER_FAV_LIST,
        id: userData?.id,
      });
    }
  }, [userData?.id]);

  const paginationNext = () => {
    const saloonDataCount = listingSaloonData.length;
    window.scrollTo(0, 0);
    setSaloonDataNext(
      saloonDataCount > saloonDataNext + 6
        ? saloonDataNext + 6
        : saloonDataCount - 1
    );
    setNext(saloonDataCount > saloonDataNext + 7 ? true : false);
    setPrevious(saloonDataCount > saloonDataNext + 6 ? true : true);
  };
  const similarItems = userFavList.map((item) => item);
  console.log("bbbbbb", userFavList);
  const paginationPrevious = () => {
    const saloonDataCount = listingSaloonData.length;
    window.scrollTo(0, 0);
    setSaloonDataNext(
      saloonDataCount > saloonDataNext - 6
        ? saloonDataNext - 6
        : saloonDataCount - 1
    );
    setNext(true);
    setPrevious(saloonDataCount > saloonDataNext + 6 ? false : true);
  };

  if (listingSaloonData.length > 0) {
    let list = getRandom(listingSaloonData, 3);

    localStorage.setItem("nearsaloon", JSON.stringify(list));
  }
  const toggleButton = () => {
    SetIsOpen((s) => !s);
  };

  function successLocation(pos) {
    var crd = pos.coords;
    setLongitude(crd.longitude);
    setLatitude(crd.latitude);
    setgeoLongitude(crd.longitude);
    setgeoLatitude(crd.latitude);
    setLocationLoader(false);
  }

  function errorLocation() {
    setLatitude(0);
    setLongitude(0);
    setgeoLongitude(0);
    setgeoLatitude(0);
    setLocationLoader(false);
  }
  Geocode.setApiKey("AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro");
  Geocode.enableDebug();
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
    if (geoLatitude != 0 && geoLongitude != 0) {
      Geocode.fromLatLng(getLatitude, getLongitude).then(
        (response) => {
          console.log("testresponse-------", response);
          console.error("resultsresults-------", getLatitude, getLongitude);
          localStorage.setItem(
            "formatted_address",
            response.results[0].formatted_address
          );
        },
        (error) => {
          console.error("results-------", error);
          console.error("resultsresults-------", getLatitude, getLongitude);
        }
      );
    }
  }, [geoLatitude, geoLongitude, mainCheck]);

  useEffect(() => {
    if (!locationLoader) {
      // if (filterbyVal == 3 && sortbyVal == "nearest") {
      //   store.dispatch({
      //     type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
      //     payload: {
      //       latitude:
      //         latlongData.length > 0 ? latlongData[0].latitude : getLatitude,
      //       longitude:
      //         latlongData.length > 0 ? latlongData[0].longitude : getLongitude,
      //       userid: getLocalData("id"),
      //       sortby: sortbyVal,
      //       //service_available: filterbyVal,
      //     },
      //     initialLoader: true,
      //   });
      // } else {
      if (locationName) {
        var cityName = localStorage.getItem("cityName");
        store.dispatch({
          type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
          payload: {
            latitude:
              latlongData.length > 0 ? latlongData[0].latitude : getLatitude,
            longitude:
              latlongData.length > 0 ? latlongData[0].longitude : getLongitude,
            userid: getLocalData("id"),
            sortby: sortbyVal,
            service_available: filterbyVal,
            vendorlocation: cityName ? cityName : locationName,
            searchdate: searchdate,
            searchtime: searchtime
          },
          initialLoader: true,
        });
      }
      //}
    }
  }, [
    locationLoader,
    getLatitude,
    getLongitude,
    sortbyVal,
    filterbyVal,
    mainCheck,
    searchdate,
    searchtime
  ]);

  const shortOnchange = (e) => {
    setSortbyVal(e);
    setdefaultsort(e);
  };
  //const filterOnChange = (e) => {};

  const filterOnchange = (e) => {
    setFilterbyVal(e);
    setdefaultFilter(e);
  };

  const onFavouriteChange = ({ favourite, vendorid }) => {
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
          latitude: getLatitude,
          longitude: getLongitude,
          userid: getLocalData("id"),
          callBackAction: (response) => {
            console.log("sssss", response);
            if (response && response.status == 200) {
              setMainCheck(true);
            }
          },
        });
      } else {
        message.warning("User only added favourite");
      }
    } else {
      message.warning("Please Login, after only added favourite");
    }
  };

  const onClickToggle = (ev) => {
    ev.preventDefault();
    store.dispatch({
      type: mapactions.SHOW_MAP,
    });
  };

  const getByFilter = () => {
    store.dispatch({
      type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
      payload: {
        latitude: getLatitude,
        longitude: getLongitude,
        sortby: sortbyVal ? sortbyVal : "",
        service_available: filterbyVal ? filterbyVal : "",
      },
      initialLoader: true,
    });
  };

  const onDateChange = (e) => {
    console.log('eeeeeee',e);
    if(e) {
      setsearchdate(moment(e).format("YYYY-MM-DD"));
      setSortbyVal('date');
    }
  }

  const onTimeChange = (e) => {
    if(e) {
      setsearchtime(moment(e).format("HH:MM"));
      setSortbyVal('date');
    }
  }

  const checkFilterVal = () => {
    let dis;
    if (filterbyVal || sortbyVal) {
      dis = false;
    } else {
      dis = true;
    }
    return dis;
  };
  const userFavListTwo = userFavList.map((item) => item.id);
  console.log(
    "hhhhhh",
    userFavList,
    typeof userFavList,
    listingSaloonData,
    userFavListTwo.includes(6)
  );

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*lising header*/}

          <div
            className={isOpen ? "filter-overlay open" : "filter-overlay"}
            onClick={toggleButton}
          ></div>
          <section className="listing-header">
            <div className="container">
              <Skeleton
                className={"new-listing"}
                loading={initialListingLoader}
                active={true}
                title={null}
                paragraph={{ rows: 1, width: "100%" }}
              >
                <div>
                  {/* <h2>{listingSaloonData.length > 0 ? 'Lamsat in Around me ' + locationName :''}{categorysaloonDetail.length > 0 ? 'Category Details':''} </h2> */}
                  <h2>
                    <span>
                      {categorysaloonDetail.length
                        ? categorysaloonDetail.length
                        : listingSaloonData.length}{" "}
                      Results Found
                    </span>
                    {/*` results in ${locationName}`*/}
                  </h2>

                  {/* <p className="location">
                    {locationName !== "" ? locationName : "Searching..."}
                  </p> */}
                  <p>
                    {formatted_address
                      ? formatted_address
                      : locationName !== ""
                      ? locationName
                      : "Searching..."}
                  </p>
                </div>

                {/*<div
                  className={
                    isOpen ? "filter-container open" : "filter-container"
                  }
                >
                  <h3>Sort By</h3>
                  <Radio.Group onChange={shortOnchange}>
                    <Radio value="nearest">Nearest</Radio>
                    <Radio value="toprated">Top Rated</Radio>
                    <Radio value="lowprice">Lowset Price</Radio>
                    <Radio value="newest">Newest</Radio>
                  </Radio.Group>

                  <h3>Filter By</h3>

                  <Checkbox.Group onChange={filterOnchange}>
                    <Checkbox value="women">Women</Checkbox>
                    <Checkbox value="kids">Women Kids</Checkbox>
                  </Checkbox.Group>

                  <Button disabled={checkFilterVal()} type="primary" className="filter-button" onClick={getByFilter}>
                    Filter
                  </Button>
                </div>*/}
                <div className="d__flex">
                  <div className="selects">
                    <Select
                      placeholder="Sort By"
                      className="filter-shop"
                      optionFilterProp="children"
                      onChange={shortOnchange}
                      defaultValue={defaultsort}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                      // disabled={
                      //   categorysaloonDetail.length === 0 &&
                      //   listingSaloonData.length === 0
                      // }
                    >
                      <Option className="filter" value="all">
                        All
                      </Option>
                      <Option className="filter" value="nearest">
                        Nearest
                      </Option>
                      <Option className="filter" value="toprated">
                        Top Rated
                      </Option>
                      {/* <Option className="filter" value="lowprice">
                        Lowset Price
                      </Option> */}
                      <Option className="filter" value="newest">
                        Newest
                      </Option>
                    </Select>
                  </div>
                  <div className="selects">
                    <DatePicker defaultValue={searchdate && moment(searchdate, 'YYYY-MM-DD')} onChange={(e)=>onDateChange(e)}/>
                  </div>
                  <div className="selects">
                    <TimePicker format={format} defaultValue={searchtime && moment(searchtime, 'HH:mm')} onChange={(e)=>onTimeChange(e)}/>
                  </div>
                  <div className="selects">
                    <Select
                      // disabled={
                      //   categorysaloonDetail.length === 0 &&
                      //   listingSaloonData.length === 0
                      // }
                      placeholder="Filter By"
                      className="filter-shop"
                      optionFilterProp="children"
                      onChange={filterOnchange}
                      defaultValue={defaultFilter}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                    >
                      <Option className="filter" value={3}>
                        All
                      </Option>
                      <Option className="filter" value={1}>
                        Women
                      </Option>
                      <Option className="filter" value={2}>
                        Kids
                      </Option>
                    </Select>
                  </div>
                  <div
                    style={
                      listingSaloonData.length > 0 ||
                      categorysaloonDetail.length > 0
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    className="show-map"
                  >
                    <a
                      href=""
                      className={`show_map${showMap ? " active" : ""}`}
                      onClick={(ev) => onClickToggle(ev)}
                    >
                      {showMap ? "Show List" : "Show Map"}
                    </a>
                  </div>

                  {/* <Button
                      type="text"
                      className="btn-filter"
                      onClick={toggleButton}
                    >
                      Filter <DownOutlined />
                    </Button> */}
                  {/* <div className="switchs">
                      <label>Show Map</label>
                      <Switch onChange={onChange} />
                  </div>*/}
                </div>
              </Skeleton>
            </div>
          </section>
          {/*listing header*/}

          {/* Map Page */}

          {showMap && (
            <section className="map__page_list">
              <div className="container">
                <Row gutter={30}>
                  <Col sm={24} md={8}>
                    <div className="scroll__map">
                      {listingSaloonLoader.length == 0 && initialListingLoader
                        ? times(5, {}).map((key, index) => {
                            return (
                              <Col sm={24} md={24} key={`${key}${index}`}>
                                <Card hoverable>
                                  <Skeleton loading={true} avatar active />
                                </Card>
                              </Col>
                            );
                          })
                        : listingSaloonData.length > 0
                        ? listingSaloonData.map((listingSaloonList, index) => (
                            <div key={index}>
                              <Card
                                hoverable
                                cover={
                                  <Link
                                    onClick={() => {
                                      localStorage.setItem(
                                        "saloonId",
                                        parseInt(listingSaloonList["id"])
                                      );
                                    }}
                                    to={{
                                      pathname: `/details/${listingSaloonList["id"]}`,
                                    }}
                                  >
                                    <img
                                      alt="example"
                                      //src={`${process.env.REACT_APP_IMAGE_URL}${listingSaloonList['photopath']}`}
                                      //src={listingSaloonList.image_url}
                                      src={
                                        listingSaloonList.image_url &&
                                        listingSaloonList.image_url !== ""
                                          ? listingSaloonList.image_url
                                          : listingSaloonList.images &&
                                            listingSaloonList.images.length &&
                                            listingSaloonList.images[0]
                                              .image_url
                                          ? listingSaloonList.images[0]
                                              .image_url
                                          : NO_IMAGE
                                      }
                                    />
                                  </Link>
                                }
                                className="listing-ui-1"
                              >
                                {console.log(
                                  "hhhhhhh",
                                  parseInt(listingSaloonList["id"])
                                )}

                                <Button className="btn-fav">
                                  {checkValid() &&
                                  getLocalDataType() === "user" &&
                                  userFavListTwo &&
                                  userFavListTwo.length > 0 &&
                                  userFavListTwo.includes(
                                    listingSaloonList.id
                                  ) ? (
                                    <HeartFilled
                                      onClick={() =>
                                        onFavouriteChange({
                                          favourite:
                                            listingSaloonList["favourite"] == 1
                                              ? 0
                                              : 1,
                                          vendorid: listingSaloonList["id"],
                                        })
                                      }
                                    />
                                  ) : (
                                    <HeartOutlined
                                      onClick={() =>
                                        onFavouriteChange({
                                          favourite:
                                            listingSaloonList["favourite"] == 1
                                              ? 0
                                              : 1,
                                          vendorid: listingSaloonList["id"],
                                        })
                                      }
                                    />
                                  )}
                                </Button>

                                {/* <Button className="btn-fav">
                                  {checkValid() &&
                                  getLocalDataType() === "user" &&
                                  listingSaloonList["favourite"] > 0 ? (
                                    <HeartFilled
                                      onClick={() =>
                                        onFavouriteChange({
                                          favourite:
                                            listingSaloonList["favourite"] == 1
                                              ? 0
                                              : 1,
                                          vendorid: listingSaloonList["id"],
                                        })
                                      }
                                    />
                                  ) : (
                                    <HeartOutlined
                                      onClick={() =>
                                        onFavouriteChange({
                                          favourite:
                                            listingSaloonList["favourite"] == 1
                                              ? 0
                                              : 1,
                                          vendorid: listingSaloonList["id"],
                                        })
                                      }
                                    />
                                  )}
                                </Button> */}
                                <Link
                                  onClick={() => {
                                    localStorage.setItem(
                                      "saloonId",
                                      parseInt(listingSaloonList["id"])
                                    );
                                  }}
                                  to={{
                                    pathname: `/details/${listingSaloonList["id"]}`,
                                  }}
                                  className="title"
                                >
                                  {listingSaloonList["vendorname"]}
                                </Link>
                                <div className="fea__saloon">
                                  <div className="address">
                                    {listingSaloonList["address"]}
                                  </div>
                                </div>
                                {/* <p className="desc">
                                  Riyadh
                                  <span className="readmore-text">
                                    Read More
                                  </span>
                                  {listingSaloonList['address']}
                                </p> */}
                                {listingSaloonList["ratingavg"] &&
                                listingSaloonList["ratingavg"] > 0 ? (
                                  <p className="rating">
                                    {parseFloat(
                                      listingSaloonList["ratingavg"]
                                    ).toFixed(1)}{" "}
                                    <StarFilled />{" "}
                                    {listingSaloonList["ratingavg"] >= 4
                                      ? "Good"
                                      : null}{" "}
                                    {listingSaloonList["ratingcount"]} Ratings
                                  </p>
                                ) : (
                                  <p className={"rating"}></p>
                                )}
                              </Card>
                            </div>
                          ))
                        : ""}
                      {categorysaloonDetail.length == 0 && initialListingLoader
                        ? times(5, {}).map((key, index) => {
                            return (
                              <Col sm={12} md={8} key={`${key}${index}`}>
                                <Card hoverable>
                                  <Skeleton loading={true} avatar active />
                                </Card>
                              </Col>
                            );
                          })
                        : categorysaloonDetail.length > 0
                        ? categorysaloonDetail.map(
                            (categorySaloonList, index) => (
                              // <Col md={8} key={index}>
                              <div key={index}>
                                <Card
                                  hoverable
                                  cover={
                                    <Link
                                      onClick={() => {
                                        localStorage.setItem(
                                          "saloonId",
                                          parseInt(categorySaloonList["id"])
                                        );
                                      }}
                                      to={{
                                        pathname: `/details/${categorySaloonList["id"]}`,
                                      }}
                                    >
                                      <img
                                        alt="example"
                                        //src={`${process.env.REACT_APP_IMAGE_URL}${categorySaloonList['photopath']}`}
                                        //src={categorySaloonList.image_url}
                                        src={
                                          categorySaloonList.image_url &&
                                          categorySaloonList.image_url !== ""
                                            ? categorySaloonList.image_url
                                            : categorySaloonList.images &&
                                              categorySaloonList.images
                                                .length &&
                                              categorySaloonList.images[0]
                                                .image_url
                                            ? categorySaloonList.images[0]
                                                .image_url
                                            : NO_IMAGE
                                        }
                                      />
                                    </Link>
                                  }
                                  className="listing-ui-1"
                                >
                                  <Button className="btn-fav">
                                    {checkValid() &&
                                    getLocalDataType() === "user" &&
                                    categorySaloonList["favourite"] > 0 ? (
                                      <HeartFilled
                                        onClick={() =>
                                          onFavouriteChange({
                                            favourite:
                                              categorySaloonList["favourite"] ==
                                              1
                                                ? 0
                                                : 1,
                                            vendorid: categorySaloonList["id"],
                                          })
                                        }
                                      />
                                    ) : (
                                      <HeartOutlined
                                        onClick={() =>
                                          onFavouriteChange({
                                            favourite:
                                              categorySaloonList["favourite"] ==
                                              1
                                                ? 0
                                                : 1,
                                            vendorid: categorySaloonList["id"],
                                          })
                                        }
                                      />
                                    )}
                                  </Button>
                                  <Link
                                    onClick={() => {
                                      localStorage.setItem(
                                        "saloonId",
                                        parseInt(categorySaloonList["id"])
                                      );
                                    }}
                                    to={{
                                      pathname: `/details/${categorySaloonList["id"]}`,
                                    }}
                                    className="title"
                                  >
                                    {categorySaloonList["vendorname"]}
                                  </Link>
                                  <div className="fea__saloon">
                                    <div className="address">
                                      {categorySaloonList["address"]}
                                    </div>
                                  </div>
                                  {/* <p className="desc">
                                    {' '}
                                    {categorySaloonList['address']}
                                  </p> */}
                                  {categorySaloonList["ratingavg"] &&
                                  categorySaloonList["ratingavg"] > 0 ? (
                                    <p className="rating">
                                      {categorySaloonList["ratingavg"].toFixed(
                                        1
                                      )}{" "}
                                      <StarFilled />{" "}
                                      {categorySaloonList["ratingavg"] >= 4
                                        ? "Good"
                                        : null}{" "}
                                      {categorySaloonList["ratingcount"]}{" "}
                                      Ratings
                                    </p>
                                  ) : (
                                    <p className={"rating"}></p>
                                  )}
                                </Card>
                                {/* </Col> */}
                              </div>
                            )
                          )
                        : ""}
                      {initialListingLoader ? (
                        <Col>
                          <Empty />
                        </Col>
                      ) : (
                        ""
                      )}{" "}
                    </div>
                  </Col>
                  {listingSaloonData.length ? (
                    <Col md={16}>
                      <StickyBox offsetTop={90} offsetBottom={0}>
                        <div id="map" className="maps">
                          <GoogleMap
                            getLocations={listingSaloonData}
                            latitude={
                              listingSaloonData.length > 2
                                ? listingSaloonData[1].latitude
                                : listingSaloonData[0].latitude
                            }
                            longitude={
                              listingSaloonData.length > 2
                                ? listingSaloonData[1].longitude
                                : listingSaloonData[0].longitude
                            }
                          />
                        </div>
                      </StickyBox>
                    </Col>
                  ) : categorysaloonDetail.length ? (
                    <Col md={16}>
                      <StickyBox offsetTop={90} offsetBottom={0}>
                        <div id="map" className="maps">
                          <GoogleMap
                            getLocations={categorysaloonDetail}
                            latitude={
                              categorysaloonDetail.length > 2
                                ? categorysaloonDetail[1].latitude
                                : categorysaloonDetail[0].latitude
                            }
                            longitude={
                              categorysaloonDetail.length > 2
                                ? categorysaloonDetail[1].longitude
                                : categorysaloonDetail[0].longitude
                            }
                          />
                        </div>
                      </StickyBox>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
            </section>
          )}

          {/* Map Page */}

          {/* Listing Page */}

          {!showMap ? (
            <section className="listing-contents">
              <div className="container">
                <Row gutter={30}>
                  {listingSaloonLoader.length == 0 &&
                  categorysaloonDetail.length == 0 &&
                  initialListingLoader
                    ? times(5, {}).map((key, index) => {
                        return (
                          <Col sm={12} md={8} key={`${key}${index}`}>
                            <Card hoverable>
                              <Skeleton loading={true} avatar active />
                            </Card>
                          </Col>
                        );
                      })
                    : listingSaloonData.length > 0
                    ? listingSaloonData.map((listingSaloonList, index) => (
                        <Col md={8} key={index}>
                          <Card
                            hoverable
                            cover={
                              <Link
                                onClick={() => {
                                  localStorage.setItem(
                                    "saloonId",
                                    parseInt(listingSaloonList["id"])
                                  );
                                }}
                                to={{
                                  pathname: `/details/${listingSaloonList["id"]}`,
                                }}
                              >
                                <img
                                  alt="example"
                                  //src={`${process.env.REACT_APP_IMAGE_URL}${listingSaloonList['photopath']}`}
                                  //src={listingSaloonList.image_url}
                                  src={
                                    listingSaloonList.image_url &&
                                    listingSaloonList.image_url !== ""
                                      ? listingSaloonList.image_url
                                      : listingSaloonList.images &&
                                        listingSaloonList.images.length &&
                                        listingSaloonList.images[0].image_url
                                      ? listingSaloonList.images[0].image_url
                                      : NO_IMAGE
                                  }
                                />
                              </Link>
                            }
                            className="listing-ui-1"
                          >
                            <Button className="btn-fav">
                              {isLoggedIn ? (
                                checkValid() &&
                                getLocalDataType() == "user" &&
                                userFavListTwo &&
                                userFavListTwo.length > 0 &&
                                userFavListTwo.includes(
                                  parseInt(listingSaloonList["id"])
                                ) ? (
                                  <HeartFilled
                                    onClick={() =>
                                      onFavouriteChange({
                                        favourite:
                                          listingSaloonList["favourite"] == 1
                                            ? 1
                                            : 0,
                                        vendorid: listingSaloonList["id"],
                                      })
                                    }
                                  />
                                ) : (
                                  <HeartOutlined
                                    onClick={() =>
                                      onFavouriteChange({
                                        favourite:
                                          listingSaloonList["favourite"] == 1
                                            ? 0
                                            : 1,
                                        vendorid: listingSaloonList["id"],
                                      })
                                    }
                                  />
                                )
                              ) : (
                                <Link to="auth?type=login">
                                  {" "}
                                  <HeartOutlined />{" "}
                                </Link>
                              )}
                            </Button>
                            {/* <Button className="btn-fav">
                              {checkValid() &&
                              getLocalDataType() === "user" &&
                              userFavListTwo &&
                              userFavListTwo.length > 0 &&
                              userFavListTwo.includes(
                                parseInt(listingSaloonList["id"])
                              ) ? (
                                isLoggedIn ? (
                                  <HeartFilled
                                    onClick={() =>
                                      onFavouriteChange({
                                        favourite:
                                          listingSaloonList["favourite"] == 1
                                            ? 1
                                            : 0,
                                        vendorid: listingSaloonList["id"],
                                      })
                                    }
                                  />
                                ) : (
                                  <Link to="auth?type=login">
                                    {" "}
                                    <HeartFilled />{" "}
                                  </Link>
                                )
                              ) : isLoggedIn ? (
                                <HeartOutlined
                                  onClick={() =>
                                    onFavouriteChange({
                                      favourite:
                                        listingSaloonList["favourite"] == 1
                                          ? 0
                                          : 1,
                                      vendorid: listingSaloonList["id"],
                                    })
                                  }
                                />
                              ) : (
                                <Link to="auth?type=login">
                                  {" "}
                                  <HeartOutlined />{" "}
                                </Link>
                              )}
                            </Button> */}
                            {/* <Button className="btn-fav">
                              {checkValid() &&
                              getLocalDataType() === "user" &&
                              listingSaloonList["favourite"] > 0 ? (
                                isLoggedIn ? (
                                  <HeartFilled
                                    onClick={() =>
                                      onFavouriteChange({
                                        favourite:
                                          listingSaloonList["favourite"] == 1
                                            ? 0
                                            : 1,
                                        vendorid: listingSaloonList["id"],
                                      })
                                    }
                                  />
                                ) : (
                                  <Link to="auth?type=login">
                                    {" "}
                                    <HeartFilled />{" "}
                                  </Link>
                                )
                              ) : isLoggedIn ? (
                                <HeartOutlined
                                  onClick={() =>
                                    onFavouriteChange({
                                      favourite:
                                        listingSaloonList["favourite"] == 1
                                          ? 0
                                          : 1,
                                      vendorid: listingSaloonList["id"],
                                    })
                                  }
                                />
                              ) : (
                                <Link to="auth?type=login">
                                  {" "}
                                  <HeartOutlined />{" "}
                                </Link>
                              )}
                            </Button> */}
                            <Link
                              onClick={() => {
                                localStorage.setItem(
                                  "saloonId",
                                  parseInt(listingSaloonList["id"])
                                );
                              }}
                              to={{
                                pathname: `/details/${listingSaloonList["id"]}`,
                              }}
                              className="title"
                            >
                              {listingSaloonList["vendorname"]}
                            </Link>
                            <h3>
                              {/* {" "}
                              {userFavListTwo &&
                              userFavListTwo.length > 0 &&
                              userFavListTwo.includes(
                                parseInt(listingSaloonList["id"])
                              )
                                ? "Yes"
                                : "No"} */}
                            </h3>
                            <div className="fea__saloon">
                              <div className="address">
                                {listingSaloonList["address"]}
                              </div>
                            </div>
                            {/* <p className="desc">
                              {listingSaloonList['address']}
                            </p> */}
                            {listingSaloonList["ratingavg"] &&
                            listingSaloonList["ratingavg"] > 0 ? (
                              <p className="rating">
                                {parseFloat(
                                  listingSaloonList["ratingavg"]
                                ).toFixed(1)}{" "}
                                <StarFilled />{" "}
                                {listingSaloonList["ratingavg"] >= 4
                                  ? "Good"
                                  : null}{" "}
                                {listingSaloonList["ratingcount"]} Ratings
                              </p>
                            ) : (
                              <p className={"rating"}></p>
                            )}
                            {listingSaloonList["isfeatured"] ? <div className="featured">Featured</div> : null }
                          </Card>
                        </Col>
                      ))
                    : ""}

                  {categorysaloonDetail.length == 0 &&
                  listingSaloonLoader.length == 0 &&
                  initialListingLoader ? (
                    times(5, {}).map((key, index) => {
                      return (
                        <Col sm={12} md={8} key={`${key}${index}`}>
                          <Card hoverable>
                            <Skeleton loading={true} avatar active />
                          </Card>
                        </Col>
                      );
                    })
                  ) : categorysaloonDetail.length > 0 ? (
                    categorysaloonDetail.map((categorySaloonList, index) => (
                      <Col md={8} key={index}>
                        <Card
                          hoverable
                          cover={
                            <Link
                              onClick={() => {
                                localStorage.setItem(
                                  "saloonId",
                                  parseInt(categorySaloonList["id"])
                                );
                              }}
                              to={{
                                pathname: `/details/${categorySaloonList["id"]}`,
                              }}
                            >
                              <img
                                alt="example"
                                //src={`${process.env.REACT_APP_IMAGE_URL}${categorySaloonList['photopath']}`}
                                //src={categorySaloonList.image_url}
                                src={
                                  categorySaloonList.image_url &&
                                  categorySaloonList.image_url !== ""
                                    ? categorySaloonList.image_url
                                    : categorySaloonList.images &&
                                      categorySaloonList.images.length &&
                                      categorySaloonList.images[0].image_url
                                    ? categorySaloonList.images[0].image_url
                                    : NO_IMAGE
                                }
                              />
                            </Link>
                          }
                          className="listing-ui-1"
                        >
                          <Button className="btn-fav">
                            {isLoggedIn ? (
                              checkValid() &&
                              getLocalDataType() == "user" &&
                              userFavListTwo &&
                              userFavListTwo.length > 0 &&
                              userFavListTwo.includes(
                                parseInt(categorySaloonList["id"])
                              ) ? (
                                <HeartFilled
                                  onClick={() =>
                                    onFavouriteChange({
                                      favourite:
                                        categorySaloonList["favourite"] == 1
                                          ? 1
                                          : 0,
                                      vendorid: categorySaloonList["id"],
                                    })
                                  }
                                />
                              ) : (
                                <HeartOutlined
                                  onClick={() =>
                                    onFavouriteChange({
                                      favourite:
                                        categorySaloonList["favourite"] == 1
                                          ? 0
                                          : 1,
                                      vendorid: categorySaloonList["id"],
                                    })
                                  }
                                />
                              )
                            ) : (
                              <Link to="auth?type=login">
                                {" "}
                                <HeartOutlined />{" "}
                              </Link>
                            )}
                          </Button>
                          {/* <Button className="btn-fav">
                            {checkValid() &&
                            getLocalDataType() === "user" &&
                            userFavListTwo &&
                            userFavListTwo.length > 0 &&
                            userFavListTwo.includes(
                              parseInt(categorySaloonList["id"])
                            ) ? (
                              isLoggedIn ? (
                                <HeartFilled
                                  onClick={() =>
                                    onFavouriteChange({
                                      favourite:
                                        categorySaloonList["favourite"] == 1
                                          ? 1
                                          : 0,
                                      vendorid: categorySaloonList["id"],
                                    })
                                  }
                                />
                              ) : (
                                <Link to="auth?type=login">
                                  {" "}
                                  <HeartFilled />{" "}
                                </Link>
                              )
                            ) : isLoggedIn ? (
                              <HeartOutlined
                                onClick={() =>
                                  onFavouriteChange({
                                    favourite:
                                      categorySaloonList["favourite"] == 1
                                        ? 0
                                        : 1,
                                    vendorid: categorySaloonList["id"],
                                  })
                                }
                              />
                            ) : (
                              <Link to="auth?type=login">
                                {" "}
                                <HeartOutlined />{" "}
                              </Link>
                            )}
                          </Button> */}
                          {/* <Button className="btn-fav">
                            {checkValid() &&
                            getLocalDataType() === "user" &&
                            categorySaloonList["favourite"] > 0 ? (
                              <HeartFilled
                                onClick={() =>
                                  onFavouriteChange({
                                    favourite:
                                      categorySaloonList["favourite"] == 1
                                        ? 0
                                        : 1,
                                    vendorid: categorySaloonList["id"],
                                  })
                                }
                              />
                            ) : (
                              <HeartOutlined
                                onClick={() =>
                                  onFavouriteChange({
                                    favourite:
                                      categorySaloonList["favourite"] == 1
                                        ? 0
                                        : 1,
                                    vendorid: categorySaloonList["id"],
                                  })
                                }
                              />
                            )}
                          </Button> */}
                          <Link
                            onClick={() => {
                              localStorage.setItem(
                                "saloonId",
                                parseInt(categorySaloonList["id"])
                              );
                            }}
                            to={{
                              pathname: `/details/${categorySaloonList["id"]}`,
                            }}
                            className="title"
                          >
                            {categorySaloonList["vendorname"]}
                          </Link>
                          <div className="fea__saloon">
                            <div className="address">
                              {categorySaloonList["address"]}
                            </div>
                          </div>
                          {/* <p className="desc">
                            {categorySaloonList['address']}
                          </p> */}

                          {categorySaloonList["ratingavg"] &&
                          categorySaloonList["ratingavg"] > 0 ? (
                            <p className="rating">
                              {categorySaloonList["ratingavg"].toFixed(1)}{" "}
                              <StarFilled />{" "}
                              {categorySaloonList["ratingavg"] >= 4
                                ? "Good"
                                : null}{" "}
                              {categorySaloonList["ratingcount"]} Ratings
                            </p>
                          ) : (
                            <p className={"rating"}></p>
                          )}
                        </Card>
                      </Col>
                    ))
                  ) : !initialListingLoader ? (
                    <Col sm={12} md={8}>
                      {/* <Empty /> */}
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
            </section>
          ) : (
            ""
          )}

          {/* Listing Page */}

          <section
            style={
              listingSaloonData.length > 0 || categorysaloonDetail.length > 0
                ? { display: "block" }
                : { display: "none" }
            }
          >
            {showMap ? (
              ""
            ) : (
              <div className="container next-pteview">
                {previous ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => paginationPrevious()}
                  >
                    <ArrowLeftOutlined /> Previous
                  </button>
                ) : (
                  ""
                )}{" "}
                {next ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => paginationNext()}
                  >
                    Next <ArrowRightOutlined />
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
