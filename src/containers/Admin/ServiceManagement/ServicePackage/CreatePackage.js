import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Modal,
  Form,
  Switch,
  Button,
  Tabs,
  DatePicker,
} from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function callback(key) {
}
const CreatePackage = (props) => {
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);

  const onFinish = (values) => {

  };
  const onChange = (checked) => {

  };

  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  return (
    <Modal
      className="add-vocher"
      title="Create Service"
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      width={1000}
    >
      <Row className="modal-content">
        <Col span={24} className="inner-content">
          <Tabs defaultActiveKey="1" onChange={callback}>
            {getAppLanguageList.length ?
                getAppLanguageList.map((lang,index) =>
                    <TabPane tab={lang.languagename} key={lang.id}>
                        <Row>
                            <Col>
                            <Form {...formProps} onFinish={onFinish}>
                                <Form.Item label={"Service Name"}>
                                    <Input />
                                </Form.Item>
                            </Form>
                            </Col>
                        </Row>
                    </TabPane>
                )
            :
                <Row>
                    <Col>
                        <p>No languages created</p>
                    </Col>
                </Row>
            }
            {/* <TabPane tab="Arabic" key="1">
              <Row>
                <Col span={12} className="inner-content">
                  <Form {...formProps} onFinish={onFinish}>
                    <Form.Item label={"Service Name"}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={"Service Cost"}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={"Offer Percentage"}>
                      <Input />
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={12} className="inner-content">
                  <Form {...formProps} onFinish={onFinish}>
                    <Form.Item label={"Offer Cost"}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={"Upload Service Image"}>
                      <ImageUploader
                        isSingleImage={true}
                        images={[]}
                        onDropImage={onDropImage}
                      />
                    </Form.Item>
                  </Form>
                </Col>
                <Button type="primary" htmlType="create" className="save-btn">
                  Create Service
                </Button>
              </Row>
            </TabPane>
            <TabPane tab=" English" key="2">
              <Row>
                <Col span={12} className="inner-content">
                  <Form {...formProps} onFinish={onFinish}>
                    <Form.Item label={"Service Name"}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={"Service Cost"}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={"Offer Percentage"}>
                      <Input />
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={12} className="inner-content">
                  <Form {...formProps} onFinish={onFinish}>
                    <Form.Item label={"Offer Cost"}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={"Upload Service Image"}>
                      <ImageUploader
                        isSingleImage={true}
                        images={[]}
                        onDropImage={onDropImage}
                      />
                    </Form.Item>
                  </Form>
                </Col>
                <Button type="primary" htmlType="create" className="save-btn">
                  Create Service
                </Button>
              </Row>
            </TabPane> */}
          </Tabs>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreatePackage;
