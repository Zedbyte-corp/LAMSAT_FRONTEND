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
  Tabs,
  Form,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "assets/css/dashboard.scss";
import CreateStaf from "./CreateStaf";
import CreateStaff from "./CreateStaff";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import admintimeslotaction from "redux/admin/Timeslot/actions";
import { store } from "redux/store";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import StafTime from "./StafTime";
const { Column, ColumnGroup } = Table;
const { Option } = Select;
const data = [
  {
    key: "1",
  },
];

const { TabPane } = Tabs;

const StafManagement = (props) => {
  const [visible, setVisible] = useState(false);
  const [term, setTerm] = useState();
  const { staffList } = useSelector((state) => state.Staffs);
  const [staffData, setstaffData] = useState([]);
  const [filterstaffloader, setfilterstaffloader] = useState(false);
  const { loading } = useSelector((state) => state.Staffs);
  const { vendorDetails } = useSelector((state) => state.AdminTimeslot);
  const [vendorfilterID, setvendorfilterID] = useState(0);
  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_STAFF_LIST,
    });
    store.dispatch({
      type: admintimeslotaction.GET_ADMIN_VENDOR_LIST,
    });
  }, []);
  useEffect(() => {
    if (staffList) {
      if(vendorfilterID == 0)
      {
        setstaffData(staffList);
      } else {
        var filtercreateData = staffList.filter((data) => data.vendorid == vendorfilterID);
        setstaffData(filtercreateData);
      }
    }
  }, [staffList]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      onFilter: (value, record) => record.firstname.indexOf(value) === 0,
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      onFilter: (value, record) => record.lastname.indexOf(value) === 0,
      sorter: (a, b) => a.lastname.length - b.lastname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mobile Number",
      dataIndex: "contactnumber",
      key: "contactnumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vendor Name",
      dataIndex: "email",
      key: "email",
      render: (text, record) => record.vendor_details[0].vendorname,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
          {record.status ? <a>Active </a> : <a>Inactive</a>}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        var text = text;
        return (
          <Space size="middle">
            <div className="edit">
              {text.isnopref !== 1 ? (
                <EditOutlined
                  name={text.id + "name"}
                  id={text.id}
                  onClick={() => {
                    localStorage.setItem("staffData", JSON.stringify(text));
                    props.history.push({
                      pathname: "/admin/StafManagement/update",
                    });
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="delete">
              {text.isnopref !== 1 ? (
                <DeleteOutlined
                  name={text.id + "name"}
                  id={text.id}
                  onClick={() => {
                    let id = parseInt(text.id);
                    SweetAlert.sweetConfirmHandler(id, "staff", "DELETE_STAFF");
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </Space>
        );
      },
    },
  ];

  const selectVendorList = (value) => {
    setfilterstaffloader(true);
    setTerm(value);
    if (value) {
      if(value == "all")
      {
        setstaffData(staffList);
        setfilterstaffloader(false);
        setvendorfilterID(0)
      } else {
        var filterStaffData = staffList.filter((data) => data.vendorid == value);
        setstaffData(filterStaffData);
        setfilterstaffloader(false);
        setvendorfilterID(value);
      }
    } else {
      setstaffData(staffList);
      setfilterstaffloader(false);
    }
  };

  function onSearch(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto"
        >
          <Tabs
            defaultActiveKey="1"
            size="large"
            tabBarGutter={15}
            className="nav_tabs"
          >
            <TabPane tab="Staff" key="1">
              <Card
                title="Staff"
                extra={
                  <Button
                    type="primary"
                    htmlType="create"
                    onClick={() => setVisible(true)}
                    className="save-btn"
                  >
                    Create
                  </Button>
                }
              >
                <Row gutter={30} className="inner-content">
                  <Col span={10}>
                    <Select
                      mode="single"
                      placeholder={"Select Saloon"}
                      onChange={selectVendorList}
                      showSearch
                      allowClear
                      // onClear={}
                      optionFilterProp="children"
                      onSearch={onSearch}
                      autoClearSearchValue
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                       <Option value={'all'} key={'all'}>
                          {'All vendors'}
                        </Option>
                      {vendorDetails &&
                        vendorDetails.length > 0 &&
                        vendorDetails.map((list, id) => {
                          return (
                            <Option value={list.id} key={id}>
                              {`${list.vendorname}`}
                            </Option>
                          );
                        })}
                    </Select>
                  </Col>
                </Row>
                <Col span={24} className="inner-content">
                  <Spin size="large" spinning={loading || filterstaffloader}>
                    <DataTable columns={columns} dataSource={staffData} />
                  </Spin>
                </Col>
                <CreateStaff
                  modalVisible={visible}
                  setModalVisible={setVisible}
                  staffData={staffData}
                  setstaffData={setstaffData}
                  setTerm={setTerm}
                />
              </Card>
            </TabPane>
            <TabPane tab="Staff Time" key="2">
              {/* Content of card tab 2 */}
              <StafTime prop={props} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default StafManagement;
