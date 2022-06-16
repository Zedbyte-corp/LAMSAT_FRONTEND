import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  Layout,
  Row,
  Col,
  Checkbox,
  Button,
  Card,
  Carousel,
  Tabs,
  Skeleton,
  Avatar,
  message,
  Input,
  Rate,
  Modal,
  Form,
  Collapse,
  Radio,
  Progress,
} from 'antd';

import Header from 'containers/Layouts/Header';
import Footer from 'containers/Layouts/Footer';
import 'assets/css/style.scss';
import 'assets/css/detail.scss';
import {
  getLocalData,
  getLocaleMessages,
  getLocalDataType,
  checkValid,
} from 'redux/helper';
import { formatTimeShow, getCurrentDay } from 'components/utility/helper';
import {
  HeartFilled,
  StarFilled,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { history, store } from 'redux/store';
import actions from 'redux/Details/actions';
import ListingLayoutAction from 'redux/ListingLayout/actions';
import { times } from 'lodash';
import { getRandom } from 'components/utility/helper';
import NO_IMAGE from '../../assets/img/no-image.png';

const { Content } = Layout;
const { TabPane } = Tabs;
const SERVICE_LIMIT = 10;

function callback(key) {}

const SaloonDetailPage = (props) => {
  const { saloonid } = useParams();
  const [myreload, setMyreload] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const [locationLoader, setLocationLoader] = useState(true);
  const [sortbyVal, setSortbyVal] = useState('');
  const [filterbyVal, setFilterbyVal] = useState('');
  const dispatch = useDispatch();
  let serviceCount = 0;
  const {
    saloonDetail,
    setCategoryAndServices,
    categoryServicesLoader,
    detailPageLoader,
    staffLoader,
    staffDetail,
    detailServices,
    raterMark,
    raterName,
    raterComments,
    ratingbyvendorData,
  } = useSelector((state) => state.DetailPage);

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

  // console.log("listingSaloonData", listingSaloonData);

  var [serviceArr, insertService] = useState([]);
  var [categoryArr, insertCategory] = useState([]);
  var [priceArr, insertPrice] = useState([]);
  var [taxArr, insertTax] = useState([]);
  var [serviceSelect, setService] = useState(false);
  var [ratePopup, setratePopup] = useState(false);
  var [serviceCheckboxDisable, setCheckboxDisable] = useState(false);
  localStorage.setItem('saloonDetails', JSON.stringify(saloonDetail));
  const [getLatitude, setLatitude] = useState(24.7135517);
  const [getLongitude, setLongitude] = useState(46.6752957);
  const nearBySaloon = JSON.parse(localStorage.getItem('nearsaloon'));
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const gender = ['', 'Women', 'Kids'];
  var [locSaloonId, setLocSaloonId] = useState(0);

  var [totalRatings, setTotalRatings] = useState(0);

  var [star5Count, setStar5Count] = useState(0);
  var [star4Count, setStar4Count] = useState(0);
  var [star3Count, setStar3Count] = useState(0);
  var [star2Count, setStar2Count] = useState(0);
  var [star1Count, setStar1Count] = useState(0);

  const [CheckRating, setCheckRating] = useState('');
  const [RatingData, setRatingData] = useState([]);

  var ratingList =
    saloonDetail !== null && Object.keys(saloonDetail).length > 0
      ? saloonDetail.rating_review
      : [];

  const { TextArea } = Input;
  const { Panel } = Collapse;
  const [expanded, setExpand] = useState(false);
  const [itemToShow, setItemToShow] = useState(SERVICE_LIMIT);

  const minutesToHours = (totalMinutes) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return `${hours} hours ${minutes} min.`;
  };

  useEffect(() => {
    localStorage.removeItem('staffId');
    localStorage.removeItem('serviceList');
    localStorage.removeItem('priceList');
    localStorage.removeItem('taxList');
    localStorage.removeItem('saloonId');
    localStorage.removeItem('isServiceSelected');
    localStorage.removeItem('isStaffSelected');
    localStorage.setItem('lastpath', location.pathname);
    let urlParams = new URLSearchParams(history.location.search);
    console.log(`location.pathname: saloonid : ${saloonid}`);

    if (parseInt(saloonid) > 0) {
      setLocSaloonId(saloonid);
      store.dispatch({
        type: actions.GET_SALOON_DETAILS,
        payload: saloonid,
        userid:
          isLoggedIn && getLocalDataType() === 'user'
            ? parseInt(getLocalData('id'))
            : '',
      });
      store.dispatch({
        type: actions.GET_SALOON_SERVICES,
        payload: saloonid,
      });
      store.dispatch({
        type: actions.GET_SALOON_CATEGORY,
        payload: saloonid,
      });
      store.dispatch({
        type: actions.GET_SALOON_STAFF_DETAILS,
        payload: saloonid,
      });
    } else {
      history.push({
        pathname: '/listing',
      });
    }
  }, [myreload]);

  useEffect(() => {
    if (
      saloonDetail['rating_review'] &&
      saloonDetail['rating_review'].length > 0
    ) {
      setTotalRatings(saloonDetail['rating_review'].length);
      setStar5Count(
        saloonDetail['rating_review'].filter(function (el) {
          return el.rating === 5;
        }).length
      );
      setStar4Count(
        saloonDetail['rating_review'].filter(function (el) {
          return el.rating === 4;
        }).length
      );
      setStar3Count(
        saloonDetail['rating_review'].filter(function (el) {
          return el.rating === 3;
        }).length
      );
      setStar2Count(
        saloonDetail['rating_review'].filter(function (el) {
          return el.rating === 2;
        }).length
      );
      setStar1Count(
        saloonDetail['rating_review'].filter(function (el) {
          return el.rating === 1;
        }).length
      );

      saloonDetail['rating_review'].map((reviews, index) => {});
    }
  }, [saloonDetail]);

  useEffect(() => {
    console.log('!!!!!!!!!!', saloonDetail);
  }, []);
  useEffect(() => {
    // if (
    //   Object.keys(saloonDetail).length !== 0 &&
    //   saloonDetail.constructor !== Object
    // )
    if (saloonDetail['latitude'] && saloonDetail['longitude']) {
      console.log('!!!!!!!!!!', saloonDetail);

      store.dispatch({
        type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
        payload: {
          latitude: saloonDetail.latitude,
          longitude: saloonDetail.longitude,
          // userid: getLocalData("id"),
          sortby: 'nearest',
          service_available: 3,
        },
        // initialLoader: true,
      });
    }
  }, [saloonDetail]);

  const onChangeText = (event, fieldName) => {
    if (fieldName == 'raterComments') {
      store.dispatch({
        type: actions.RATING_DATA_COMMENT,
        value: event.target.value,
      });
    } else if (fieldName == 'raterName') {
      store.dispatch({
        type: actions.RATING_DATA_NAME,
        value: event.target.value,
      });
    }
  };
  const handleChangeRate = (value) => {
    store.dispatch({
      type: actions.RATING_DATA_MARK,
      val: value,
    });
  };

  const onReset = () => {
    store.dispatch({
      type: actions.RATING_RESET,
    });
    setratePopup(true);
  };
  // aaa
  const onFinish = () => {
    setratePopup(false);
    let urlParams = new URLSearchParams(history.location.search);
    let resultData = {
      userid: getLocalData('id'),
      name: raterName,
      review: raterComments,
      rating: raterMark,
      vendorid: locSaloonId,
    };
    store.dispatch({
      type: actions.SAVE_RATING,
      value: resultData,
      callBackAction: (res) => {
        if (res == 1) {
          setratePopup(false);
        }
      },
    });
  };
  const handleCheckbox = (e, s) => {
    if (e.target.checked) {
      serviceArr.push(s);
    } else {
      const index = serviceArr.findIndex((ch) => ch.id === s.id);
      serviceArr.splice(index, 1);
    }
    insertService(serviceArr);
    // taxArr.push(s.tax);
    // insertTax(taxArr);
    // priceArr.push(s.price[0].price);
    // insertPrice(priceArr);
    localStorage.setItem('serviceList', JSON.stringify(serviceArr));
    // localStorage.setItem('priceList',JSON.stringify(priceArr));
    // localStorage.setItem('taxList',JSON.stringify(taxArr));
    localStorage.setItem('isServiceSelected', true);
    setService(true);
    let urlParams = new URLSearchParams(history.location.search);

    localStorage.setItem('saloonId', locSaloonId);
    history.push({
      pathname: '/services',
    });
    if (serviceArr.length === 0) {
      setService(false);
    }
  };

  const getGender = () => {
    var genderDetails = '';
    saloonDetail &&
      saloonDetail.gender !== undefined &&
      saloonDetail.gender !== null &&
      typeof saloonDetail.gender !== undefined &&
      saloonDetail.gender
        .split(',')
        .map((gen, i) => (
          <>
            {
              (genderDetails = `${genderDetails}, ${
                gen !== '' && parseInt(gen) >= 0 ? gender[gen] : ''
              }`)
            }
          </>
        ));

    return genderDetails.trim().replace(/^,|,$/g, '');
  };
  const serviceOnChage = (val, service) => {
    if (serviceArr.includes(service.id)) {
      const ind = serviceArr.indexOf(service.id);
      if (ind > -1) {
        serviceArr.splice(ind, 1);
        insertService(serviceArr);
      }
    } else {
      if (serviceArr.length < 7) {
        serviceArr.push(service.id);
        insertService(serviceArr);
        taxArr.push(service.tax);
        insertTax(taxArr);
        priceArr.push(service.price[0].price);
        insertPrice(priceArr);
        localStorage.setItem('serviceList', JSON.stringify(serviceArr));
        localStorage.setItem('priceList', JSON.stringify(priceArr));
        localStorage.setItem('taxList', JSON.stringify(taxArr));
        localStorage.setItem('isServiceSelected', true);
      } else {
        message.error("you can't select more than 6 services");
      }
    }
  };
  const getDescription = (arr) => {
    var selectLang = localStorage.getItem('site_language');
    var langArr = arr.filter(function (el) {
      return el.languageshortname == selectLang;
    });
    return langArr[0].vendordescription;
  };

  const getAddress = (arr) => {
    var selectLang = localStorage.getItem('site_language');
    var langArr = arr.filter(function (el) {
      return el.languageshortname == selectLang;
    });
    return langArr[0].vendoraddress;
  };
  const checkServiceSelect = () => ({
    pointerEvents: serviceSelect ? 'auto' : 'none',
  });

  const ratePopupClicked = () => {
    setratePopup(true);
  };
  const loginMessage = () => {
    message.info('Kindly Login to Rate and Review!');
  };

  const loginFavouriteMessage = () => {
    message.info('Kindly Login to Favourite!');
  };

  const onFavouriteChange = ({ favourite, vendorid }) => {
    if (checkValid()) {
      if (getLocalDataType() === 'user') {
        dispatch({
          type: actions.SET_DETAILSALOON_FAVOURITE,
          payload: {
            favourite: favourite,
            vendorid: vendorid,
            userid: getLocalData('id'),
          },
        });
      } else {
        message.warning('User only added favourite');
      }
    } else {
      props.history.push('/auth?type=login');
      //message.warning("Please Login, after only added favourite");
    }
  };

  function callback(key) {}

  const getInitials = (name) => {
    var parts = name.split(' ');
    var initials = '';
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];
      }
    }
    return initials.toUpperCase();
  };

  function onChange(e) {}

  const showMore = () => {
    if (itemToShow === SERVICE_LIMIT) {
      setItemToShow(detailServices.length);
      setExpand(true);
    } else {
      setItemToShow(SERVICE_LIMIT);
      setExpand(false);
    }
  };
  const slider = React.useRef(null);
  const settings = {
    infinite: true,
    speed: 600,
    arrows: true,
    autoplay: true,
    slidesToScroll: 1,
  };

  useEffect(() => {
    setRatingData(ratingbyvendorData);
  }, [ratingbyvendorData]);

  const Ratingcheckchange = (checkval, ratingid) => {
    if (checkval == CheckRating) return setCheckRating(' ');
    const vendorid = JSON.parse(localStorage.getItem('saloonDetails'));
    setCheckRating(checkval);
    store.dispatch({
      type: actions.GET_RATING_BY_VENDORID,
      payload: { vendorid: vendorid.id, rating: ratingid },
    });
  };

  const Ratinglisting = (data, value) => {
    return (
      data.length > 0 &&
      data.map((ratingdata) => (
        <div style={{ backgroundColor: '#fff' }}>
          <Rate style={{ float: 'right' }} defaultValue={value} disabled />
          <Avatar
            style={{ float: 'left' }}
            size={50}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <p>
            {ratingdata.name}
            <br />
            {format(new Date(ratingdata.created_at), 'dd-MM-yyyy')}
            <br />
            {ratingdata.review}
          </p>
          <p></p>
        </div>
      ))
    );
  };

  // useEffect(() => {
  //   if(saloonDetail){
  //       const data = {};
  //       data['latitude'] = saloonDetail.latitude ;
  //       data['longitude'] = saloonDetail.longitude;
  //       data['sortby'] = 'nearest';
  //       data['service_available'] = 1;
  //       data['userid'] = getLocalData("id");
  //       store.dispatch({
  //         type: ListingLayoutAction.GET_LOGIN_LISTING_SALOON,
  //         payload: data,
  //         initialLoader: true,
  //       });
  //   }
  // }, [saloonDetail]);

  return (
    <>
      <Layout className={'on-boarding'}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}
          {
            <section className="detail-header">
              <div className="container">
                <Row gutter={15}>
                  <Col md={16} span={15}>
                    {detailPageLoader ? null : (
                      <Button className="btn-fav">
                        {isLoggedIn &&
                        checkValid() &&
                        getLocalDataType() === 'user' &&
                        saloonDetail['favourite'] > 0 ? (
                          <HeartFilled
                            onClick={() =>
                              onFavouriteChange({
                                favourite:
                                  saloonDetail['favourite'] == 1 ? 0 : 1,
                                vendorid: saloonDetail['id'],
                              })
                            }
                          />
                        ) : isLoggedIn &&
                          checkValid() &&
                          getLocalDataType() === 'user' &&
                          saloonDetail['favourite'] == 0 ? (
                          <HeartOutlined
                            onClick={() =>
                              onFavouriteChange({
                                favourite:
                                  saloonDetail['favourite'] == 1 ? 0 : 1,
                                vendorid: saloonDetail['id'],
                              })
                            }
                          />
                        ) : (
                          <HeartOutlined
                            onClick={() =>
                              onFavouriteChange({
                                favourite:
                                  saloonDetail['favourite'] == 1 ? 0 : 1,
                                vendorid: saloonDetail['id'],
                              })
                            }
                          />
                        )}
                      </Button>
                    )}

                    {detailPageLoader ? (
                      <>
                        <Skeleton
                          loading={true}
                          title={null}
                          active
                          paragraph={{ rows: 6, width: '100%' }}
                        />
                      </>
                    ) : (
                      <div className="banner-sliders">
                        {saloonDetail.images &&
                        saloonDetail.images.length <= 1 ? null : (
                          <>
                            <Button
                              className="ant-arrow-icons"
                              onClick={() => slider.current.next()}
                            >
                              <RightOutlined />
                            </Button>
                            <Button
                              className="ant-arrow-icons prev"
                              onClick={() => slider.current.prev()}
                            >
                              <LeftOutlined />
                            </Button>
                          </>
                        )}

                        {saloonDetail.images && saloonDetail.images.length && (
                          <Carousel autoplay {...settings} ref={slider}>
                            {saloonDetail.images.map((item) => (
                              <div>
                                <div
                                  className="img_banner"
                                  style={{
                                    backgroundImage: `url(${item.image_url})`,
                                  }}
                                ></div>
                              </div>
                            ))}
                          </Carousel>
                        )}
                      </div>
                    )}
                  </Col>
                  <Col md={8} span={15}>
                    <div className="dh-box">
                      <div className="dh-box-middle">
                        <h2>
                          {' '}
                          {detailPageLoader ? (
                            <Skeleton
                              active
                              loading={true}
                              title={null}
                              paragraph={{ rows: 1, width: '100%' }}
                            />
                          ) : (
                            saloonDetail['vendorname']
                          )}
                        </h2>
                        {detailPageLoader ? (
                          <Skeleton
                            active
                            loading={true}
                            title={null}
                            paragraph={{ rows: 3, width: '100%' }}
                          />
                        ) : (
                          <>
                            {/*
                            <p className="rating">
                              {saloonDetail['reviews'] &&
                              saloonDetail['reviews']['rating'] > 0 &&
                              saloonDetail['reviews']['review_count'] > 0 ? (
                                <>
                                  {saloonDetail['reviews']['rating'].toFixed(1)}{' '}
                                  <StarFilled /> (
                                  {saloonDetail['reviews']['review_count']})
                                </>
                              ) : (
                                ''
                              )}
                            </p>
                            */}

                            <p className="desc">
                              {saloonDetail['language']
                                ? getAddress(saloonDetail['language'])
                                : 'Loading..'}
                            </p>

                            {saloonDetail &&
                            parseInt(saloonDetail['ratingcount']) > 0 ? (
                              <div className="rating-box">
                                <div>
                                  <Rate
                                    allowHalf
                                    defaultValue={saloonDetail['ratingavg']}
                                    disabled
                                  />{' '}
                                  {saloonDetail['ratingavg']}&nbsp;(
                                  {saloonDetail['ratingcount']})
                                </div>
                              </div>
                            ) : (
                              <> </>
                            )}
                          </>
                        )}

                        {detailPageLoader ? null : (
                          <>
                            {' '}
                            <p className="time">
                              {detailPageLoader ? (
                                <>
                                  <Skeleton
                                    active
                                    loading={true}
                                    title={null}
                                    paragraph={{ rows: 7, width: '100%' }}
                                  />
                                </>
                              ) : (
                                <>
                                  {saloonDetail &&
                                  saloonDetail.timings &&
                                  saloonDetail.timings.length > 0 ? (
                                    <>
                                      <ClockCircleOutlined />
                                      {parseInt(
                                        saloonDetail.timings[
                                          new Date().getDay()
                                        ].status
                                      ) === 1 ? (
                                        <>
                                          {formatTimeShow(
                                            saloonDetail.timings[
                                              new Date().getDay()
                                            ].starttime
                                          )}{' '}
                                          -{' '}
                                          {formatTimeShow(
                                            saloonDetail.timings[
                                              new Date().getDay()
                                            ].endtime
                                          )}
                                        </>
                                      ) : (
                                        <>Closed</>
                                      )}
                                    </>
                                  ) : (
                                    <p>Loading....</p>
                                  )}
                                </>
                              )}
                            </p>
                          </>
                        )}

                        <div className="booknow">
                          <Link
                            to={{
                              pathname: `/services/${locSaloonId}`,
                            }}
                            onClick={() => {
                              let urlParams = new URLSearchParams(
                                history.location.search
                              );
                              localStorage.setItem('saloonId', locSaloonId);
                              if (localStorage.getItem('serviceList')) {
                                let serviceArr = JSON.parse(
                                  localStorage.getItem('serviceList')
                                );
                                let priceList = [];
                                let taxList = [];
                                serviceArr.map((d, i) => {
                                  priceList.push(d.price[0].price);
                                  taxList.push(d.tax);
                                });
                                localStorage.setItem(
                                  'priceList',
                                  JSON.stringify(priceList)
                                );
                                localStorage.setItem(
                                  'taxList',
                                  JSON.stringify(taxList)
                                );
                              }
                            }}
                          >
                            <Button type="primary" disabled={detailPageLoader}>
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </section>
          }

          {/*Detail information*/}

          <section className="detail-information">
            <div className="container">
              <Row gutter={30}>
                <Col md={16} span={15}>
                  <h2>
                    {detailPageLoader ? (
                      <Skeleton
                        active
                        loading={true}
                        title={null}
                        paragraph={{ rows: 1, width: '100%' }}
                      />
                    ) : (
                      `About ${saloonDetail['vendorname']}`
                    )}
                  </h2>
                  <div className="about">
                    {detailPageLoader ? null : (
                      <>
                        {' '}
                        <p className="time">
                          {detailPageLoader ? (
                            <>
                              <Skeleton
                                active
                                loading={true}
                                title={null}
                                paragraph={{ rows: 7, width: '100%' }}
                              />
                            </>
                          ) : saloonDetail &&
                            saloonDetail.timings &&
                            saloonDetail.timings.length > 0 ? (
                            <>
                              {parseInt(
                                saloonDetail.timings[new Date().getDay()].status
                              ) === 1 ? (
                                <>
                                  <ClockCircleOutlined />{' '}
                                  {formatTimeShow(
                                    saloonDetail.timings[new Date().getDay()]
                                      .starttime
                                  )}{' '}
                                  -{' '}
                                  {formatTimeShow(
                                    saloonDetail.timings[new Date().getDay()]
                                      .endtime
                                  )}
                                </>
                              ) : (
                                <>Closed</>
                              )}
                            </>
                          ) : (
                            <p>Loading....</p>
                          )}
                        </p>
                        <p className="confirm">
                          <CheckCircleOutlined /> Instant Confirmation
                        </p>
                        {saloonDetail.service_available !== '' && (
                          <>
                            <p className="gender">
                              <InfoCircleOutlined />
                              &nbsp;
                              {saloonDetail.service_available == 1
                                ? 'Women'
                                : saloonDetail.service_available == 2
                                ? 'Kids'
                                : 'Women, Kids'}
                            </p>{' '}
                          </>
                        )}
                        {/* {getGender().trim() !== "" && (
                          <>
                            <p className="gender">
                              <InfoCircleOutlined />
                              &nbsp;{getGender()}
                            </p>{" "}
                          </>
                        )} */}
                      </>
                    )}

                    <p style={{ textAlign: 'justify' }}>
                      {detailPageLoader ? (
                        <Skeleton
                          active
                          loading={true}
                          title={null}
                          paragraph={{ rows: 3, width: '100%' }}
                        />
                      ) : saloonDetail['language'] ? (
                        getDescription(saloonDetail['language'])
                      ) : (
                        'Loading..'
                      )}
                    </p>
                    <p>&nbsp;</p>
                  </div>
                </Col>
                <Col md={8} span={15}>
                  {detailPageLoader ? (
                    <div className="location-box">
                      <Skeleton
                        active
                        loading={true}
                        paragraph={{ rows: 2, width: '100%' }}
                      />
                    </div>
                  ) : (
                    <Link
                      to={'/map'}
                      onClick={() => {
                        let arr = [];
                        arr.push(saloonDetail);
                        localStorage.setItem('map', JSON.stringify(arr));
                        console.log(
                          'this si the value of the current data i nthe',
                          arr
                        );
                      }}
                    >
                      <div className="location-box">
                        <h3>Location</h3>
                        <p>{saloonDetail['address']}</p>
                      </div>
                    </Link>
                  )}

                  <div className="side-carts time-display">
                    <Collapse onChange={callback}>
                      <Panel
                        header={
                          saloonDetail && saloonDetail.timings
                            ? getCurrentDay(saloonDetail.timings)
                            : 'checking...'
                        }
                        key="1"
                      >
                        {saloonDetail &&
                        saloonDetail.timings &&
                        saloonDetail.timings.length > 0 ? (
                          saloonDetail.timings.map((time, i) => (
                            <p>
                              {time.days}{' '}
                              {parseInt(time.status) === 1 ? (
                                <span>
                                  {formatTimeShow(time.starttime)} -{' '}
                                  {formatTimeShow(time.endtime)}
                                </span>
                              ) : (
                                <>
                                  <span>Closed</span>
                                </>
                              )}
                            </p>
                          ))
                        ) : (
                          <p>Loading....</p>
                        )}
                      </Panel>
                    </Collapse>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          <section className="detail-information">
            <div className="container">
              <div className="select-service">
                <h2>Services</h2>
                {categoryServicesLoader ? (
                  <>
                    <Skeleton
                      loading={true}
                      active
                      avatar
                      paragraph={{ rows: 4, width: '100%' }}
                    />
                  </>
                ) : detailServices.length ? (
                  <Tabs
                    defaultActiveKey="0"
                    onChange={callback}
                    tabPosition="left"
                  >
                    {detailServices
                      .slice(0, itemToShow)
                      .map((categoryAndServicesList, index) => (
                        <>
                          {
                            categoryAndServicesList['servicelang'].length ? (
                              <>
                                <TabPane
                                  tab={categoryAndServicesList.categoryname}
                                  key={index}
                                >
                                  {categoryAndServicesList['servicelang'].map(
                                    (serviceListDetail, index) => {
                                      serviceCount = serviceCount + 1;
                                      return (
                                        <div className="service-content-loop">
                                          <div className="ch_inner_flex">
                                            <div>
                                              <span className="title">
                                                {
                                                  serviceListDetail[
                                                    'servicename'
                                                  ]
                                                }
                                              </span>
                                              <span className="s-timing">
                                                Duration:{' '}
                                                {minutesToHours(
                                                  serviceListDetail[
                                                    'service'
                                                  ] &&
                                                    serviceListDetail[
                                                      'service'
                                                    ] !== 'undefined' &&
                                                    serviceListDetail['service']
                                                      .length > 0 &&
                                                    serviceListDetail[
                                                      'service'
                                                    ][0]['serviceprice'] &&
                                                    serviceListDetail[
                                                      'service'
                                                    ][0]['serviceprice'] !==
                                                      'undefined' &&
                                                    typeof serviceListDetail[
                                                      'service'
                                                    ][0]['serviceprice'] !==
                                                      undefined &&
                                                    serviceListDetail[
                                                      'service'
                                                    ][0]['serviceprice']
                                                      .length > 0
                                                    ? serviceListDetail[
                                                        'service'
                                                      ][0]['serviceprice'][0]
                                                        .duration
                                                      ? serviceListDetail[
                                                          'service'
                                                        ][0]['serviceprice'][0]
                                                          .duration
                                                      : 0
                                                    : 0
                                                )}
                                              </span>
                                            </div>

                                            <div className="s-rate">
                                              {serviceListDetail['service'] &&
                                              serviceListDetail['service']
                                                .length > 0 &&
                                              serviceListDetail['service'][0][
                                                'serviceprice'
                                              ] &&
                                              serviceListDetail['service'][0][
                                                'serviceprice'
                                              ].length > 0 &&
                                              serviceListDetail['service'][0][
                                                'serviceprice'
                                              ][0].price
                                                ? serviceListDetail[
                                                    'service'
                                                  ][0]['serviceprice'][0].price
                                                : 0}{' '}
                                              SAR
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </TabPane>
                              </>
                            ) : (
                              <>&nbsp;</>
                            ) /*(
                                <>
                                  <p class="noService">
                                    {" "}
                                    <div>
                                      {" "}
                                      <ExclamationCircleOutlined /> No service is available{" "}
                                    </div>{" "}
                                  </p>
                                </>
                              )*/
                          }
                        </>
                      ))}
                  </Tabs>
                ) : (
                  <>
                    <p class="noService">
                      {' '}
                      <div>
                        {' '}
                        <ExclamationCircleOutlined /> No service is available{' '}
                      </div>{' '}
                    </p>
                  </>
                )}
                {/*see more servie*/}

                {/*
                <a onClick={showMore} className="show-more">
                  {expanded ? <span>Show less</span> : <span>Show more</span>}
                </a>
                */}

                {/* <Collapse onChange={callback}>
                  <Panel header="More Services " key="1">
                    <a>Extent Services</a>
                  </Panel>
                </Collapse> */}
              </div>
            </div>
          </section>
          <section className="detail-information">
            <div className="container">
              <h2>Our Staff</h2>

              {staffLoader ? (
                <div
                  className="staf-checkbox"
                  style={{
                    display: 'flex',
                    textAlign: 'center',
                    marginRight: '5px',
                  }}
                >
                  {times(4, {}).map(() => (
                    <div style={{ marginRight: '5px' }}>
                      <Skeleton.Avatar
                        active
                        loading={true}
                        size={'large'}
                        shape={'circle'}
                        style={{ marginBottom: '10px' }}
                      />
                      <Skeleton.Input style={{ width: 200 }} active />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="staf-checkbox">
                  {staffDetail.length ? (
                    <>
                      {staffDetail.map((staffList) => (
                        <div>
                          <Link
                            to={{
                              pathname: `/services/${locSaloonId}`,
                            }}
                            style={checkServiceSelect()}
                            onClick={() => {
                              //let urlParams = new URLSearchParams(history.location.search)
                              localStorage.setItem('isStaffSelected', true);
                              localStorage.setItem('staffId', staffList['id']);
                              let urlParams = new URLSearchParams(
                                history.location.search
                              );
                              localStorage.setItem('saloonId', locSaloonId);
                              let serviceArr = JSON.parse(
                                localStorage.getItem('serviceList')
                              );
                              let priceList = [];
                              let taxList = [];
                              serviceArr.map((d, i) => {
                                priceList.push(d.price[0].price);
                                taxList.push(d.tax);
                              });
                              localStorage.setItem(
                                'priceList',
                                JSON.stringify(priceList)
                              );
                              localStorage.setItem(
                                'taxList',
                                JSON.stringify(taxList)
                              );
                            }}
                          >
                            <span className="img" style={{ display: 'block' }}>
                              <Avatar size={100}>
                                <span className="initials">
                                  {getInitials(
                                    `${staffList['firstname']} ${staffList['lastname']}`
                                  )}
                                </span>
                              </Avatar>
                            </span>
                            <span className="title">
                              {staffList['firstname']} {staffList['lastname']}
                            </span>
                          </Link>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>Currently no staff is available</>
                  )}
                </div>
              )}
            </div>
          </section>

          {star5Count > 0 ||
          star4Count > 0 ||
          star3Count > 0 ||
          star2Count > 0 ||
          star1Count > 0 ? (
            <section className="rating_full_page">
              <div className="container">
                <div className="flex-reviews">
                  <h2>Ratings &amp; Reviews</h2>

                  {isLoggedIn && getLocalDataType() === 'user' && false ? (
                    <Button
                      type="primary"
                      className="btn-add-review"
                      onClick={onReset}
                    >
                      Add
                    </Button>
                  ) : null}
                </div>

                <div className="rating-right">
                  <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    className="rating-section"
                    tabPosition="left"
                  >
                    <TabPane
                      tab={
                        <div className="button-rt-flex">
                          <Checkbox
                            checked={CheckRating == '5rating' && true}
                            onChange={(e) => Ratingcheckchange('5rating', 5)}
                            style={{ paddingRight: '10px' }}
                            disabled={star5Count === 0 && true}
                          />
                          <Rate defaultValue={5} disabled />
                          <Progress
                            percent={(star5Count / totalRatings) * 100}
                            format={(percent) => `${star5Count}`}
                            status="active"
                          />
                        </div>
                      }
                      key="1"
                    >
                      {RatingData.length > 0 &&
                        CheckRating == '5rating' &&
                        Ratinglisting(RatingData, 5)}
                    </TabPane>

                    <TabPane
                      tab={
                        <div className="button-rt-flex">
                          <Checkbox
                            checked={CheckRating == '4rating' && true}
                            onChange={(e) => Ratingcheckchange('4rating', 4)}
                            style={{ paddingRight: '10px' }}
                            disabled={star4Count === 0 && true}
                          />
                          <Rate defaultValue={4} disabled />
                          <Progress
                            percent={(star4Count / totalRatings) * 100}
                            format={(percent) => `${star4Count}`}
                            status="active"
                          />
                        </div>
                      }
                      key="2"
                    >
                      {RatingData.length > 0 &&
                        CheckRating == '4rating' &&
                        Ratinglisting(RatingData, 4)}
                    </TabPane>

                    <TabPane
                      tab={
                        <div className="button-rt-flex">
                          <Checkbox
                            checked={CheckRating == '3rating' && true}
                            onChange={(e) => Ratingcheckchange('3rating', 3)}
                            style={{ paddingRight: '10px' }}
                            disabled={star3Count === 0 && true}
                          />
                          <Rate defaultValue={3} disabled />
                          <Progress
                            percent={(star3Count / totalRatings) * 100}
                            format={(percent) => `${star3Count}`}
                            status="active"
                          />
                        </div>
                      }
                      key="3"
                    >
                      {RatingData.length > 0 &&
                        CheckRating == '3rating' &&
                        Ratinglisting(RatingData, 3)}
                    </TabPane>
                    <TabPane
                      tab={
                        <div className="button-rt-flex">
                          <Checkbox
                            checked={CheckRating == '2rating' && true}
                            onChange={(e) => Ratingcheckchange('2rating', 2)}
                            style={{ paddingRight: '10px' }}
                            disabled={star2Count === 0 && true}
                          />
                          <Rate defaultValue={2} disabled />
                          <Progress
                            percent={(star2Count / totalRatings) * 100}
                            format={(percent) => `${star2Count}`}
                            status="active"
                          />
                        </div>
                      }
                      key="4"
                    >
                      {RatingData.length > 0 &&
                        CheckRating == '2rating' &&
                        Ratinglisting(RatingData, 2)}
                    </TabPane>
                    <TabPane
                      tab={
                        <div className="button-rt-flex">
                          <Checkbox
                            checked={CheckRating == '1rating' && true}
                            onChange={(e) => Ratingcheckchange('1rating', 1)}
                            style={{ paddingRight: '10px' }}
                            disabled={star1Count === 0 && true}
                          />
                          <Rate defaultValue={1} disabled />
                          <Progress
                            percent={(star1Count / totalRatings) * 100}
                            format={(percent) => `${star1Count}`}
                            status="active"
                          />
                        </div>
                      }
                      key="5"
                    >
                      {RatingData.length > 0 &&
                        CheckRating == '1rating' &&
                        Ratinglisting(RatingData, 1)}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </section>
          ) : (
            <> </>
          )}
          {/*Near venue location*/}

          <section className="footer_booknow">
            <div className="container">
              <h4> {saloonDetail['vendorname']} </h4>
              <div className="right_book">
                <span className="serviceav">
                  {serviceCount} services available
                </span>
                <Link
                  to={{
                    pathname: `/services/${locSaloonId}`,
                  }}
                  onClick={() => {
                    let urlParams = new URLSearchParams(
                      history.location.search
                    );
                    localStorage.setItem('saloonId', locSaloonId);
                    if (localStorage.getItem('serviceList')) {
                      let serviceArr = JSON.parse(
                        localStorage.getItem('serviceList')
                      );
                      let priceList = [];
                      let taxList = [];
                      serviceArr.map((d, i) => {
                        priceList.push(d.price[0].price);
                        taxList.push(d.tax);
                      });
                      localStorage.setItem(
                        'priceList',
                        JSON.stringify(priceList)
                      );
                      localStorage.setItem('taxList', JSON.stringify(taxList));
                    }
                  }}
                >
                  <Button type="primary">Book Now</Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="venue-near">
            <div className="container">
              <h2>Near by saloon's</h2>
              {/* <Row gutter={30}>
              
                {nearBySaloon && nearBySaloon.length > 0 ? (
                  nearBySaloon.map((listingSaloonList, index) => (
                    <Col md={8} key={index}>
                      <Card
                        hoverable
                        cover={
                          <Link
                            to={{
                              pathname: `/details/${listingSaloonList["id"]}`,
                              //search: `saloonid=${listingSaloonList["id"]}`,
                            }}
                          >
                            <img
                              alt="example"
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
                          <HeartFilled />
                        </Button>
                        <Link
                          to={{
                            pathname: `/details/${listingSaloonList["id"]}`,
                            //search: `saloonid=${listingSaloonList["id"]}`,
                          }}
                          className="title"
                        >
                          {listingSaloonList["vendorname"]}
                        </Link>
                        <p className="desc">{listingSaloonList["address"]}</p>
                        {listingSaloonList["reviews"] &&
                        listingSaloonList["reviews"]["rating"] > 0 &&
                        listingSaloonList["reviews"]["review_count"] > 0 ? (
                          <p className="rating">
                            {listingSaloonList["reviews"]["rating"].toFixed(1)}{" "}
                            <StarFilled /> (
                            {listingSaloonList["reviews"]["review_count"]})
                          </p>
                        ) : (
                          <p className={"rating"}></p>
                        )}
                      </Card>
                    </Col>
                  ))
                ) : (
                  <>
                    <Col md={24}>
                      <h4>No near saloons found.</h4>
                    </Col>
                  </>
                )}
              </Row> */}
              <Row gutter={30}>
                {listingSaloonData && listingSaloonData.length > 0 ? (
                  listingSaloonData.map((listingSaloonList, index) => (
                    <Col md={8} key={index}>
                      <Card
                        hoverable
                        cover={
                          <Link
                            to={{
                              pathname: `/details/${listingSaloonList['id']}`,
                              //search: `saloonid=${listingSaloonList["id"]}`,
                            }}
                          >
                            <img
                              alt="example"
                              //src={listingSaloonList.image_url}
                              src={
                                listingSaloonList.image_url &&
                                listingSaloonList.image_url !== ''
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
                          <HeartFilled />
                        </Button>
                        <Link
                          to={{
                            pathname: `/details/${listingSaloonList['id']}`,
                            //search: `saloonid=${listingSaloonList["id"]}`,
                          }}
                          className="title"
                        >
                          {listingSaloonList['vendorname']}
                        </Link>
                        <p className="desc">{listingSaloonList['address']}</p>
                        {listingSaloonList['reviews'] &&
                        listingSaloonList['reviews']['rating'] > 0 &&
                        listingSaloonList['reviews']['review_count'] > 0 ? (
                          <p className="rating">
                            {listingSaloonList['reviews']['rating'].toFixed(1)}{' '}
                            <StarFilled /> (
                            {listingSaloonList['reviews']['review_count']})
                          </p>
                        ) : (
                          <p className={'rating'}></p>
                        )}
                      </Card>
                    </Col>
                  ))
                ) : (
                  <>
                    <Col md={24}>
                      <h4>No near saloons found.</h4>
                    </Col>
                  </>
                )}
              </Row>
            </div>

            <Modal
              visible={ratePopup}
              destroyOnClose={true}
              title="Ratings &amp; Reviews"
              className="create_category_modal"
              footer={false}
              onCancel={() => setratePopup(false)}
            >
              <a
                href="javascript:void(0);"
                onClick={() => setratePopup(false)}
                className="close-modal"
                data-dismiss="modal"
              >
                <i
                  className="las la-times-circle"
                  onClick={() => setratePopup(false)}
                />
              </a>

              <Form
                name="rating_form"
                layout="vertical"
                className="login-form"
                onFinish={onFinish}
                initialValues={{
                  raterName: raterName,
                  raterComments: raterComments,
                  raterMark: raterMark,
                }}
              >
                <Form.Item name="Ratings" label="Add Ratings">
                  <Rate
                    tooltips={desc}
                    onChange={(ev) => handleChangeRate(ev, 'raterMark')}
                    value={raterMark}
                    defaultValue={1}
                  />
                </Form.Item>

                <Form.Item
                  name="raterName"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: getLocaleMessages({ id: 'Name' }),
                    },
                  ]}
                >
                  <Input
                    placeholder={getLocaleMessages({ id: 'Name' })}
                    onChange={(ev) => onChangeText(ev, 'raterName')}
                  />
                </Form.Item>
                <Form.Item
                  name="raterComments"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: getLocaleMessages({ id: 'Comments' }),
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder={getLocaleMessages({ id: 'Comments' })}
                    onChange={(ev) => onChangeText(ev, 'raterComments')}
                  />
                </Form.Item>

                <div className="button-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Modal>
          </section>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default SaloonDetailPage;
