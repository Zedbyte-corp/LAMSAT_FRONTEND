import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Input,
  Table,
  Space,
  Select,
  Card,
  DatePicker,
  Switch,
  Spin,
} from "antd";
import moment from "moment";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { store } from "redux/store";
import actions from "redux/admin/ratingsManagement/actions";
//import Actions from 'redux/admin/Administrator/actions';
import Actions from "redux/admin/settings/actions";
import "assets/css/dashboard.scss";
import SweetAlert from "helpers/sweetalert";
import DataTable from "helpers/datatable";
import timeActions from "redux/admin/Timeslot/actions";
import { getLocaleMessages, getLocalData } from "redux/helper";

const RatingAndReview = (props) => {
  const dispatch = useDispatch();
  const { Option } = Select;

  const { AdministratorassignedData, isAdministratorProfile } = useSelector(
    (state) => state.Administrator
  );
  const { rating_data, isRatingProfile,submitLoader } = useSelector(
    (state) => state.AppSettings
  );
  const { ratingLoader } = useSelector((state) => state.AdminRating);
  const [Availability, setAvailability] = useState(0);
  const [vendorId, setVendorId] = useState(0);

  const [isSelect, setSelect] = useState();

  const {
    timeVisible,
    VendorTimeslot,
    timeDetails,
    vendorVisible,
    vendorDetails,
  } = useSelector((state) => state.AdminTimeslot);

  const handleChangeService = (value) => {
    if (value != 0) {
      setAvailability(value);
      setVendorId(value);

      store.dispatch({
        type: timeActions.GET_ADMIN_TIME_LIST,
        vendorid: value
      });
    } else {
      setAvailability(value);
      setVendorId(value);

      store.dispatch({
        type: Actions.GET_ADMIN_RATINGS,
      });
      /*store.dispatch({
        type: timeActions.GET_ADMIN_TIME_LIST,
        vendorid: vendorDetails[0].id,
      });*/
    }
  };

  useEffect(() => {
    if (timeVisible && timeVisible.length) {

      setAvailability(vendorDetails[0].id);
      setSelect(vendorDetails[0].vendorname);
      store.dispatch({
        type: timeActions.GET_ADMIN_TIME_LIST,
        vendorid: vendorDetails[0].id,
      });
    }

    if (vendorVisible) {
      store.dispatch({
        type: timeActions.GET_ADMIN_VENDOR_LIST,
        vendorid: getLocalData("id"),
      });
    }
  }, [VendorTimeslot, vendorDetails]);

  useEffect(() => {
    if (isRatingProfile) {
      dispatch({
        type: Actions.GET_ADMIN_RATINGS,
      });
    }
  }, [rating_data]);

  rating_data &&
    rating_data.length > 0 &&
    rating_data.map((list, id) => {
      list.statusvalue = list.isreview == 1 ? "Active" : "inActive";
      return list;
    });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      Flter: true,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      onFilter: (value, record) => record.rating.indexOf(value) === 0,
      sorter: (a, b) => a.rating.length - b.rating.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Review",
      dataIndex: "review",
      onFilter: (value, record) => record.review.indexOf(value) === 0,
      sorter: (a, b) => a.review.length - b.review.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mobile Number",
      dataIndex: "contactnumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Saloon",
      dataIndex: "vendorname",
      onFilter: (value, record) => record.vendorname.indexOf(value) === 0,
      sorter: (a, b) => a.vendorname.length - b.vendorname.length,
      sortDirections: ["descend", "ascend"],
    },

    // {
    //   title: "Status",
    //   dataIndex: "statusvalue",
    //   sortDirections: ["descend", "ascend"],
    //   sorter: (a, b) => a.status.length - b.status.length,
    //   render: (text, record) => {
    //     var record = record;
    //     return (
    //       <Space size="middle">
    //         <Select
    //           defaultValue={`${record.isreview}`}
    //           style={{ width: 120 }}
    //           onChange={(value, event) =>
    //             handleChange(record.id, value)
    //           }
    //         >
    //           <Option value="1">Accepted</Option>
    //           <Option value="0">Rejected</Option>
    //         </Select>
    //       </Space>
    //     );
    //   },
    // },

    {
      title: "Action",
      dataIndex: "name",
      key: "x",
      render: (text, record) => {
        var record = record;
        return (
          <Space size="middle">
            <DeleteOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                SweetAlert.sweetConfirmHandler(
                  id,
                  "AppSettings",
                  "DELETE_RATING"
                );
              }}
            />
          </Space>
        );
      },
    },
    /*
{
  title: 'Action', dataIndex: 'username', key: 'x',
  render: (text, record) => {
    var record = record;
    return (
    <Space size="middle">
      <DeleteOutlined id={record.id} onClick={(e) => {
        let id = parseInt(record.id);
        SweetAlert.sweetConfirmHandler(id,'Administrator','DELETE_ADMINISTRATOR');
      }}/>
      <EditOutlined id={record.id} onClick={(e) => {
        let id = parseInt(record.id);
        onEdit(id);
      }} />
    </Space>
  )},
},*/
  ];

  const onEdit = (id) => {
    props.history.push("/admin/administrator/update?id=" + id);
  };

  const movetopage = () => {
    props.history.push("/admin/administrator/create");
  };

  function handleChange(id, value) {
    dispatch({
      type: Actions.ADMIN_UNAPPROVE_RATING,
      params: {
        id: id,
        approval: parseInt(value),
      },
    });
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };
  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_RATING_LIST,
    });
  }, []);

  return (
    <div>
      <Row>
        <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
          <Card title="Rating And Review">
            <Row style={{ marginBottom: "2%" }}>
              <Col span={6}>
                <Spin size="large" spinning={vendorVisible}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Filter"
                    onChange={handleChangeService}
                  >
                    <option value="0" onClick={() => setVendorId(0)}>
                      {" "}
                      --- Remove Filter ---
                    </option>
                    {vendorDetails &&
                      vendorDetails.length > 0 &&
                      vendorDetails.map((list, id) => {
                        return (
                          <option value={list.id} key={id}>
                            {list.vendorname}
                          </option>
                        );
                      })}
                  </Select>
                </Spin>
              </Col>
              <Col span={2} offset={1}>
                {/* <Button type="primary" htmlType="create" className="save-btn">
                  Filter
                </Button> */}
              </Col>
            </Row>
            <Row>
              <Col span={24} className="form">
                <Spin size="large" spinning={ratingLoader || submitLoader}>
                  <DataTable
                    columns={columns}
                    dataSource={
                      rating_data.length > 0 && vendorId == 0
                        ? rating_data.map((list) => {
                          return list;
                        })
                        : rating_data.filter((list) => {
                          return list.vendorid == vendorId ? list : "";
                        })
                    }
                  />
                </Spin>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RatingAndReview;
