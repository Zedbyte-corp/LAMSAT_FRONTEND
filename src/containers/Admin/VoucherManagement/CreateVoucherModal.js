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
  DatePicker,
  Button,
  message,
  Spin,
  InputNumber,
  Radio,
} from "antd";
import ImageUploader from "components/Shared/ImageUpload";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import { useSelector } from "react-redux";
import actions from "redux/vendor/Voucher/actions";
import serviceActions from "redux/vendor/Services/actions";
import settingActions from "redux/Settings/actions";
import { store } from "redux/store";

const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateVoucherModal = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const { getVendorVoucherLanguage } = useSelector(
    (state) => state.VendorVoucher
  );
  const { voucherCode } = useSelector((state) => state.VendorVoucher);
  const { userList } = useSelector((state) => state.VendorVoucher);
  const [vendorId, setVendorId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [isAllVendor, setAllVendor] = useState(true);
  const [isAllUser, setAllUser] = useState(true);
  const [voucherValue, setVoucherValue] = useState("0");
  const [voucherName, setVoucherName] = useState("");
  const [voucherDesc, setVoucherDesc] = useState("");
  const { vendorList } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const { loading } = useSelector((state) => state.VendorVoucher);
  const { voucherTypeList } = useSelector((state) => state.VendorVoucher);
  const [voucherType, setVoucherType] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(1);

  const closeModal = () => {
    form.resetFields();
    setModalVisible(false);
    setVoucherName();
    setVoucherDesc();
    setVoucherType();
    setVoucherValue();
  };

  useEffect(() => {
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_CODE,
    });
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_TYPE,
    });
    store.dispatch({
      type: serviceActions.GET_VENDOR_LIST,
    });
    store.dispatch({
      type: actions.GET_ALL_USER,
    });
  }, []);

  const onFinish = (values) => {
    if (parseInt(voucherType) === 2) {
    }
    var dateArr = values.voucherdate;
    var startDate;
    var endDate;
    startDate = dateArr[0].format("yyyy-MM-DD").toString();
    endDate = dateArr[1].format("yyyy-MM-DD").toString();

    let data = {
      vouchername: values.vouchername,
      description: values.description,
      vouchercode: voucherCode,
      vouchervalue: parseInt(values.vouchervalue),
      maxredeem_amt: parseInt(2), //parseInt(values.maxredeem),
      mincartvalue: parseInt(2), //parseInt(values.minvalue),
      startdate: startDate,
      enddate: endDate,
      isallvendor: isAllVendor ? 1 : 0,
      vendors: vendorId.length ? vendorId : [],
      isalluser: isAllUser ? 1 : 0,
      users: userId.length ? userId : [],
      usertype: 1,
      vouchertype: parseInt(voucherType),
      status: currentStatus,
    };
    console.log("aaaaa", data);
    if (parseInt(voucherType) === 1 && parseInt(values.vouchervalue) > 100) {
      message.warning("Voucher value should be between 0 to 100");
    } else {
      store.dispatch({
        type: actions.POST_VOUCHER,
        payload: data,
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

  const isAllVendorChange = (checked) => {
    setAllVendor(checked);
  };
  const isAllUserChange = (checked) => {
    setAllUser(checked);
  };
  const onValueChange = (value) => {
    setVoucherValue(value);
  };

  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: getLocaleMessages({ id: "voucher.date.error" }),
      },
    ],
  };
  const nameConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.name.error" }),
      },
    ],
  };
  const descriptionConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.description.error" }),
      },
    ],
  };
  const voucherTypeConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.type.error" }),
      },
    ],
  };
  const voucherValueConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.value.error" }),
      },
    ],
  };
  const minimumValueConfig = {
    rules: [
      {
        //required: true,
        message: getLocaleMessages({ id: "voucher.minvalue.error" }),
      },
    ],
  };
  const maximumValueConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.maxvalue.error" }),
      },
    ],
  };
  const maximumRedeemConfig = {
    rules: [
      {
        //required: true,
        message: getLocaleMessages({ id: "voucher.maxredeem.error" }),
      },
    ],
  };
  const vendorConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.isallvendor.error" }),
      },
    ],
  };
  const userConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "voucher.isalluser.error" }),
      },
    ],
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  const handleChangeVedor = (value) => {
    setVendorId(value);
  };

  const handleChangeUser = (value) => {
    setUserId(value);
  };

  const handleChangeVoucherType = (value) => {
    setVoucherType(value);
  };

  const onDescriptionChange = (value) => {
    setVoucherDesc(value.target.value);
  };

  const onNameChange = (value) => {
    setVoucherName(value.target.value);
  };
  console.log();

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: "voucher.create.title" })}
      sub={getLocaleMessages({ id: "voucher.create.subject" })}
      centered
      visible={modalVisible}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
      footer={false}
    >
      <Row gutter={30}>
        <Col span={14} className="inner-content voucher_left">
          <h2>{getLocaleMessages({ id: "voucher.info.label" })}</h2>
          <Spin size="large" spinning={loading || imageLoader}>
            <Form
              {...formProps}
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label={getLocaleMessages({ id: "label.voucherName" })}
                name="vouchername"
                {...nameConfig}
              >
                <Input onChange={onNameChange} />
              </Form.Item>
              <Form.Item
                label={getLocaleMessages({ id: "label.voucherDescription" })}
                name="description"
                {...descriptionConfig}
              >
                <Input onChange={onDescriptionChange} />
              </Form.Item>
              <Form.Item
                name="vouchertype"
                {...voucherTypeConfig}
                label={getLocaleMessages({ id: "voucher.type.lable" })}
              >
                <Select
                  placeholder={getLocaleMessages({ id: "voucher.type.select" })}
                  onChange={handleChangeVoucherType}
                >
                  {voucherTypeList &&
                    voucherTypeList.length > 0 &&
                    voucherTypeList.map((list, id) => {
                      return (
                        <option value={list.id} key={id}>
                          {list.vouchertypename}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label={getLocaleMessages({ id: "label.voucherValue" })}
                name="vouchervalue"
                {...voucherValueConfig}
                rules={[
                  {
                    required: true,
                    message: "Please enter voucher value/percent!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={parseInt(voucherType) === 1 ? 100 : 20}
                  onChange={onValueChange}
                />
              </Form.Item>
              {/* <Form.Item
                                label={getLocaleMessages({ id: "label.voucherMinimumValue" })}
                                name="minvalue"
                                {...minimumValueConfig}
                            >
                                <Input type="number" />
                            </Form.Item> */}
              {/* <Form.Item
                        label={getLocaleMessages({id:"label.voucherMaximumValue"})}
                        name="maxvalue"
                        {...maximumValueConfig}
                    >
                        <Input type="number"/>
                    </Form.Item> */}
              {/* <Form.Item
                                label={getLocaleMessages({ id: "voucher.maxredeem.label" })}
                                name="maxredeem"
                                {...maximumRedeemConfig}
                            >
                                <Input type="number" />
                            </Form.Item> */}
              <Form.Item
                label={"Valid Date"}
                name="voucherdate"
                {...rangeConfig}
              >
                <RangePicker />
              </Form.Item>
              <Form.Item>
                <label>
                  {getLocaleMessages({ id: "voucher.isallvendor.label" })}
                </label>
                <br />
                <Switch defaultChecked onChange={isAllVendorChange} /> <br />
              </Form.Item>
              {!isAllVendor ? (
                <Form.Item
                  label={getLocaleMessages({ id: "vendor.label" })}
                  name="vendors"
                  {...vendorConfig}
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder={getLocaleMessages({
                      id: "selectvendor.label",
                    })}
                    onChange={handleChangeVedor}
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
              ) : (
                <> </>
              )}

              <Form.Item>
                <label>
                  {getLocaleMessages({ id: "voucher.isalluser.label" })}
                </label>
                <br />
                <Switch defaultChecked onChange={isAllUserChange} /> <br />
              </Form.Item>
              {!isAllUser ? (
                <Form.Item
                  name="users"
                  {...userConfig}
                  label={getLocaleMessages({ id: "User" })}
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder={getLocaleMessages({ id: "selectuser.label" })}
                    onChange={handleChangeUser}
                  >
                    {userList &&
                      userList.length > 0 &&
                      userList.map((list, id) => {
                        return (
                          <option
                            value={list.id}
                            key={id}
                          >{`${list.firstname} ${list.lastname}`}</option>
                        );
                      })}
                  </Select>
                </Form.Item>
              ) : (
                <> </>
              )}
              <Form.Item>
                <Form.Item label="Status">
                  <Radio.Group value={currentStatus}>
                    <Radio
                      name="status"
                      value={1}
                      onChange={() => setCurrentStatus(1)}
                    >
                      Active
                    </Radio>
                    <Radio
                      name="status"
                      value={0}
                      onChange={() => setCurrentStatus(0)}
                    >
                      Inactive
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <div className="button-center">
                  <Button type="primary" htmlType="create" className="save-btn">
                    {getLocaleMessages({ id: "voucher.create.button" })}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Spin>
        </Col>
        <Col span={10} className="inner-content voucher_right">
          <div className="voucher_right_center">
            <div className="voucher-title">
              <h2>{getLocaleMessages({ id: "voucher.preview.title" })}</h2>
              <h3>{voucherName}</h3>
              <p>{voucherDesc}</p>
            </div>
            <div className="v-box-full">
              {/* <div className="voucher-box">
                        <h2>Demo@gmail.com</h2>
                        <p>Your Location and Address Here </p>
                        </div> */}
              <div className="voucher-box">
                <h2>{getLocaleMessages({ id: "voucher.value.title" })}</h2>
                {/* <p className="price">{`${voucherValue}.00`} { parseInt(voucherType) == 1 ? "SAR" : "%" } </p> */}
                <p className="price">
                  {`${voucherValue ? voucherValue : ""}`}{" "}
                  {parseInt(voucherType) == 1 ? "%" : "SAR"}{" "}
                </p>
              </div>
              <div className="voucher-box">
                <h2>{`${getLocaleMessages({ id: "voucher.code.label" })}:${
                  voucherCode ? voucherCode : "xxxxxxx"
                }`}</h2>
                <p>{getLocaleMessages({ id: "voucher.redeem.description" })}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateVoucherModal;
