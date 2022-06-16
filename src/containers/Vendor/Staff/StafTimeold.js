import React, { useState, useEffect } from "react";
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
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "assets/css/dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import serviceActions from "redux/vendor/Services/actions";
import { store } from "redux/store";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import moment from "moment";
import { getLocaleMessages, getLocalData } from "redux/helper";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const { Option } = Select;

function onBlur() {}

function onFocus() {}

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
  },
];

function PickerWithType({ type, onChange }) {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}
function SwitchablePicker() {
  const [type, setType] = useState("time");
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
  var from = moment(clickedDate).startOf("week").format("YYYY-MM-DD");
  //.toDate();
  const days = [];
  for (let i = 1; i <= 7; i += 1) {
    days.push(
      moment(from).add(i, "days").format("ddd Do MMM")
      //.toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date).startOf("week").toDate(),
    to: moment(date).endOf("week").toDate(),
  };
}

const StafTime = (props) => {
  const [visible, setVisible] = useState(false);
  const [selectedDays, setselectedDays] = useState([]);
  const [Today, setToday] = useState(moment().format("YYYY/MM/DD"));
  console.log("this is the value od today in the list date", Today);
  var CurrentDate = moment().format();

  const { staffTimeList, staffPopup } = useSelector((state) => state.Staffs);
  const { staffList } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Staffs);
  const [filterStaffList, setfilterStaffList] = useState();
  const [filterdate, setfilterdate] = useState();

  useEffect(() => {
    /* store.dispatch({
      type:actions.GET_ADMIN_STAFF_TIMELIST
    });*/

    store.dispatch({
      type: serviceActions.GET_VENDORSTAFF_LIST,
      id: getLocalData("id"),
    });
    /* store.dispatch({
      type: actions.GET_ADMIN_STAFF_LIST
    });*/
    if (1 && selectedDays.length == 0) {
      setselectedDays(getWeekDays(Today));
    }
  }, []);

  const Approve = (id) => {
    var out = staffTimeList.filter(
      (item) => item.vendorid == getLocalData("id")
    );

    if (out.length > 0) {
      var firststr = out[0].firstslot;
      var firstoutval = firststr.split("-");
      var secondstr = out[0].secondslot;
      var secondoutval = secondstr.split("-");
    }

    store.dispatch({
      type: actions.LOAD_POPUP_SLOT,
      payload: {
        staffid: id,
        first_start: out.length > 0 ? firstoutval[0] : "09:00AM",
        first_end: out.length > 0 ? firstoutval[1] : "05:00PM",
        second_start: out.length > 0 ? secondoutval[0] : "06:00PM",
        second_end: out.length > 0 ? secondoutval[1] : "08:00PM",
        repeat: out.length > 0 ? out[0].repeat : 1,
        day: out.length > 0 ? out[0].day : "",
      },
    });
    setIsModalVisible(true);
  };

  function onChangeStart(value) {
    var from_time = value;
    var to_time = staffPopup.first_end;

    var from = Date.parse("01/01/2011 " + from_time);
    var to = Date.parse("01/01/2011 " + to_time);

    var difference_in_milliseconds = to - from;
  }

  function onChangeEnd(value) {
    var to_time = value;
    var from_time = staffPopup.first_start;

    var from = Date.parse("01/01/2011 " + from_time);
    var to = Date.parse("01/01/2011 " + to_time);

    var difference_in_milliseconds = to - from;
  }

  const onChange = (date, dateString) => {
    // var weekdayvalue = getWeekDays(dateString)
    setfilterdate(dateString);
    setselectedDays(getWeekDays(dateString));
  };

  console.log(
    "this is the value of the selected date int he list",
    selectedDays
  );

  const _obj = {
    key1: ["a", "b", "c"],
    key2: ["d", "e", "f"],
    key3: ["g", "h", "i"],
  };
  const _arr = [].concat.apply([], Object.values(_obj));
  var staffTime = [];
  var temp = [];
  selectedDays.map((selectDay) => {
    if (selectDay == moment().format("ddd Do MMM")) {
      var timingVal =
        selectDay == moment().format("ddd Do MMM") ? "11:00 AM - 02:30 PM" : 0;
      temp.push({ selectDay: timingVal });
    } else {
      temp.push({ selectDay: "09:00 AM - 05:00 PM" });
    }
  });
  var final = [];

  if (filterStaffList) {
    filterStaffList.map((i) => {
      var time = "09:00AM-05:00PM";
      var cnt = 0;
      let t = {};
      selectedDays.map((selectDay) => {
        cnt++;
        if (staffTimeList.length > 0) {
          var k =
            staffTimeList.length > 0
              ? staffTimeList.map((val) => {
                  var ffrom = moment(val.day).format("ddd Do MMM");

                  if (selectDay == ffrom && i.id == getLocalData("id")) {
                    t["id"] = i.firstname;
                    t[selectDay] = val.firstslot + " && " + val.secondslot;
                  } else {
                    t["id"] = i.id + i.firstname;
                    t[selectDay] = "09:00AM-05:00PM";
                  }
                })
              : "";
        } else {
          t["id"] = i.firstname;
          t[selectDay] = "09:00AM-05:00PM";
        }
      });
      var d = selectedDays.length == cnt ? final.push(t) : "";
    });
  } else {
    staffList.map((i) => {
      var time = "09:00AM-05:00PM";
      var cnt = 0;
      let t = {};
      selectedDays.map((selectDay) => {
        cnt++;
        if (staffTimeList.length > 0) {
          var k =
            staffTimeList.length > 0
              ? staffTimeList.map((val) => {
                  var ffrom = moment(val.day).format("ddd Do MMM");

                  if (selectDay == ffrom && i.id == getLocalData("id")) {
                    t["id"] = i.firstname;
                    t[selectDay] = val.firstslot + " && " + val.secondslot;
                  } else {
                    t["id"] = i.id + i.firstname;
                    t[selectDay] = "09:00AM-05:00PM";
                  }
                })
              : "";
        } else {
          t["id"] = i.firstname;
          t[selectDay] = "09:00AM-05:00PM";
        }
      });
      var d = selectedDays.length == cnt ? final.push(t) : "";
    });
  }

  //staffTime.push({time:timingVal});
  /* var obj = {id:1,time:'09:20 AM - 05:00 PM',date:moment().format("ddd Do MMM")}
   var obj2 = {id:1,time:'10:00 AM - 04:15 PM',date:moment().format("ddd Do MMM")}
   staffTime.push(obj);
   staffTime.push(obj2);
/*  const handleDayChange = date => {
    this.setState({
      selectedDays: getWeekDays(getWeekRange(date).from),
    });
  };*/

  /* const handleDayEnter = date => {
    this.setState({
      hoverRange: getWeekRange(date),
    });
  };*/
  var selectedDay = {};
  let idObj = {
    title: "Staff Name",
    dataIndex: "id",
    key: "id",
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
                <Button
                  onClick={(e) => {
                    let id = parseInt(record.id);
                    Approve(id);
                  }}
                  className="time__staff_button"
                >
                  {text}
                </Button>
              </span>
            ),
          };

          columns.push(selectedDay);
          //selectedDay = selectedDay+',';
        })
      : "";

  const filterStaff = (value) => {
    // setfilterStaffList(
    //   staffList.filter(data => data.id === value)
    // );
    let fil = staffList.filter((data) => data.id === value);
    setfilterStaffList(fil);
  };

  console.log("this is the value of the data in the filter", filterStaffList);

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
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      onFilter: (value, record) => record.firstname.indexOf(value) === 0,
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortDirections: ["descend", "ascend"],
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
    var ap = ["AM", "PM"]; // AM-PM
    var select = "";

    //loop to increment the time and push results in array
    for (var i = 0; tt < 24 * 60; i++) {
      var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      var mm = tt % 60; // getting minutes of the hour in 0-55 format
      times[i] =
        ("0" + (hh % 12)).slice(-2) +
        ":" +
        ("0" + mm).slice(-2) +
        " " +
        ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
      select =
        select + '<option value="' + times[i] + '">' + times[i] + "</option>";
    }
    return select;
  }

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
          <Card title="Staf Time">
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
                          onChange={onChangeStart}
                          defaultValue={staffPopup.first_start}
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
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          defaultValue={staffPopup.first_end}
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

                  <Row gutter={30}>
                    <Col span={12}>
                      <Form.Item label="REPEATS">
                        <Select
                          placeholder="Repeat"
                          optionFilterProp="children"
                          onChange={onChangeRepeat}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Weakly">Weakly</Option>
                          <Option value="Dont-Repeat">Dont Repeat</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col span={8}>
                      <Form.Item label="SHIFT END">
                        <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                        <Select
                          placeholder="On going"
                          optionFilterProp="children"
                          onChange={onChangeEnd}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          defaultValue={staffPopup.first_end}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {ReactHtmlParser(GenTimePullDown(15))}
                        </Select>
                      </Form.Item>
                    </Col> */}
                    <Col span={12}>
                      <Form.Item label="END REPEATS">
                        <Select
                          placeholder="On going"
                          optionFilterProp="children"
                          onChange={onChange}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="10">On going</Option>
                          <Option value="11">
                            Spicify Date
                            <br />
                            <DatePicker />
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <div className="button-center">
                    <Button type="red-color">Delete</Button>
                    <Button type="primary">Save</Button>
                    {/* <Button>Close</Button> */}
                  </div>
                </Modal>

                <Row gutter={30}>
                  <Col span={12}>
                    <Form.Item>
                      <Select
                        placeholder="All Staff"
                        optionFilterProp="children"
                        className="staftiming-head"
                        onChange={onChange}
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
                                {list.firstname}
                              </Option>
                            );
                          })}
                        <Option value="allstaff">All Staff</Option>
                        <Option value="test">Test1</Option>
                        <Option value="staff1">Staff1</Option>
                      </Select>{" "}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <DatePicker
                        onChange={onChange}
                        defaultValue={moment()}
                        format={"YYYY/MM/DD"}
                        className="staftiming-datepick"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Spin size="large" spinning={loading}>
                  <DataTable columns={columns} dataSource={final} />
                </Spin>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StafTime;
