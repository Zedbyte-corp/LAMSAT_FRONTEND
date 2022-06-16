// GoogleMap Component

import React from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { withRouter } from 'react-router-dom';
import Geocode from 'react-geocode';
import {
    StarFilled
  } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import MarkerWhite from 'assets/img/pin-primary.png'
import MarkerYellow from 'assets/img/pin-secondary.png'
import MarkerRed from 'assets/img/pin-third.png'
import InfoWindowEx from './infowindow';
import "./../../assets/css/style.scss";
import NO_IMAGE from "./../../assets/img/no-image.png";

import { getLocalData, getLocaleMessages, checkValid } from 'redux/helper';

class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            isChangePage: false,
            siteData: {},
            userProperties: {
                location: {
                    lat: this.props.latitude ? this.props.latitude : 23.8859,
                    lng: this.props.longitude ? this.props.longitude : 45.0792
                }
            },
            selectedAddress: null,
            title: null,
            id: null,
            photopath: null,
            review_count: null,
            ratingavg: null,
            ratingcount: null,
            favourite: null,
            featured: null,
            id: null,
            shortdescription: null,
            vendorname: null,
            categoryname: null,
            hotelStatusClassName: null,
            hotelstatus: null
        };
        //this.mapClick = this.mapClick.bind(this);
        // console.log('this is the value of the lat and lon in the google map',this.props.latitude, this.props.latitude)
    }
    componentDidMount() {
        console.log('This is the value of the data int he mapp',this.props.getLocations);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.getLocations) {
            this.props.getLocations && this.props.getLocations.length > 0 && this.props.getLocations.map((site) => {

                console.log("Google map data: " + site.location);
                if (site.location) {
                    var nameArr = site.location && site.location.split(',');

                    const data = {
                        location: {
                            lat: parseFloat(nameArr[0]),
                            lng: parseFloat(nameArr[1])
                        }
                    }

                    if (nameArr) {
                        this.setState({
                            userProperties: data
                        })
                    }
                }
            })
        }
    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            this.setState(prevState => ({
                currentLatLng: {
                    ...prevState.currentLatLng,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                },
                isMarkerShown: true
            }))
        });
    }

    onMarkerClick = (props, marker, e) => {
        if(!this.state.showingInfoWindow) {
            console.log('marker',marker);
            Geocode.setApiKey("AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro");
            Geocode.setLanguage("en");
            Geocode.enableDebug();
            var hotelstatus='';
            var hotelStatusClassName='';
            if (marker.data.status === 1) {
                // hotelstatus = getLocaleMessages("Open");
                hotelstatus = "Open";
                hotelStatusClassName = 'green-bg'
            } else {
                // hotelstatus = getLocaleMessages("Closed");
                hotelstatus = "Closed";
                hotelStatusClassName = 'red-bg'
            }
            console.log('----marker data',marker.data)
            this.setState({
                selectedAddress: '',
                title: marker.data.vendorname,
                id: marker.data.id,
                photopath: marker.data.image_url ?  marker.data.image_url : ( marker.data.images.length ? marker.data.images[0].image_url : NO_IMAGE),
                review_count: marker.data.review_count,
                ratingavg: marker.data.ratingavg,
                ratingcount: marker.data.ratingcount,
                hotelStatusClassName: hotelStatusClassName,
                hotelstatus: hotelstatus,
                categoryname: marker.categoryname,
                vendorname: marker.data.vendorname,
                shortdescription: marker.data.shortdescription,
                featured: marker.data.isfeatured ? marker.data.isfeatured : 0 
            })

            let address='';
            Geocode.fromLatLng(props.position.lat,props.position.lng).then(
                response => {
                    address = response.results[0].formatted_address;
                    this.setState({ selectedAddress: address, title: marker.data.vendorname });
                    // this.setState({ selectedAddress: address, title: marker.data.vendorname });
                    // this.setState({ selectedAddress: marker.data.address, title: marker.data.vendorname });
                    if (address) {
                        //   PublishRfqActions.getLocation(address);
                    }
                },
                error => {
                    console.error(error);
                }
            );

            this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
                // siteData: props.data
            });
        }
    }

    onMapClicked = (ref, map, ev) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                selectedPlace: ref,
                activeMarker: map,
                showingInfoWindow: false,
                // activeMarker: null
            })
        }

        const location = ev.latLng
        this.setState(prev => ({
            userProperties: {
                ...prev.userProperties,
                location
            }
        }))

        map.panTo(location);
    };

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    // onClickFav = (ev, hotelId, favourite) => {

    //     ev.preventDefault();
    //     ev.stopPropagation();
    //     if (checkValid()) {
    //         if(getLocalData('usertypeid') === 2){
    //             const data = {
    //                 "hotelid": hotelId,
    //                 "favourite": favourite === '1' ? 0 : 1,
    //                 "userid": getLocalData('id'),
    //             }
    //             store.dispatch({
    //                 type: LayoutsActions.ADD_FAV,
    //                 payload: data
    //             })
    //         } else {
    //             swal({
    //                 title:  getLocaleMessages(`Please Logout ${getLocalData('usertypeid') === 1 ? 'Admin': 'Vendor'}`),
    //                 text: getLocaleMessages("User only allowed"),
    //                 icon: "warning"
    //             });
    //         }
    //     } else {
    //         swal({
    //             title: getLocaleMessages("Please Login"),
    //             text: getLocaleMessages("After Login only, you can add this hotel to your favourite"),
    //             icon: "warning"
    //         });
    //     }
    // }
    mapClick = (id) => {
        localStorage.setItem('saloonId', parseInt(id));
        this.props.history.push(`/details/${id}`);
    }

    render() {

        return (
            <div className="custom-map">
                <Map
                    key={`google-map-marker`}
                    google={this.props.google}
                    zoom={8}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: this.state.userProperties.location.lat,
                        lng: this.state.userProperties.location.lng
                    }}
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* {
                        this.state.userProperties.location ?
                            <Marker
                                key={`sitemap-marker`}
                                position={this.state.userProperties.location}
                            /> : null
                    } */}

                    {this.props.getLocations &&
                        this.props.getLocations.length > 0 &&
                        this.props.getLocations.map((site, id) => {
                            
                            console.log("Google maps mm: " + JSON.stringify(site));
                            let url = null;
                            let location = null;

                            if (site && parseInt(site.status) === 1) {
                                url = MarkerRed;
                            } else if (site && parseInt(site.status) === 2) {
                                url = MarkerYellow;
                            } /* else {
                                url = MarkerWhite;
                            } */

                            if (site.latitude && site.longitude) {
    
                                location = {
                                    lat: parseFloat(site.latitude),
                                    lng: parseFloat(site.longitude)
                                }

                                return (
                                    <Marker
                                        key={`sitemap-marker-${id}`}
                                        //onClick={this.onMarkerClick}
                                        onMouseover={this.onMarkerClick}
                                        onMouseout={this.onClose}
                                        name={site.vendorname}
                                        icon={{
                                            url:url,
                                            scaledSize:  new this.props.google.maps.Size(20,30)
                                        }}
                                        position={{ lat: location.lat, lng: location.lng }}
                                        data={site}
                                    />
                                );
                            }
                            return null;
                        })}

                    <InfoWindowEx
                        marker={this.state.activeMarker}
                        onOpen={this.windowHasOpened}
                        onClose={this.onClose}
                        visible={this.state.showingInfoWindow}>
                        {/* <div>
                            <p>{this.state.title ? this.state.title : null}</p>
                            <p>{this.state.selectedAddress ? this.state.selectedAddress : ''}</p>
                        </div> */}
                        <div className="listing-2" onClick={() => this.mapClick(this.state.id)}>
                            <div className="img-content" key={this.state.id}>
                                <img className="img" src={this.state.photopath} />
                            </div>
                            <div className="listing-2-content">
                                <p className="title">{this.state.vendorname}</p>
                                    <div className="hotel-details">  
                                    <p className="list-location"><i className="las la-map-marker-alt icons"></i>{this.state.address}</p>
                                <p>{this.state.shortdescription}</p>
                                <p className="list-location">{this.state.categoryname}</p>
                                {(this.state.ratingavg && this.state.ratingcount) ?
                                     (<div className="rating">
                                        <div>
                                       {this.state.ratingcount && this.state.ratingcount > 0 ? (
                                         <>
                                           <span className="rt">
                                             <p className="rating">
                                               <StarFilled />
                                               {parseFloat(
                                                 this.state.ratingavg
                                               ).toFixed(1)}
                                               {"  "}
                                               {"  "}
                                               <b>
                                                 {this.state.ratingavg >= 4
                                                   ? "Good"
                                                   : null}{" "}
                                               </b>
                                               {this.state.ratingcount} Ratings
                                             </p>
                                           </span>
                                         </>
                                       ) : (
                                         <>
                                           <span className="rt">
                                             <p className="rating">
                                               <StarFilled />
                                               {0} Ratings
                                             </p>
                                           </span>
                                         </>
                                       )}
                                     </div>
                                     {
                                        this.state.featured ? (<div className="featured">Featured</div>) : null
                                     }
                                     
                                   </div>) : (<div className="rating">No reviews</div>)
                                }
                                </div>
                                <div className="d-flex-1" onClick={this.props.onDetailOpen}>
                                    <span className={this.state.hotelStatusClassName} ><i className="las la-door-open" /> {this.state.hotelstatus}</span>
                                </div>
                            </div>
                        </div>
                    </InfoWindowEx>
                </Map>
            </div>
        );
    }
}

GoogleMap.propTypes = {
    mapLocation: PropTypes.string,
    getLocations: PropTypes.array,
}

export default withRouter(GoogleApiWrapper(
    (props) => ({
        apiKey: 'AIzaSyD2fIwEEQ7r4n9OSVvOBMblCVCxfz23aro',
        language: props.language,
    }
    ))(GoogleMap));
