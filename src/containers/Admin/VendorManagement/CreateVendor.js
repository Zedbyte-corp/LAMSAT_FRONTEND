import React, { useState } from 'react';
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
    TreeSelect,
    Checkbox,
} from 'antd';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import { getLocaleMessages } from 'redux/helper';
import { useSelector } from 'react-redux';

const { TreeNode } = TreeSelect;

const { TabPane } = Tabs;

const { Option } = Select;

function onChange(e) {

}

function onBlur() {

}

function onFocus() {

}

function onSearch(val) {

}

function callback(key) {

}
const CreateVendor = (props) => {
    const { modalVisible, setModalVisible } = props;
    const [setLocalImage, setLocalImageFunc] = useState([]);
    const { getVendorVoucherLanguage } = useSelector(
        (state) => state.VendorVoucher
    );

    const onFinish = (values) => {

    };
    const onChange = (checked) => {

    };

    const rangeConfig = {
        rules: [
            { type: 'array', required: true, message: 'Please select time!' },
        ],
    };

    const onDropImage = (pictureFiles) => {
        setLocalImageFunc(pictureFiles);
    };



    return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} className="dashboard-content">
                    <Modal
                        className="area"
                        title="Create Vendor"
                        centered
                        visible={modalVisible}
                        onOk={() => setModalVisible(false)}
                        onCancel={() => setModalVisible(false)}
                        width={1000}
                    >
                        <Row className="modal-content">
                            <Col span={24} className="inner-content">
                                <Tabs
                                    defaultActiveKey="1"
                                    onChange={callback}
                                    className="create-vendor-tab"
                                >
                                    <TabPane tab="Arabic" key="1">
                                        <Row>
                                            <Col
                                                span={12}
                                                className="inner-content"
                                            >
                                                <Form
                                                    {...formProps}
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label={'Saloon Logo'}
                                                    >
                                                        <Input type="file" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={
                                                            'Saloon  Description'
                                                        }
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                            <Col
                                                span={12}
                                                className="inner-content"
                                            >
                                                <Form
                                                    {...formProps}
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label={'Saloon Name'}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab=" English" key="2">
                                        <Row>
                                            <Col
                                                span={12}
                                                className="inner-content"
                                            >
                                                <Form
                                                    {...formProps}
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label={'Saloon Logo'}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={
                                                            'Saloon Description'
                                                        }
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                            <Col
                                                span={12}
                                                className="inner-content"
                                            >
                                                <Form
                                                    {...formProps}
                                                    onFinish={onFinish}
                                                >
                                                    <Form.Item
                                                        label={'Saloon Name'}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Form>
                                            </Col>
                                            <Button
                                                type="primary"
                                                htmlType="create"
                                                className="save-btn"
                                            >
                                                Create
                                            </Button>
                                        </Row>
                                    </TabPane>
                                </Tabs>
                                <Row>
                                    <Col span={12} className="inner-content">
                                        <Form
                                            {...formProps}
                                            onFinish={onFinish}
                                        >
                                            <Form.Item label={'First Name'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label={'Saloon Email'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your password!',
                                                    },
                                                    {
													  min: 6,
													  message: 'Password must be minimum 6 characters.'
													},
													{
													  max: 16,
													  message: 'Password can be maximum 16 characters.'
													},
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                            <Form.Item label={'Cusion Name'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label={'Commission Type'}
                                            >
                                                <Checkbox onChange={onChange}>
                                                    Value Based
                                                </Checkbox>
                                                <Checkbox onChange={onChange}>
                                                    Percent Based
                                                </Checkbox>
                                            </Form.Item>
                                            <Form.Item
                                                label={'Saloon Contact Number'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label={'Minimum Cart Value'}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label={'Saloon Status'}>
                                                <Checkbox onChange={onChange}>
                                                    Active
                                                </Checkbox>
                                                <Checkbox onChange={onChange}>
                                                    In Active
                                                </Checkbox>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                    <Col span={12} className="inner-content">
                                        <Form
                                            {...formProps}
                                            onFinish={onFinish}
                                        >
                                            <Form.Item label={'Last Name'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label={'Select city'}>
                                                <Select
                                                    showSearch
                                                    style={{ width: 431 }}
                                                    placeholder="Select city"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        option.children
                                                            .toLowerCase()
                                                            .indexOf(
                                                                input.toLowerCase()
                                                            ) >= 0
                                                    }
                                                >
                                                    <Option value="jack">
                                                        Jack
                                                    </Option>
                                                    <Option value="lucy">
                                                        Lucy
                                                    </Option>
                                                    <Option value="tom">
                                                        Tom
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Conform Password"
                                                name="conformpassword"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Please input your password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                            <Form.Item label={'Category Name'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label={'User Name'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label={'VAT'}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label={'Payment Option'}>
                                                <Checkbox onChange={onChange}>
                                                    COD
                                                </Checkbox>
                                                <Checkbox onChange={onChange}>
                                                    Online
                                                </Checkbox>
                                                <Checkbox onChange={onChange}>
                                                    BOth
                                                </Checkbox>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                            <Button
                                type="primary"
                                htmlType="create"
                                className="save-btn"
                            >
                                Create
                            </Button>
                        </Row>
                    </Modal>
                </Col>
            </Row>
        </div>
    );
};

export default CreateVendor;
