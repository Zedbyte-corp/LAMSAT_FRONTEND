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
  DatePicker,
  Table,
  message,
  Spin,
  Radio,
  TimePicker,
  Space,
  PageHeader,
  Badge,
} from 'antd';

import DataTable from 'helpers/datatable';
import moment from 'moment';
import { CheckOutlined } from '@ant-design/icons';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import ImageUploader from 'components/Shared/ImageUpload';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/vendor/Staff/actions';
import { store } from 'redux/store';
import settingActions from 'redux/Settings/actions';
import serviceActions from 'redux/vendor/Services/actions';
import timeActions from 'redux/admin/Timeslot/actions';
import { getLocaleMessages, getLocalData } from 'redux/helper';

const { TabPane } = Tabs;

const { Option } = Select;

const format = 'HH:mm';

const UpdateTime = (props) => {
  const {
    timeVisible,
    VendorTimeslot,
    timeDetails,
    vendorVisible,
    vendorDetails,
    timeLoader,
    updateloader
  } = useSelector((state) => state.AdminTimeslot);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const [value, setValue] = useState(1);
  const [show, setShow] = useState(true);
  const [Availability, setAvailability] = useState(0);
  const [vendorId, setVendorId] = useState();
  const [isSelect, setSelect] = useState();
  const [serviceId, setServiceId] = useState([]);

  useEffect(() => {
    if (timeVisible && timeVisible.length) {
      setAvailability(vendorDetails[0].id);
      setSelect(vendorDetails[0].vendorname);
      store.dispatch({
        type: timeActions.GET_ADMIN_TIME_LIST,
        vendorid: vendorDetails[0].id,
      });
    }

    if (vendorVisible) {
      store.dispatch({
        type: timeActions.GET_ADMIN_VENDOR_LIST,
        vendorid: getLocalData('id'),
      });
    }
  }, [VendorTimeslot, vendorDetails]);

  const handleChangeService = (value) => {
    setAvailability(value);
    store.dispatch({
      type: timeActions.GET_ADMIN_TIME_LIST,
      vendorid: value,
    });
  };

  timeDetails &&
    timeDetails.length > 0 &&
    timeDetails.map((list, id) => {
      list.statusvalue = list.status == 1 ? 'Active' : 'inActive';
      return list;
    });
  const columns = [
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Start Time',
      render: (text, record) =>
        record.id !== 0 ? (
          <TimePicker
            format="HH:mm"
            showNow={false}
            minuteStep={15}
            value={record.starttime == "Invalid date" ? moment("00:00", 'HH:mm') : moment(record.starttime, 'HH:mm')}
            onChange={(value) => {
              const timeString = moment(value).format('HH:mm');
              store.dispatch({
                type: timeActions.UPDATE_ADMIN_TIME,
                vendorid: Availability,
                id: record.id,
                field: 'Start',
                starttime: timeString,
              });
            }}
          />
        ) : (
          text.starttime
        ),
    },
    {
      title: 'End Time',
      render: (text, record) =>
        record.id !== 0 ? (
          <TimePicker
            format="HH:mm"
            showNow={false}
            minuteStep={15}
            value={record.endtime == "Invalid date" ? moment("00:00", 'HH:mm') : moment(record.endtime, 'HH:mm')}
            onChange={(value)=>{
              const timeString = moment(value).format('HH:mm');
              store.dispatch({
                type: timeActions.UPDATE_ADMIN_TIME,
                vendorid: Availability,
                id: record.id,
                field: 'End',
                endtime: timeString,
              });
              /*  const timeString = moment(value).format("HH:mm");

      store.dispatch({
        type:actions.PUT_STAFF_TIME,
        id: getLocalData('id'),
        staffid:record.key,
        field:'End',
        endtime:timeString
      });*/
              //setSelectedTime(timeString)
            }}
          />
        ) : (
          text.endtime
        ),
    },
    {
      title: 'Status',
      dataIndex: 'statusvalue',
      key: 'statusvalue',
    },

    {
      title: 'Availability',
      dataIndex: 'name',
      key: 'x',
      render: (text, record) => {
        var record = record;
        return (
          <Switch
            checked={record.status == 1 ? true : false}
            onChange={() => {
              store.dispatch({
                type: timeActions.UPDATE_ADMIN_TIME,
                vendorid: Availability,
                id: record.id,
                field: 'status',
                vendorstatus: record.status == 1 ? 0 : 1,
              });
            }}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Row>
        <Col
          xsOffset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto vendor"
        >
          <Card title="Timeslot">
            <Row>
              <Col span={12}>
                <Form layout="vertical">
                  <Form.Item label="Select Saloon">
                    <Select
                      mode="single"
                      style={{ width: 400 }}
                      name="serviceid"
                      defaultValue={
                        vendorDetails.length > 0
                          ? vendorDetails[0].vendorname
                          : ''
                      }
                      placeholder={'Select Saloon'}
                      onChange={handleChangeService}
                    >
                      {vendorDetails &&
                        vendorDetails.length > 0 &&
                        vendorDetails.map((list, id) => {
                          return (
                            <option value={list.id} key={id}>
                              {list.vendorname}
                            </option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Spin size="large" spinning={timeLoader || updateloader}>
              <DataTable columns={columns} dataSource={timeDetails} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateTime;
