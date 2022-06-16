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
const CreateCountry = (props) => {
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
        var countryArr = [];
        var langId = [];
        let CountryObj = values;
        langArray.map((list, id) => {
            langId.push(list.id);
            let langid = list.id + 'country';
            let obj = {};
            obj.languageid = list.id;
            obj.langshortname = list.languageshortname;
            obj.countryname = CountryObj[langid];
            countryArr.push(obj);
        });

        let langCheck = countryArr.filter((d, i) => {
            if (typeof d.countryname === 'undefined') {
                return true;
            }
        });

        if (langCheck.length > 0) {
            let error = getLocaleMessages({ id: 'common.language.error' });
            message.error(error);
        } else {
            let data = {
                countrycode: values.countrycode,
                countryiso: values.countryiso,
                language: countryArr,
                status: status ? 1 : 0,
            };
            store.dispatch({
                type: actions.POST_COUNTRY,
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
                message: getLocaleMessages({ id: 'countryname.error' }),
            },
        ],
    };
    const codeConfig = {
        rules: [
            {
                required: true,
                message: getLocaleMessages({ id: 'country.code.error' }),
            },
        ],
    };
    const isoConfig = {
        rules: [
            {
                required: true,
                message: getLocaleMessages({ id: 'country.iso.error' }),
            },
        ],
    };

    return (
        <Modal
            className="country create_category_modal"
            title={getLocaleMessages({ id: 'Country' })}
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
                                                    name={lang.id + 'country'}
                                                    label={getLocaleMessages({
                                                        id: 'country.name',
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
                        <Row>
                            <Col span={24} className="inner-content">
                                <Form.Item
                                    label={getLocaleMessages({
                                        id: 'country.code.label',
                                    })}
                                    name="countrycode"
                                    {...codeConfig}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label={getLocaleMessages({
                                        id: 'country.iso.label',
                                    })}
                                    name="countryiso"
                                    {...isoConfig}
                                >
                                    <Input />
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

export default CreateCountry;
