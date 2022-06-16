import React, { useEffect } from "react";
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
  Button,
  Spin,
} from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { store } from "redux/store";
import actions from "redux/admin/Administrator/actions";
import "assets/css/dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "helpers/datatableAPI";
import SweetAlert from "helpers/sweetalert";
import { getLocaleMessages } from "redux/helper";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: getLocaleMessages({ id: "activitylog.username" }),
    dataIndex: "username",
    key: "username",
  },
  {
    title: getLocaleMessages({ id: "activitylog.logdetails" }),
    dataIndex: "log",
    key: "log",
  },
  {
    title: getLocaleMessages({ id: "activitylog.clientip" }),
    dataIndex: "clientip",
    key: "clientip",
  },
  {
    title: getLocaleMessages({ id: "activitylog.clientplatform" }),
    dataIndex: "clientplatform",
    key: "clientplatform",
  },
  {
    title: getLocaleMessages({ id: "activitylog.datetime" }),
    key: "created_at",
    dataIndex: "created_at",
  },
  {
    title: getLocaleMessages({ id: "Actions" }),
    key: "action",

    render: (text, record) => {
      var text = text;

      return (
        <Space size="middle">
          <div className="delete">
            <DeleteOutlined
              name={text.id + "name"}
              id={text.id}
              onClick={() => {
                let id = parseInt(text.id);

                SweetAlert.sweetConfirmHandler(id, "activitylog", "DELETE_LOG");
              }}
            />
          </div>
        </Space>
      );
    },
  },
];

const ActiveLog = () => {
  const { loading } = useSelector((state) => state.Administrator);
  const { activityLogData, lastPage } = useSelector(
    (state) => state.Administrator
  );
  function handleChange(value) {}
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };
  useEffect(() => {
    localStorage.removeItem("lastpage");
    store.dispatch({
      type: actions.GET_ACTIVITY_LOG,
      page: 1,
    });
  }, []);

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
          <Card title={getLocaleMessages({ id: "activitylog.title" })}>
            <Spin size="large" spinning={loading}>
              <DataTable columns={columns} dataSource={activityLogData} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ActiveLog;
