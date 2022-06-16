import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Modal,
  Button,
  Popconfirm,
  message,
  Card,
  Skeleton,
} from "antd";
import Header from "containers/Layouts/Header";
import Footer from "containers/Layouts/Footer";
import { getLocaleMessages } from "redux/helper";
import "assets/css/style.scss";
import { times } from "lodash";
import "assets/css/myaccount.scss";
import { history, store } from "redux/store";
import { checkValid, getLocalData, getLocalDataType } from "redux/helper";
import Action from "redux/AddressBook/actions";
import {
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import CommonHeader from "./CommonHeader";
import AddAddress from "./AddAddress";
import UpdateAddress from "./UpdateAddress";
import { Link, useLocation } from "react-router-dom";

const { Content } = Layout;

const LoginForm = () => {
  const { isLoggedIn } = useSelector((state) => state.Auth);
  const {
    addressList,
    loader,
    countryList,
    sourceData,
    cityList,
  } = useSelector((state) => state.AddressBook);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [AddModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    store.dispatch({
      type: Action.GETALL_ADDRESS,
      customerid: getLocalData("id"),
    });

    /* store.dispatch({
    type: Action.GETALL_CITY,
  })*/

    store.dispatch({
      type: Action.GETALL_COUNTRY,
    });
    store.dispatch({
      type: Action.GET_ALL_CITY_LIST,
    });
  }, ["addressList", "loader", "countryList", "cityList"]);

  const [visible, setVisible] = useState(false);
  const [Editvisible, setEditVisible] = useState(false);

  var cityArrList = [];
  var countryArrList = [];
  var countryArrList1 = [];
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastpath", location.pathname);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    setAddModalVisible(true);
  };

  if (cityList.length > 0) {
    let obj = {};
    cityList.map((list) => {
      obj[list.cityid] = list.language.cityname;
    });
    cityArrList.push(obj);
  }

  if (countryList.length > 0) {
    let obj = {};
    countryList.map((list) => {
      //let obj = {id:list.id, value:list.language[0].countryname}
      obj[list.id] = list.language[0].countryname;
    });
    countryArrList1.push(obj);
  }

  /*if(countryList.length>0){

    countryList.map((list) => {let obj1 = {}
      obj1[list.id]= list.language[0].countryname;

    countryArrList.push(obj1);
    })
  }*/

  const showEditModal = (id) => {


    store.dispatch({
      type: Action.EDIT_ADDRESS,
      id,
    });
    setEditVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    setEditVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditVisible(false);
  }; /*
  const sourceData = {
    address: "vadavalllai ",
city: "coimbatore",
country: "india",
flatno: "door no 7",
fullname: "sivakumar",
landmark: "School",
mobile: "1234567890",
postal: "123123"

};*/
  function confirm(removeId) {
    store.dispatch({
      type: Action.DELETE_ADDRESS,
      userid: getLocalData("id"),
      id: removeId,
      callBackAction: (status) => {
        if (status == 200) {
          message.success(
            getLocaleMessages({ id: "Address Deleted Successfully!" })
          );
        }
      },
    });
  }

  function cancel(e) {

  }
  return (
    <>
      <Layout className={"on-boarding"}>
        {!isLoggedIn && <Header />}
        <Content>
          {/*Detail header*/}

          <section className="myaccount-section">
            <div className="container mx-1000">
              {/*Profile*/}
              <CommonHeader selectedKey={"address"} />
              {/*address book*/}
              <div className="main-box-account address-book-padding">
                <Row gutter={30}>
                  {!loader
                    ? addressList.length > 0
                      ? addressList.map((list) => {
                          var country_id = list.country;
                          var city_id = list.city;
                          return (
                            <Col md={8} span={15}>
                              <div className="address-boxed">
                                <EnvironmentOutlined />
                                <h3>{list.fullname}</h3>
                                <address>
                                  {list.flatno}
                                  {list.address} <br />
                                  {cityArrList.length > 0
                                    ? cityArrList[0][city_id]
                                    : ""}{" "}
                                  <br />
                                  {countryArrList1.length > 0
                                    ? countryArrList1[0][country_id]
                                    : ""}
                                  <br />
                                  {list.landmark != ""
                                    ? "Landmark :" + list.landmark
                                    : ""}
                                  <br />
                                  {list.mobile != ""
                                    ? "Mobile :" + list.mobile
                                    : ""}
                                  <br />
                                  {list.postal != ""
                                    ? "Landmark :" + list.postal
                                    : ""}
                                </address>
                                <div className="btn-flex-end">
                                  <Button
                                    type="primary"
                                    shape="circle"
                                    onClick={() =>
                                      showEditModal({ id: list.id })
                                    }
                                    icon={<EditOutlined />}
                                  ></Button>

                                  <Popconfirm
                                    title="Are you sure？"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={(evt) => confirm(list.id)}
                                    onCancel={cancel}
                                  >
                                    <Button
                                      type="primary"
                                      shape="circle"
                                      icon={<DeleteOutlined />}
                                    />
                                  </Popconfirm>
                                </div>
                              </div>
                            </Col>
                          );
                        })
                      : "Kindly Add your Address Information"
                    : times(6, {}).map((key, index) => {
                        return (
                          <Col sm={12} md={8} key={`${key}${index}`}>
                            <Card hoverable>
                              <Skeleton loading={true} avatar active />
                            </Card>
                          </Col>
                        );
                      })}
                </Row>

                <div className="text-right">
                  <Button
                    type="primary"
                    onClick={showModal}
                    className="add-address-btn"
                  >
                    Add Address
                  </Button>
                </div>
              </div>
              {/*address book*/}
            </div>
          </section>
          <AddAddress
            AddModalVisible={AddModalVisible}
            setAddModalVisible={setAddModalVisible}
            countryList={countryList}
          />
          <UpdateAddress
            editmodalVisible={Editvisible}
            setEditModalVisible={setEditVisible}
            updateData={sourceData}
            countryList={countryList}
          />
          {/*<Modal
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
          </Modal>*/}

          <Footer />
        </Content>
      </Layout>
    </>
  );
};

export default LoginForm;
