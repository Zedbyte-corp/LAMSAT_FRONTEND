// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Row,
    Col,
    Card,
    Tabs,
    Form,
    Input,
    Button,
    message,
    Space,
    Select,
    DatePicker,
    InputNumber,
    Checkbox,
    Radio,
    Spin,
    Modal,
} from 'antd';
import ReactHtmlParser, {
    processNodes,
    convertNodeToElement,
    htmlparser2,
} from 'react-html-parser';
import moment from 'moment';
import actions from 'redux/vendor/Staff/actions';
import serviceActions from 'redux/vendor/Services/actions';
import 'assets/css/dashboard.scss';
import { store } from 'redux/store';
import { getLocaleMessages, getLocalData } from 'redux/helper';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;

const StaffTimeCreate = (props) => {
    const { modalVisible, setModalVisible, getStartdate, getEnddate} = props;
    const [CreateForm] = Form.useForm();
    const [ustarttime, setustarttime] = useState('10:00AM');
    const [uendtime, setuendtime] = useState('07:00PM');
    const [staffID, setstaffID] = useState();
    const [VendorID, setVendorID] = useState();
    const [SDay, setSDay] = useState(moment().format('YYYY-MM-DD'));
    const [EDay, setEDay] = useState(moment().format('YYYY-MM-DD'));

    const { loading, shiftloading } = useSelector((state) => state.Staffs);
    const { staffList } = useSelector((state) => state.Services);

    useEffect(() => {
        store.dispatch({
            type: serviceActions.GET_VENDORSTAFF_LIST,
            id: getLocalData('id'),
            callBackAction: (response) => {},
        });
    }, []);
    const onFinishFailed = (error) => {};
    function GenTimePullDown(MinuteInterval) {
        var x = 30; //minutes interval
        var times = []; // time array
        var tt = 0; // start time
        var ap = ['AM', 'PM']; // AM-PM
        var select = '';

        //loop to increment the time and push results in array
        for (var i = 0; tt < 24 * 60; i++) {
            var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            var mm = tt % 60; // getting minutes of the hour in 0-55 format
            times[i] =
                ('0' + ((hh % 12 == 0) ? 12 : hh % 12)).slice(-2) +
                ':' +
                ('0' + mm).slice(-2) +
                ' ' +
                ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
            select =
                select +
                '<option value="' +
                times[i] +
                '">' +
                times[i] +
                '</option>';
        }

        return select;
    }
    const onChangeDate = (value) => {
        if(value)
        {
            var sdate=moment(value[0]).format("YYYY-MM-DD");
            var edate=moment(value[1]).format("YYYY-MM-DD");
            setSDay(sdate);
            setEDay(edate);
        }
    };
    const filterStaff = (value) => {
        let fil = staffList.filter((data) => data.id === value);
        setstaffID(fil[0].id);
        setVendorID(fil[0].vendorid);
    };
    const backtopage = () => {
        props.history.push('/vendor/staff');
    };
    const onFinish = () => {
        store.dispatch({
            type: actions.CREATE_ADMIN_STAFF_SHIFT,
            payload: {
                vendorid: parseInt(VendorID),
                vendorstaffid: parseInt(staffID),
                starttime: ustarttime,
                endtime: uendtime,
                startday: SDay,
                endday: EDay,
                status: 1,
            },
            Isvendor: 'vendor',
            callBackAction: (data) => {
                if(data === true)
                {
                    store.dispatch({
                        type: actions.GET_ADMIN_STAFF_SHIFT_LIST,
                        payload: {
                          vendorid: getLocalData("id"),
                          startdate: getStartdate,
                          enddate: getEnddate,
                          status: 1,
                        },
                    });
                    CreateForm.resetFields();
                    setModalVisible(false);
                   
                }
            }
        });
    };

    return (
        <Modal
        className="create_category_modal"
        title={"Create Time Slot"}
        centered
        visible={modalVisible}
        onOk={() => {setModalVisible(false); CreateForm.resetFields(); }}
        onCancel={() =>{ setModalVisible(false); CreateForm.resetFields(); }}
        width={500}
        footer={false}
      >
        {/* <div>
            <Row>
                <Col
                    offset={0}
                    xs={22}
                    md={22}
                    lg={22}
                    className="dashboard-content mg-auto"
                >
                    <div className="container_minimal">
                        <Card title="Create Staff Hours"> */}
                            <Spin
                                spinning={shiftloading}
                                size={'large'}
                            >
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    form={CreateForm}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    layout="vertical"
                                >
                                    <Col span={30}>
                                    <Form.Item
                                        label="Select Staff"
                                        name="staff"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'please Select staff',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Staff"
                                            optionFilterProp="children"
                                            className="staftiming-head"
                                            //onChange={onChange}
                                            //onFocus={onFocus}
                                            //onBlur={onBlur}
                                            onChange={filterStaff}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0
                                            }
                                        >
                                            {staffList &&
                                                staffList.length > 0 &&
                                                staffList.map((list, id) => {
                                                    return (
                                                        <Option
                                                            value={list.id}
                                                            key={id}
                                                        >
                                                            {list.firstname +
                                                                ' ' +
                                                                list.lastname}
                                                        </Option>
                                                    );
                                                })}
                                        </Select>
                                    </Form.Item>
                                    </Col>
                                    <Col span={30}>
                                    <Form.Item
                                        label="SHIFT START"
                                        name="starttime"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'please Select Start time',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select Start Time"
                                            optionFilterProp="children"
                                            onChange={(e) => setustarttime(e)}
                                            //defaultValue={"10:00AM"}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0
                                            }
                                        >
                                            {ReactHtmlParser(
                                                GenTimePullDown(15)
                                            )}
                                        </Select>
                                    </Form.Item>
                                    </Col>
                                    <Col span={30}>
                                    <Form.Item
                                        label="SHIFT END"
                                        name="endtime"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'please Select End Time',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select End Time"
                                            optionFilterProp="children"
                                            onChange={(e) => setuendtime(e)}
                                            //onFocus={onFocus}
                                            // onBlur={onBlur}
                                            //defaultValue={"07:00PM"}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) >= 0
                                            }
                                        >
                                            {ReactHtmlParser(
                                                GenTimePullDown(15)
                                            )}
                                        </Select>
                                    </Form.Item>
                                    </Col>
                                    <Col span={30}>
                                    <Form.Item
                                        label="DATE"
                                        name="date"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'please Select Date',
                                            },
                                        ]}
                                    >
                                        <RangePicker onChange={onChangeDate} />
                                        {/* <DatePicker
                                            onChange={onChangeDate}
                                            //defaultValue={moment()}
                                            format={'YYYY/MM/DD'}
                                            className="staftiming-datepick"
                                        /> */}
                                    </Form.Item>
                                    </Col>
                                    <div className="button-center m-10">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="save-btn mr-20"
                                        >
                                            Save
                                        </Button>

                                        {/* <Button
                                            htmlType="submit"
                                            onClick={backtopage}
                                            className="save-btn"
                                        >
                                            Back
                                        </Button> */}
                                    </div>
                                </Form>
                            </Spin>
                        {/* </Card>
                    </div>
                </Col>
            </Row>
        </div> */}
        </Modal>
    );
};

export default StaffTimeCreate;
