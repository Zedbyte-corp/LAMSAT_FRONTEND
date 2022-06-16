import React from "react";
import { Menu } from "antd";
import { getLocalData } from "redux/helper";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CommonHeader = (props) => {
  const { selectedKey } = props;
  return (
    <>
      <div className="profile-box" style={{ display: "none" }}>
        <UserOutlined />
        <h3>Profile</h3>
        <p>
          <span>
            {getLocalData("firstname")} {getLocalData("lastname")}
          </span>{" "}
          <span>{getLocalData("email")}</span>{" "}
          <span>{getLocalData("contactnumber")}</span>
        </p>
      </div>
      {/*Profile*/}
      <div className="dash-menus">
        <Menu mode="horizontal" selectedKeys={selectedKey}>
          {/* <Menu.Item key="dashboard"><Link to={'/user-dashboard'}>Dashboard</Link></Menu.Item>  */}
          <Menu.Item key="bookings">
            <Link to={"/bookings"}>Bookings</Link>
          </Menu.Item>
          <Menu.Item key="rate">
            <Link to={"/rate-reviews"}>Rate & Reviews</Link>
          </Menu.Item>
          <Menu.Item key="editprofile">
		  	<Link to={"edit-profile"}>Edit Profile</Link>
          </Menu.Item>
          <Menu.Item key="fav">
            <Link to={"/favourites"}>Favourites</Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default CommonHeader;
