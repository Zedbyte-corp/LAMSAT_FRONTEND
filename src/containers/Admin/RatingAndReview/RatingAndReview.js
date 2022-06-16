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
} from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { store } from "redux/store";
import actions from "redux/admin/ratingsManagement/actions";
import "assets/css/dashboard.scss";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const { RangePicker } = DatePicker;

const data = [
  {
    key: "1",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Price",
    key: "tags",
    dataIndex: "tags",
  },
];

const RatingAndReview = () => {
  function handleChange(value) {}
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
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto"
        >
          <Card title="Rating And Review">
            <Row>
              <Col span={24} className="form">
                <Table dataSource={data}>
                  <ColumnGroup
                    title="Customer Name"
                    key="customername"
                    dataIndex="customername"
                    render={(text, record) => (
                      <Space size="middle">
                        <Input placeholder="" />
                      </Space>
                    )}
                  />
                  <Column
                    title="Rating"
                    key="ratings"
                    dataIndex="ratings"
                    render={(text, record) => (
                      <Select defaultValue="All" onChange={handleChange}>
                        <Option value="Android">All</Option>
                        <Option value="Android">Android</Option>
                        <Option value="Ios">Ios</Option>
                      </Select>
                    )}
                  />
                  <Column
                    title="Review"
                    key="review"
                    dataIndex="review"
                    render={(text, record) => (
                      <Space size="middle">
                        <Input placeholder="" />
                      </Space>
                    )}
                  />
                  <Column
                    title="Saloon Name"
                    key="vendorname"
                    dataIndex="vendorname"
                    render={(text, record) => (
                      <Space size="middle">
                        <Input placeholder="" />
                      </Space>
                    )}
                  />
                  <Column
                    title="Review Date"
                    key="reviewdate"
                    dataIndex="reviewDate"
                    render={(text, record) => (
                      <Space size="middle">
                        <RangePicker disabledDate={disabledDate} />
                      </Space>
                    )}
                  />
                  <Column
                    title="Review Status"
                    key="status"
                    render={(text, record) => (
                      <Select defaultValue="All" onChange={handleChange}>
                        <Option value="All">All</Option>
                        <Option value="Android">Android</Option>
                        <Option value="Ios">Ios</Option>
                      </Select>
                    )}
                  />
                  <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                      <Space size="middle">
                        <div className="edit">
                          <EditOutlined />
                        </div>
                        <div className="delete">
                          <DeleteOutlined />
                        </div>
                      </Space>
                    )}
                  />
                </Table>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RatingAndReview;
