// CategoryPage Component
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
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
} from "antd";
import { getLocaleMessages } from "redux/helper";
import Actions from "redux/admin/Administrator/actions";

import swal from "sweetalert";
import "assets/css/dashboard.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const Create = (props) => {
  const {
    AdministratorassignedData,
    isAdministratorProfile,
    redirect,
    roleList,
  } = useSelector((state) => state.Administrator);

  if (redirect == true) {
    props.history.push("/admin/administrator");
  }
  const [CreateForm] = Form.useForm();
  useEffect(() => {
    if (isAdministratorProfile) {
      dispatch({
        type: Actions.GET_ACTIVE_ROLES,
      });
    }
  }, [roleList]);
  const { Option } = Select;
  const dispatch = useDispatch();
  const roles = [];
  roleList.map((w) => {
    roles.push({ label: w.rolename, value: w.id });
  });
  const [value, setValue] = React.useState(1);
  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: true, message: "Select Country code!" }]}
    >
      <Select
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const onChangeStatus = (ev) => {
    if (ev.target.name === "isActive") {
      if (ev.target.value === "active") {
        var value = 1;
      } else if (ev.target.value === "inactive") {
        var value = 0;
      }

      dispatch({
        type: Actions.ADMINISTRATOR_STATUS,
        value: value,
      });
    }
  };

  const onChangeRole = (e) => {
    /*dispatch({
            type: Actions.ROLE_TYPE,
            value:ev.target.value
        })   */
  };
  const onChange = (e) => {
    //setValue(e.target.value);
  };

  const onFinish = (values) => {
    {
      var password = document.getElementById("basic_password").value;
      var confirmPassword = document.getElementById("basic_confirm").value;
      if (password == confirmPassword) {
        dispatch({
          type: Actions.CREATE_ADMINISTRATOR,
          payload: {
            firstname: values["firstname"],
            lastname: values["lastname"],
            username: values["username"],
            email: values["email"],
            prefix: values["prefix"],
            password: password,
            confirmpassword: confirmPassword,
            contactnumber: values["phone"],
            usertypeid: 1,
            roleid: values["roles"],
            status: values["status"] == "" ? 0 : 1,
          },
        });
      } else {
        swal({
          title: getLocaleMessages({ id: "Administration Created" }),
          icon: "info",
          button: false,
          timer: 1500,
        });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {};

  const backtopage = () => {
    props.history.push("/admin/administrator");
  };

  return (
    <div>
      <Row>
        <Col span={2}></Col>
        <Col span={20} className="dashboard-content">
          <Card
            title={"Create Administrator"}
          >
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                phone: "",
                password: "",
                confirm: "",
                roles: "",
                status: "",
              }}
              form={CreateForm}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Firstname"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Lastname"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be minimum 6 characters.",
                  },
                  {
                    max: 16,
                    message: "Password can be maximum 16 characters.",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirm"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                  {
                    min: 6,
                    message: "Password must be minimum 6 characters.",
                  },
                  {
                    max: 16,
                    message: "Password can be maximum 16 characters.",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    min: 8,
                    message: "Phone Number must be minimum 8 characters.",
                  },
                  {
                    max: 16,
                    message: "Phone Number can be maximum 16 characters.",
                  }                  
                ]}
              >
                <Input
                  type="number"
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="roles"
                label="Roles"
                rules={[
                  {
                    required: true,
                    message: "Roles is required!",
                  },
                ]}
              >
                <Select allowClear options={roles} onChange={onChangeRole} />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Status is required!",
                  },
                ]}
              >
                <Radio.Group onChange={onChangeStatus} value={value}>
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>InActive</Radio>
                </Radio.Group>
              </Form.Item>

              <div className="button-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={backtopage}
                  className="save-btn"
                >
                  Back
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="save-btn mr-20"
                >
                  Save
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Create;
