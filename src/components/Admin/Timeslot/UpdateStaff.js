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
  message,
  Spin,
  Radio,
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
import moment from "moment";

const { TabPane } = Tabs;

function callback(key) {}
const UpdateStaff = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  const [localImage, LocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { category_redirect } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const state = JSON.parse(localStorage.getItem("staffData"));
  const [user, setUser] = useState();
  const { vendorList } = useSelector((state) => state.Services);
  const { serviceList } = useSelector((state) => state.Services);
  const [value, setValue] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [serviceId, setServiceId] = useState([]);
  const { vendorServiceList } = useSelector((state) => state.Services);

  useEffect(() => {
    store.dispatch({
      type: serviceActions.GET_VENDOR_SERVICE_LISTDATA,
      vendorid: getLocalData("id"),
    });
  }, ["vendorServiceList"]);

  useEffect(() => {
    /* store.dispatch({
      type:serviceActions.GET_SERVICES_LIST
    });
    store.dispatch({
      type:serviceActions.GET_VENDOR_LIST
    });*/
    updateImage();
    if (state) {
      setVendorId(state.vendorid);
      setServiceId(state.serviceid);
    }
  }, [user]);

  const backTopage = () => {
    //localStorage.removeItem('staffData');
    props.history.push("/vendor/staff");
  };
  const updateImage = () => {
    let imgArr = [];
    imgArr.push(state.image_url);
    LocalImageFunc(imgArr);
  };

  const onStatusChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    var d = values.joindate;
    d = d.format("DD-mm-yyyy").toString();
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
            notes: values.notes,
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
        notes: values.notes,
        status: values.status,
        vendorid: vendorId,
        serviceid: serviceId,
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
  const onChange = (checked) => {};

  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

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
  const toggleStaffselect = () => {
    return isStaffSelect ? "show" : "hide";
  };
  const onDateChange = (date, dateString) => {};

  const filterCatName = (arr, id) => {
    let categoryname = arr.filter((i) => i.languageid === id);
    return categoryname[0].categoryname;
  };
  return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} className="dashboard-content">
        <Card title={getLocaleMessages({ id: "staff.update.title" })}>
          <div>
            <div className="modal-content">
              <Form
                {...formProps}
                form={form}
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
                  joindate: moment(
                    stringToDate(state.employee_startdate, "dd-MM-yyyy", "-")
                  ),
                }}
                layout="vertical"
              >
                <Col span={24} className="inner-content">
                  <Row>
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

                  <Row>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        name="title"
                        label={getLocaleMessages({ id: "staff.title.label" })}
                        rules={[
                          {
                            message: getLocaleMessages({
                              id: "staff.title.error",
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
                        label={getLocaleMessages({ id: "staff.notes.label" })}
                        rules={[
                          {
                            message: getLocaleMessages({
                              id: "staff.notes.error",
                            }),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        label={getLocaleMessages({ id: "staff.service.label" })}
                      >
                        <Select
                          mode="multiple"
                          name="serviceid"
                          defaultValue={
                            state.serviceid.length ? getSelectServices() : []
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
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        name="email"
                        label={getLocaleMessages({ id: "staff.email.label" })}
                        rules={[
                          {
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
                    <Col span={12} className="inner-content">
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
                            min: 6,
                            message:
                              "Contact number should be minimum 6 digits.",
                          },
                          {
                            max: 16,
                            message:
                              "Contact number should be maximum 16 digits.",
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12} className="inner-content">
                      <Form.Item
                        name="joindate"
                        label={getLocaleMessages({
                          id: "staff.startdate.label",
                        })}
                        rules={[
                          {
                            message: getLocaleMessages({
                              id: "staff.startdate.error",
                            }),
                          },
                        ]}
                      >
                        <DatePicker onChange={onDateChange} />
                      </Form.Item>
                    </Col>
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

                  <Row>
                    <Col span={24} className="inner-content">
                      <Form.Item
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
                  <Row>
                    <Col span={12} className="inner-content">
                      <Button
                        type="primary"
                        htmlType="create"
                        className="save-btn"
                      >
                        {getLocaleMessages({ id: "staff.update.button" })}
                      </Button>
                    </Col>
                    <Col span={12} className="inner-content">
                      <Button
                        type="primary"
                        onClick={() => {
                          backTopage();
                        }}
                        className="save-btn"
                      >
                        {getLocaleMessages({ id: "Back" })}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateStaff;
