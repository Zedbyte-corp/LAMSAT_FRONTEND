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
  Spin,
  Radio,
} from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages, stringToDate } from "redux/helper";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import moment from "moment";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const UpdateStaff = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  const [localImage, LocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { loading } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const state = JSON.parse(localStorage.getItem("staffData"));
  const { vendorList } = useSelector((state) => state.Services);
  const { vendorServiceList } = useSelector((state) => state.Services);
  const [value, setValue] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [serviceId, setServiceId] = useState([]);
  const [vendorlistloader, setvendorlistloader] = useState(false);

  useEffect(() => {
    setVendorId(state.vendorid);
    setvendorlistloader(true);
    store.dispatch({
      type: serviceActions.GET_VENDOR_LIST,
      callBackAction: (data) => {
        setvendorlistloader(false);
      },
    });
  }, []);

  const backTopage = () => {
    //localStorage.removeItem('staffData');
    props.history.push("/admin/StafManagement");
  };
  const updateImage = () => {
    let imgArr = [];
    imgArr.push(state.image_url);
    LocalImageFunc(imgArr);
  };
  useEffect(() => {
    if (state && state.image_url) {
      let imgArr = [];
      var img1 = {};
      img1.id = "1";
      img1.path = state.image_url;
      imgArr.push(img1);
      LocalImageFunc(imgArr);
    }
  }, []);
  const onStatusChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    //var d = values.joindate;
    var d = "2021/11/09";
    //d = d.format('yyyy/MM/DD').toString();
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
            staff_title: "title",
            notes: "notes",
            status: values.status,
            vendorid: vendorId,
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
        staff_title: "title",
        notes: "notes",
        status: values.status,
        vendorid: vendorId,
        photopath: state.photopath,
        image_url: state.image_url,
      };
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
  const onFinishFailed = (errorInfo) => {};
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

  const handleChangeVedor = (value) => {
    setVendorId(value);
  };

  const handleChangeService = (value) => {
    setServiceId(value);
  };

  const onDateChange = (date, dateString) => {};
  const onDeleteImage = (id) => {
    var newlocalImage = localImage.find((limage) => limage.id !== id);
    if (newlocalImage) LocalImageFunc(newlocalImage);
    else LocalImageFunc([]);
  };
  return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} className="dashboard-content">
        <Card title={getLocaleMessages({ id: "staff.update.title" })}>
          <Spin
            size="large"
            spinning={loading || imageLoader || vendorlistloader}
          >
            <Form
              // {...formProps}
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                email: state.email,
                firstname: state.firstname,
                lastname: state.lastname,
                //title: state.staff_title,
                // notes: state.notes,
                contact: state.contactnumber,
                status: state.status,
                joindate: moment(
                  state.employee_startdate
                  //stringToDate(state.employee_startdate, 'dd-MM-yyyy', '-')
                ),
              }}
            >
              <Row gutter={30}>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="firstname"
                    label={getLocaleMessages({
                      id: "staff.firstname.label",
                    })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: "staff.firstname.error",
                        }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="lastname"
                    label={getLocaleMessages({
                      id: "staff.lastname.label",
                    })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: "staff.lastname.error",
                        }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {/* <Row gutter={30}>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="title"
                    label={getLocaleMessages({ id: 'staff.title.label' })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: 'staff.title.error',
                        }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="notes"
                    label={getLocaleMessages({ id: 'staff.notes.label' })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: 'staff.notes.error',
                        }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row> */}

              <Row gutter={30}>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="vendorid"
                    label={getLocaleMessages({ id: "vendor.label" })}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        // whitespace: true,
                        message: getLocaleMessages({
                          id: "selectvendor.error",
                        }),
                      },
                    ]}
                  >
                    <Select
                      defaultValue={state.vendorid ? state.vendorid : ""}
                      placeholder={getLocaleMessages({
                        id: "selectvendor.label",
                      })}
                      onChange={handleChangeVedor}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {vendorList &&
                        vendorList.length > 0 &&
                        vendorList.map((list, id) => {
                          return (
                            <option value={list.id} key={id}>
                              {list.vendorname}
                            </option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="email"
                    label={getLocaleMessages({ id: "staff.email.label" })}
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: getLocaleMessages({
                          id: "staff.email.error",
                        }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={30}>
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="contact"
                    label={getLocaleMessages({
                      id: "staff.contact.label",
                    })}
                    rules={[
                      {
                        required: true,
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
                        message: "Contact number should be maximum 16 digits.",
                      },
                    ]}
                  >
                    <PhoneInput
                      international
                      placeholder="Enter phone number"
                      defaultCountry="SA"
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="joindate"
                    label={getLocaleMessages({
                      id: 'staff.startdate.label',
                    })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: 'staff.startdate.error',
                        }),
                      },
                    ]}
                  >
                    <DatePicker onChange={onDateChange} />
                  </Form.Item>
                </Col> */}
                {/* </Row>

              <Row gutter={30}> */}

                <Col span={12} className="inner-content">
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
              {/* {state.image_url != null && localImage.length > 0 ? ( */}
              {/* ) : (
                      ''
                    )} */}
              {/* <Row gutter={30}>
                <Col span={24} className="inner-content">
                  <Form.Item
                    label={getLocaleMessages({ id: "staff.image.label" })}
                  >
                    <ImageUploader
                      isSingleImage={true}
                      images={localImage.length ? localImage : []}
                      onDropImage={onDropImage}
                      isRemoved={true}
                      deleteImage={onDeleteImage}
                    />
                  </Form.Item>
                </Col>
              </Row> */}

              <div className="button-center">
                <Button type="primary" htmlType="create" className="save-btn">
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
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateStaff;
