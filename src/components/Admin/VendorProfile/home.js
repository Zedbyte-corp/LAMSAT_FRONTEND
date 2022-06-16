// CategoryPage Component
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  message,
  Space,
  Select,
  InputNumber,
  Checkbox,
  Radio,
  Table,
  Spin,
  Row,
  Col,
} from "antd";
import { getLocaleMessages } from "redux/helper";
//import Hoom from 'helpers/hoom';
import Actions from "redux/admin/adminvendorprofile/actions";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "assets/css/dashboard.scss";
import TimeSlot from "../Timeslot/Time";
const { Option } = Select;
const { TabPane } = Tabs;

const Home = (props) => {
  const { selectedRowKeys, searchedColumn, fromPageNo } = useSelector(
    (state) => state.Administrator
  );
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();

  const {
    isvendorDetails,
    vendorDetails,
    loading,
    loadingdeletevendor,
    SalonvendorDetails,
  } = useSelector((state) => state.AdminVendorProfile);
  useEffect(() => {
    if (isvendorDetails) {
      dispatch({
        type: Actions.GET_ALL_VENDOR_NEW,
      });
    }
  }, [SalonvendorDetails]);

  // const { isvendorDetails, vendorDetails, loading, loadingdeletevendor } = useSelector(state=>state.AdminVendorProfile);
  // useEffect(() => {
  //   if(isvendorDetails){
  //   dispatch({
  //       type: Actions.GET_ALL_VENDOR,
  //   })
  //   }
  // },[vendorDetails])

  const handleChange = (id, value) => {
    if (value) {
      let data = {
        id: id,
        isaccepted: parseInt(value),
      };
      dispatch({
        type: Actions.ACCEPT_VENDOR_REQUEST,
        payload: data,
        callBackAction: (status) => {
          dispatch({
            type: Actions.GET_ALL_VENDOR_NEW,
          });
        },
      });
    }
  };

  // vendorDetails && vendorDetails.length > 0 && vendorDetails.map((list, id) => {
  //   list.statusvalue = list.status == 1 ? 'Active' : 'inActive';
  //   return list;
  // })
  SalonvendorDetails &&
    SalonvendorDetails.length > 0 &&
    SalonvendorDetails.map((list, id) => {
      list.statusvalue = list.status == 1 ? "Active" : "inActive";
      return list;
    });
  const columns = [
    {
      title: "Saloon Name",
      dataIndex: "vendorname",
      Flter: true,
      onFilter: (value, record) => record.vendorname.indexOf(value) === 0,
      sorter: (a, b) => a.vendorname.length - b.vendorname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "User Name",
      dataIndex: "username",
      Flter: true,
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email Id",
      dataIndex: "email",
      Flter: true,
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Approval Status",
      dataIndex: "",
      key: "x",
      render: (data) =>
        data.isaccepted === 0
          ? "Pending"
          : data.isaccepted === 1
          ? "Accepted"
          : data.isaccepted === 2
          ? "Rejected"
          : "",
      sorter: (a, b) => a.statusvalue.length - b.statusvalue.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "statusvalue",
      sorter: (a, b) => a.statusvalue.length - b.statusvalue.length,
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Approval Status",
    //   dataIndex: "IsAccepted",
    //   render: (text, record) => {
    //     var record = record;
    //     return (
    //       <Space size="middle">
    //         {(record.isstaffaccepted == 1 && record.isprofileaccepted == 1 && record.isserviceaccepted == 1) ?
    //         (record.isaccepted == 0 ?
    //           <Select
    //             defaultValue={`Pending`}
    //             style={{ width: 120 }}
    //             onChange={(value, event) =>
    //               handleChange(record.id, value)
    //             }
    //           >
    //             <Option value="1">Accept</Option>
    //             <Option value="2">Reject</Option>
    //           </Select>
    //           : record.isaccepted == 1
    //           ? <span style={{ width: 120 }}>Accepted</span>
    //           : <span style={{ width: 120 }}>Rejected</span>
    //           )
    //         : <span style={{ width: 120 }}>Pending</span>
    //         }
    //       </Space>
    //     );
    //   },
    // },
    {
      title: "Action",
      dataIndex: "pagetitle",
      key: "x",
      render: (text, record) => {
        var record = record;
        return (
          <Space size="middle">
            <div className="delete">
              <DeleteOutlined
                id={record.id}
                onClick={(e) => {
                  let id = parseInt(record.id);
                  SweetAlert.sweetConfirmHandler(
                    id,
                    "adminvendorprofile",
                    "VENDOR_DELETE"
                  );
                }}
              />
            </div>
            <div className="edit">
              <EditOutlined
                id={record.id}
                onClick={(e) => {
                  let id = parseInt(record.id);
                  onEdit(id);
                }}
              />
            </div>
          </Space>
        );
      },
    },
  ];

  const onEdit = (id) => {
    props.history.push("/admin/vendor/update?id=" + id);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: Actions.ASSIGN_SERCHED_DATA,
      value: selectedKeys[0],
      value1: dataIndex,
    });
  };

  const movetopage = () => {
    props.history.push("/admin/vendor/create");
  };
  return (
    <div>
      <Spin spinning={!loading}>
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
              type="card"
              size="large"
              tabBarGutter={15}
              className="nav_tabs"
            >
              <TabPane tab="Saloon" key="1">
                <Row>
                  <Col
                    offset={0}
                    xs={22}
                    md={22}
                    lg={22}
                    className="dashboard-content mg-auto"
                  >
                    <Card
                      title={"Saloon"}
                      // title={getLocaleMessages({id:'title.profileInformation'})}
                      extra={
                        <Button
                          type="primary"
                          htmlType="create"
                          onClick={movetopage}
                          className="save-btn"
                        >
                          Create
                        </Button>
                      }
                    >
                      <div>
                        <Col span={24} className="inner-content">
                          {/* <Table columns={columns} dataSource={categoryList} /> */}
                          <Spin size="large" spinning={loadingdeletevendor}>
                            <DataTable
                              columns={columns}
                              dataSource={SalonvendorDetails}
                            />
                            {/* <DataTable columns={columns} dataSource={vendorDetails}/> */}
                          </Spin>
                        </Col>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Saloon Working Hours" key="2">
                <TimeSlot />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Home;
