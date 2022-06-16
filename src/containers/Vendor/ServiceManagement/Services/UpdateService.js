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
} from "antd";
import moment from "moment";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages, getLocalData } from "redux/helper";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Services/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";
import VendorAction from "redux/admin/adminvendorprofile/actions";
import { getStaffdata } from "redux/vendor/Services/sagas";

const { TabPane } = Tabs;
const { Option } = Select;
const format = "HH:mm";

function callback(key) {}
const UpdateService = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { categoryLoad } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { categoryList } = useSelector((state) => state.Services);
  const { vendorList } = useSelector((state) => state.Services);
  const { staffList } = useSelector((state) => state.Services);
  const { categoryid, isvendorLoad } = useSelector(
    (state) => state.AdminVendorProfile
  );
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [categoryId, setCategoryId] = useState();
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [staffId, setStaffId] = useState([]);
  const state = JSON.parse(localStorage.getItem("vendorServiceData"));

  console.log("statestatestate: " + JSON.stringify(state));
  const [user, setUser] = useState();
  useEffect(() => {
    store.dispatch({
      type: actions.GET_CATEGORY_LIST,
    });
    store.dispatch({
      type: actions.GET_VENDOR_LIST,
    });
    if (state) {
      console.log(state.service_staff)
      setCategoryId(state.categoryid);
      setVendorId(state.vendorid);
      setStaffId(state.service_staff);

      setStaffSelect(true);
    }
  }, [user]);

  useEffect(() => {
    var categoryArr = [];

    store.dispatch({
      type: VendorAction.GET_SINGLE_VENDOR,
      value: getLocalData("id"),
    });

    store.dispatch({
      type: actions.GET_VENDORSTAFF_LIST,
      id: getLocalData("id"),
    });
  }, ["categoryList", "staffList"]);

  if (categoryLoad && categoryid.length) {
    //var catid = categoryid.split(',')?categoryid.split(','):categoryid;
    /*   store.dispatch({
         type: actions.GET_VAENDOE_CATEGORY_SERVICES_LIST,
         categoryid: categoryid,
       });
   */

    store.dispatch({
      type: actions.GET_CATEGORY_LISTDATA_VENDOR,
      vendorid: getLocalData("id"),
    });
  }
  const categoryArrDrop = [];
  var categoryListcont =
    categoryList.length > 0
      ? categoryList.map((categoryLst) => {
          if (
            categoryLst.permission == "Approved" ||
            categoryLst.permission == null
          ) {
            let obj = {
              label: categoryLst.language[0].categoryname,
              value: categoryLst.id,
            };
            categoryArrDrop.push(obj);
          }
          /* let obj = {
           label: categoryLst.language[0].categoryname,
           value: categoryLst.id,
         };
         categoryArrDrop.push(obj);*/
        })
      : "";

  const backTopage = () => {
    localStorage.removeItem("vendorServiceData");
    props.history.push("/vendor/Services");
  };
  const onOfferChange = (e) => {
    setValue(e.target.value);
  };
  const onAvailChange = (e) => {
    setAvailability(e.target.value);
  };

  const onFinish = (values) => {
    let d = values.duration.format("HH:mm").toString();
    var priceArr = [];
    let pricingObj = {};
    pricingObj.pricing_name = values.pricingname;
    pricingObj.duration = values.duration;
    pricingObj.pricetype = 1;
    pricingObj.price = values.price;
    pricingObj.special_price = values.specialprice;
    priceArr.push(pricingObj);
    var langArray = getAppLanguageList;
    var serviceArr = [];
    var langId = [];
    let ServiceObj = values;
    langArray.map((list, id) => {
      langId.push(list.id);
      let langid = list.id + "service";
      let obj = {};
      obj.languageid = list.id;
      obj.langshortname = list.languageshortname;
      obj.servicename = ServiceObj[langid];
      serviceArr.push(obj);
    });

    let data = {
      id: state.id,
      categoryid: parseInt(categoryId),
      vendorid: parseInt(vendorId),
      price: priceArr,
      service_staff: staffId,
      availability: availability,
      tax: parseInt(values.tax),
      language: serviceArr,
      status: 1,
      photopath: "",
    };

    let mything = Object.values(values);
    console.log("1111111", mything?.length, values, data);
    if (mything?.length == 12) {
      store.dispatch({
        type: actions.POST_VENDOR_SERVICES,
        payload: data,
        callBackAction: (status) => {
          if (status) {
            setTimeout(() => {
              backTopage();
            }, 1000);
          }
        },
      });
    } else {
      message.warning("Please fill all feilds");
    }
  };
  const onFinishFailed = (errorInfo) => {};

  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

  const handleChangeVedor = (value) => {
    form.setFieldsValue({ categoryid: [] });
    form.setFieldsValue({ staffid: [] });

    store.dispatch({
      type: actions.GET_STAFF_LIST,
      id: value,
    });
    setVendorId(value);
    setStaffSelect(true);
  };

  const handleChangeCategory = (value) => {
    setCategoryId(value);
  };

  const handleChangeStaff = (value) => {
    setStaffId(value);
  };
  const toggleStaffselect = () => {
    return isStaffSelect ? "show" : "hide";
  };

  const filterServiceName = (arr, id) => {
    let servicename = arr.filter((i) => i.languageid === id);
    return servicename[0].servicename;
  };

  const getStaffdata = () => {
    var res = state.service_staff.map(function (v) {
      return parseInt(v, 10);
    });

    return res.length > 0 ? (!isNaN(res[0]) ? res : "") : "";
  };

  const nameConfig = {
    rules: [
      {
        whitespace: true,
        required: true,
        message: getLocaleMessages({ id: "servicename.error" }),
      },
      {
        pattern: new RegExp(/[\u0600-\u06FF a-zA-Z]+/g),
        message: "You can't use number here!",
      },
    ],
  };
  const vendorIdConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "servicename.error" }),
      },
    ],
  };
  const categoryIdConfig = {
    rules: [{ required: true, message: "Please select a category!" }],
  };
  const taxConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "servicecost.error" }),
      },
    ],
  };
  const staffConfig = {
    rules: [{ required: false, message: "Please select a staff!" }],
  };
  const availabilityConfig = {
    rules: [{ required: true, message: "Please Choose anyone!" }],
  };
  const priceNameConfig = {
    rules: [{ required: true, message: "Please input price name!" }],
  };
  const durationConfig = {
    rules: [{ required: true, message: "Please select service duration!" }],
  };
  const priceConfig = {
    rules: [{ required: true, message: "Please input price amount!" }],
  };
  const specialPriceConfig = {
    rules: [{ required: true, message: "Please input special price amount!" }],
  };

  return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} className="dashboard-content">
        <Card title={getLocaleMessages({ id: "serviceupdate.title" })}>
          <div>
            <Spin size="large" spinning={false}>
              <Form
                {...formProps}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Tabs defaultActiveKey="1" onChange={callback}>
                  {getAppLanguageList.length ? (
                    getAppLanguageList.map((lang, index) => (
                      <TabPane tab={lang.languagename} key={lang.id}>
                        <Form.Item
                          name={lang.id + "service"}
                          label={getLocaleMessages({
                            id: "service.name",
                          })}
                          initialValue={
                            state.language
                              ? filterServiceName(state.language, lang.id)
                              : ""
                          }
                          {...nameConfig}
                        >
                          <Input />
                        </Form.Item>
                      </TabPane>
                    ))
                  ) : (
                    <Row>
                      <Col>
                        <p>No languages created</p>
                      </Col>
                    </Row>
                  )}
                </Tabs>

                <Form.Item
                  name="categoryjoker"
                  label="Category"
                  rules={[
                    { required: false, message: "Category is required!" },
                  ]}
                >
                  <Select
                    defaultValue={state.categoryid}
                    options={categoryArrDrop}
                    onChange={handleChangeCategory}
                  />
                </Form.Item>

                <Row className={toggleStaffselect()}>
                  <Col span={24} className="inner-content">
                    <Form.Item
                      label={getLocaleMessages({ id: "staff.label" })}
                      name="staffid"
                      {...staffConfig}
                    >
                      <Select
                        mode="multiple"
                        defaultValue={
                          state.service_staff &&
                          state.service_staff !== undefined &&
                          state.service_staff.length &&
                          getStaffdata()
                            ? getStaffdata()
                            : ""
                        }
                        placeholder={getLocaleMessages({
                          id: "selectstaff.label",
                        })}
                        onChange={handleChangeStaff}
                      >
                        {staffList &&
                          staffList.length > 0 &&
                          staffList.map((list, id) => {
                            return (
                              <option value={list.id} key={id}>
                                {`${list.firstname} ${list.lastname}`}
                                {state.service_staff !== undefined
                                  ? state.service_staff.length
                                  : 0}
                              </option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={30}>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      name="tax"
                      label="Tax"
                      initialValue={state.tax ? state.tax : ""}
                      {...taxConfig}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      label="Availability"
                      name="service_available"
                      initialValue={state.availability ? state.availability : 0}
                      {...availabilityConfig}
                    >
                      <Radio.Group
                        onChange={onAvailChange}
                        value={availability}
                      >
                        <Radio value={1}>
                          {getLocaleMessages({ id: "confirmText.yes" })}
                        </Radio>
                        <Radio value={0}>
                          {getLocaleMessages({ id: "cancelText.no" })}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={30}>
                  {/*   <Col span={12} className="inner-content">
                      <Form.Item
                        name="pricingname"
                        label="Pricing Name"
                        initialValue={state.price[0].pricing_name ? state.price[0].pricing_name : ''}
                        {...priceNameConfig}
                      >
                        <Input/>
                      </Form.Item>
                        </Col>*/}
                  <Col span={12} className="inner-content">
                    <Form.Item
                      name="duration"
                      label="Service Duration"
                      initialValue={moment(
                        state.price !== undefined && state.price[0]
                          ? state.price[0].duration
                          : 0,
                        format
                      )}
                      {...durationConfig}
                    >
                      <TimePicker format={format} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={30}>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      name="price"
                      label="Price"
                      initialValue={
                        state.price !== undefined &&
                        state.price[0] &&
                        state.price[0].price
                          ? state.price[0].price
                          : ""
                      }
                      {...priceConfig}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="inner-content">
                    <Form.Item
                      name="specialprice"
                      label="Special Price"
                      initialValue={
                        state.price !== undefined &&
                        state.price[0] &&
                        state.price[0].special_price
                          ? state.price[0].special_price
                          : ""
                      }
                      {...specialPriceConfig}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="button-center">
                  <Button type="primary" htmlType="create" className="save-btn">
                    {getLocaleMessages({ id: "serviceupdate.button" })}
                  </Button>

                  <Button
                    type="primary"
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
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateService;
