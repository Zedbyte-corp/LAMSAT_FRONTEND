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
  Spin,
  InputNumber,
  message,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector } from "react-redux";
import addressActions from "redux/admin/address/actions";
import actions from "redux/admin/customerManagement/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const { TabPane } = Tabs;

function callback(key) {}
const CreateVendor = (props) => {
  const [form] = Form.useForm();
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { modalVisible, setModalVisible } = props;
  const [status, setStatus] = useState(true);
  const { getVendorVoucherLanguage } = useSelector(
    (state) => state.VendorVoucher
  );
  const { loading } = useSelector((state) => state.Address);
  const { imageLoader } = useSelector((state) => state.Settings);
  const { cityList } = useSelector((state) => state.Address);
  const { countryList } = useSelector((state) => state.Address);

  useEffect(() => {
    store.dispatch({
      type: addressActions.GET_ADMIN_CITY_LIST,
    });
    store.dispatch({
      type: addressActions.GET_ADMIN_COUNTRY_LIST,
    });
  }, []);

  const onFinish = (values) => {
    var createData = {};
    createData = values;
    createData.countrycode = values.mobile_number.countrycode;
    createData.contactnumber = values.mobile_number.contactnumber;
    createData.status = status ? 1 : 0;
    createData.devicetype = "1";
    createData.devicetoken = "xxxxxxxx";

    if (setLocalImage.length) {
      for (const localImage of setLocalImage) {
        let siteparam = new FormData();
        siteparam.set("files", localImage, localImage.name);
        store.dispatch({
          type: settingActions.UPLOAD_SITEIMG,
          payload: siteparam,
          callBackAction: (imagePath) => {
            if (imagePath) {
              store.dispatch({
                type: actions.CREATE_CUSTOMER,
                payload: { ...createData, photopath: imagePath },
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
      // let error = getLocaleMessages({ id: 'user.image.error' });
      // message.error(error);
      store.dispatch({
        type: actions.CREATE_CUSTOMER,
        payload: { ...createData, photopath: "imagePath" },
        callBackAction: (status) => {
          if (status) {
            form.resetFields();
            setLocalImageFunc([]);
            setModalVisible(false);
          }
        },
      });
    }
  };
  const onChange = (checked) => {
    setStatus(checked);
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  const firstNameConfig = {
    rules: [
      {
        whitespace: true,
        required: true,
        message: getLocaleMessages({ id: "errorMessage.firstName" }),
      },
    ],
  };
  const lastNameConfig = {
    rules: [
      {
        whitespace: true,
        required: true,
        message: getLocaleMessages({ id: "errorMessage.lastName" }),
      },
    ],
  };
  const cityConfig = {
    rules: [
      { required: true, message: getLocaleMessages({ id: "cityname.error" }) },
    ],
  };
  const passwordConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "common.password.error" }),
      },
      {
        min: 6,
        message: "Password must be minimum 6 characters.",
      },
      {
        max: 16,
        message: "Password can be maximum 16 characters.",
      },
    ],
  };
  const confirmsPasswordConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "common.confirmpassword.error" }),
      },
      {
        min: 6,
        message: "Confirm Password must be minimum 6 characters.",
      },
      {
        max: 16,
        message: "Confirm Password can be maximum 16 characters.",
      },
    ],
  };
  const countryConfig = {
    rules: [
      { required: true, message: getLocaleMessages({ id: "country.error" }) },
    ],
  };
  const emailConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "common.email.error" }),
      },
    ],
  };

  return (
    <Modal
      className="create.customer create_category_modal"
      title={getLocaleMessages({ id: "Create Customer" })}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      width={1000}
      footer={false}
    >
      <Spin size="large" spinning={loading || imageLoader}>
        <Form {...formProps} form={form} onFinish={onFinish} layout="vertical">
          <Col span={24} className="inner-content pd-20">
            <Row gutter={30}>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "label.firstName" })}
                  name="firstname"
                  {...firstNameConfig}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "label.lastName" })}
                  name="lastname"
                  {...lastNameConfig}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "Email" })}
                  name="email"
                  {...emailConfig}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "Contact Number" })}
                  name="contactnumber"
                >
                  <Form.Item
                    name={["mobile_number", "contactnumber"]}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({
                          id: "common.contact.error",
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
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "Password" })}
                  name="password"
                  {...passwordConfig}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "Confirm Password" })}
                  name="confirmpassword"
                  {...confirmsPasswordConfig}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "City" })}
                  name="cityid"
                  {...cityConfig}
                >
                  <Select
                    placeholder={getLocaleMessages({
                      id: "area.select.city",
                    })}
                  >
                    {cityList &&
                      cityList.length > 0 &&
                      cityList.map((list, id) => {
                        return (
                          <Select.Option value={list.cityid} key={id}>
                            {list.cityname}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={getLocaleMessages({ id: "Status" })}
                  name="status"
                >
                  <Switch defaultChecked onChange={onChange} />
                </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "Country" })}
                  name="countryid"
                  {...countryConfig}
                >
                  <Select
                    placeholder={getLocaleMessages({
                      id: "country.select.label",
                    })}
                  >
                    {countryList &&
                      countryList.length > 0 &&
                      countryList.map((list, id) => {
                        return (
                          <Select.Option value={list.id} key={id}>
                            {list.language[0].countryname}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: "user.image.title" })}
                >
                  <ImageUploader
                    isSingleImage={true}
                    images={[]}
                    onDropImage={onDropImage}
                  />
                </Form.Item>
              </Col>
              <Col span={24} className="inner-content">
                <div className="button-center">
                  <Button type="primary" htmlType="create" className="save-btn">
                    {getLocaleMessages({ id: "common.create" })}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateVendor;
