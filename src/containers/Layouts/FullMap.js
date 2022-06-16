import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Switch,
  Radio,
  Checkbox,
  Button,
  Card,
  Skeleton,
  message,
  Affix,
} from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import "assets/css/listing.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  HeartFilled,
  DownOutlined,
  StarFilled,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ListingLayoutAction from "redux/ListingLayout/actions";
import { history, store } from "redux/store";
import { checkValid, getLocalData, getLocalDataType } from "redux/helper";
import { times } from "lodash";
import actions from "redux/Details/actions";
import { getRandom } from "components/utility/helper";
import GoogleMap from "../../../src/components/Shared/google-map";

const { Content } = Layout;

function onChange(checked) {}

const MapView = (props) => {
  const { showMap } = useSelector((state) => state.DetailPage);
  const [isOpen, SetIsOpen] = useState(false);
  const [getLatitude, setLatitude] = useState(23.880877208);
  const [getLongitude, setLongitude] = useState(45.375830859);
  const [locationLoader, setLocationLoader] = useState(true);
  const [sortbyVal, setSortbyVal] = useState("");
  const [filterbyVal, setFilterbyVal] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const mapData = JSON.parse(localStorage.getItem("map"));
  console.log("this si the value of the localdata in the Full map", mapData);

  const { isLoggedIn } = useSelector((state) => state.Auth);

  const LayoutListing = useSelector((state) => state.ListingLayout);

  const {
    initialListingLoader,
    listingSaloonLoader,
    listingSaloonData,
    categorysaloonDetail,
    locationName,
  } = LayoutListing;

  if (listingSaloonData.length > 0) {
    let list = getRandom(listingSaloonData, 3);

    localStorage.setItem("nearsaloon", JSON.stringify(list));
  }
  const toggleButton = () => {
    SetIsOpen((s) => !s);
  };

  function successLocation(pos) {
    var crd = pos.coords;
    // setLongitude(crd.longitude)
    // setLatitude(crd.latitude)
    setLocationLoader(false);
  }

  function errorLocation() {
    setLatitude(23.880877208);
    setLongitude(45.375830859);
    setLocationLoader(false);
  }
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
    if (!locationLoader) {
      store.dispatch({
        type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
        payload: {
          latitude: getLatitude,
          longitude: getLongitude,
          userid: getLocalData("id"),
        },
        initialLoader: true,
      });
    }
  }, [locationLoader, getLatitude, getLongitude]);

  const shortOnchange = (e) => {
    setSortbyVal(e.target.value);
  };

  const filterOnchange = (e) => {
    if (e.length > 0) {
      if (e.includes("women")) {
        setFilterbyVal("women");
      } else if (e.includes("kids")) {
        setFilterbyVal("kids");
      }
      if (e.includes("women") && e.includes("kids")) {
        setFilterbyVal("both");
      }
    }
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
          },
          latitude: getLatitude,
          longitude: getLongitude,
          userid: getLocalData("id"),
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
      type: actions.SHOW_MAP,
    });
  };

  const getByFilter = () => {
    store.dispatch({
      type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
      payload: {
        latitude: getLatitude,
        longitude: getLongitude,
        sortby: sortbyVal,
        service_available: filterbyVal,
      },
      initialLoader: true,
    });
  };

  const checkFilterVal = () => {
    let dis;
    if (filterbyVal || sortbyVal) {
      dis = false;
    } else {
      dis = true;
    }
    return dis;
  };

  return (
    <>
      <Layout className={"on-boarding"}>
        <Content>
          <Button
            onClick={() => {
              props.history.goBack();
            }}
            className="cls-btn"
            shape="circle"
          >
            <span>X</span>
          </Button>
          <div id="wrapper" style={{}}>
            <div id="map" className="maps">
              <GoogleMap
                getLocations={mapData}
                latitude={mapData.length > 0 && mapData[0].latitude}
                longitude={mapData.length > 0 && mapData[0].longitude}
              />
            </div>
          </div>
        </Content>
        <div
          id="over_map"
          style={{
            position: "absolute",
            top: "80%",
            left: "30%",
            zIndex: "99",
          }}
        >
          <Row>
            <Col>
              <Card style={{ width: "500px", borderRadius: "10px" }}>
                <h1>{mapData[0].address}</h1>
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/dir//${mapData[0].address}`}
                >
                  Get Direction
                </a>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default MapView;
