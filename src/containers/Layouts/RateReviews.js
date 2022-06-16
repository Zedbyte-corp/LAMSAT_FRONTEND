import React, { useState, useEffect } from 'react';

import {
  Layout,
  Row,
  Col,
  Modal,
  Form,
  Button,
  Card,
  Skeleton,
  Popconfirm,
  Rate,
  Input,
  message,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Header from 'containers/Layouts/Header';
import Footer from 'containers/Layouts/Footer';
import 'assets/css/style.scss';
import { history, store } from 'redux/store';
import Action from 'redux/AddressBook/actions';
import 'assets/css/myaccount.scss';
import {
  checkValid,
  getLocalData,
  stringToDate,
  getLocalDataType,
} from 'redux/helper';
import {
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  StarFilled,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import CommonHeader from './CommonHeader';
import { times } from 'lodash';
import moment from 'moment';

const { Content } = Layout;
const { TextArea } = Input;

const LoginForm = () => {
  const { isLoggedIn, initLoader } = useSelector((state) => state.Auth);
  const { ratingList, loader } = useSelector((state) => state.AddressBook);
  const [editRatingUpdate, seteditRatingUpdate] = useState(false);
  const [RatingId, setRatingId] = useState(0);
  const [ratingUpdate, setratingUpdate] = useState([]);
  console.log('this is hte value of the ratingList', ratingUpdate);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    store.dispatch({
      type: Action.GET_SALOON_RATING_DETAILS,
      userid: getLocalData('id'),
    });
  }, ['ratingList']);

  useEffect(() => {
    if (RatingId != 0) {
      const updateList = ratingList.filter((list) => {
        return list.id == RatingId;
      });
      setratingUpdate(updateList);
    }
  }, [RatingId]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const updateFinish = (values) => {
    const data = {
      id: RatingId.toString(),
      review: values.review,
      rating: values.rating,
    };
    // console.log("this is the value of the update", values);
    // return;
    store.dispatch({
      type: Action.SALOON_RATING_REVIEW_UPDATE,
      payload: data,
      callBackAction: (res) => {
        seteditRatingUpdate(false);
        window.location.reload();
        message.success('Rating and Review is udpated successfully');
      },
    });
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const editRatingAndReview = (id) => {
    seteditRatingUpdate(true);
    setRatingId(id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOKRating = () => {
    seteditRatingUpdate(false);
  };
  const handleCancelRating = () => {
    seteditRatingUpdate(false);
  };
  const getLocalDateTime = (val) => {
    return new Date(val).toLocaleString();
  };

  return (
    <>
      <Layout className={'on-boarding'}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-900">
              {/*Profile*/}
              <CommonHeader selectedKey={'rate'} />
              {/*Rate Reviews*/}
              <div className="main-box-account">
                <Row gutter={30}>
                  {ratingList.length == 0 && loader ? (
                    times(6, {}).map((key, index) => {
                      return (
                        <Col sm={24} md={24} key={`${key}${index}`}>
                          <Card hoverable>
                            <Skeleton loading={true} avatar active />
                          </Card>
                        </Col>
                      );
                    })
                  ) : ratingList.length > 0 ? (
                    ratingList.map((list) => {
                      return (
                        <Col span={24}>
                          <div className="user-rate-list">
                            <div className="img">
                              {list['images'] && list['images'].length
                                ? list['images'] !== null &&
                                  list['images'] !== '' &&
                                  list['images'][0] !== null &&
                                  list['images'][0]['image_url'] !== '' && (
                                    <img
                                      src={list['images'][0]['image_url']}
                                      alt=""
                                    />
                                  )
                                : ''}
                            </div>

                            <Link
                              onClick={() => {
                                localStorage.setItem(
                                  'saloonId',
                                  parseInt(list['vendorid'])
                                );
                              }}
                              to={{
                                pathname: `/details/${list['vendorid']}`,
                              }}
                            >
                              {' '}
                              <h3>{list.vendorname}</h3>{' '}
                            </Link>

                            <div className="flex">
                              <Rate defaultValue={list.rating} disabled />
                              <div className="date">
                                {getLocalDateTime(list.created_at)}
                              </div>
                            </div>

                            <p className="desc">{list.review}</p>

                            <div className="option_flex_end">
                              <Button
                                onClick={(e) => {
                                  editRatingAndReview(list.id);
                                }}
                                icon={<EditOutlined />}
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  ) : (
                    <Col md={24}>
                      <div className="no_saloon">
                        <div>
                          <img
                            src={require('../../assets/img/nosalon.jpg')}
                            alt="no salon"
                          />
                          <h2>No Rating found!</h2>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
              {/*Rate Reviews*/}
            </div>
          </section>

          <Modal
            title="Location"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={false}
            className="modal-location"
            width="100%"
            destroyOnClose
          >
            <div className="map-full"></div>
            <Button type="primary" icon={<CheckOutlined />}></Button>
          </Modal>

          <Modal
            title="Update Rate & Review"
            visible={editRatingUpdate}
            onCancel={handleCancelRating}
            centered
            className="enquiry-modal"
            footer={false}
            destroyOnClose
          >
            <Form
              onFinish={updateFinish}
              initialValues={{
                rating: ratingUpdate.length > 0 && ratingUpdate[0].rating,
                review: ratingUpdate.length > 0 && ratingUpdate[0].review,
              }}
            >
              <p>{ratingUpdate.length > 0 && ratingUpdate[0].vendorname}</p>

              <Form.Item name="review">
                <TextArea rows={3} placeholder="Review..." />
              </Form.Item>
              <Form.Item label="Rating" name="rating">
                <Rate />
              </Form.Item>

              <Button htmlType="submit" type="primary">
                Update
              </Button>
            </Form>
          </Modal>

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
