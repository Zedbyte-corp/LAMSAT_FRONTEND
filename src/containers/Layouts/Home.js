import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Card,
  Rate,
  Carousel,
  Skeleton,
} from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import "assets/css/style.scss";
import {
  SearchOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import actions from "redux/Layout/actions";
import { times } from "lodash";
import NO_IMAGE from "../../assets/img/no-image.png";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const LoginForm = () => {
  const { isLoggedIn, subLang } = useSelector((state) => state.Auth);
  const location = useLocation();
  const LayoutData = useSelector((state) => state.Layouts);
  const {
    categoryLoader,
    categoryData,
    saloonLoader,
    saloonData,
    topRatingLoader,
    topRatingData,
  } = LayoutData;
  useEffect(() => {
    localStorage.setItem("lastpath", location.pathname);
    store.dispatch({
      type: actions.GET_LAYOUT_CATEGORIES,
    });
    store.dispatch({
      type: actions.GET_LAYOUT_SALOON,
    });
    store.dispatch({
      type: actions.GET_LAYOUT_TOP_RATING,
    });
  }, [subLang]);
  useEffect(() => {
    console.log("saloon data", saloonData);
  }, [saloonData]);
  const slider = React.useRef(null);

  const settings = {
    infinite: false,
    speed: 600,
    dots: false,
    arrows: true,

    autoplay: false,
    slidesToShow: categoryLoader
      ? 6
      : categoryData.length > 6
      ? 6
      : categoryData.length - 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Baner*/}
          <section className="banner">
            <div className="container">
              <div className="banner-content">
                {/* <Typography>
                  <Title>Find your ideal Service</Title>
                  <Paragraph className="p">
                  Aim is to make you feel better and look beautiful.
                  </Paragraph>
                </Typography>*/}
                <div className="banner-content-box">
                  <Typography>
                    <Title level={3}>Instantly book salons</Title>
                  </Typography>
                  <NavLink to="listing">
                    <Button
                      type="primary"
                      className="btn-discover"
                      icon={<SearchOutlined />}
                    >
                      Discover salons near me
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </section>
          {/*Baner End*/}

          {/*Categories*/}

          <section className="categories">
            <div className="container">
              <Typography>
                <Title level={2} className="heading-2">
                  Categories
                </Title>
              </Typography>

              <Button
                className="ant-arrow-icons"
                onClick={() => slider.current.next()}
              >
                <ArrowRightOutlined />
              </Button>

              <Button
                className="ant-arrow-icons prev"
                onClick={() => slider.current.prev()}
              >
                <ArrowLeftOutlined />
              </Button>

              <Carousel {...settings} ref={slider}>
                {categoryLoader
                  ? times(6, {}).map((key, index) => (
                      <div className="pad-10" key={`${key}${index}`}>
                        <Card>
                          <Skeleton.Image active={true} />
                        </Card>
                      </div>
                    ))
                  : categoryData.map((categoryList, index) => (
                      <div className="pad-10" key={index}>
                        <NavLink
                          to={{
                            pathname: "/listing",
                            search: `categoryid=${categoryList["id"]}`,
                          }}
                        >
                          <Card
                            hoverable
                            cover={
                              <img alt="example" src={categoryList.image_url} />
                            }
                          >
                            <Meta title={categoryList.categoryname} />
                          </Card>
                        </NavLink>
                      </div>
                    ))}
              </Carousel>
            </div>
          </section>
          {/*Categories End*/}
          {/*Categories Start*/}
          {/*<section className="categories">
            <div className="container">
              <Typography>
                <Title level={2} className="heading-2">
                  Categories
                </Title>
              </Typography>
                <Row>
               {categoryLoader ? times(4, {}).map((key,index)=> {
                return <Col sm={4} md={6}  key={`${key}${index}`}>
                  <Card
                    hoverable
                  >
                     <Skeleton.Image active={true}/>

                  </Card>

                </Col>}): categoryData.map((categoryList, index)=>{
                    return < Col sm={4} md={6} className="pad-10" key={index}>
                    <NavLink
                    to={{
                      pathname:"/listing",
                      search: `categoryid=${categoryList['id']}`
                    }}
              ><Card
              hoverable
              cover={
                <img
                  alt="example"
                  src={categoryList.image_url}
                />
              }
            >
              <Meta title={categoryList.categoryname} />
            </Card>
            </NavLink>
          </ Col>
          })
        }
                    </Row>
                    </div>
                    </section>*/}

          {/*Categories End*/}

          {/*Featured Vendors */}
          <section className="featured-saloon">
            <div className="container">
              {(saloonLoader || (saloonData && saloonData.length > 0)) && (
                <Typography>
                  <Title level={2} className="heading-2">
                    Featured Saloon
                  </Title>
                </Typography>
              )}

              <Row gutter={30}>
                {saloonLoader.length > 0 && saloonLoader
                  ? times(6, {}).map((key, index) => (
                      <Col sm={8} md={8} key={`${key}${index}`}>
                        <Card hoverable>
                          <Skeleton loading={true} avatar active />
                        </Card>
                      </Col>
                    ))
                  : saloonData &&
                    saloonData.map((saloonList, index) => (
                      <Col sm={8} md={8} key={index}>
                        <NavLink
                          to={{
                            pathname: `/details/${saloonList["id"]}`,
                          }}
                        >
                          <Card
                            hoverable
                            cover={
                              <img
                                alt="saloon image"
                                //src={`${process.env.REACT_APP_IMAGE_URL}${saloonList.photopath}`}

                                src={
                                  saloonList.image_url &&
                                  saloonList.image_url !== ""
                                    ? saloonList.image_url
                                    : saloonList.images
                                    ? saloonList.images[0].url
                                    : NO_IMAGE
                                }
                              />
                            }
                          >
                            <Button className="btn-fav">
                                  {saloonList && saloonList.favourite? (
                                    <HeartFilled/>
                                  ) : (
                                    <HeartOutlined/>
                                  )}
                            </Button>
                            <div className="fea__saloon">
                              <div className="title">
                                {saloonList.vendorname}{" "}
                              </div>
                              {/* {saloonList.isfeatured && (
                                <Rate
                                  count={1}
                                  character={<HeartFilled />}
                                  disabled
                                  defaultValue={1}
                                />
                              )} */}

                              <div className="address">
                                {saloonList.address}
                              </div>

                              <div className="rating">
                                <div>
                                  {saloonList && saloonList.ratingcount > 0 ? (
                                    <>
                                      {/* <Rate
                                        allowHalf
                                        defaultValue={saloonList.ratingavg}
                                        disabled="true"
                                      />
                                      <span className="rt">
                                        {saloonList.ratingavg} (
                                        {saloonList.ratingcount})
                                      </span> */}
                                      <span className="rt">
                                        <p className="rating">
                                          <StarFilled />
                                          {parseFloat(
                                            saloonList["ratingavg"]
                                          ).toFixed(1)}
                                          {"  "}
                                          {"  "}
                                          <b>
                                            {saloonList["ratingavg"] >= 4
                                              ? "Good"
                                              : null}{" "}
                                          </b>
                                          {saloonList["ratingcount"]} Ratings
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
                                <div className="featured">Featured</div>
                              </div>
                            </div>
                          </Card>
                        </NavLink>
                      </Col>
                    ))}
              </Row>

              {console.log(`topRatingData:${JSON.stringify(topRatingData)}`)}
              {(topRatingLoader || topRatingData.length > 0) && (
                <Typography>
                  <Title level={2} className="heading-2 mt-30">
                    Top Rating
                  </Title>
                </Typography>
              )}
              <Row gutter={30}>
                {topRatingLoader
                  ? times(3, {}).map((key, index) => (
                      <Col sm={8} md={8} key={`${key}${index}`}>
                        <Card hoverable>
                          <Skeleton loading={true} avatar active />
                        </Card>
                      </Col>
                    ))
                  : topRatingData.map((ratingList, index) => (
                      <Col sm={8} md={8} key={index}>
                        <NavLink
                          to={{
                            pathname: `/details/${ratingList["id"]}`,
                          }}
                        >
                          <Card
                            hoverable
                            cover={
                              <img
                                alt="example"
                                //src={`${process.env.REACT_APP_IMAGE_URL}${ratingList.image_url}`}
                                // src={ratingList.image_url}
                                src={
                                  ratingList.image_url &&
                                  ratingList.image_url !== ""
                                    ? ratingList.image_url
                                    : ratingList.images
                                    ? ratingList.images[0].url
                                    : NO_IMAGE
                                }
                              />
                            }
                          >
                            <div className="fea__saloon">
                              <div className="title">
                                {ratingList.vendorname}
                              </div>
                              <div className="address">
                                {ratingList.vendoraddress}
                              </div>
                              {ratingList && ratingList.ratecount > 0 ? (
                                <div className="rating">
                                  <div>
                                    {/* <Rate
                                      allowHalf
                                      defaultValue={ratingList.ratingavg}
                                      disabled="true"
                                    />
                                    <span className="rt">
                                      {ratingList.ratingavg} (
                                      {ratingList.ratingcount} Ratings)
                                    </span> */}
                                    <span className="rt">
                                      <p className="rating">
                                        <StarFilled />{" "}
                                        {parseFloat(
                                          ratingList["rating"]
                                        ).toFixed(1)}{" "}
                                        <b>
                                          {ratingList["rating"] >= 4
                                            ? "Good"
                                            : null}{" "}
                                        </b>
                                        {ratingList["ratecount"]} Ratings
                                      </p>
                                    </span>
                                  </div>
                                  <div className="featured">Top Rated</div>
                                </div>
                              ) : (
                                <> </>
                              )}
                            </div>
                          </Card>
                        </NavLink>
                      </Col>
                    ))}
              </Row>
            </div>
          </section>

          {/*Featured Vendors End*/}

          {/*How work Start*/}

          <section className="how-it desktop-none">
            <div className="container">
              <Row>
                <Col sm={24} md={10}>
                  <Typography className="typo">
                    <div>
                      <Title level={2} className="heading-2">
                        How it Works
                      </Title>
                      <Paragraph className="p">
                        {" "}
                        Book your services and avail the Online{" "}
                      </Paragraph>
                    </div>
                  </Typography>
                </Col>

                <Col sm={24} md={14}>
                  <Row gutter="30">
                    <Col md={12} sm={12} span="15">
                      <Card title="Select Service Location">
                        <p>
                          A team of professionals who are always at your service
                          to provide you guidance according to your
                          requirements.
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-1.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} sm={12} span="15">
                      <Card title="Explore Services" className="mt-50">
                        <p>
                          Book your services and avail the Online.This Salon
                          provides you the ultimate beauty experience.
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-2.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} sm={12} span="15">
                      <Card title="Schedule your Time" className="mt--30">
                        <p>
                          Premium products and best equipment to ensure quality
                          service in every sense.
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-2.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} sm={12} span="15">
                      <Card title="Book an appointment">
                        <p>
                          Book your services and avail the Online. This Salon
                          provides you the ultimate beauty experience.
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-4.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </section>

          <section className="how-it mobile-none">
            <div className="container">
              <Row>
                <Col sm={24} md={14}>
                  <Row gutter="30">
                    <Col md={12} sm={12} span="15">
                      <Card title="Select Service Location">
                        <p>
                          A team of professionals who are always at your service
                          to provide you guidance according to your
                          requirements.
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-1.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} sm={12} span="15">
                      <Card title="Explore Services" className="mt-50">
                        <p>
                          Book your services and avail the Online.This Salon
                          provides you the ultimate beauty experience.
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-2.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} sm={12} span="15">
                      <Card title="Schedule your Time" className="mt--30">
                        <p>
                          Premium products and best equipment to ensure quality
                          service in every sense
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-2.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} sm={12} span="15">
                      <Card title="Book an appointment">
                        <p>
                          Book your services and avail the Online. This Salon
                          provides you the ultimate beauty experience
                        </p>
                        <div className="right-img">
                          <img
                            src={require("../../assets/img/right-icon-4.png")}
                            alt=""
                          />
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col sm={24} md={10}>
                  <Typography className="typo">
                    <div>
                      <Title level={2} className="heading-2">
                        How it Works
                      </Title>
                      <Paragraph className="p">
                        {" "}
                        Book your services and avail the Online{" "}
                      </Paragraph>
                    </div>
                  </Typography>
                </Col>
              </Row>
            </div>
          </section>
          {/*How work End*/}

          {/*Download App*/}

          <section className="download-app">
            <div className="container">
              <Row>
                <Col sm={12} md={12}>
                  <img
                    className="download-as"
                    src={require("../../assets/img/app-screen.png")}
                    alt=""
                  />
                </Col>
                <Col sm={24} md={12}>
                  <Typography className="typo">
                    <div>
                      <Title level={2} className="heading-2">
                        Download Apps
                      </Title>
                      <Paragraph className="p">
                        {" "}
                        Salon provides you the ultimate beauty experience.{" "}
                      </Paragraph>
                    </div>
                  </Typography>

                  <div className="links">
                    {/* <NavLink target="_blank" to="/"> */}
                    <a href="https://play.google.com/">
                      <img
                        src={require("../../assets/img/google.png")}
                        alt=""
                      />
                    </a>
                    {/* </NavLink> */}
                    {/* <NavLink target="_blank" to="/"> */}
                    <a href="https://www.apple.com/in/app-store/">
                      <img
                        src={require("../../assets/img/app-store.png")}
                        alt=""
                      />
                    </a>
                    {/* </NavLink> */}
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          {/*Download App*/}

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
