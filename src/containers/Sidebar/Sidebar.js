import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import menus from "containers/Sidebar/menus";
import SidebarMenu from "components/Sidebar/SidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import actions from "redux/app/actions";
import StickyBox from "react-sticky-box";
import { store, history } from "redux/store";
import {
  SettingOutlined,
  DashboardOutlined,
  UserAddOutlined,
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
  DollarOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

function Sidebar(props) {
  const { currentKey } = useSelector((state) => state.App),
    dispatch = useDispatch();

  useEffect(() => {
    store.dispatch({
      type: actions.CHANGE_CURRENT_MENU,
      payload: [
        history.location.pathname.toLowerCase().substring(1).replace("/", "_"),
      ],
    });
  }, [history.location.pathname]);

  const handleClick = (changedKey) => {
    dispatch({ type: actions.CHANGE_CURRENT_MENU, payload: [changedKey.key] });
  };
  return (
    <>
      <Sider className="sidebar" width={250}>
        <StickyBox offsetTop={80} offsetBottom={20}>
          <Menu
            theme="light"
            selectedKeys={currentKey}
            onClick={handleClick}
            mode="inline"
          >
            {menus.map((singleOption) => (
              <SidebarMenu key={singleOption.key} singleOption={singleOption} />
            ))}

            {/* <Menu.Item key="admin-profile"> <ProfileOutlined /><NavLink to={'/admin/profile'}>Profile</NavLink></Menu.Item> */}
            <Menu.Item key="admin_calendar">
              <ExceptionOutlined />
              <NavLink to={"/admin/calendar"}>Calendar</NavLink>
            </Menu.Item>
            <Menu.Item key="admin_bookingmanagement">
              <CalendarOutlined />
              <NavLink to={"/admin/bookingmanagement"}>
                {" "}
                Booking
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admin_services">
              <ExceptionOutlined />
              <NavLink to={"/admin/services"}> Saloon Menu</NavLink>
            </Menu.Item>
            <Menu.Item key="admin_category">
              <ExceptionOutlined />
              <NavLink to={"/admin/category"}> Admin Menu</NavLink>
            </Menu.Item>
            <Menu.Item key="admin_staffmanagement">
              <ScheduleOutlined />
              <NavLink to={"/admin/stafmanagement"}> Staff</NavLink>
            </Menu.Item>
            <Menu.Item key="admin_vouchermanagement">
              <CreditCardOutlined />
              <NavLink to={"/admin/vouchermanagement"}>
                Voucher
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admin_vendor">
              <ExceptionOutlined />
              <NavLink to={"/admin/vendor"}>Saloon</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="admin_timeslot">
              <ExceptionOutlined />
              <NavLink to={"/admin/timeslot"}>
                Saloon Working Hours Management
              </NavLink>
            </Menu.Item>       */}
            {/* <SubMenu
              key="service_management"
              icon={<ToolOutlined />}
              title="Saloon Menu"
            >
              {/* <Menu.Item key="admin_category_only">
          <RightOutlined />
        <NavLink to={'/admin/category/admin'}> Admin Category</NavLink>
              </Menu.Item> *}
              {/* <Menu.Item key="admin_category">
                <RightOutlined />
                <NavLink to={"/admin/category"}> Admin Category</NavLink>
              </Menu.Item> *}
              <Menu.Item key="admin_services">
                <RightOutlined />
                <NavLink to={"/admin/services"}> Services</NavLink>
              </Menu.Item>
            </SubMenu> */}
            {/* <Menu.Item key="admin_staftime">
              <ScheduleOutlined />
              <NavLink to={"/admin/staftime"}> Staff Timing</NavLink>
            </Menu.Item> */}
            <Menu.Item key="admin_customer">
              <UserOutlined />
              <NavLink to={"/admin/customer"}>Customer</NavLink>
            </Menu.Item>
            <SubMenu
              key="admin_city"
              icon={<ContactsOutlined />}
              title="Address"
            >
              <Menu.Item key="city">
                <RightOutlined />
                <NavLink to={"/admin/city"}>City</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_area">
                <RightOutlined />
                <NavLink to={"/admin/area"}>Area</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_country">
                <RightOutlined />
                <NavLink to={"/admin/country"}>Country</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="admin_rnquirymanagement">
              <MessageOutlined />
              <NavLink to={"/admin/enquirymanagement"}>
                Enquiry
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key="admin_partnersmanagement">
              <MessageOutlined />
              <NavLink to={"/admin/partnersmanagement"}>Application</NavLink>
            </Menu.Item> */}

            {/* <SubMenu
              key="page_management"
              icon={<FileDoneOutlined />}
              title="Page Management"
            >
              <Menu.Item key="admin/_cms">
                <RightOutlined />
                <NavLink to={"/admin/cms"}>CMS</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_faq">
                <RightOutlined />
                <NavLink to={"/admin/faq"}>FAQ</NavLink>
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item key="admin_ratingandreview">
              <StarOutlined />
              <NavLink to={"/admin/ratingandreview"}>
                {" "}
                Rating And Review
              </NavLink>
            </Menu.Item>
            <Menu.Item key="admin-activelog">
              <InteractionOutlined />
              <NavLink to={"/admin/activelog"}> Activity Log</NavLink>
            </Menu.Item>
            <Menu.Item key="admin_roles">
              <ToolOutlined />
              <NavLink to={"/admin/roles"}>Roles</NavLink>
            </Menu.Item>
            <Menu.Item key="admin_administrator">
              <UserAddOutlined />
              <NavLink to={"/admin/administrator"}>Administrator</NavLink>
            </Menu.Item>

            <Menu.Item key="admin_profile">
              <UserAddOutlined />
              <NavLink to={"/admin/profile"}>Profile</NavLink>
            </Menu.Item>

            <Menu.Item key="admin_settings">
              <UserAddOutlined />
              <NavLink to={"/admin/settings"}>Commission</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="admin_commission">
             <DollarOutlined />
              <NavLink to={'/admin/commission'}>Commission</NavLink>
            </Menu.Item>  */}
            <Menu.Item key="admin_report">
              <UserAddOutlined />
              <NavLink to={"/admin/report"}>Report</NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
              <Menu.Item key="admin_appconfiguration">
                <RightOutlined />
                <NavLink to={"/admin/appconfiguration"}>
                  Application Configuration
                </NavLink>
              </Menu.Item>
              <Menu.Item key="admin_socialmedia">
                <RightOutlined />
                <NavLink to={"/admin/socialmedia"}>Social Media</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_sms">
                <RightOutlined />
                <NavLink to={"/admin/sms"}>SMS</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_smtp">
                <RightOutlined />
                <NavLink to={"/admin/smtp"}>SMTP</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_ushnotification">
                <RightOutlined />
                <NavLink to={"/admin/pushnotification"}>
                  Push Notification
                </NavLink>
              </Menu.Item>
              <Menu.Item key="admin/_cms">
                <RightOutlined />
                <NavLink to={"/admin/cms"}>CMS</NavLink>
              </Menu.Item>
              <Menu.Item key="admin_faq">
                <RightOutlined />
                <NavLink to={"/admin/faq"}>FAQ</NavLink>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </StickyBox>
      </Sider>
    </>
  );
}

export default Sidebar;
