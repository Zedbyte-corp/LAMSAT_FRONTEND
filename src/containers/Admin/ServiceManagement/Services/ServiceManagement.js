import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Spin,
  Select,
  Menu,
  Dropdown,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
  UserOutlined,
  MoreOutlined,
  DownOutlined,
} from "@ant-design/icons";
import CreateCategory from "../Category/CreateCategory";
import { getLocaleMessages } from "redux/helper";
import { useSelector, useDispatch } from "react-redux";
import "assets/css/dashboard.scss";
import CreateService from "./CreateService";
import UpdateService from "./UpdateService";
import actions from "redux/vendor/Services/actions";
import { store } from "redux/store";
import swal from "sweetalert";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";

const { Column, ColumnGroup } = Table;

const ServiceManagement = (props) => {
  var categoryArr = [];
  useEffect(() => {
    store.dispatch({
      type: actions.GET_VENDOR_LIST,
    });
    //
    // setserviceloader(true);
    // store.dispatch({
    //   type: actions.GET_SERVICES_LIST,
    //   vendorid: 0,
    //   callBackAction: (data)=>{
    //     setserviceloader(false);
    //   }
    // });
  }, []);

  const [showCategory, setShowCategory] = useState(false);
  const [showService, setShowService] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [waitingForApprovalCount, setWaitingForApprovalCount] = useState(0);
  const [vendorId, setVendorId] = useState(0);
  const [serviceloader, setserviceloader] = useState(false);
  const [deleteloader, setdeleteloader] = useState(false);
  const [serviceId, setServiceId] = useState(0);
  const {
    serviceList,
    vendorServiceList,
    categoryList,
    categoryUpdateList,
    vendorList,
    loader,
  } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);

  const onNewCatMenuClick = () => {
    console.log("VendorId: " + vendorId);
    if (vendorId > 0) {
      setShowCategory(true);
    } else {
      setShowCategory(false);
      message.error("Please select a saloon.");
    }
  };

  const menuCreate = (
    <Menu>
      {/* <Menu.Item
        key="cat"
        onClick={() => {
          onNewCatMenuClick();
        }}
      >
        New Category
      </Menu.Item> */}
      <Menu.Item
        key="ser"
        onClick={() => {
          setSelectedCatId(0);
          setShowService(true);
        }}
      >
        New Service
      </Menu.Item>
    </Menu>
  );

  const onMenuClick = (status, catId) => {
    console.log("catId: " + catId);
    setShowService(status);
    setSelectedCatId(catId);
  };

  const handleChangeServiceStatus = (args) => {
    var s = args.split(",");
    store.dispatch({
      type: actions.UPDATE_ADMIN_SERVICE_ENTRY,
      id: parseInt(s[0]),
      field: s[1],
    });
  };

  const handleChangeVendor = (value) => {
    setVendorId(value);
    setserviceloader(true);
    store.dispatch({
      type: actions.GET_SERVICES_LIST,
      vendorid: parseInt(value),
      callBackAction: (data) => {
        setserviceloader(false);
      },
    });
  };

  return (
    <div>
      <Row>
        <Col span={24} className="dashboard-content">
          <Spin spinning={loader || deleteloader} size={"large"}>
            <Card
              //title={`${getLocaleMessages({ id: "service.title" })}`}
              title="Service"
              extra={
                <>
                  <Select
                    // placeholder={getLocaleMessages({ id: 'selectvendor.label' })}
                    placeholder={"Select Saloon"}
                    onChange={handleChangeVendor}
                    style={{ marginRight: 30, width: 250 }}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {vendorList &&
                      vendorList.length > 0 &&
                      vendorList.map((list, id) => {
                        return (
                          <option value={list.id} key={id}>
                            {list.vendorname}
                          </option>
                        );
                      })}
                  </Select>

                  <Dropdown overlay={menuCreate}>
                    <Button
                      type="primary"
                      htmlType="create"
                      className="save-btn"
                    >
                      Create <DownOutlined />
                    </Button>
                  </Dropdown>
                </>
              }
            >
              {/*
            <Spin size="large" spinning={loading}>
              <DataTable columns={columns} dataSource={vendorServiceList} />
            </Spin>
            */}

              {console.log(
                "vendorServiceList: " + JSON.stringify(vendorServiceList)
              )}

              {loader
                ? ""
                : vendorId && vendorServiceList.length > 0
                ? vendorServiceList.map((serviceData, index) => (
                    <>
                      <div className="service_cat_head">
                        <div>
                          <h3>{serviceData.categoryname}</h3>
                        </div>
                      </div>

                      <ul className="service_cat_head_child">
                        {serviceData.servicelang &&
                        serviceData.servicelang.length > 0 ? (
                          serviceData.servicelang.map((service, index) =>
                            typeof service.servicename != undefined &&
                            service.servicename !== "" ? (
                              <li>
                                <h4>{service.servicename}</h4>
                                {service.permission !== "Approved" ? (
                                  <>
                                    <Select
                                      placeholder="Approve/Reject"
                                      onChange={handleChangeServiceStatus}
                                    >
                                      {" "}
                                      <option
                                        value={service.serviceid + ",Approved"}
                                      >
                                        Approve
                                      </option>
                                      <option
                                        value={service.serviceid + ",Rejected"}
                                      >
                                        Reject
                                      </option>
                                    </Select>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {/*<p>
                          serviceData.price[0].duration+' min'
                        </p>
                        */}
                                {/*<p className="">
                          <span>SAR{serviceData.price[0] ? serviceData.price[0].price : 0 }</span> SAR
                          {serviceData.price[0] ? serviceData.price[0].special_price : 0}
                        </p>
                        */}
                                <div className="options">
                                  <EditOutlined
                                    name={service.serviceid + "name"}
                                    id={service.serviceid}
                                    onClick={() => {
                                      localStorage.setItem(
                                        "serviceData",
                                        JSON.stringify(serviceData)
                                      );

                                      localStorage.setItem(
                                        "serviceDataVendorId",
                                        vendorId
                                      );
                                      localStorage.setItem(
                                        "serviceID",
                                        service.serviceid
                                      );
                                      props.history.push({
                                        pathname: "/admin/Services/update",
                                      });
                                    }}
                                  />
                                  <DeleteOutlined
                                    name={service.serviceid + "name"}
                                    id={service.serviceid}
                                    onClick={() => {
                                      let id = parseInt(
                                        //service.serviceid
                                        serviceData.categoryid
                                      );
                                      // SweetAlert.sweetConfirmHandler(
                                      //   id,
                                      //   "service",
                                      //   "DELETE_VENDOR_SERVICE"
                                      // );
                                      setdeleteloader(true);
                                      store.dispatch({
                                        type: actions.DELETE_VENDOR_SERVICE,
                                        id: id,
                                        vendorid: vendorId,
                                        callBackAction: (data) => {
                                          setdeleteloader(false);
                                        },
                                      });
                                    }}
                                  />
                                </div>
                              </li>
                            ) : (
                              <></>
                            )
                          )
                        ) : (
                          <></>
                        )}
                      </ul>
                    </>
                  ))
                : vendorId && vendorServiceList.length === 0
                ? "No service Found"
                : ""}

              <CreateCategory
                modalVisible={showCategory && vendorId > 0}
                setModalVisible={setShowCategory}
                vendorId={vendorId}
              />

              <CreateService
                modalVisible={showService}
                setModalVisible={setShowService}
                selectedCatId={selectedCatId}
              />
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceManagement;
