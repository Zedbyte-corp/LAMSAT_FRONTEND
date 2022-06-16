import React, { useState, useEffect } from "react";
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
  DatePicker,Table,
  message,
  Spin,
  Radio,
  TimePicker,
  Space
} from "antd";
import moment from 'moment';
import {CheckOutlined } from "@ant-design/icons";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector,useDispatch } from "react-redux";
import actions  from "redux/vendor/Staff/actions";
import { store } from 'redux/store';
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import { getLocaleMessages , getLocalData} from "redux/helper";


const { TabPane } = Tabs;

const { Option } = Select;

const format = 'HH:mm';

function callback(key) {

}

const CreateService = (props) => {
  const { vendorServiceList , serviceVisible} = useSelector((state) => state.Services);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [serviceId,setServiceId] = useState([]);
  const dataSource = [
    {
      key: '1',
      name: 'Sunday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    },
    {
      key: '2',
      name: 'Monday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    },
    {
      key: '3',
      name: 'Tuesday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    },
    {
      key: '4',
      name: 'Wednesday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    },
    {
      key: '5',
      name: 'Thursday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    },
    {
      key: '6',
      name: 'Friday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    },
    {
      key: '7',
      name: 'Saturday',
      StartTime: '10:00 AM',
      EndTime: '05:00 PM',
      Status:'Active'
    }
  ];

  const columns = [
    {
      title: 'SN',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Days',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Time',
      render: (text, record) =>
      record.id !== 0 ? (
        <TimePicker
    format="HH:mm"
    showNow={true}
    value={moment(record.StartTime, "HH:mm")}
    onSelect={(value) => {
      const timeString = moment(value).format("HH:mm");
      store.dispatch({
        type:actions.PUT_STAFF_TIME,
        id: getLocalData('id'),
        staffid:record.key,
        field:'Start',
        Time:timeString
      });
      //setSelectedTime(timeString)
}} />


      ) : (text.StartTime),
    },
    {
      title: 'End Time',
      render: (text, record) =>
      record.id !== 0 ? (
        <TimePicker
    format="HH:mm"
    showNow={true}
    value={moment(record.EndTime, "HH:mm")}
    onSelect={(value) => {
      const timeString = moment(value).format("HH:mm");

      store.dispatch({
        type:actions.PUT_STAFF_TIME,
        id: getLocalData('id'),
        staffid:record.key,
        field:'End',
        Time:timeString
      });
      //setSelectedTime(timeString)
}} />


      ) : (text.EndTime),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },


    {
      title: 'Action', dataIndex: 'name', key: 'x',
      render: (text, record) => {
        var record = record;
        return (
        <Space size="middle">
          {
          <CheckOutlined id={record.key} onClick={(e) => {
            let id = parseInt(record.key);
            Approve(id);
          }}/>
        }

        </Space>
      )},
    }
  ];

  const Approve = (id) =>{
     store.dispatch({
      type:actions.PUT_STAFF_STATUS,
      vendorid: getLocalData('id'),
      staffid:id
    });
  }

  return (

      <div className="modal-content">
      <Table dataSource={dataSource} columns={columns} />
      </div>
  );
};

export default CreateService;
