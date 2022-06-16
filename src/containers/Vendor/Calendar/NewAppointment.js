import React, { useState, useEffect } from 'react';
import moment from './moment-range';
import { Select, Button, message, Card, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, DatePicker, Steps, Radio, Form, Input } from 'antd';

import { DownOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import StickyBox from 'react-sticky-box';
import ServiceDetails from './ServiceDetails';


import { store } from 'redux/store';
import actions from 'redux/vendor/Services/actions';
import actionsCheckout from 'redux/Details/actions';
import { getLocaleMessages, getLocalData } from 'redux/helper';

const { Option, OptGroup } = Select;
const { Step } = Steps;
const { Search } = Input;

const optionsWithDisabled = [
  { label: 'Cash', value: 'Cash' },
  { label: 'Other', value: 'Other' },
];


export default function NewAppoinment() {
  var [serviceDeatilArr, setServiceDeatilArr] = useState([]);
  const [serviceDate, setServiceDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [dateValueHour, setDateValueHour] = useState('');

  const {
    categoryServiceByVendorList,
    loadingCategoryServiceByVendorList,
  } = useSelector((state) => state.Services);

  useEffect(() => {
    //setServiceDeatilArr([]);
    store.dispatch({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST,
      vendorid: getLocalData('id'),
      languageid: 1,
    });
  }, []);

  console.log("serObj 33333: " + JSON.stringify(serviceDeatilArr));

  const minutesToHours = (totalMinutes) => {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return hours + ' hours ' + minutes + ' min.';
  };

  const getSubTotal = () => {
    var total = 0;
    serviceDeatilArr.map((service, index) => {
      total += parseFloat(service.price);
    });
    return total;
  };

  const getTaxPercent = () => {
    var tax = 0;
    return tax;
  };

  const getSubTax = () => {
    const saloonDetail = {
      vat: 10,
      language: [{
        name: "ssssssss"
      }]
    };
    if (
      typeof saloonDetail !== undefined &&
      saloonDetail.language !== undefined &&
      saloonDetail.language.length > 0 &&
      saloonDetail.vat !== null &&
      parseInt(saloonDetail.vat) > 0
    ) {
      var serviceArr = getSubTotal();
      var vatPersentage = saloonDetail.vat / 100;
      return vatPersentage * serviceArr;
    }
    return 0;
  };
  const getTotal = () => {
    var price = getSubTotal();
    var tax = getSubTax();
    return price + tax;
  };


  const getSelectedServices = (details) => {
    console.log("details: " + JSON.stringify(details));
    setServiceDeatilArr(details);
  };

  const setDateVal = (date) => {
    setDateValueHour(moment()
      .startOf('day')
      .diff(
        moment(
          date
        ).startOf('day'),
        'days'
      ) === 0 ? parseInt(date.endOf('hour').format('HH')) : 0);
    setServiceDate(moment(date).format('DD/MM/YYYY'))
  }

  const handleSelectService = (count, value) => {
    console.log("handleSelectService: " + count + " / " + value);

    const found = serviceDeatilArr.some((ch) => ch.key === count);
    const arr = categoryServiceByVendorList.flatMap(services => services.servicelang).find(service => service.serviceid === value);
    console.log("arr: " + JSON.stringify(arr));

    if (!found) {

      let serObj = {
        key: count,
        saloonId: getLocalData('id'),
        serviceid: arr.serviceid,
        servicename: arr.servicename,
        duration: arr.serviceprice[0].duration,
        price: arr.serviceprice[0].price,
        tax: 0,
        staffId: 0,
        staffName: '',
        service_date: serviceDate,
        service_time: '',
      };

      var filtered = serviceDeatilArr.filter(function (el) {
        return el.key !== count;
      });
      filtered.push(serObj);
      setServiceDeatilArr(filtered);
    } else {

      const slotIndex = serviceDeatilArr.findIndex((obj) => obj.key === count);
      const slots = [
        ...serviceDeatilArr.slice(0, slotIndex),
        {
          key: serviceDeatilArr[slotIndex].key,
          saloonId: serviceDeatilArr[slotIndex].saloonId,
          serviceid: arr.serviceid,
          servicename: arr.servicename,
          duration: arr.serviceprice[0].duration,
          price: arr.serviceprice[0].price,
          tax: serviceDeatilArr[slotIndex].tax,
          staffId: serviceDeatilArr[slotIndex].staffId,
          staffName: serviceDeatilArr[slotIndex].staffName,
          service_date: serviceDeatilArr[slotIndex].service_date,
          service_time: serviceDeatilArr[slotIndex].service_time,
        },
        ...serviceDeatilArr.slice(slotIndex + 1),
      ];

      setServiceDeatilArr(slots);
    }

  };

  const handleSelectTime = (e, count, value) => {
    console.log("handleSelectTime: " + count + " / " + value);

    const found = serviceDeatilArr.some((ch) => ch.key === count);
    console.log("arr 1: " + JSON.stringify(serviceDeatilArr));
    console.log("arr 2: " + count);

    if (found) {

      const slotIndex = serviceDeatilArr.findIndex(
        (obj) => obj.key == count
      );
      const slots = [
        ...serviceDeatilArr.slice(0, slotIndex),
        {
          key: serviceDeatilArr[slotIndex].key,
          saloonId: serviceDeatilArr[slotIndex].saloonId,
          serviceid: serviceDeatilArr[slotIndex].serviceid,
          servicename: serviceDeatilArr[slotIndex].servicename,
          duration: serviceDeatilArr[slotIndex].duration,
          price: serviceDeatilArr[slotIndex].price,
          tax: serviceDeatilArr[slotIndex].tax,
          staffId: serviceDeatilArr[slotIndex].staffId,
          staffName: serviceDeatilArr[slotIndex].staffName,
          service_date: serviceDeatilArr[slotIndex].service_date,
          service_time: value,
        },
        ...serviceDeatilArr.slice(slotIndex + 1),
      ];

      setServiceDeatilArr(slots);
      return true;
    } else {
      message.error('Please select service');
      return false;
    }

  };

  const handleSelectStaff = (e, count, value, serviceStaffDetail) => {
    console.log("handleSelectStaff: " + count + " / " + value);
    console.log("handleSelectStaff 2: " + JSON.stringify(serviceStaffDetail));


    const serviceStaffIndex = serviceStaffDetail.findIndex((ch) => ch.id === value);

    const found = serviceDeatilArr.some((ch) => ch.key === count);
    const arr = categoryServiceByVendorList.flatMap(services => services.servicelang).find(service => service.serviceid === value);
    console.log("arr: " + JSON.stringify(arr));

    if (found) {

      const slotIndex = serviceDeatilArr.findIndex(
        (obj) => obj.key == count
      );
      const slots = [
        ...serviceDeatilArr.slice(0, slotIndex),
        {
          key: serviceDeatilArr[slotIndex].key,
          saloonId: serviceDeatilArr[slotIndex].saloonId,
          serviceid: serviceDeatilArr[slotIndex].serviceid,
          servicename: serviceDeatilArr[slotIndex].servicename,
          duration: serviceDeatilArr[slotIndex].duration,
          price: serviceDeatilArr[slotIndex].price,
          tax: serviceDeatilArr[slotIndex].tax,
          staffId: value,
          staffName: serviceStaffDetail[serviceStaffIndex] ? serviceStaffDetail[serviceStaffIndex].firstname + ' ' + serviceStaffDetail[serviceStaffIndex].lastname : '',
          service_date: serviceDeatilArr[slotIndex].service_date,
          service_time: serviceDeatilArr[slotIndex].service_time,
        },
        ...serviceDeatilArr.slice(slotIndex + 1),
      ];

      setServiceDeatilArr(slots);
    } else {
      message.error('Please select service');
      return false;
    }

  };

  var [serviceRowsArr, setServiceRowsArr] = useState([]);
  const addServiceRow = () => {
    setServiceRowsArr(serviceRows => [...serviceRows, serviceRowsArr.length + 1]);
  };

  const deleteServiceRow = (value) => {
    const vals = serviceRowsArr.splice(value, 1);

    console.log("deleteServiceRowdeleteServiceRow 1: " + value);
    console.log("deleteServiceRowdeleteServiceRow 2: " + serviceRowsArr);
    setServiceRowsArr(serviceRowsArr);
  };

  const onBooking = (e) => {
    if (serviceDate === '') {
      message.error('Please select date!');
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      return false;
    } else if (serviceDeatilArr.length === 0) {
      message.error('Please select atleast one service!');
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      return false;
    }
    let isValid = true;
    isValid = serviceDeatilArr.length > 0 ? true : false;
    serviceDeatilArr.map((service, index) => {
      if (
        service.staffId === 0 ||
        service.staffName === '' ||
        service.service_date === '' ||
        service.service_time === ''
      ) {
        isValid = false;
      }
    });

    if (!isValid) {
      message.error(
        'Please select date, time and staff for all selected services!'
      );
    } else {


      const payLoadData = {
        vendorid: parseInt(serviceDeatilArr.length > 0 ? serviceDeatilArr[0].saloonId : 0),
        customerid: 1,
        service_date: serviceDate,
        service_time: '',
        subtotal: parseFloat(getSubTotal()),
        discountvalue: 0,
        actualrate: parseFloat(getSubTotal()),
        vat_percent: parseFloat(getTaxPercent()),
        vat_amount: parseFloat(getSubTax()),
        totalcost: parseFloat(getTotal()),
        payment_method: '1',
        devicetype: 'WEB',
        devicetoken: 'IMEI0015794545',
        guest: 1,
        categoryid: [],
        staffid: '0',
        serviceid: serviceDeatilArr ? serviceDeatilArr : [],
        packageid: [],
      };

      store.dispatch({
        type: actionsCheckout.SET_BOOKING,
        payload: payLoadData,
        callBackAction: (
          status,
          bookingid,
          saloonName,
          overAll,
          serviceTime,
          serviceDate,
          id
        ) => {
          if (status) {
            localStorage.setItem('bookinId', bookingid);
            localStorage.setItem('saloonName', saloonName);
            localStorage.setItem('serviceTime', serviceTime);
            localStorage.setItem('serviceDate', serviceDate);

            message.info('.................................');

            //props.history.push(`/confirmation/${id}`);
          } else {
            message.error('Some error occured while booking.');
          }
        },
      });

      message.info(
        'Booking now... Booking now... Booking now... Booking now...'
      );
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      //localStorage.setItem('serviceList', JSON.stringify(serviceDeatilArr));
      //localStorage.setItem('serviceDate', JSON.stringify(serviceDate));
      //history.push(`/checkout/${locSaloonId}`);
    }
  };

  return (
    <Form layout="vertical">
      <Row gutter={30}>
        <Col span={16}>
          <Form.Item label="Select Date">
            <DatePicker
              selected={serviceDate}
              onChange={date => { setDateVal(date) }}
              suffixIcon={<DownOutlined />}
              disabled={serviceDeatilArr.length > 0}
            />
          </Form.Item>

          <Steps progressDot direction="vertical">

            {[
              ...Array(serviceRowsArr.length),
            ].map((value, index) => (
              <Step
                key={index}
                title="Create New Service"
                description={
                  <>
                    <ServiceDetails id={index + 1} key={index}
                      categoryServiceByVendorList={categoryServiceByVendorList}
                      handleSelectService={handleSelectService}
                      handleSelectTime={handleSelectTime}
                      handleSelectStaff={handleSelectStaff}
                      dateValueHour={dateValueHour}
                      count={(index)}
                      deleteServiceRow={deleteServiceRow}
                    />
                  </>
                }
              />
            ))}
          </Steps>

          {
            categoryServiceByVendorList.length > 0 ? (
              <Button
                className="closaddServiceRowe_steps add_stepes"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={addServiceRow}
              />
            ) : (<> Please wait...</>)
          }
          <Form.Item label="Appointment Notes">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8}>
          <StickyBox offsetTop={20} offsetBottom={20}>
            <div className="cart__summary">
              <h4>Cart Summary</h4>
              <div className="orders">{serviceDate}</div>
              {serviceDeatilArr.sort(function (a, b) {
                return a.key.toString().localeCompare(b.key.toString())
              }).map((service, index) => {
                let serviceObjVal = service;
                return (
                  <>
                    <div className="orders">
                      <ul>
                        <li>
                          <div>
                            <h4>{serviceObjVal.servicename}</h4>
                            <p>
                              Duration:{' '}
                              {minutesToHours(serviceObjVal.duration)}
                            </p>
                            <p>At {serviceObjVal.service_time} </p>
                            <p>By {serviceObjVal.staffName}</p>
                          </div>
                          <div className="price">
                            {serviceObjVal.price} SAR
                          </div>
                        </li>
                      </ul>
                    </div>
                  </>
                );
              })}
              <p className="br__top">
                <span>Subtotal</span> <span>{getSubTotal()} SAR</span>{' '}
              </p>
              <p>
                <span>Tax (VAT)</span> <span>{getSubTax()} SAR</span>{' '}
              </p>
              <p>
                <span>Total</span> <span>{getTotal()} SAR</span>{' '}
              </p>
            </div>

            <h5 style={{ margin: '25px 0' }}>Voucher</h5>

            <Form.Item>
              <Search
                placeholder="Enter the Voucher Code"
                enterButton="Apply"
              />
            </Form.Item>

            <div className="button-center">
              <Button type="primary" className="full_block" onClick={onBooking} >
                Book Now
              </Button>
            </div>
          </StickyBox>
        </Col>
      </Row>
    </Form>
  );
}
