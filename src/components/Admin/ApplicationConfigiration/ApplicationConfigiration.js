import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Input, InputNumber, Button, Card, Form, Spin } from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import Actions from "redux/admin/settings/actions";

const { TextArea } = Input;

const ApplicationConfigiration = () => {
  const {
    isSettingpage,
    app_config_data,
    isappconfigLoad,
    submitLoader,
  } = useSelector((state) => state.AppSettings);
  const [UpdateForm] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSettingpage) {
      dispatch({
        type: Actions.GET_APPCONFIG,
      });
    }
    UpdateForm.resetFields();
  }, [UpdateForm, app_config_data]);

  /*
if(isappconfigLoad){

  UpdateForm.setFieldsValue({
    appname: app_config_data,


  })
}*/

  const onFinishDetails = (values) => {
    if (values) {
      dispatch({
        type: Actions.UPDATE_CONFIG,
        payload: values,
      });
      // UpdateForm.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {};
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
          <h2 className="dash_title">Application Configuration</h2>
          <Spin size="large" spinning={submitLoader}>
            <Card>
              <div className="dashboard-form">
                <Form
                  name="basic"
                  initialValues={app_config_data}
                  form={UpdateForm}
                  onFinish={onFinishDetails}
                  layout="vertical"
                  onFinishFailed={onFinishFailed}
                >
                  <Row gutter={20}>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"App Name"}
                        name={"appname"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter App Name",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"Meta Keyword"}
                        name={"metakeyword"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Meta Keyword",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"App Email"}
                        name={"email"}
                        rules={[
                          {
                            type: "email",
                            required: true,
                            message: "Please enter App Email",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"Playstore Link"}
                        name={"playstore_link"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Playstore Link",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"App Contact Address"}
                        name={"contactaddress"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter App Contact Address",
                          },
                        ]}
                      >
                        <TextArea
                          placeholder=""
                          autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"Site Copyright"}
                        name={"site_copyright"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Site Copyright",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"Hour Format(12/24)"}
                        name={"hour_format"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Hour Format",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"Currency Decimal Place"}
                        name={"currency_decimalplace"}
                        rules={[
                          {
                            type: "number",
                            required: true,
                            message: "Please enter Currency Decimal Place",
                          },
                        ]}
                      >
                        <InputNumber placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"Site Logo"}
                        name={"site_logo"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Site Logo",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"Time Zone"}
                        name={"time_zone"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Time Zone",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"Payment Type"}
                        name={"payment_mode"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Payment Type",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"App Description"}
                        name={"appdescription"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter App Description",
                          },
                        ]}
                      >
                        <TextArea
                          placeholder=""
                          autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"Meta Description"}
                        name={"metadescription"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Meta Description",
                          },
                        ]}
                      >
                        <TextArea
                          placeholder=""
                          autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"App Contact Number"}
                        name={"contactnumber"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter App Contact Number",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"Appstore"}
                        name={"appstore_link"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Appstore",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={"Map Key"}
                        name={"mapkey"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Map Key",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>

                    <Col
                      span={12}
                      style={{ display: "none" }}
                      className="inner-content"
                    >
                      <Form.Item
                        label={"Currency Code"}
                        name={"currency_code"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter Currency Code",
                          },
                        ]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    {/*<Col span={12} className="inner-content">
                  <Form.Item
                    label={'Fav Icon'}
                    name={'favicon'}
                    rules={
                      [
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]
                    }
                  >
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
                  */}
                    <Col span={24}>
                      <Form.Item>
                        <div className="button-center">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="save-btn"
                          >
                            Save
                          </Button>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationConfigiration;
