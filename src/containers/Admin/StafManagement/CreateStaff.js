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
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages, getLocalData } from "redux/helper";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Staff/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const { TabPane } = Tabs;

const { Option } = Select;

const format = "HH:mm";

function callback(key) {
  console.log(key);
}

const CreateService = (props) => {
  useEffect(() => {
    console.log(
      "component mount"
    ); /*
    store.dispatch({
      type:serviceActions.GET_SERVICES_LIST
    });*/
    store.dispatch({
      type: serviceActions.GET_VENDOR_LIST,
    });
  }, []);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    modalVisible,
    setModalVisible,
    setstaffData,
    staffData,
    setTerm,
  } = props;
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
  const { serviceList, vendorServiceList } = useSelector(
    (state) => state.Services
  );
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);

  const closeModal = () => {
    setTerm("");
    // setstaffData([]);
    setModalVisible(false);
  };
  const onStatusChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    //var d = values.joindate;
    var d = "2021/11/09";
    //d = d.format("yyyy/MM/DD").toString();
    console.log("local image", setLocalImage);
    if (setLocalImage.length) {
      for (const localImage of setLocalImage) {
        let siteparam = new FormData();
        siteparam.set("files", localImage, localImage.name);
        let data = {
          email: values.email,
          contactnumber: values.contact,
          employee_startdate: d,
          firstname: values.firstname,
          lastname: values.lastname,
          staff_title: "title",
          notes: "notes",
          status: values.status,
          vendorid: vendorId,
          photopath:
            "/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
        };
        store.dispatch({
          type: settingActions.UPLOAD_SITEIMG,
          payload: siteparam,
          callBackAction: (imagePath, image_url) => {
            console.log(imagePath);
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
                    form.resetFields();
                    setLocalImageFunc([]);
                    setModalVisible(false);
                  }
                },
              });
            }
          },
        });
      }
    } else {
      let data = {
        email: values.email,
        contactnumber: values.contact,
        employee_startdate: d,
        firstname: values.firstname,
        lastname: values.lastname,
        staff_title: "title",
        notes: "notes",
        status: values.status,
        vendorid: vendorId,
        photopath:
          "/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
      };

      store.dispatch({
        type: actions.POST_STAFF,
        payload: data,
        callBackAction: (status) => {
          if (status) {
            form.resetFields();
            // setLocalImageFunc([]);
            closeModal();
            //setModalVisible(false);
            // setTerm("");
            // setstaffData([]);
            // props.history.push("/admin/StafManagement");
          }
        },
      });

      /*  let error = getLocaleMessages({id:'staff.image.error'});
      message.error(error);*/
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  const handleChangeVedor = (value) => {
    setVendorId(value);
  };

  const toggleStaffselect = () => {
    return isStaffSelect ? "show" : "hide";
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  function onSearch(val) {
    console.log("search:", val);
  }

  console.log("lang list", getAppLanguageList);
  console.log("saloon list", vendorList);
  console.log("category list", categoryList);
  return (
    <Modal
      className="add-vocher create_category_modal"
      title={getLocaleMessages({ id: "staff.create.button" })}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => {
        setModalVisible(false);
        form.resetFields();
      }}
      width={1000}
      footer={false}
    >
      <div className="modal-content">
        <Spin size="large" spinning={loading || imageLoader}>
          <Form
            //{...formProps}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Col span={24} className="inner-content pd-20">
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
                {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="title"
                    label={getLocaleMessages({ id: "staff.title.label" })}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({ id: "staff.title.error" }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
                {/*  <Col span={12} className="inner-content">
                  <Form.Item
                    name='notes'
                    label={getLocaleMessages({id:'staff.notes.label'})}
                    rules={[
                      {
                        required: false,
                        message: getLocaleMessages({id:'staff.notes.error'}),
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                  </Col>*/}
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="vendorid"
                    label={getLocaleMessages({ id: "vendor.label" })}
                    // validateTrigger={["onChange", "onBlur"]}

                    rules={[
                      {
                        required: true,
                        //whitespace: true,
                        message: getLocaleMessages({
                          id: "selectvendor.error",
                        }),
                      },
                    ]}
                  >
                    <Select
                      placeholder={getLocaleMessages({
                        id: "selectvendor.label",
                      })}
                      onChange={handleChangeVedor}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      onSearch={onSearch}
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
                        message: getLocaleMessages({ id: "staff.email.error" }),
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
                {/* <Col span={24} className="inner-content">
                  <Form.Item
                    label={getLocaleMessages({ id: "staff.image.label" })}
                  >
                    <ImageUploader
                      isSingleImage={true}
                      images={[]}
                      onDropImage={onDropImage}
                    />
                  </Form.Item>
                </Col> */}
                <Col span={24} className="inner-content">
                  <div className="button-center">
                    <Button
                      type="primary"
                      htmlType="create"
                      className="save-btn"
                    >
                      {getLocaleMessages({ id: "staff.create.button" })}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Form>
        </Spin>
      </div>
    </Modal>
  );
};

export default CreateService;
