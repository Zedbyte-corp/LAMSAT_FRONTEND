import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/app/actions';
import { NavLink } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { store, history } from 'redux/store';
import {
  SettingOutlined,
  ProfileOutlined,
  CreditCardOutlined,
  ExceptionOutlined,
  OneToOneOutlined,
  ToolOutlined,
  ScheduleOutlined,
  RightOutlined,
  LineChartOutlined,
  CalendarOutlined,
  UserOutlined,
  ContactsOutlined,
  MessageOutlined,
  FileDoneOutlined,
  StarOutlined,
  InteractionOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const VendorSidebar = (props) => {
  const { currentKey } = useSelector((state) => state.App),
    dispatch = useDispatch();

  useEffect(() => {
    store.dispatch({
      type: actions.CHANGE_CURRENT_MENU,
      payload: [
        history.location.pathname.toLowerCase().substring(1).replace('/', '_'),
      ],
    });
  }, [history.location.pathname]);

  const handleClick = (changedKey) => {
    dispatch({ type: actions.CHANGE_CURRENT_MENU, payload: [changedKey.key] });
  };

  return (
    <>
      <Sider className="sidebar vendor-sidebar" width={250}>
        <StickyBox offsetTop={80} offsetBottom={20}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={currentKey}
            onClick={handleClick}
          >
            <Menu.Item key="vendor_dashboard">
              <NavLink to={'/vendor/dashboard'}>
                {' '}
                <SettingOutlined />
                Dashboard
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_calendar">
              <NavLink to={'/vendor/calendar'}>
                {' '}
                <UserOutlined />
                Calendar
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_booking">
              <NavLink to={'/vendor/booking'}>
                {' '}
                <CreditCardOutlined /> Bookings
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_services">
              <NavLink to={'/vendor/services'}>
                {' '}
                <ScheduleOutlined />
                Menu
              </NavLink>
            </Menu.Item>

            {/* <Menu.Item key="vendor_customer">
              <NavLink to={'/vendor/customer'}>
                {' '}
                <ScheduleOutlined />
                Customer
              </NavLink>
            </Menu.Item> */}

            <Menu.Item key="vendor_staff">
              <NavLink to={'/vendor/staff'}>
                {' '}
                <UserOutlined />
                Staff
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_voucher">
              <NavLink to={'/vendor/voucher'}>
                {' '}
                <CreditCardOutlined /> Vouchers
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_ratings">
              <NavLink to={'/vendor/ratings'}>
                {' '}
                <StarOutlined />
                Rating & Review
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_report">
              <NavLink to={'/vendor/report'}>
                {' '}
                <InteractionOutlined />
                Report
              </NavLink>
            </Menu.Item>
            <Menu.Item key="vendor_profile">
              <NavLink to={'/vendor/profile'}>
                {' '}
                <ProfileOutlined />
                Profile
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key="vendor_timeslot">
              <NavLink to={"/vendor/timeslot"}>
                {" "}
                <CalendarOutlined />
                Settings
              </NavLink>
            </Menu.Item> */}
            {/* <Menu.Item key="vendor_stafftime">
              <NavLink to={"/vendor/staftime"}>
                {" "}
                <UserOutlined />
                Staff Time
              </NavLink>
            </Menu.Item> */}
          </Menu>
        </StickyBox>
      </Sider>
    </>
  );
};

export default VendorSidebar;
