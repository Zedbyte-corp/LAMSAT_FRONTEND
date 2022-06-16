import React from 'react';
import { Row, Col, Input, Button, Card, Form } from 'antd';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';

const { TextArea } = Input;

const applicationConfigiration = () => {

  const onFinishDetails = (values) => {};
  return (
    <div>
      <Row>
        <Col
          offset={3}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto"
        >
          <h2 className="dash_title">Application Configiration</h2>
          <Card>
            <div className="dashboard-form">
              <Form onFinish={onFinishDetails()} {...formProps}>
                <Row gutter={20}>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'App Name'}
                      name={'appname'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Meta Keyword'}
                      name={'metakeyword'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'App Email'}
                      name={'appEmail'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Playstore Link'}
                      name={'playstorelink'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'App Contact Address'}
                      name={'appcontactaddress'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
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
                      label={'Site Copyright'}
                      name={'sitecopyright'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Hour Format(12/24)'}
                      name={'hourformat'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Currency Decimal Place'}
                      name={'currencydecimalplace'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Site Logo'}
                      name={'sitelogo'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Time Zone'}
                      name={'timezone'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Payment Type'}
                      name={'paymenttype'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'App Description'}
                      name={'appdescription'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
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
                      label={'Meta Description'}
                      name={'metadescription'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
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
                      label={'App Contact Number'}
                      name={'appcontactnumber'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Appstore'}
                      name={'appstore'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Map Key'}
                      name={'mapkey'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>

                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Currency Code'}
                      name={'currencycode'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label={'Fav Icon'}
                      name={'favicon'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
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
        </Col>
      </Row>
    </div>
  );
};

export default applicationConfigiration;
