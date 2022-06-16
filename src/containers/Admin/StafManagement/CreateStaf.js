import React, { useState } from "react";
import { Row, Col, Input, Select, Card, Modal, Form, Switch, Button, Tabs, DatePicker  } from "antd";
import { formProps } from 'containers/OnBoarding/constant';
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import ImageUploader from 'components/Shared/ImageUpload';
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function callback(key) {
}
const CreateStaf = (props) =>{
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
            className="create.staf"
            title="Create Staf"
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            width={1000}
        >
            <Row className="modal-content">
            <Col span={24} className="inner-content">
            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Arabic" key="1">
            <Row>
            <Col span={12} className="inner-content">
                <Form {...formProps} onFinish={onFinish}>
                    <Form.Item
                        label={"Staf Name"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Mobile Number"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Staf Service Name"} >
                        <Input />
                    </Form.Item>

                </Form>
                </Col>
                <Col span={12} className="inner-content">
                <Form {...formProps} onFinish={onFinish}>
                <Form.Item label={"Staf Business Hourse"} >
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Staf Role"} >
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Upload Staf Image"}>
                         <ImageUploader isSingleImage={true} images={[]} onDropImage={onDropImage} />

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
            <Col span={12} className="inner-content">
                <Form {...formProps} onFinish={onFinish}>
                    <Form.Item
                        label={"Staf Name"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Mobile Number"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Staf Service Name"} >
                        <Input />
                    </Form.Item>

                </Form>
                </Col>
                <Col span={12} className="inner-content">
                <Form {...formProps} onFinish={onFinish}>
                <Form.Item label={"Staf Business Hourse"} >
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Staf Role"} >
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Upload Staf Image"}>
                         <ImageUploader isSingleImage={true} images={[]} onDropImage={onDropImage} />

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

export default CreateStaf;