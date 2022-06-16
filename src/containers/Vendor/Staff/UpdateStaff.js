import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Form,
  Button,
  Tabs,
  DatePicker,
  message,
  Radio
} from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages, stringToDate, getLocalData } from "redux/helper";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import "react-phone-number-input/style.css";
import moment from "moment";
import PhoneInput from "react-phone-number-input";

const { Option } = Select;

const UpdateStaff = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  const [setLocalImage, setLocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  const [localImage, LocalImageFunc] = useState([]);
  const { loading } = useSelector((state) => state.Services);
  const state = JSON.parse(localStorage.getItem("staffData"));
  const [value, setValue] = useState(1);
  const [vendorId, setvendorId] = useState();
  const [serviceId, setServiceId] = useState([]);
  const { vendorServiceList, vendorDropdownList } = useSelector((state) => state.Services);

  useEffect(() => {
    store.dispatch({
      type: serviceActions.GET_VENDOR_DROPDOWN_LISTDATA,
      vendorid: getLocalData("id"),
    });
  }, [])

  useEffect(() => {
    store.dispatch({
      type: serviceActions.GET_VENDOR_SERVICE_LISTDATA,
      vendorid: getLocalData("id"),
    });
    store.dispatch({
      type: serviceActions.GET_VENDOR_STAFF_SERVICE,
      vendorid: getLocalData("id"),
    });
    setvendorId(getLocalData("id"));
  }, [vendorServiceList]);
  // console.log("state =>", state);
  // console.log("date =>", Date.parse(state.employee_startdate));
  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: false, message: "Select Country code!" }]}
    >
      <Select
        defaultValue="966"
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );
  const backTopage = () => {
    //localStorage.removeItem('staffData');
    props.history.push("/vendor/staff");
  };

  const onStatusChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    //var d = values.joindate;
    var d = "2021/11/09";
    //d = d.format(dateFormat).toString();
    // console.log("this is he date passed inside of the data", d);
    // return;
    if (imageOnly) {
      if (setLocalImage.length) {
        for (const localImage of setLocalImage) {
          let siteparam = new FormData();
          siteparam.set("files", localImage, localImage.name);
          let data = {
            id: state.id,
            email: values.email,
            contactnumber: values.contact,
            employee_startdate: d,
            firstname: values.firstname,
            lastname: values.lastname,
            staff_title: values.title,
            notes: "notes",
            status: values.status,
            vendorid: vendorId,
            serviceid: serviceId,
          };
          store.dispatch({
            type: settingActions.UPLOAD_SITEIMG,
            payload: siteparam,
            callBackAction: (imagePath, image_url) => {
              if (imagePath) {
                store.dispatch({
                  type: actions.POST_STAFF,
                  payload: {
                    ...data,
                    photopath: imagePath,
                    image_url: image_url,
                  },
                  callBackAction: (status) => {
                    if (status) {
                      LocalImageFunc([]);
                      backTopage();
                    }
                  },
                });
              }
            },
          });
        }
      } else {
        let error = getLocaleMessages({ id: "staff.image.error" });
        message.error(error);
      }
    } else {
      let data = {
        id: state.id,
        email: values.email,
        contactnumber: values.contact,
        employee_startdate: d,
        firstname: values.firstname,
        lastname: values.lastname,
        staff_title: values.title,
        notes: "notes",
        status: values.status,
        vendorid: vendorId,
        serviceid: serviceId,
        photopath: state.photopath,
        image_url: state.image_url,
      };
      // console.log(
      //   "this is the value of the statussss in the update staff",
      //   data
      // );
      // return;
      store.dispatch({
        type: actions.POST_STAFF,
        payload: data,
        callBackAction: (status) => {
          if (status) {
            LocalImageFunc([]);
            backTopage();
          }
        },
      });
    }
  };
  const onFinishFailed = (errorInfo) => { };
  const getSelectServices = () => {
    var res = state.serviceid.map(function (v) {
      return parseInt(v, 10);
    });
    return res;
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
    setImageOnlyFunc(true);
  };

  const handleChangeService = (value) => {
    setServiceId(value);
  };

  const getStaffService = (val) => {
    if (val.length) {
      // let service = val.filter((i) => i.serviceid == serviceID);
      // var res = service[0].service_staff.split(",").map(function (v) {
      //   return parseInt(v, 10);
      // });
     // return res;
    }
  };

  return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} className="dashboard-content">
        <Card title={getLocaleMessages({ id: "staff.update.title" })}>
          <div>
            <Form
              {...formProps}
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                email: state.email,
                firstname: state.firstname,
                lastname: state.lastname,
                title: state.staff_title,
                notes: state.notes,
                contact: state.contactnumber,
                status: state.status,
                image: state.image_url,
                joindate: moment(state.employee_startdate, dateFormat),
              }}
            >
              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item
                    name="firstname"
                    label={getLocaleMessages({ id: "staff.firstname.label" })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: "staff.firstname.error",
                        }),
                      },
                      {
                        pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                        message: "You can't use number here!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastname"
                    label={getLocaleMessages({ id: "staff.lastname.label" })}
                    rules={[
                      {
                        message: getLocaleMessages({
                          id: "staff.lastname.error",
                        }),
                      },
                      {
                        pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                        message: "You can't use number here!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    //label={getLocaleMessages({ id: "staff.title.label" })}
                    label="Staff Title"
                    rules={[
                      {
                        pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
                        message: "You can't use number here!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="service"
                    //label={getLocaleMessages({ id: "staff.title.label" })}
                    label="Service"
                  >
                    <Select
                      mode="multiple"
                      defaultValue={
                        state.servicelang ? getStaffService(state.servicelang) : []
                      }
                      placeholder={"Select Service"}
                      onChange={handleChangeService}
                      style={{ width: "100%" }}
                    >
                      
                      {vendorServiceList &&
                        vendorServiceList.length > 0 &&
                        vendorServiceList.map((list) => {
                            return (
                              <option
                                value={list.id}
                                key={list.id}
                              >
                                {list.servicename}
                              </option>
                            );
                          })
                          }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <h3 className="header_seprate">
                Contact{" "}
                <label className="sub">
                  Staff contacts are confidential and won't be shared with your
                  clients.
                </label>{" "}
              </h3>

              <Row gutter={30}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={getLocaleMessages({ id: "staff.email.label" })}
                    rules={[
                      {
                        type: "email",
                        whitespace: true,
                        message: "Invalid email",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Input.Group compact>
                    <Form.Item
                      name="contact"
                      label={getLocaleMessages({ id: "staff.contact.label" })}
                      rules={[
                        {
                          message: getLocaleMessages({
                            id: "staff.contact.error",
                          }),
                        },
                        {
                          min: 13,
                          message: "Contact number should be minimum 9 digits.",
                        },
                        {
                          max: 16,
                          message:
                            "Contact number should be maximum 16 digits.",
                        },
                      ]}
                    >
                      <PhoneInput
                        international
                        placeholder="Enter phone number"
                        countryCallingCodeEditable={false}
                        defaultCountry="SA"
                      />
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
              <div style={{ display: "none" }}>
                <h3 className="header_seprate">Add Services</h3>

                <Form.Item
                  label={getLocaleMessages({ id: "staff.service.label" })}
                >
                  <Select
                    mode="multiple"
                    name="serviceid"
                    defaultValue={
                      state && state.serviceid ? getSelectServices() : []
                    }
                    placeholder={getLocaleMessages({
                      id: "staff.service.placeholder",
                    })}
                    onChange={handleChangeService}
                  >
                    {vendorServiceList &&
                      vendorServiceList.length > 0 &&
                      vendorServiceList.map((list, id) => {
                        return (
                          <option value={list.id} key={id}>
                            {list.servicename}
                          </option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </div>
              <Row gutter={30}>
                {/* <Col span={12}>
                  <Form.Item
                    name="joindate"
                    label={getLocaleMessages({ id: "staff.startdate.label" })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: "staff.startdate.error",
                        }),
                      },
                    ]}
                  >
                    <DatePicker onChange={onDateChange} />
                  </Form.Item>
                </Col> */}
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    initialValue={value}
                    rules={[
                      {
                        required: true,
                        message: "Please select status!",
                      },
                    ]}
                  >
                    <Radio.Group onChange={onStatusChange}>
                      <Radio value={1}>
                        {getLocaleMessages({ id: "active" })}
                      </Radio>
                      <Radio value={0}>
                        {getLocaleMessages({ id: "inactive" })}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label={getLocaleMessages({ id: "staff.image.label" })}
                  >
                    {localImage}
                    <ImageUploader
                      isSingleImage={true}
                      images={localImage.length ? localImage : []}
                      onDropImage={onDropImage}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="button-center">
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="create"
                  className="save-btn"
                >
                  {getLocaleMessages({ id: "staff.update.button" })}
                </Button>

                <Button
                  onClick={() => {
                    backTopage();
                  }}
                  className="save-btn"
                >
                  {getLocaleMessages({ id: "Back" })}
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateStaff;
