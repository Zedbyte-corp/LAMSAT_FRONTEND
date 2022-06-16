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
  DatePicker,
  Table,
  message,
  Spin,
  Radio,
  TimePicker,
  Space,
  PageHeader,
  Badge,
} from "antd";

import DataTable from "helpers/datatable";
import moment from "moment";
import { CheckOutlined } from "@ant-design/icons";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import timeActions from "redux/vendor/Timeslot/actions";
import { getLocaleMessages, getLocalData } from "redux/helper";

const { TabPane } = Tabs;

const { Option } = Select;

const format = "HH:mm";

const UpdateTime = (props) => {
  const { timeVisible, VendorTimeslot, timeDetails } = useSelector(
    (state) => state.Timeslot
  );

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [timeLoader, settimeLoader] = useState(false);
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [serviceId, setServiceId] = useState([]);
  const [timeSlotLoader, settimeSlotLoader] = useState(false);

  useEffect(() => {
    settimeLoader(true);
    if (timeVisible) {
      store.dispatch({
        type: timeActions.GET_VENDOR_TIME_LIST,
        vendorid: getLocalData("id"),
        callBackAction: (res) => {
          settimeLoader(false);
        },
      });
    }
  }, [VendorTimeslot]);

  timeDetails &&
    timeDetails.length > 0 &&
    timeDetails.map((list, id) => {
      list.statusvalue = list.status == 1 ? "Active" : "inActive";
      return list;
    });

  const columns = [
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Start Time",
      render: (text, record) =>
        record.id !== 0 ? (
          <TimePicker
            format="HH:mm"
            showNow={false}
            minuteStep={15}
            value={moment(record.starttime, "HH:mm")}
            onChange={(value) => {
              settimeLoader(true);
              const timeString = moment(value).format("HH:mm");
              // console.log("this is the value of the timeString");
              // return;
              store.dispatch({
                type: timeActions.UPDATE_VENDOR_TIME,
                vendorid: getLocalData("id"),
                timeslotid: record.id,
                field: "Start",
                starttime: timeString,
                callBackAction: (status) => {
                  if (status) {
                    settimeLoader(false);
                  } else {
                    settimeLoader(false);
                  }
                },
              });
            }}
          />
        ) : (
          text.starttime
        ),
    },
    {
      title: "End Time",
      render: (text, record) =>
        record.id !== 0 ? (
          <TimePicker
            format="HH:mm"
            minuteStep={15}
            showNow={false}
            value={moment(record.endtime, "HH:mm")}
            onChange={(value) => {
              settimeLoader(true);
              const timeString = moment(value).format("HH:mm");
              store.dispatch({
                type: timeActions.UPDATE_VENDOR_TIME,
                vendorid: getLocalData("id"),
                timeslotid: record.id,
                field: "End",
                endtime: timeString,
                callBackAction: (status) => {
                  if (status) {
                    settimeLoader(false);
                  } else {
                    settimeLoader(false);
                  }
                },
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
      title: "Status",
      dataIndex: "statusvalue",
      key: "statusvalue",
    },

    {
      title: "Availability",
      dataIndex: "name",
      key: "x",
      render: (text, record) => {
        var record = record;
        return (
          <Switch
            checked={record.status == 1 ? true : false}
            onChange={() => {
              settimeLoader(true);
              store.dispatch({
                type: timeActions.UPDATE_VENDOR_TIME,
                vendorid: getLocalData("id"),
                timeslotid: record.id,
                field: "status",
                status: record.status == 1 ? 0 : 1,
                callBackAction: (status) => {
                  if (status) {
                    settimeLoader(false);
                  } else {
                    settimeLoader(false);
                  }
                },
              });
            }}
          />
        );
      },
    },
    /*{
      title: 'Action', dataIndex: 'name', key: 'x',
      render: (text, record) => {
        var record = record;
        return (
        <Space size="middle">
          {
          <CheckOutlined id={record.key} onClick={(e) => {

            store.dispatch({
              type:timeActions.UPDATE_VENDOR_TIME,
              vendorid: getLocalData('id'),
              timeslotid:record.id,
              field:'status',
              status:record.status == 1? 0 : 1
            });

          }}/>
        }

        </Space>
      )},
    }*/
  ];

  return (
    <div>
      <Row>
        <Col
          xsOffset={3}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto vendor"
        >
          <h2 className="dash_title">Time slot</h2>

          <Card>
            <Spin spinning={timeLoader} size={"large"}>
              <DataTable columns={columns} dataSource={timeDetails} />
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateTime;
