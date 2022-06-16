import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Card,
  Form,
  Switch,
  Button,
  Tabs,
  DatePicker,
  Spin,
  InputNumber,
} from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages, stringToDate } from "redux/helper";
import { useSelector } from "react-redux";
import actions from "redux/vendor/Voucher/actions";
import { store } from "redux/store";
import serviceActions from "redux/vendor/Services/actions";
import moment from "moment";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const UpdateVoucher = (props) => {
  const [form] = Form.useForm();
  const { userList } = useSelector((state) => state.VendorVoucher);
  const [userId, setUserId] = useState([]);
  const [voucherType, setVoucherType] = useState(1);
  const [isAllUser, setAllUser] = useState(true);
  const [voucherValue, setVoucherValue] = useState("0");
  const { loading } = useSelector((state) => state.VendorVoucher);
  const { imageLoader } = useSelector((state) => state.Settings);
  const state = JSON.parse(localStorage.getItem("vendorVoucherData"));
  const { voucherTypeList } = useSelector((state) => state.VendorVoucher);

  console.log("this si the vlaue odt the dataaa", state);

  useEffect(() => {
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_TYPE,
    });
    store.dispatch({
      type: serviceActions.GET_VENDOR_LIST,
    });
    store.dispatch({
      type: actions.GET_ALL_USER,
    });
    updateImage();
    if (state) {
      setUserId(state.users);
      setVoucherValue(state.vouchervalue);
      setVoucherType(state.vouchertype);
      state.isalluser === 1 ? setAllUser(true) : setAllUser(false);
    }
  }, []);

  const backTopage = () => {
    props.history.push("/vendor/voucher");
  };
  const updateImage = () => {
    let imgArr = [];
    imgArr.push(state.photopath);
  };

  const onFinish = (values) => {
    var dateArr = values.voucherdate;
    var startDate;
    var endDate;
    startDate = dateArr[0].format("YYYY-MM-DD").toString();
    endDate = dateArr[1].format("YYYY-MM-DD").toString();

    let data = {
      id: state.id,
      vouchername: values.vouchername,
      description: values.description,
      vouchercode: state.vouchercode,
      vouchervalue: parseInt(values.vouchervalue),
      maxredeem_amt: parseInt(2), //parseInt(values.maxredeem),
      mincartvalue: parseInt(2), //parseInt(values.minvalue),
      startdate: startDate,
      enddate: endDate,
      isalluser: isAllUser ? 1 : 0,
      users: userId.length ? userId : [],
      usertype: 1,
      vouchertype: voucherType,
      status: 1,
    };
    store.dispatch({
      type: actions.POST_VENDOR_VOUCHER,
      payload: data,
      callBackAction: (status) => {
        if (status) {
          backTopage();
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
        required: false,
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

  const handleChangeUser = (value) => {
    setUserId(value);
  };
  const handleChangeVoucherType = (value) => {
    setVoucherType(value);
  };

  const onChangeDate = (value) => {};

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  return (
    <Row>
      <Col span={24} className="dashboard-content">
        <Card title={getLocaleMessages({ id: "voucher.update.title" })}>
          <div>
            <Row gutter={40}>
              <Col span={12} className="voucher_left">
                <h2>
                  {getLocaleMessages({
                    id: "voucher.info.label",
                  })}
                </h2>
                <Spin size="large" spinning={loading || imageLoader}>
                  <Form
                    {...formProps}
                    form={form}
                    onFinish={onFinish}
                    initialValues={{
                      vouchername: state.vouchername,
                      description: state.description,
                      vouchervalue: state.vouchervalue,
                      vouchercode: state.vouchercode,
                      minvalue: state.mincartvalue,
                      maxredeem: state.maxredeem_amt,
                      voucherdate: [
                        moment(
                          stringToDate(state.startdate, "yyyy-MM-dd", "-")
                        ),
                        moment(stringToDate(state.enddate, "yyyy-MM-dd", "-")),
                      ],
                      users: state.users.length > 0 ? state.users : [],
                      vouchertype: state.vouchertype,
                    }}
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
                        id: "label.voucherMinimumValue",
                      })}
                      name="minvalue"
                      {...minimumValueConfig}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item
                      style={{ display: "none" }}
                      label={getLocaleMessages({
                        id: "voucher.maxredeem.label",
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
                      <RangePicker
                        onChange={onChangeDate}
                        disabledDate={disabledDate}
                        // defaultValue={[moment(stringToDate(state.startdate,"yyyy-MM-dd","-")), moment(stringToDate(state.enddate,"yyyy-MM-dd","-"))]}
                        defaultValue={[
                          moment(state.startdate, dateFormat),
                          moment(state.enddate, dateFormat),
                        ]}
                      />
                    </Form.Item>

                    <Form.Item>
                      <label>
                        {getLocaleMessages({
                          id: "voucher.isalluser.label",
                        })}
                      </label>
                      <br />
                      <Switch
                        defaultChecked={state.isalluser === 1 ? true : false}
                        onChange={isAllUserChange}
                      />{" "}
                      <br />
                    </Form.Item>
                    {!isAllUser ? (
                      <Form.Item
                        name="users"
                        {...userConfig}
                        label={getLocaleMessages({
                          id: "User",
                        })}
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
                      <Button
                        type="primary"
                        htmlType="create"
                        className="save-btn"
                      >
                        {getLocaleMessages({
                          id: "voucher.update.button",
                        })}
                      </Button>
                      <Button className="save-btn" onClick={() => backTopage()}>
                        {getLocaleMessages({
                          id: "Back",
                        })}
                      </Button>
                    </div>
                  </Form>
                </Spin>
              </Col>
              <Col span={12} className="inner-content">
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
                      {/* <div className="voucher-box">
                    <h2>Demo@gmail.com</h2>
                    <p>Your Location and Address Here </p>
                    </div> */}
                      <div className="voucher-box">
                        <h2>
                          {getLocaleMessages({
                            id: "voucher.value.title",
                          })}
                        </h2>
                        <p className="price">
                          {voucherValue ? voucherValue : ""}
                          {parseInt(voucherType) == 1 ? "%" : "SAR"}
                        </p>

                        <h4>{`${getLocaleMessages({
                          id: "voucher.code.label",
                        })}:${state.vouchercode}`}</h4>

                        <p className="desc">
                          {getLocaleMessages({
                            id: "voucher.redeem.description",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateVoucher;
