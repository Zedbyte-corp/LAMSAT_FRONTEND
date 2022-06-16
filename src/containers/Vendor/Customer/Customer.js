import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Switch,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "assets/css/dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { store } from "redux/store";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { getLocaleMessages } from "redux/helper";
import CreateCustomer from "./CreateCustomer";
import actions from "redux/admin/customerManagement/actions";

const Customer = (props) => {
  useEffect(() => {
    store.dispatch({
      type: actions.GET_CUSTOMER_LIST,
    });
  }, []);
  const [visible, setVisible] = useState(false);
  const { loading } = useSelector((state) => state.Customer);
  const { customerList } = useSelector((state) => state.Customer);

  const coulmns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contactnumber",
      key: "contactnumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
          {record.status ? <a>Active</a> : <a>Inactive</a>}
        </Space>
      ),
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

                  SweetAlert.sweetConfirmHandler(
                    id,
                    "customer",
                    "DELETE_CUSTOMER"
                  );
                }}
              />
            </div>
          </Space>
        );
      },
    },
  ];

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
          <Card
            title="Customer"
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
            <div>
              <Col span={24} className="inner-content">
                <Spin size="large" spinning={loading}>
                  <DataTable columns={coulmns} dataSource={customerList} />
                </Spin>
              </Col>
            </div>
            <CreateCustomer
              modalVisible={visible}
              setModalVisible={setVisible}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
