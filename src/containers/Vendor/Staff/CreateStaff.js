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
  TimePicker,
  InputNumber,
} from "antd";
import moment from "moment";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import { getLocaleMessages, getLocalData } from "redux/helper";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";

const { TabPane } = Tabs;

const { Option } = Select;

const format = "HH:mm";

function callback(key) {}

const CreateService = (props) => {
  const { vendorServiceList, serviceVisible } = useSelector(
    (state) => state.Services
  );

  useEffect(() => {
    if (serviceVisible) {
      store.dispatch({
        type: serviceActions.GET_VENDOR_SERVICE_LISTDATA,
        vendorid: getLocalData("id"),
      });
    }
    /*store.dispatch({
      type:serviceActions.GET_SERVICES_LIST
    });

    store.dispatch({
      type:serviceActions.GET_VENDOR_LIST

    });*/
  }, ["vendorServiceList"]);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible, reLoadTheList } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const { categoryList } = useSelector((state) => state.Services);
  const { vendorList } = useSelector((state) => state.Services);
  const { staffList } = useSelector((state) => state.Services);
  const { serviceList } = useSelector((state) => state.Services);
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [serviceId, setServiceId] = useState([]);
  const [createLoading, setcreateLoading] = useState(false);

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: false, message: "Select Country code!" }]}
    >
      <Select
        defaultValue="+966"
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );

  const onStatusChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    setcreateLoading(true);
    if (setLocalImage.length) {
      for (const localImage of setLocalImage) {
        let siteparam = new FormData();
        siteparam.set("files", localImage, localImage.name);
        let data = {
          email: values.email ? values.email : "",
          contactnumber: values.contact ? values.contact : "",
          employee_startdate: null,
          firstname: values.firstname,
          lastname: values.lastname ? values.lastname : "",
          staff_title: values.title ? values.title : "",
          notes: "notes",
          status: values.status,
          vendorid: getLocalData("id"),
          serviceid: serviceId,
          photopath:
            "/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
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
                  setcreateLoading(false);
                  if (status) {
                    form.resetFields();
                    setLocalImageFunc([]);
                    setModalVisible(false);
                    store.dispatch({
                      type: serviceActions.GET_VENDORSTAFF_LIST,
                      id: getLocalData("id"),
                      callBackAction: (status) => {
                        dispatch({
                          type: adminvendorprofileAction.GET_SINGLE_VENDOR,
                          value: getLocalData("id"),
                        });
                        reLoadTheList();
                        form.resetFields();
                        setLocalImageFunc([]);
                      },
                    });
                  }
                },
              });
            }
          },
        });
      }
    } else {
      let data = {
        email: values.email ? values.email : "",
        contactnumber: values.contact ? values.contact : "",
        employee_startdate: null,
        firstname: values.firstname,
        lastname: values.lastname ? values.lastname : "",
        staff_title: values.title ? values.title : "",
        notes: "notes",
        status: values.status,
        vendorid: getLocalData("id"),
        serviceid: serviceId,
        photopath:
          "/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
      };

      store.dispatch({
        type: actions.POST_STAFF,
        payload: data,
        callBackAction: (status) => {
          setcreateLoading(false);
          if (status) {
            form.resetFields();
            setLocalImageFunc([]);
            setModalVisible(false);
            store.dispatch({
              type: serviceActions.GET_VENDORSTAFF_LIST,
              id: getLocalData("id"),
              callBackAction: (status) => {
                //setcreateLoading(false);
                reLoadTheList();
                form.resetFields();
                setLocalImageFunc([]);
              },
            });
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

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
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

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: "staff.create.button" })}
      centered
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false);
        form.resetFields();
      }}
      onCancel={() => {
        setModalVisible(false);
        form.resetFields();
      }}
      width={750}
      footer={false}
    >
      <Form
        {...formProps}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={30}>
          <Col span={12} className="inner-content">
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
          <Col span={12} className="inner-content">
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
          <Col span={12} className="inner-content">
            <Form.Item
              name="title"
              //label={getLocaleMessages({ id: "staff.title.label" })}
              label="Staff Title"
              rules={[
                {
                  message: "Please input Staff Name",
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

        <h3 className="header_seprate">
          Contact{" "}
          <label className="sub">
            Staff contacts are confidential and won't be shared with your
            clients.
          </label>{" "}
        </h3>

        <Row gutter={30}>
          <Col span={12} className="inner-content">
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
          <Col span={12} className="inner-content">
            <Form.Item
              name="contact"
              label={getLocaleMessages({ id: "staff.contact.label" })}
              rules={[
                {
                  message: getLocaleMessages({ id: "staff.contact.error" }),
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
                countryCallingCodeEditable={false}
                defaultCountry="SA"
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ display: "none" }}>
          <h3 className="header_seprate">Add Services</h3>
          <Row gutter={30}>
            <Col span={24} className="inner-content">
              <Form.Item
                label={getLocaleMessages({ id: "staff.service.label" })}
              >
                <Select
                  mode="multiple"
                  name="serviceid"
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
        </div>

        <Row gutter={30}>
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
                <Radio value={1}>{getLocaleMessages({ id: "active" })}</Radio>
                <Radio value={0}>{getLocaleMessages({ id: "inactive" })}</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* <Form.Item label={getLocaleMessages({ id: "staff.image.label" })}>
          <ImageUploader
            isSingleImage={true}
            images={[]}
            onDropImage={onDropImage}
          />
        </Form.Item> */}
        <div className="button-center">
          <Button
            type="primary"
            loading={createLoading}
            htmlType="create"
            className="save-btn"
          >
            {getLocaleMessages({ id: "staff.create.button" })}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateService;
