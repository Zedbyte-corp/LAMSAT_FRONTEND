import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { Row, Col, DatePicker, Steps, Radio, Form, Input } from 'antd';
import { times } from 'lodash';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getLocalData } from 'redux/helper';
import { store } from 'redux/store';
import actionsCheckout from 'redux/Details/actions';
import { useSelector } from 'react-redux';

const { Option, OptGroup } = Select;
const { Step } = Steps;
const { Search } = Input;


const ServiceDetails = (props) => {
    const [selectedServiceId, setSelectedServiceId] = useState(0);
    const { count, categoryServiceByVendorList,
        handleSelectService,
        handleSelectTime,
        handleSelectStaff,
        deleteServiceRow,
        dateValueHour
    } = props;

    const loadStaffDetails = () => {
        const payload = {
            vendorid: getLocalData('id'),
            serviceid: selectedServiceId,
        };
        store.dispatch({
            type: actionsCheckout.GET_SERVICE_STAFF_DETAILS,
            payload: payload,
        });
    };
    const {
        serviceStaffDetail,
    } = useSelector((state) => state.DetailPage);


    console.log("serviceStaffDetail: " + JSON.stringify(serviceStaffDetail));


    return (
        <>
            <Form.Item>
                <Select placeholder="Select Services" onChange={(value, event) => { handleSelectService(count, value); setSelectedServiceId(value); }} key={count.toString()}>
                    {categoryServiceByVendorList && categoryServiceByVendorList.map((category, index) =>
                        category.servicelang.length > 0 && category.servicelang[0].serviceid ?
                            (
                                <OptGroup label={category.categoryname}>
                                    {
                                        category.servicelang.map((service, index) =>
                                            service.permission && service.permission === 'Approved' ? (
                                                <Option value={service.serviceid}>
                                                    <div className="fex_service_option">
                                                        <div>{service.servicename}</div>
                                                        <span>{service.serviceprice.length > 0 ? service.serviceprice[0].price : 0}SAR</span>
                                                    </div>
                                                </Option>
                                            ) : (<></>)
                                        )
                                    }
                                </OptGroup>
                            ) : (<></>)
                    )}
                </Select>
            </Form.Item>

            <Row gutter={30}>
                <Col span={6}>
                    <Form.Item>
                        <Select placeholder="Select Time" onChange={(value, event) => { handleSelectTime(event, count, value); loadStaffDetails(value); }} >
                            {times(24, {}).map(
                                (key, index) => {
                                    return index >
                                        8 &&
                                        index < 23 &&
                                        dateValueHour <
                                        index + 1 ? (
                                        <Option value={
                                            index + 1
                                        }>
                                            {index + 1 >
                                                12
                                                ? index - 11
                                                : index + 1}
                                            .00{' '}
                                            {index + 1 >
                                                11
                                                ? 'PM'
                                                : 'AM'}
                                        </Option>
                                    ) : (
                                        ''
                                    );
                                }
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={15}>
                    <Form.Item>
                        <Select placeholder="Select Staff" onChange={(value, event) => handleSelectStaff(event, count, value, serviceStaffDetail)} >
                            {serviceStaffDetail.length && serviceStaffDetail.map(
                                (staffList) =>
                                    staffList[
                                        'service'
                                    ].some(
                                        (ch) =>
                                            ch.serviceid ===
                                            selectedServiceId
                                    ) ? (
                                        <>
                                            <Option value={staffList['id']}>{staffList['firstname']} {staffList['lastname']}</Option>
                                        </>) : (<></>)
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Button
                        className="close_steps add_stepes"
                        shape="circle"
                        onClick={(event) => deleteServiceRow(count)}
                        icon={<MinusOutlined />}
                    />
                </Col>
            </Row >
        </>
    );
}

export default ServiceDetails;