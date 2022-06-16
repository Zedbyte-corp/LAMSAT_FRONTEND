import React, { useState } from "react";
import { Row, Col, Input, Select, Card, Modal, Form, Switch, Button, Tabs } from "antd";
import { formProps } from 'containers/OnBoarding/constant';
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const { Option } = Select;

function onChange(value) {
}

function onBlur() {
}

function onFocus() {
}

function onSearch(val) {
}

function callback(key) {
}
const CreateCountry = (props) =>{
    const { modalVisible, setModalVisible } = props;
    const [setLocalImage, setLocalImageFunc] = useState([]);
    const { getVendorVoucherLanguage } = useSelector((state)=> state.VendorVoucher);

    const onFinish = (values) => {
    };
    const onChange = (checked) => {
   }

    const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

    const onDropImage = (pictureFiles) =>{
        setLocalImageFunc(pictureFiles)
    }


    return (
        <Modal
            className="area"
            title="Create Country"
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            width={700}
        >
            <Row className="modal-content">
            <Col span={24} className="inner-content">
            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Arabic" key="1">
            <Row>
            <Col span={24} className="inner-content">
                <Form {...formProps} onFinish={onFinish}>
                    <Form.Item
                        label={"Country Name"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Country Code"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Country Iso"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Status"}>
                    <Switch defaultChecked onChange={onChange} />
                    </Form.Item>

                </Form>
                </Col>

                <Button type="primary" htmlType="create" className="save-btn">
            Create
            </Button>
            </Row>
           </TabPane>
           <TabPane tab=" English" key="2">
           <Row>
           <Col span={24} className="inner-content">
                <Form {...formProps} onFinish={onFinish}>
                <Form.Item
                        label={"Country Name"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Country Code"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Country Iso"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Status"}>
                    <Switch defaultChecked onChange={onChange} />
                    </Form.Item>

                </Form>
                </Col>
                <Button type="primary" htmlType="create" className="save-btn">
            Create
            </Button>
            </Row>

           </TabPane>

          </Tabs>
                </Col>
            </Row>
        </Modal>
    )
}

export default CreateCountry;