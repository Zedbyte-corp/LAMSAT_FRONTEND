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
const UpdateArea = (props) => {
    const [form] = Form.useForm();
    const { getAppLanguageList } = useSelector((state) => state.Auth);
    const [status, setStatus] = useState(true);
    const { loading } = useSelector((state) => state.Address);
    const { cityList } = useSelector((state) => state.Address);
    const state = JSON.parse(localStorage.getItem('areaData'));

    useEffect(() => {
        store.dispatch({
            type: actions.GET_ADMIN_CITY_LIST,
        });
        if (state.status === 1) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, []);

    const backTopage = () => {
        props.history.push('/admin/Area');
    };

    const onFinish = (values) => {

        var areaArr = state.language;

        let langCheck = areaArr.filter((d, i) => {
            if (typeof d.areaname === 'undefined') {
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
                cityid: values.cityid,
                language: areaArr,
                status: status ? 1 : 0,
            };
            store.dispatch({
                type: actions.POST_AREA,
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
                message: 'Please input areaname!',
            },
        ],
    };
    const cityConfig = {
        rules: [{ required: true, message: 'Please select a city!' }],
    };

    const filterAreaName = (arr, id) => {
        let areaname = arr.filter((i) => i.languageid === id);
        return areaname[0].areaname;
    };
    const inputChange = (val) => {
        let value = val.target.value;
        let id = val.target.id;
        let index = state.language.findIndex((x) => x.languageid == id);
        let obj = state.language.find((x) => x.languageid == id);
        obj.areaname = value;
        state.language[index] = obj;
        localStorage.setItem('areaData', JSON.stringify(state));
    };

    return (
        <Row>
            <Col span={2}></Col>
            <Col span={20} className="dashboard-content">
                <Card title={getLocaleMessages({ id: 'areaupdate.title' })}>
                    <Spin size="large" spinning={loading}>
                        <Form
                            {...formProps}
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{
                                cityid: state.cityid,
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
                                                                    'area'
                                                                }
                                                                label={getLocaleMessages(
                                                                    {
                                                                        id:
                                                                            'area.name',
                                                                    }
                                                                )}
                                                                initialValue={
                                                                    state.language
                                                                        ? filterAreaName(
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
                                                id: 'City',
                                            })}
                                            name="cityid"
                                            {...cityConfig}
                                        >
                                            <Select
                                                placeholder={getLocaleMessages({
                                                    id: 'area.select.city',
                                                })}
                                            >
                                                {cityList &&
                                                    cityList.length > 0 &&
                                                    cityList.map((list, id) => {
                                                        return (
                                                            <Select.Option
                                                                value={list.cityid}
                                                                key={id}
                                                            >
                                                                {
                                                                    list.cityname
                                                                }
                                                            </Select.Option>
                                                        );
                                                    })}
                                            </Select>
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
                                    {getLocaleMessages({
                                        id: 'common.update',
                                    })}
                                </Button>

                                <Button
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

export default UpdateArea;
