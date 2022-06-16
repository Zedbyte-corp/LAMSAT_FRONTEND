import React, { useState, useEffect } from 'react';
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
    Spin,
    message,
} from 'antd';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import { getLocaleMessages } from 'redux/helper';
import { useSelector } from 'react-redux';
import actions from 'redux/admin/address/actions';
import { store } from 'redux/store';
import settingActions from 'redux/Settings/actions';

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
const CreateCity = (props) => {
    const [form] = Form.useForm();
    const { getAppLanguageList } = useSelector((state) => state.Auth);
    const { modalVisible, setModalVisible } = props;
    const [status, setStatus] = useState(true);
    const { getVendorVoucherLanguage } = useSelector(
        (state) => state.VendorVoucher
    );
    const { city } = useSelector((state) => state.Address);
    const { loading } = useSelector((state) => state.Address);
    const { countryList } = useSelector((state) => state.Address);

    useEffect(() => {
        store.dispatch({
            type: actions.GET_ADMIN_COUNTRY_LIST,
        });
    }, []);

    const onFinish = (values) => {
        let val = form.validateFields();
        var langArray = getAppLanguageList;
        var cityArr = [];
        var langId = [];
        let CityObj = values;
        langArray.map((list, id) => {
            langId.push(list.id);
            let langid = list.id + 'city';
            let obj = {};
            obj.languageid = list.id;
            obj.langshortname = list.languageshortname;
            obj.cityname = CityObj[langid];
            cityArr.push(obj);
        });

        let langCheck = cityArr.filter((d, i) => {
            if (typeof d.cityname === 'undefined') {
                return true;
            }
        });

        if (langCheck.length > 0) {
            let error = getLocaleMessages({ id: 'common.language.error' });
            message.error(error);
        } else {
            let data = {
                countryid: values.countryid,
                language: cityArr,
                status: status ? 1 : 0,
            };
            store.dispatch({
                type: actions.POST_CITY,
                payload: data,
                callBackAction: (status) => {
                    if (status) {
                        form.resetFields();
                        setModalVisible(false);
                    }
                },
            });
        }
    };
    const onFinishFailed = (errorInfo) => {
    };
    const onChange = (checked) => {
        setStatus(checked);
    };

    const nameConfig = {
        rules: [
            {
                whitespace: true,
                required: true,
                message: getLocaleMessages({ id: 'cityname.error' }),
            },
        ],
    };
    const countryConfig = {
        rules: [
            {
                required: true,
                message: getLocaleMessages({ id: 'countryname.error' }),
            },
        ],
    };

    return (
        <Modal
            className="city create_category_modal"
            title={getLocaleMessages({ id: 'citycreate.button' })}
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            width={600}
            footer={false}
        >
            <Spin size="large" spinning={loading}>
                <Form
                    {...formProps}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Col span={24} className="inner-content pd-20">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            {getAppLanguageList.length ? (
                                getAppLanguageList.map((lang, index) => (
                                    <TabPane
                                        tab={lang.languagename}
                                        key={lang.id}
                                    >
                                        <Row>
                                            <Col
                                                span={24}
                                                className="inner-content"
                                            >
                                                <Form.Item
                                                    name={lang.id + 'city'}
                                                    label={getLocaleMessages({
                                                        id: 'city.name',
                                                    })}
                                                    {...nameConfig}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                ))
                            ) : (
                                <Row>
                                    <Col>
                                        <p>No languages created</p>
                                    </Col>
                                </Row>
                            )}
                        </Tabs>
                        <Row gutter={30}>
                            <Col span={24} className="inner-content">
                                <Form.Item
                                    label={getLocaleMessages({ id: 'Country' })}
                                    name="countryid"
                                    {...countryConfig}
                                >
                                    <Select
                                        placeholder={getLocaleMessages({
                                            id: 'country.select.label',
                                        })}
                                    >
                                        {countryList &&
                                            countryList.length > 0 &&
                                            countryList.map((list, id) => {
                                                return (
                                                    <Select.Option
                                                        value={list.id}
                                                        key={id}
                                                    >
                                                        {
                                                            list.language[0]
                                                                .countryname
                                                        }
                                                    </Select.Option>
                                                );
                                            })}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={getLocaleMessages({ id: 'Status' })}
                                    name="status"
                                >
                                    <Switch
                                        defaultChecked
                                        onChange={onChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className="inner-content">
                                <div className="button-center">
                                    <Button
                                        type="primary"
                                        htmlType="create"
                                        className="save-btn"
                                    >
                                        {getLocaleMessages({
                                            id: 'common.create',
                                        })}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </Spin>
        </Modal>
    );
};

export default CreateCity;
