import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Spin, Space, Modal } from 'antd';
import { UserOutlined, LockOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/css/dashboard.scss';
import actions from 'redux/auth/actions';
import commisionactions from 'redux/admin/Commission/actions';
import { getLocalData } from 'redux/helper';
import { store } from 'redux/store';
import DataTable from 'helpers/datatable';

const Settings = (props) => {
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const { commissionData, commissionLoader } = useSelector(
        (state) => state.Commission
    );
    useEffect(() => {
        store.dispatch({
            type: actions.GET_SETTINGS,
            callBackAction: (response) => {
                console.log(
                    'responseresponse: ' + JSON.stringify(response.data.data)
                );
                setSettingsList(response.data.data);
            },
        });
    }, []);

    useEffect(() => {
        store.dispatch({
            type: actions.GET_SETTINGS,
            callBackAction: (response) => {
                setSettingsList(response.data.data);
            },
        });
    }, [commissionData]);

    const [visible, setVisible] = useState(false);
    const [settingsList, setSettingsList] = useState([]);

    const coulmns = [
        {
            title: 'Commission Name',
            dataIndex: 'settingsname',
            key: 'e',
        },
        {
            title: 'Commission Percentage',
            dataIndex: 'settingsvalue',
            key: 'settingsvalue',
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (text, record) => {
                var text = text;
                return (
                    <Space size="middle">
                        <div className="edit">
                            <EditOutlined
                                name={text.id + 'name'}
                                id={text.id}
                                onClick={() => {
                                    setModalVisible(true);
                                    form.setFieldsValue({
                                        settingsname: text.settingsname,
                                        settingsvalue: text.settingsvalue,
                                    });
                                }}
                            />
                        </div>
                    </Space>
                );
            },
        },
    ];
    const onFinish = (values) => {
        if (values) {
            var data = {
                settingskey: 'comissionpercentage',
                settingsname: 'Comission Percentage',
                settingsvalue: values.settingsvalue,
            };
            store.dispatch({
                type: commisionactions.NEW_COMMISSION,
                payload: data,
            });
            setModalVisible(false);
        }
    };

    return (
        <div>
            <Modal
                className="country create_category_modal"
                title={'Commission'}
                centered
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                width={600}
                footer={false}
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Col span={24} className="inner-content pd-20">
                        <Row>
                            <Col span={24} className="inner-content">
                                <Form.Item
                                    label={'Commission Type'}
                                    name="settingsname"
                                >
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item
                                    label={'Commission Value'}
                                    name="settingsvalue"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24} className="inner-content">
                                <div className="button-center">
                                    <Button
                                        type="primary"
                                        htmlType="create"
                                        className="save-btn"
                                    >
                                        save
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </Modal>

            <Spin size="large" spinning={commissionLoader}>
                <Row>
                    <Col
                        offset={0}
                        xs={22}
                        md={22}
                        lg={22}
                        className="dashboard-content mg-auto"
                    >
                        <Card
                            title="Commission"
                            extra={
                                settingsList.length == 0 && (
                                    <Button
                                        type="primary"
                                        htmlType="create"
                                        onClick={() => {
                                            setModalVisible(true);
                                            form.setFieldsValue({
                                                settingsname:
                                                    'Comission Percentage',
                                            });
                                        }}
                                        className="save-btn"
                                    >
                                        Create
                                    </Button>
                                )
                            }
                        >
                            <div>
                                {settingsList && (
                                    <DataTable
                                        columns={coulmns}
                                        dataSource={settingsList}
                                    />
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default Settings;
