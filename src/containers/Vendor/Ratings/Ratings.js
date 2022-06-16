import React, { useEffect, useState } from "react";
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
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { store } from "redux/store";
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import actions from "redux/vendor/Ratings/actions";
//import Actions from "redux/admin/ratingsManagement/actions";

import Adminactions from "redux/admin/settings/actions";
import "assets/css/dashboard.scss";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { getLocaleMessages, getLocalData } from "redux/helper";

const RatingManagement = (props) => {
  const dispatch = useDispatch();
  const { Option } = Select;

  const { ratingList } = useSelector((state) => state.VendorRating);
  console.log("this is the value of the rating", ratingList);
  const { ratingLoader } = useSelector((state) => state.VendorRating);
  useEffect(() => {
    store.dispatch({
      type: actions.GET_VENDOR_RATING_LIST,
      id: getLocalData("id"),
    });
  }, ["ratingList"]);

  ratingList &&
    ratingList.length > 0 &&
    ratingList.map((list, id) => {
      list.statusvalue = list.isreview == 1 ? "Active" : "inActive";
      return list;
    });

  function handleStatusChange(value, event, key) {
    dispatch({
      type: Adminactions.ADMIN_APPROVE_RATING,
      params: {
        id: key.id,
        approval: parseInt(value),
      },
    });

    setTimeout(() => {
      store.dispatch({
        type: actions.GET_VENDOR_RATING_LIST,
        id: getLocalData("id"),
      });
    }, 4000);
  }

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
      title: "Username",
      dataIndex: "user_name",
      onFilter: (value, record) => record.review.indexOf(value) === 0,
      sorter: (a, b) => a.review.length - b.review.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mobile number",
      dataIndex: "contactnumber",
      onFilter: (value, record) => record.review.indexOf(value) === 0,
      sorter: (a, b) => a.review.length - b.review.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "user_email",
      onFilter: (value, record) => record.review.indexOf(value) === 0,
      sorter: (a, b) => a.review.length - b.review.length,
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
    //       <Select
    //         defaultValue={`${record.isreview}`}
    //         style={{ width: 120 }}
    //         onChange={(value, event) =>
    //           handleStatusChange(value, event, record)
    //         }
    //       >
    //         <Option value="0">Pending</Option>
    //         <Option value="1">Approved</Option>
    //         <Option value="2">Rejected</Option>
    //       </Select>
    //     );
    //   },
    // },

    // {
    //   title: "Action",
    //   dataIndex: "name",
    //   key: "x",
    //   render: (text, record) => {
    //     var record = record;
    //     return (
    //       <Space size="middle">
    //         <DeleteOutlined
    //           id={record.id}
    //           onClick={(e) => {
    //             let id = parseInt(record.id);
    //             SweetAlert.sweetConfirmHandler(
    //               id,
    //               "AppSettings",
    //               "DELETE_RATING"
    //             );
    //             setTimeout(() => {
    //               store.dispatch({
    //                 type: actions.GET_VENDOR_RATING_LIST,
    //                 id: getLocalData("id"),
    //               });
    //             }, 4000);
    //           }}
    //         />
    //       </Space>
    //     );
    //   },
    // },
    /*
  {
    title: 'Action', dataIndex: 'name', key: 'x',
    render: (text, record) => {
      var record = record;
      return (
      <Space size="middle">
        <DeleteOutlined id={record.id} onClick={(e) => {
          let id = parseInt(record.id);
          SweetAlert.sweetConfirmHandler(id,'AppSettings','DELETE_RATING');
        }}/>
        {
          record.isreview== 1?
        <CheckOutlined id={record.id} onClick={(e) => {
          let id = parseInt(record.id);
          UnApprove(id);
        }}/>:
        <CloseOutlined id={record.id} onClick={(e) => {
          let id = parseInt(record.id);
          Approve(id);
        }}/>
      }

      </Space>
    )},
  },*/
  ];
  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={24}
          md={24}
          lg={24}
          className="dashboard-content mg-auto vendor"
        >
          <Card title="Rating & Review">
            <Row>
              <Col span={24} className="inner-content">
                <Spin size="large" spinning={ratingLoader}>
                  <DataTable columns={columns} dataSource={ratingList} rowModify={true} field={'RATING'}/>
                </Spin>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RatingManagement;
