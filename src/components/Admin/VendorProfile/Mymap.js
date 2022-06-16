import React, { useState, useEffect } from "react";
import ImageUpload from "components/Shared/ImageUpload";
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  message,
  Space,
  Select,
  InputNumber,
  Checkbox,
} from "antd";
import { getLocalData, getLocaleMessages } from "redux/helper";
import { formProps } from "containers/OnBoarding/constant";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/auth/actions";
import userDetailActions from "redux/UserDetail/actions";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";
import { store } from "redux/store";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useGoogleMaps } from "react-hook-google-maps";
import GoogleMapReact, { geocoder } from "google-map-react";

// based on https://developers.google.com/maps/documentation/javascript/adding-a-google-map

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = (props) => {
  const { latitude, longitude, getLatLng } = props;
  let marker = null;

  const center = {
    lat: latitude,
    lng: longitude,
  };
  const zoom = 9;

  useEffect(() => {
    if (marker !== null) {
      marker.setPosition({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude]);

  const loadMap = (map, maps) => {
    console.log("map_values", map, maps, marker);
    marker = new maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      draggable: true,
    });
    marker.addListener("dragend", (event) => {
      getLatLng(event);
      console.log("event", event);
      console.log({ lat: latitude, lng: longitude });
    });
  };

  const getMapOptions = (maps) => {

    return {
        streetViewControl: false,
        scaleControl: true,
        fullscreenControl: true,
        styles: [{
            featureType: "poi.business",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }],
        gestureHandling: "greedy",
        disableDoubleClickZoom: true,
        minZoom: 5,
        maxZoom: 18,

        mapTypeControl: true,
        mapTypeId: maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: maps.ControlPosition.BOTTOM_CENTER,
            mapTypeIds: [
                maps.MapTypeId.ROADMAP,
                maps.MapTypeId.SATELLITE,
                maps.MapTypeId.HYBRID
            ]
        },

        zoomControl: true,
        clickableIcons: false
    };
}

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "450px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro" }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
        options={getMapOptions}
      ></GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
