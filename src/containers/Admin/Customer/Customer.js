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
  Modal,
  Spin,
  Form,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "assets/css/dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { store } from "redux/store";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { getLocaleMessages } from "redux/helper";
import CreateCustomer from "./CreateCustomer";
import actions from "redux/admin/customerManagement/actions";
import { getLocalData } from "redux/helper";

const Customer = (props) => {
  useEffect(() => {
    store.dispatch({
      type: actions.GET_CUSTOMER_LIST,
    });
  }, []);
  const [visible, setVisible] = useState(false);
  const { loading } = useSelector((state) => state.Customer);
  const { customerList } = useSelector((state) => state.Customer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customer, setcustomer] = useState(0);
  const [form] = Form.useForm();
  const [userPasswordLoader, setuserPasswordLoader] = useState(false);
  const dispatch = useDispatch();

  console.log("this is the value of cutomerList", customerList);

  const onEdit = (id) => {
    setcustomer(id);
    setIsModalVisible(true);
  };

  const updatedPassword = (values, id) => {
    setuserPasswordLoader(true);
    const payloadData = {
      ...values,
      id: id,
    };
    //  console.log(
    //    "this is the value of the update payload dataa",
    //    payloadData,
    //    id
    //  );
    //  return;
    dispatch({
      type: actions.CHANGE_CUSTOMER_PASSWORD,
      payload: payloadData,
      callBackAction: (res) => {
        if (res) {
          setuserPasswordLoader(false);
          message.success("Customer password is updated successfully");
          form.resetFields();
        } else {
          setuserPasswordLoader(false);
          message.error("Password dosen't match");
        }
      },
    });
  };

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
      title: "Mobile No",
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
            <EyeOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                onEdit(id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

      <Modal
        title="Customer Details"
        className="create_category_modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {customerList.map((key, index) => {
          if (key.id == customer) {
            return (
              <div className="booking_details_content" key={`${key}${index}`}>
                <p>
                  <span className="leftside">First Name :</span>
                  <span className="right">{`${key.firstname}`}</span>
                </p>
                <p>
                  <span className="leftside">Last Name : </span>
                  <span className="right">{`${key.lastname}`}</span>
                </p>
                <p>
                  <span className="leftside">Email :</span>{" "}
                  <span className="right">{`${key.email}`}</span>
                </p>
                <p>
                  <span className="leftside">Mobile No :</span>
                  <span className="right">{`${key.contactnumber}`}</span>
                </p>
                <p>
                  <span className="leftside">Status :</span>{" "}
                  <span className="right">{`${
                    key.status ? "Active" : "Inactive"
                  }`}</span>
                </p>
                <h5>Change Customer password</h5>
                <Form
                  layout="vertical"
                  form={form}
                  onFinish={(values) => {
                    updatedPassword(values, key.id);
                  }}
                >
                  <Form.Item
                    label="New Password"
                    name="newpassword"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "New Password is required",
                      },
                      {
                        min: 6,
                        message:
                          "New password length should be minimum 6 characters",
                      },
                      {
                        max: 16,
                        message:
                          "New password length should be maximum 16 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      type="password"
                      placeholder="New Password"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmpassword"
                    dependencies={["newpassword"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      {
                        min: 6,
                        message:
                          "password length should be minimum 6 characters",
                      },
                      {
                        max: 16,
                        message:
                          "password length should be maximum 16 characters",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newpassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={userPasswordLoader}
                    >
                      Update Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            );
          }
        })}
      </Modal>
    </div>
  );
};

export default Customer;
