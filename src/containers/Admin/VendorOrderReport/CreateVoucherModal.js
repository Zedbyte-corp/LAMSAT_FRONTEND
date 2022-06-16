import React, { useState } from "react";
import { Row, Col, Input, Select, Card, Modal, Form, Switch, DatePicker  } from "antd";
import ImageUploader from 'components/Shared/ImageUpload';
import { formProps } from 'containers/OnBoarding/constant';
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import { useSelector } from "react-redux";

const { Option } = Select;
const { RangePicker } = DatePicker;


const CreateVoucherModal = (props) =>{
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
            className="add-vocher"
            title="Create a Vocher Type"
            sub="Step 1 of 2: Add Your Voucher Type Info"
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            width={1000}
        >
            <Row className="modal-content">
                <Col span={10} className="inner-content modal-content bg-gray">
                <h2>Vocher Info</h2>
                <p>lorem ispum-.....</p>
                <Form {...formProps} onFinish={onFinish}>
                    <Form.Item
                        label={getLocaleMessages({id:"label.voucherName"})}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={getLocaleMessages({id:"label.voucherDescription"})}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={getLocaleMessages({id:"label.voucherValue"})}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={getLocaleMessages({id:"label.voucherMinimumValue"})}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={getLocaleMessages({id:"label.voucherMaximumValue"})}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Valid Date"}
                        name="range-picker"
                        {...rangeConfig}
                    >
                        <RangePicker />
                    </Form.Item>
                    <label>Limit Amound of Sales</label>
                    <br />
                    <Switch defaultChecked onChange={onChange} /> <br />
                    <label>No of Sales</label>
                    <Form.Item>
                        <Select placeholder="10">
                            <Option value="1">1</Option>
                            <Option value="10">10</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <label>Service Include</label>
                        <Input />
                    </Form.Item>
                </Form>
                </Col>
                <Col span={12} className="inner-content">
                <Card
                    className="mg-auto voucher-full"
                    bordered={false}
                    justify={"space-around"}
                    align="center"
                >
                    <div className="box">
                    <div className="voucher-title">
                        <h2>Voucher Preview</h2>
                        <p>You have a no active type </p>
                    </div>
                    <div className="v-box-full">
                        <div className="voucher-box">
                        <h2>Demo@gmail.com</h2>
                        <p>Your Location and Address Here </p>
                        </div>
                        <div className="voucher-box">
                        <h2>Voucher Value</h2>
                        <p>100.00 SAR </p>
                        </div>
                        <div className="voucher-box">
                        <h2>Voucher Code:xxxxxxx</h2>
                        <p>
                            Reedom all service valid for 3months for multiple
                            use
                        </p>
                        </div>
                        <div className="voucher-box">
                        <h2>Image Upload</h2>
                        <ImageUploader isSingleImage={true} images={[]} onDropImage={onDropImage} />
                        </div>
                    </div>
                    </div>
                </Card>
                </Col>
            </Row>
        </Modal>
    )
}

export default CreateVoucherModal;