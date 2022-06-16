import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    Table,
    Space,
    Card,
    Switch,
    Spin,
    Modal,
    Select,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import 'assets/css/dashboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'redux/store';
import actions from 'redux/admin/partnersManagement/actions';
import Mymap from 'components/Admin/VendorProfile/Mymap';
import { getLocaleMessages } from 'redux/helper';

const PartnersApplication = (props) => {
    const localpartnerData = localStorage.getItem('ParnersDataByID');
    const [partnerData, setpartnerData] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (localpartnerData.length) {
            setpartnerData(JSON.parse(localpartnerData));
        }
    }, [localpartnerData]);

    const isAccept = (id, state) => {
        let accept = true;
        state ? (accept = 1) : (accept = 2);
        let data = {
            id: id,
            isaccepted: accept,
        };
        setloading(true);
        store.dispatch({
            type: actions.ACCEPT_REQ,
            payload: data,
            callBackAction: (status) => {
                setloading(false);
                if (status == true) {
                    props.history.push('/admin/partnersmanagement');
                    localStorage.removeItem('ParnersDataByID');
                }
            },
        });
    };

    const BackPage = () => {
        props.history.push('/admin/partnersmanagement');
        localStorage.removeItem('ParnersDataByID');
    };

    return (
        <div className="container_minimal">
            <Row>
                <Col
                    offset={0}
                    xs={22}
                    md={22}
                    lg={22}
                    className="dashboard-content mg-auto"
                >
                    <Card
                        title={'Partner Details'}
                        className="create_category_modal"
                    >
                        {partnerData.length && (
                            <div className="booking_details_content">
                                <Spin spinning={loading} size={'large'}>
                                    <p>
                                        <span className="leftside">
                                            Saloon Name :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].saloonname}`}</span>
                                    </p>
                                    <p>
                                        <span className="leftside">
                                            Description :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].description}`}</span>
                                    </p>
                                    <p>
                                        <span className="leftside">
                                            First Name :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].firstname}`}</span>
                                    </p>
                                    <p>
                                        <span className="leftside">
                                            Last Name :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].lastname}`}</span>
                                    </p>
                                    <p>
                                        <span className="leftside">
                                            Contact Number :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].mobile_number}`}</span>
                                    </p>
                                    <p>
                                        <span className="leftside">
                                            Mobile Number :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].phonenumber ? partnerData[0].phonenumber : ""}`}</span>
                                    </p>
                                    <p>
                                        <span className="leftside">
                                            Email :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].email_address}`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Business Type :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].service_name}`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Available For :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].serviceavilable &&
                                             partnerData[0].serviceavilable == 1 ? "Women" : partnerData[0].serviceavilable == 2 ? "Kids" : "Women, Kids" }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Address :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].partnerAddress}`}</span>
                                    </p>

                                    {/* <p>
                                        <span className="leftside">
                                            District :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].partnerDistrict}`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Region :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].partnerRegion}`}</span>
                                    </p> */}

                                    <p>
                                        <span className="leftside">
                                            Postal code :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].partnerPostcode}`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Hear About Lamsat :
                                        </span>{' '}
                                        <span className="right">{`${partnerData[0].hearAboutFresha}`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            VAT No. :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].vatnumber !==
                                            undefined
                                                ? partnerData[0].vatnumber
                                                : ''
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            VAT Percentage :
                                        </span>{' '}
                                        <span className="right">
                                            {`${
                                                partnerData[0].vatpercent !==
                                                undefined
                                                    ? partnerData[0].vatpercent
                                                    : ''
                                            }`}{' '}
                                            {partnerData[0].vatpercent
                                                ? '%'
                                                : ''}
                                        </span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Saloon Email :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].saloonemail !==
                                            undefined
                                                ? partnerData[0].saloonemail
                                                : ''
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Saloon Phone Number :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].saloonphone !==
                                            undefined
                                                ? partnerData[0].saloonphone
                                                : ''
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Team Size :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].teamsize !==
                                            undefined
                                                ? partnerData[0].teamsize == "0"
                                                ? "It's just me"
                                                : partnerData[0].teamsize == "1"
                                                ? "2-5"
                                                : partnerData[0].teamsize == "2"
                                                ? "6-10"
                                                : partnerData[0].teamsize == "3"
                                                ? "11+"
                                                : "It's just me"
                                                : ""
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Bank Account Number :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].bankaccountnumber !==
                                            undefined
                                                ? partnerData[0]
                                                      .bankaccountnumber
                                                : ''
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Bank Name :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].bankname !==
                                            undefined
                                                ? partnerData[0].bankname
                                                : ''
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Bank IBAN :
                                        </span>{' '}
                                        <span className="right">{`${
                                            partnerData[0].bankiban !==
                                            undefined
                                                ? partnerData[0].bankiban
                                                : ''
                                        }`}</span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            VAT Document :
                                        </span>{' '}
                                        <span className="right">
                                            <a
                                                className="login-form-forgot"
                                                href={`${partnerData[0].vatdocument_url}`}
                                                target="_blank"
                                            >
                                                {partnerData[0].vatdocument_url
                                                    ? 'View'
                                                    : ''}
                                            </a>
                                        </span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            CR Document :
                                        </span>{' '}
                                        <span className="right">
                                            <a
                                                className="login-form-forgot"
                                                href={`${partnerData[0].crdocument_url}`}
                                                target="_blank"
                                            >
                                                {partnerData[0].crdocument_url
                                                    ? 'View'
                                                    : ''}
                                            </a>
                                        </span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Bank Document :
                                        </span>{' '}
                                        <span className="right">
                                            <a
                                                className="login-form-forgot"
                                                href={`${partnerData[0].bankdocument_url}`}
                                                target="_blank"
                                            >
                                                {partnerData[0].bankdocument_url
                                                    ? 'View'
                                                    : ''}
                                            </a>
                                        </span>
                                    </p>

                                    <p>
                                        <span className="leftside">
                                            Saloon Image :
                                        </span>{' '}
                                        <span className="right">
                                            <a
                                                className="login-form-forgot"
                                                href={`${partnerData[0].images[0].image_url}`}
                                                target="_blank"
                                            >
                                                {partnerData[0].images &&
                                                partnerData[0].images[0].image_url
                                                    ? 'View'
                                                    : ''}
                                            </a>
                                        </span>
                                    </p>                                    

                                    <p>
                                        <span class="leftside">
                                            Saloon Map :
                                        </span>
                                    </p>
                                    <div className="map">
                                        {
                                            <Mymap
                                                latitude={
                                                    partnerData[0].latitude !==
                                                    undefined
                                                        ? partnerData[0]
                                                              .latitude
                                                        : ''
                                                }
                                                longitude={
                                                    partnerData[0].longitude !==
                                                    undefined
                                                        ? partnerData[0]
                                                              .longitude
                                                        : ''
                                                }
                                            />
                                        }
                                    </div>
                                    {partnerData[0].isaccepted === 0 ? (
                                        <p>
                                            <Button
                                                type="primary"
                                                htmlType="create"
                                                className="save-btn"
                                                onClick={() =>
                                                    isAccept(
                                                        partnerData[0].id,
                                                        true
                                                    )
                                                }
                                            >
                                                {getLocaleMessages({
                                                    id: 'common.accept',
                                                })}
                                            </Button>
                                            &nbsp;
                                            <Button
                                                type="primary"
                                                htmlType="create"
                                                className="save-btn"
                                                onClick={() =>
                                                    isAccept(
                                                        partnerData[0].id,
                                                        false
                                                    )
                                                }
                                            >
                                                {getLocaleMessages({
                                                    id: 'common.reject',
                                                })}
                                            </Button>
                                            &nbsp;
                                            <Button
                                                type="primary"
                                                htmlType="create"
                                                className="save-btn"
                                                onClick={() => BackPage()}
                                            >
                                                Back
                                            </Button>
                                        </p>
                                    ) : (
                                        <>
                                            <Button
                                                type="primary"
                                                htmlType="create"
                                                className="save-btn"
                                                onClick={() => BackPage()}
                                            >
                                                Back
                                            </Button>
                                        </>
                                    )}
                                </Spin>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PartnersApplication;
