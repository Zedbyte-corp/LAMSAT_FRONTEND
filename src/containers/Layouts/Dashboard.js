import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Statistic,
  Layout,
  Row,
  Col,
  Modal,
  Button,
  Popconfirm,
  Card,
} from 'antd';
import Header from 'containers/Layouts/Header';
import Footer from 'containers/Layouts/Footer';
import 'assets/css/style.scss';
import 'assets/css/myaccount.scss';
import {
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  StarFilled,
  HeartFilled,
  UsergroupAddOutlined,
  UserOutlined,
  CalendarOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import CommonHeader from './CommonHeader';
import Chart from 'react-google-charts';
import actions from 'redux/auth/actions';
import { getLocalData } from 'redux/helper';
import { store, history } from 'redux/store';

const { Content } = Layout;
const { Meta } = Card;

const LoginForm = () => {
  const {
    isLoggedIn,
    dashboardCount,
    pending,
    booked,
    cancel,
    rejected,
  } = useSelector((state) => state.Auth);
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('lastpath', location.pathname);

    store.dispatch({
      type: actions.GET_USER_BOOKING_COUNT,
      id: getLocalData('id'),
    });
  }, ['dashboardCount', 'pending', 'booked', 'cancel', 'rejected']);
  return (
    <>
      <Layout className={'on-boarding'}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-1000">
              {/*Profile*/}
              <CommonHeader selectedKey={'dashboard'} />
              {/*Rate Reviews*/}
              <div className="main-box-account">
                <Row className="dashboard" gutter={40}>
                  <Col span={6}>
                    <Card className="customer-count">
                      <Statistic
                        title="Total Order"
                        value={cancel + booked + rejected + pending}
                      />
                      <UserOutlined />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card className="vendor-counter">
                      <Statistic title="Completed Order" value={booked} />
                      <UsergroupAddOutlined />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card className="booking-count">
                      <Statistic title="Upcoming Order" value={pending} />
                      <CalendarOutlined />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card className="turnover-count">
                      <Statistic title="Rejected" value={rejected} />
                      <FileDoneOutlined />
                    </Card>
                  </Col>
                </Row>

                <Card className="turnover-count">
                  <Chart
                    height={'300'}
                    chartType="Line"
                    loader={<div>Loading Chart</div>}
                    data={[
                      [{ type: 'date', label: 'Month' }, 'Month', 'Week'],

                      [new Date(2021, 0), -0.5, 5.7],
                      [new Date(2021, 1), 0.4, 8.7],
                      [new Date(2021, 2), 0.5, 12],
                      [new Date(2021, 3), 2.9, 15.3],
                      [new Date(2021, 4), 6.3, 18.6],
                      [new Date(2021, 5), 9, 20.9],
                      [new Date(2021, 6), 10.6, 19.8],
                      [new Date(2021, 7), 10.3, 16.6],
                      [new Date(2021, 8), 7.4, 13.3],
                      [new Date(2021, 9), 4.4, 9.9],
                      [new Date(2021, 10), 1.1, 6.6],
                      [new Date(2021, 11), -0.2, 4.5],
                      [new Date(2021, 12), -0.2, 4.5],
                    ]}
                    options={{
                      chartArea: { width: '100%' },
                      chart: {
                        title: 'Sales Value',
                      },
                      height: 500,
                      series: {
                        // Gives each series an axis name that matches the Y-axis below.
                        0: { axis: 'Sales Value' },
                      },
                      axes: {
                        // Adds labels to each axis; they don't have to match the axis names.
                        y: {
                          Temps: { label: 'Sales Value' },
                        },
                      },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                  />
                </Card>

                {/*<Col span={24}>
                    <Card className="turnover-count">
                      <Chart
                        height={300}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['Total', 'Total Orders'],
                          ['Jan',  8008000],
                          ['Feb',  3694000],

                          ['March', 3695000],

                          ['April', 3796000],

                          ['May', 3797000],
                          ['june', 3792000],
                          ['july', 3791000],
                          ['Agust', 3792000],
                          ['Septemper', 3792000],
                          ['October', 3792000],
                          ['November', 3792000],
                          ['December', 3792000],
                        ]}
                        options={{
                          title: 'Total Orders',
                          chartArea: { width: '100%' },
                          hAxis: {
                            title: 'Total orders',
                            minValue: 0,
                          },
                        }}
                        legendToggle
                      />
                    </Card>
                  </Col>*/}
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
