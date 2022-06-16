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
} from "antd";
import StickyBox from "react-sticky-box";
import ImageUploader from "components/Shared/ImageUpload";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import { useSelector } from "react-redux";
import actions from "redux/vendor/Voucher/actions";
import serviceActions from "redux/vendor/Services/actions";
import settingActions from "redux/Settings/actions";
import { store } from "redux/store";
import moment from "moment";

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
  const [userId, setUserId] = useState(0);
  const [isAllUser, setAllUser] = useState(true);
  const [voucherValue, setVoucherValue] = useState("0");
  const { imageLoader } = useSelector((state) => state.Settings);
  const { loading } = useSelector((state) => state.VendorVoucher);
  const { voucherTypeList } = useSelector((state) => state.VendorVoucher);
  const [voucherType, setVoucherType] = useState(1);

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

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const onFinish = (values) => {
    var dateArr = values.voucherdate;
    var startDate;
    var endDate;
    startDate = dateArr[0].format("YYYY-MM-DD").toString();
    endDate = dateArr[1].format("YYYY-MM-DD").toString();
    let data = {
      vouchername: values.vouchername,
      description: values.description,
      vouchercode: voucherCode,
      vouchervalue: parseInt(values.vouchervalue),
      maxredeem_amt: parseInt(2), //parseInt(values.maxredeem),
      mincartvalue: parseInt(2), //parseInt(values.minvalue),
      startdate: startDate,
      enddate: endDate,
      isalluser: isAllUser ? 1 : 0,
      users: userId.length ? userId : [],
      usertype: 1,
      vouchertype: parseInt(voucherType),
      status: 1,
    };

    store.dispatch({
      type: actions.POST_VENDOR_VOUCHER,
      payload: data,
      callBackAction: (status) => {
        if (status) {
          form.resetFields();
          setLocalImageFunc([]);
          setModalVisible(false);
        }
      },
    });
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

  const handleChangeUser = (value) => {
    setUserId(value);
  };

  const handleChangeVoucherType = (value) => {
    setVoucherType(value);
  };

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: "voucher.create.title" })}
      sub={getLocaleMessages({ id: "voucher.create.subject" })}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      width={900}
      footer={false}
    >
      <Row gutter={30}>
        <Col span={12} className="inner-content voucher_left">
          <Spin size="large" spinning={loading || imageLoader}>
            <Form
              {...formProps}
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label={getLocaleMessages({
                  id: "label.voucherName",
                })}
                name="vouchername"
                {...nameConfig}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={getLocaleMessages({
                  id: "label.voucherDescription",
                })}
                name="description"
                {...descriptionConfig}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="vouchertype"
                {...voucherTypeConfig}
                label={getLocaleMessages({
                  id: "voucher.type.lable",
                })}
              >
                <Select
                  placeholder={getLocaleMessages({
                    id: "voucher.type.select",
                  })}
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
                label={getLocaleMessages({
                  id: "label.voucherValue",
                })}
                name="vouchervalue"
                {...voucherValueConfig}
              >
                <InputNumber
                  min={0}
                  max={100}
                  onChange={onValueChange}
                  type="number"
                />
              </Form.Item>
              {/* <Form.Item
                                style={{ display: "none" }}
                                label={getLocaleMessages({
                                    id: 'label.voucherMinimumValue',
                                })}
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
                                style={{ display: "none" }}
                                label={getLocaleMessages({
                                    id: 'voucher.maxredeem.label',
                                })}
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
                <RangePicker disabledDate={disabledDate} />
              </Form.Item>

              <Form.Item>
                <label>
                  {getLocaleMessages({
                    id: "voucher.isalluser.label",
                  })}
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
                    placeholder={getLocaleMessages({
                      id: "selectuser.label",
                    })}
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
              <div className="button-center">
                <Button type="primary" htmlType="create" className="save-btn">
                  {getLocaleMessages({
                    id: "voucher.create.button",
                  })}
                </Button>
              </div>
            </Form>
          </Spin>
        </Col>
        <Col span={12} className="inner-content">
          <StickyBox offsetTop={10} offsetBottom={10}>
            <div className="voucher_right">
              <div className="voucher_right_center">
                <div className="voucher-title">
                  <h2>
                    {getLocaleMessages({
                      id: "voucher.preview.title",
                    })}
                  </h2>
                  <p>
                    {getLocaleMessages({
                      id: "voucher.noactive.title",
                    })}
                  </p>
                </div>
                <div className="v-box-full">
                  <div className="voucher-box">
                    <h2>
                      {getLocaleMessages({
                        id: "voucher.value.title",
                      })}
                    </h2>
                    <p className="price">
                      <p className="price">
                        {`${voucherValue ? voucherValue : ""}`}{" "}
                        {parseInt(voucherType) == 1 ? "%" : "SAR"}{" "}
                      </p>
                    </p>

                    <h4>{`${getLocaleMessages({
                      id: "voucher.code.label",
                    })}:${voucherCode ? voucherCode : "xxxxxxx"}`}</h4>

                    <p className="desc">
                      {getLocaleMessages({
                        id: "voucher.redeem.description",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </StickyBox>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateVoucherModal;
