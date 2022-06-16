import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Spin,
  DatePicker,
  Modal,
  Select,
  Form,
  TimePicker,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import 'assets/css/dashboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/vendor/Staff/actions';
import serviceActions from 'redux/vendor/Services/actions';
import { store } from 'redux/store';
import DataTable from 'helpers/datatable';
import SweetAlert from 'helpers/sweetalert';
import moment from 'moment';
import { getLocaleMessages, getLocalData } from 'redux/helper';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import Createstafftime from './CreateStafftime';

const { Option } = Select;

function onBlur() {}

function onFocus() {}

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
  },
];

function PickerWithType({ type, onChange }) {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}
function SwitchablePicker() {
  const [type, setType] = useState('time');
  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} />
    </Space>
  );
}

function getWeekDays(clickedDate) {
  var from = moment(clickedDate).startOf('week').format('YYYY-MM-DD');
  //.toDate();
  const days = [];
  for (let i = 1; i <= 7; i += 1) {
    days.push(
      moment(from).add(i, 'days').format('ddd Do MMM YYYY')
      //.toDate()
    );
  }
  return days;
}

function getWeekDaysYear(clickedDate) {
  var from = moment(clickedDate).startOf('week').format('YYYY-MM-DD');
  const days = [];
  for (let i = 1; i <= 7; i += 1) {
    days.push(moment(from).add(i, 'days').format('DD-MM-YYYY'));
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date).startOf('week').toDate(),
    to: moment(date).endOf('week').toDate(),
  };
}

const StafTime = (props) => {
  const { prop } = props;
  const [visible, setVisible] = useState(false);
  const [selectedDays, setselectedDays] = useState([]);
  const [selectedDaysYear, setselectedDaysYear] = useState([]);
  const [Today, setToday] = useState(moment().format('YYYY/MM/DD'));
  console.log('this is the value od today in the list date', Today);
  var CurrentDate = moment().format();
  const [Startdate, setStartdate] = useState(moment().format('DD-MM-YYYY'));
  const [Enddate, setEnddate] = useState(moment().format('DD-MM-YYYY'));
  //const [startendtime, setstartendtime] = useState({});
  const [staffdate, setstaffdate] = useState();
  const [staffID, setstaffID] = useState();
  const [vendorID, setvendorID] = useState();
  const [ustarttime, setustarttime] = useState();
  const [uendtime, setuendtime] = useState();
  const [stafftimeID, setstafftimeID] = useState();
  const [StaffName, setStaffName] = useState('');
  const {
    staffTimeList,
    staffPopup,
    Staffshiftlist,
    shiftloading,
    isupdatestaffSuccess,
    isdeletestaffSuccess,
  } = useSelector((state) => state.Staffs);
  const { staffList } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Staffs);
  const [filterStaffList, setfilterStaffList] = useState();
  const [filterdate, setfilterdate] = useState();
  const [slotcreatevisible, setslotcreatevisible] = useState(false);

  useEffect(() => {
    /* store.dispatch({
      type:actions.GET_ADMIN_STAFF_TIMELIST
    });*/

    store.dispatch({
      type: serviceActions.GET_VENDORSTAFF_LIST,
      id: getLocalData('id'),
      callBackAction: (response) => {},
    });
    /* store.dispatch({
      type: actions.GET_ADMIN_STAFF_LIST
    });*/
    if (1 && selectedDays.length == 0) {
      setselectedDays(getWeekDays(Today));
      setselectedDaysYear(getWeekDaysYear(Today));
    }
  }, []);

  const Approve = (id, dayobj, setday) => {
    var out = staffTimeList.filter(
      (item) => item.vendorid == getLocalData('id')
    );

    if (out.length > 0) {
      var firststr = out[0].firstslot;
      var firstoutval = firststr.split('-');
      var secondstr = out[0].secondslot;
      var secondoutval = secondstr.split('-');
    }

    store.dispatch({
      type: actions.LOAD_POPUP_SLOT,
      payload: {
        staffid: id,
        first_start: out.length > 0 ? firstoutval[0] : '09:00AM',
        first_end: out.length > 0 ? firstoutval[1] : '05:00PM',
        second_start: out.length > 0 ? secondoutval[0] : '06:00PM',
        second_end: out.length > 0 ? secondoutval[1] : '08:00PM',
        repeat: out.length > 0 ? out[0].repeat : 1,
        day: out.length > 0 ? out[0].day : '',
      },
    });
    setIsModalVisible(true);
    let dayarr = dayobj[setday];
    //setstartendtime({starttime: dayarr.split("-")[0], endtime: (dayarr.split("-")[1]).split(",")[0]});
    setstaffdate(moment(setday, 'ddd Do MMM YYYY').format('DD-MM-YYYY'));
    setustarttime(dayarr.split('-')[0]);
    setuendtime(dayarr.split('-')[1].split(',')[0]);
    setstafftimeID(dayarr.split('-')[1].split(',')[1]);
  };

  function onChangeStart(value) {
    var from_time = value;
    var to_time = staffPopup.first_end;

    var from = Date.parse('01/01/2011 ' + from_time);
    var to = Date.parse('01/01/2011 ' + to_time);

    var difference_in_milliseconds = to - from;
  }

  function onChangeEnd(value) {
    var to_time = value;
    var from_time = staffPopup.first_start;

    var from = Date.parse('01/01/2011 ' + from_time);
    var to = Date.parse('01/01/2011 ' + to_time);

    var difference_in_milliseconds = to - from;
  }

  const onChange = (date, dateString) => {
    // var weekdayvalue = getWeekDays(dateString)
    setfilterdate(dateString);
    setselectedDays(getWeekDays(dateString));
    setselectedDaysYear(getWeekDaysYear(dateString));
  };

  useEffect(() => {
    if (selectedDaysYear.length) {
      var sdate = selectedDaysYear[0];
      var edate = selectedDaysYear[selectedDaysYear.length - 1];
      setStartdate(sdate);
      setEnddate(edate);
      if (filterStaffList) {
        store.dispatch({
          type: actions.GET_ADMIN_STAFF_SHIFT_LIST,
          payload: {
            vendorid: filterStaffList[0].vendorid,
            startdate: sdate,
            enddate: edate,
            status: 1,
          },
        });
      } else {
        store.dispatch({
          type: actions.GET_ADMIN_STAFF_SHIFT_LIST,
          payload: {
            vendorid: getLocalData('id'),
            startdate: sdate,
            enddate: edate,
            status: 1,
          },
        });
      }
    }
  }, [selectedDaysYear]);

  console.log(
    'this is the value of the selected date int he list',
    selectedDays
  );

  const _obj = {
    key1: ['a', 'b', 'c'],
    key2: ['d', 'e', 'f'],
    key3: ['g', 'h', 'i'],
  };
  const _arr = [].concat.apply([], Object.values(_obj));
  var staffTime = [];
  var temp = [];
  selectedDays.map((selectDay) => {
    if (selectDay == moment().format('ddd Do MMM')) {
      var timingVal =
        selectDay == moment().format('ddd Do MMM') ? '11:00 AM - 02:30 PM' : 0;
      temp.push({ selectDay: timingVal });
    } else {
      temp.push({ selectDay: '09:00 AM - 05:00 PM' });
    }
  });

  useEffect(() => {
    if (filterStaffList) {
      store.dispatch({
        type: actions.GET_ADMIN_STAFF_SHIFT_LIST,
        payload: {
          vendorid: filterStaffList[0].vendorid,
          startdate: Startdate,
          enddate: Enddate,
          status: 1,
        },
      });
      setstaffID(filterStaffList[0].id);
      setvendorID(filterStaffList[0].vendorid);
      setStaffName(
        filterStaffList[0].firstname + ' ' + filterStaffList[0].lastname
      );
    }
  }, [filterStaffList]);

  var final = [];

  if (Staffshiftlist.length) {
    if (staffID) {
      var finals = [];
      var filt = Staffshiftlist.filter(
        (fdata) => fdata.vendorstaffid == staffID
      );
      filt.map((i) => {
        let t = {};
        let startdata = i.starttime;
        let enddata = i.endtime;
        selectedDays.map((selectDay) => {
          if (
            selectDay == moment(i.day, 'DD-MM-YYYY').format('ddd Do MMM YYYY')
          ) {
            t[selectDay] =
              moment(startdata).utc(false).format('hh:mm A') +
              '-' +
              moment(enddata).utc(false).format('hh:mm A') +
              ',' +
              i.id;
          }
        });
        finals.push(t);
      });
      var newfinal = finals;
      var mapped = newfinal.map((item) => item);
      var newObj = Object.assign({}, ...mapped);
      final.push([Object.assign(newObj, { id: StaffName })]);
    } else {
      var finals = [];
      var duplicateid = [];
      Staffshiftlist.map((i) => {
        let t = {};
        let startdata = i.starttime;
        let enddata = i.endtime;
        selectedDays.map((selectDay) => {
          if (
            selectDay == moment(i.day, 'DD-MM-YYYY').format('ddd Do MMM YYYY')
          ) {
            t['staffID'] = i.vendorstaffid;
            t['id'] = i.stfaffname;
            t[selectDay] =
              moment(startdata).utc(false).format('hh:mm A') +
              '-' +
              moment(enddata).utc(false).format('hh:mm A') +
              ',' +
              i.id;
          }
        });
        finals.push(t);
        duplicateid.push(i.vendorstaffid);
      });
      var arr = duplicateid.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
      });
      var array2 = [];
      for (var j = 0; j < arr.length; j++) {
        var testdate = finals.filter((data) => data.staffID == arr[j]);
        if (testdate.length) {
          var testdate1 = testdate;
          var testdate2 = testdate1.map((item) => item);
          var newObj1 = Object.assign({}, ...testdate2);
          array2.push(newObj1);
        }
      }
      final.push(array2);
    }
  }

  var selectedDay = {};
  let idObj = {
    title: 'Staff Name',
    dataIndex: 'id',
    key: 'id',
  };
  var columns = [];
  var sourceData = [];
  columns.push(idObj);
  var daata =
    1 > 0
      ? selectedDays.map((selectDay) => {
          selectedDay = {
            title: selectDay,
            dataIndex: selectDay,
            key: selectDay,
            render: (text, record) => (
              <span>
                <button //disabled={text ? false : true}
                  className={text ? 'time_btn' : 'time_btn addBtn'}
                  onClick={(e) => {
                    if (text) {
                      let id = parseInt(record.id);
                      Approve(id, record, selectDay);
                    } else {
                      setslotcreatevisible(true);
                      //prop.history.push("/vendor/CreateStafTime");
                    }
                  }}
                  //className="time__staff_button"
                >
                  {text ? text.split(',')[0] : <PlusOutlined />}
                </button>
              </span>
            ),
          };

          columns.push(selectedDay);
          //selectedDay = selectedDay+',';
        })
      : '';

  const filterStaff = (value) => {
    // setfilterStaffList(
    //   staffList.filter(data => data.id === value)
    // );
    let fil = staffList.filter((data) => data.id === value);
    setfilterStaffList(fil);
  };

  console.log('this is the value of the data in the filter', filterStaffList);

  /*
var x = ','; var z= '';
Object.keys(columns).map(function(k){
  var j = columns[k];
  z = JSON.stringify(columns[k])+x;


  z1 = JSON.stringify(columns[k])+z;

  return columns[k]


}).join(",")

// columns.push(selectedDay);
*/
  const columns1 = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      onFilter: (value, record) => record.firstname.indexOf(value) === 0,
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChangeRepeat = (args) => {};

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
        ('0' + (hh % 12)).slice(-2) +
        ':' +
        ('0' + mm).slice(-2) +
        ' ' +
        ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
      select =
        select + '<option value="' + times[i] + '">' + times[i] + '</option>';
    }
    return select;
  }

  const onFinish = () => {
    store.dispatch({
      type: actions.UPDATE_ADMIN_STAFF_SHIFT,
      payload: {
        id: parseInt(stafftimeID),
        starttime: ustarttime,
        endtime: uendtime,
        day: staffdate,
      },
    });
    setIsModalVisible(false);
  };
  const onDelete = () => {
    store.dispatch({
      type: actions.DELETE_ADMIN_STAFF_SHIFT,
      payload: {
        id: parseInt(stafftimeID),
      },
    });
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isupdatestaffSuccess.length) {
      store.dispatch({
        type: actions.GET_ADMIN_STAFF_SHIFT_LIST,
        payload: {
          vendorid: getLocalData('id'),
          startdate: Startdate,
          enddate: Enddate,
          status: 1,
        },
      });
    }
  }, [isupdatestaffSuccess]);

  useEffect(() => {
    if (isdeletestaffSuccess.length) {
      store.dispatch({
        type: actions.GET_ADMIN_STAFF_SHIFT_LIST,
        payload: {
          vendorid: getLocalData('id'),
          startdate: Startdate,
          enddate: Enddate,
          status: 1,
        },
      });
    }
  }, [isdeletestaffSuccess]);

  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto staf-time"
        >
          <Card title="Staff Time">
            <Row>
              <Col span={24} className="inner-content staff-time">
                {/*Modal*/}

                <Modal
                  title="Edit Hours"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  className="create_category_modal"
                  footer={false}
                  width={650}
                >
                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item label="SHIFT START">
                        {/* <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> */}
                        <Select
                          placeholder="On going"
                          optionFilterProp="children"
                          onChange={(e) => setustarttime(e)}
                          //defaultValue={ustarttime}
                          value={ustarttime}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {ReactHtmlParser(GenTimePullDown(15))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item label="SHIFT END">
                        {/* <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> */}
                        <Select
                          placeholder="On going"
                          optionFilterProp="children"
                          onChange={(e) => setuendtime(e)}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          //defaultValue={uendtime && uendtime}
                          value={uendtime}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {ReactHtmlParser(GenTimePullDown(15))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col span={8}>
                      <Button className="add-shift">Add another shift</Button>
                    </Col> */}
                  </Row>

                  <div className="button-center">
                    <Button type="primary" onClick={onDelete}>
                      Delete
                    </Button>
                    <Button type="primary" onClick={onFinish}>
                      Save
                    </Button>
                    <Button
                      type="primary"
                      onClick={(e) => setIsModalVisible(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Modal>

                <Row gutter={30}>
                  <Col span={10}>
                    <Form.Item>
                      <Select
                        placeholder="Select Staff"
                        optionFilterProp="children"
                        className="staftiming-head"
                        //onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={filterStaff}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {staffList &&
                          staffList.length > 0 &&
                          staffList.map((list, id) => {
                            return (
                              <Option value={list.id} key={id}>
                                {list.firstname + ' ' + list.lastname}
                              </Option>
                            );
                          })}
                      </Select>{' '}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <DatePicker
                        onChange={onChange}
                        defaultValue={moment()}
                        format={'YYYY/MM/DD'}
                        className="staftiming-datepick"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Button
                      type="primary"
                      className="new-btn"
                      onClick={
                        (e) => setslotcreatevisible(true)
                        //prop.history.push("/vendor/CreateStafTime")
                      }
                    >
                      Schedule
                    </Button>
                  </Col>
                </Row>

                <Spin size="large" spinning={shiftloading}>
                  <DataTable columns={columns} dataSource={final[0]} />
                </Spin>
              </Col>
              <Createstafftime
                modalVisible={slotcreatevisible}
                setModalVisible={setslotcreatevisible}
                getStartdate={Startdate}
                getEnddate={Enddate}
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StafTime;
