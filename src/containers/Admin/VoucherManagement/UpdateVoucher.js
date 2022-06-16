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
  DatePicker,
  Spin,
  InputNumber,
  Radio,
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

const UpdateVoucher = (props) => {
  const [form] = Form.useForm();
  const { userList } = useSelector((state) => state.VendorVoucher);
  const [vendorId, setVendorId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [voucherType, setVoucherType] = useState();
  const [isAllVendor, setAllVendor] = useState(true);
  const [isAllUser, setAllUser] = useState(true);
  const [voucherValue, setVoucherValue] = useState("00");
  const [voucherName, setVoucherName] = useState("");
  const [voucherDesc, setVoucherDesc] = useState("");
  const { vendorList } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.VendorVoucher);
  const { imageLoader } = useSelector((state) => state.Settings);
  const state = JSON.parse(localStorage.getItem("voucherData"));
  const { voucherTypeList } = useSelector((state) => state.VendorVoucher);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [vendorlistloader, setvendorlistloader] = useState(false);

  useEffect(() => {
    setvendorlistloader(true);
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_TYPE,
    });
    store.dispatch({
      type: serviceActions.GET_VENDOR_LIST,
      callBackAction: (data) => {
        setvendorlistloader(false);
      },
    });
    store.dispatch({
      type: actions.GET_ALL_USER,
    });
    updateImage();
    if (state) {
      setVendorId(state.vendors);
      setUserId(state.users);
      setVoucherValue(state.vouchervalue);
      setVoucherType(state.vouchertype);
      setVoucherDesc(state.description);
      setVoucherName(state.vouchername);
      setCurrentStatus(state.status);
      state.isallvendor === 1 ? setAllVendor(true) : setAllVendor(false);
      state.isalluser === 1 ? setAllUser(true) : setAllUser(false);
    }
  }, []);

  const backTopage = () => {
    props.history.push("/admin/VoucherManagement");
  };
  const updateImage = () => {
    let imgArr = [];
    imgArr.push(state.photopath);
  };

  const onFinish = (values) => {
    var dateArr = values.voucherdate;
    var startDate;
    var endDate;
    startDate = dateArr[0].format("yyyy-MM-DD").toString();
    endDate = dateArr[1].format("yyyy-MM-DD").toString();

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
      isallvendor: isAllVendor ? 1 : 0,
      vendors: vendorId.length ? vendorId : [],
      isalluser: isAllUser ? 1 : 0,
      users: userId.length ? userId : [],
      usertype: 1,
      vouchertype: voucherType,
      status: currentStatus,
    };
    store.dispatch({
      type: actions.POST_VOUCHER,
      payload: data,
      callBackAction: (status) => {
        if (status) {
          backTopage();
        }
      },
    });
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

  const handleChangeUser = (value) => {
    setUserId(value);
  };
  const handleChangeVoucherType = (value) => {
    setVoucherType(value);
  };

  const handleChangeVedor = (value) => {
    setVendorId(value);
  };

  const onDescriptionChange = (value) => {
    setVoucherDesc(value.target.value);
  };

  const onNameChange = (value) => {
    setVoucherName(value.target.value);
  };

  return (
    <Row>
      <Col span={24} className="dashboard-content">
        <Card title={getLocaleMessages({ id: "voucher.update.title" })}>
          <Row gutter={40}>
            <Col span={14} className="inner-content voucher_left">
              <h2>
                {getLocaleMessages({
                  id: "voucher.info.label",
                })}
              </h2>
              <Spin
                size="large"
                spinning={loading || imageLoader || vendorlistloader}
              >
                <Form
                  {...formProps}
                  form={form}
                  onFinish={onFinish}
                  layout="vertical"
                  initialValues={{
                    vouchername: state.vouchername,
                    description: state.description,
                    vouchervalue: state.vouchervalue,
                    minvalue: state.mincartvalue,
                    maxredeem: state.maxredeem_amt,
                    voucherdate: [
                      moment(stringToDate(state.startdate, "yyyy-MM-dd", "-")),
                      moment(stringToDate(state.enddate, "yyyy-MM-dd", "-")),
                    ],
                    vendors: state.vendors.length ? state.vendors : [],
                    users: state.users.length > 0 ? state.users : [],
                    vouchertype: state.vouchertype,
                  }}
                >
                  <Form.Item
                    label={getLocaleMessages({
                      id: "label.voucherName",
                    })}
                    name="vouchername"
                    {...nameConfig}
                  >
                    <Input onChange={onNameChange} />
                  </Form.Item>
                  <Form.Item
                    label={getLocaleMessages({
                      id: "label.voucherDescription",
                    })}
                    name="description"
                    {...descriptionConfig}
                  >
                    <Input onChange={onDescriptionChange} />
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
                      max={parseInt(voucherType) === 1 ? 100 : 20}
                      onChange={onValueChange}
                    />
                  </Form.Item>
                  {/* <Form.Item
                                        label={getLocaleMessages({
                                            id: 'label.voucherMinimumValue',
                                        })}
                                        name="minvalue"
                                        {...minimumValueConfig}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item
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
                    <RangePicker
                    //defaultValue={[moment(stringToDate(state.startdate,"yyyy-MM-dd","-")), moment(stringToDate(state.enddate,"yyyy-MM-dd","-"))]}
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>
                      {getLocaleMessages({
                        id: "voucher.isallvendor.label",
                      })}
                    </label>
                    <br />
                    <Switch
                      defaultChecked={state.isallvendor === 1 ? true : false}
                      onChange={isAllVendorChange}
                    />{" "}
                    <br />
                  </Form.Item>
                  {!isAllVendor ? (
                    <Form.Item
                      label={getLocaleMessages({
                        id: "vendor.label",
                      })}
                      name="vendors"
                      {...vendorConfig}
                    >
                      <Select
                        mode="multiple"
                        //defaultValue = {state.vendors.length ? state.vendors : []}
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
                        //defaultValue = {state.users.length ? state.user : []}
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
            <Col span={10} className="inner-content voucher_right">
              <div className="voucher_right_center">
                <div className="voucher-title">
                  <h2>
                    {getLocaleMessages({
                      id: "voucher.preview.title",
                    })}
                  </h2>
                  <h3>{voucherName}</h3>
                  <p>{voucherDesc}</p>
                </div>
                <div className="v-box-full">
                  <div className="voucher-box">
                    <h2>
                      {getLocaleMessages({
                        id: "voucher.value.title",
                      })}
                    </h2>
                    <p className="price">
                      {`${voucherValue}`}{" "}
                      {parseInt(voucherType) == 1 ? "%" : "SAR"}
                      {/* {`${voucherValue}.00`} { parseInt(voucherType) == 1 ? "SAR" : "%" } */}
                    </p>
                  </div>
                  <div className="voucher-box">
                    <h2>{`${getLocaleMessages({
                      id: "voucher.code.label",
                    })}:${state.vouchercode}`}</h2>
                    <p>
                      {getLocaleMessages({
                        id: "voucher.redeem.description",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateVoucher;
