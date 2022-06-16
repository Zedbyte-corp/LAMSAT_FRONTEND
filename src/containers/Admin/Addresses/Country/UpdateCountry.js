import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Input,
    Select,
    Card,
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

const { TabPane } = Tabs;

function callback(key) {
}
const UpdateCountry = (props) => {
    const [form] = Form.useForm();
    const { getAppLanguageList } = useSelector((state) => state.Auth);
    const [status, setStatus] = useState(true);
    const { loading } = useSelector((state) => state.Address);
    const state = JSON.parse(localStorage.getItem('countryData'));

    useEffect(() => {
        if (state.status === 1) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, []);

    const backTopage = () => {
        props.history.push('/admin/Country');
    };

    const onFinish = (values) => {
        var countryArr = state.language;

        let langCheck = countryArr.filter((d, i) => {
            if (typeof d.countryname === 'undefined') {
                return true;
            }

            return false;
        });

        if (langCheck.length > 0) {
            let error = getLocaleMessages({ id: 'common.language.error' });
            message.error(error);
        } else {
            let data = {
                id: state.id,
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
                        backTopage();
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

    const filterCountryName = (arr, id) => {
        let countryname = arr.filter((i) => i.languageid === id);
        return countryname[0].countryname;
    };
    const inputChange = (val) => {
        let value = val.target.value;
        let id = val.target.id;
        let index = state.language.findIndex((x) => x.languageid == id);
        let obj = state.language.find((x) => x.languageid == id);
        obj.countryname = value;
        state.language[index] = obj;
        localStorage.setItem('countryData', JSON.stringify(state));
    };

    return (
        <Row>
            <Col span={2}></Col>
            <Col span={20} className="dashboard-content">
                <Card title={getLocaleMessages({ id: 'countryupdate.title' })}>
                    <Spin size="large" spinning={loading}>
                        <Form
                            {...formProps}
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                countrycode: state.countrycode,
                                countryiso: state.countryiso,
                            }}
                        >
                            <Col span={24} className="inner-content">
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    {getAppLanguageList.length ? (
                                        getAppLanguageList.map(
                                            (lang, index) => (
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
                                                                name={
                                                                    lang.id +
                                                                    'country'
                                                                }
                                                                label={getLocaleMessages(
                                                                    {
                                                                        id:
                                                                            'country.name',
                                                                    }
                                                                )}
                                                                initialValue={
                                                                    state.language
                                                                        ? filterCountryName(
                                                                              state.language,
                                                                              lang.id
                                                                          )
                                                                        : ''
                                                                }
                                                                {...nameConfig}
                                                            >
                                                                <Input
                                                                    id={lang.id}
                                                                    onChange={
                                                                        inputChange
                                                                    }
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                            )
                                        )
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
                                            label={getLocaleMessages({
                                                id: 'Status',
                                            })}
                                            name="status"
                                        >
                                            <Switch
                                                defaultChecked={state.status}
                                                onChange={onChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <div className="button-center">
                                <Button
                                    type="primary"
                                    htmlType="create"
                                    className="save-btn"
                                >
                                    {getLocaleMessages({ id: 'common.update' })}
                                </Button>

                                <Button
                                    type="primary"
                                    onClick={() => {
                                        backTopage();
                                    }}
                                    className="save-btn"
                                >
                                    {getLocaleMessages({ id: 'Back' })}
                                </Button>
                            </div>
                        </Form>
                    </Spin>
                </Card>
            </Col>
        </Row>
    );
};

export default UpdateCountry;
