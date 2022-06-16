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
import queryString from "query-string";

import "assets/css/dashboard.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const Update = (props) => {
  const [UpdateForm] = Form.useForm();
  let params = queryString.parse(props.location.search);
  const {
    firstname,
    isAdministratorProfile,
    lastname,
    username,
    email,
    status,
    phone,
    roletype,
    adminid,
    roleList,
    redirect,
    prefix,
  } = useSelector((state) => state.Administrator);

  if (redirect == true) {
    props.history.push("/admin/administrator");
  }

  /*useEffect(()=>{
    if(isVendorProfile){
        store.dispatch({
            type: actions.VENDOR_EDIT_PROFILE_STATUS,
            payload: false,
        })
        profileUsedForm.resetFields();
    }

},[ profileUsedForm,isVendorProfile])*/
  useEffect(() => {
    if (
      isAdministratorProfile &&
      params.id > 0 &&
      params.id !== null &&
      typeof params.id !== undefined
    ) {
      dispatch({
        type: Actions.GET_SINGLE_ADMINISTRATOR,
        payload: parseInt(params.id),
      });
    }
    UpdateForm.resetFields();
  }, [
    UpdateForm,
    firstname,
    lastname,
    username,
    email,
    status,
    phone,
    roletype,
    adminid,
    prefix,
  ]);

  const { Option } = Select;
  useEffect(() => {
    if (isAdministratorProfile) {
      dispatch({
        type: Actions.GET_ACTIVE_ROLES,
      });
    }
  }, [roleList]);
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
    dispatch({
      type: Actions.ADMINISTRATOR_STATUS,
      value: value,
    });
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
    if (values) {
      dispatch({
        type: Actions.UPDATE_ADMINISTRATOR,
        payload: {
          id: adminid,
          firstname: values["firstname"],
          lastname: values["lastname"],
          username: values["username"],
          email: values["email"],
          prefix: values["prefix"],
          contactnumber: values["phone"],
          usertypeid: 1,
          roleid: values["roles"],
          status: values["status"] == "" ? 0 : 1,
        },
      });
    }
  };

  const onFinishFailed = (errorInfo) => {

  };

  const backtopage = () => {
    props.history.push("/admin/administrator");
  };

  return (
    <div>
      <Row>
        <Col span={2}></Col>
        <Col span={20} className="dashboard-content">
          <Card>
            <div>
              <h4>{"Update Administrator"}</h4>
            </div>

            <Form
              name="basic"
              initialValues={{
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                phone: phone,
                roles: roletype,
                status: status,
                prefix: prefix,
              }}
              form={UpdateForm}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Firstname"
                name="firstname"
                initialValue={firstname}
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
                    readonly: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                initialValue={phone}
                rules={[
                  {
                    required: true,
                   // len: 12,
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
                initialValue={parseInt(roletype)}
                rules={[{ required: true, message: "Roles is required!" }]}
              >
                <Select allowClear options={roles} onChange={onChangeRole} />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Status is required!" }]}
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
                  className="save-btn mr-20"
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={backtopage}
                  className="save-btn"
                >
                  Back
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Update;
