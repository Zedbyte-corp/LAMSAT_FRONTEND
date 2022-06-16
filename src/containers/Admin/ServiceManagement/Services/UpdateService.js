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
import { getLocaleMessages } from "redux/helper";
//import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Services/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";

const { TabPane } = Tabs;
const { Option } = Select;
const format = "HH:mm";

function callback(key) {}
const UpdateService = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [localImage, LocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const { categoryList, categoryUpdateList, updateInitiate } = useSelector(
    (state) => state.Services
  );
  const { vendorList } = useSelector((state) => state.Services);
  const { staffList } = useSelector((state) => state.Services);
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [categoryId, setCategoryId] = useState();
  const [vendorId, setVendorId] = useState(0);
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [staffId, setStaffId] = useState([]);
  const state = JSON.parse(localStorage.getItem("serviceData"));
  const serviceID = localStorage.getItem("serviceID");
  //setVendorId(parseInt(localStorage.getItem('serviceDataVendorId')));
  const [user, setUser] = useState();
  const [postLoader, setPostLoader] = useState(false);
  const [VendorLoader, setVendorLoader] = useState(false);
  const [CategoryLoader, setCategoryLoader] = useState(false);
  console.log("ssss statestate: " + JSON.stringify(state));
  console.log("ssss saloon id: " + localStorage.getItem("serviceDataVendorId"));

  const minutesToHours = (totalMinutes) => {
    if (totalMinutes) {
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;

      return `${hours} : ${minutes} `;
    }
  };

  //setVendorId(6);

  useEffect(() => {
    setVendorLoader(true)
    setCategoryLoader(true)
    updateImage();
    store.dispatch({
      type: actions.GET_CATEGORY_LIST,
      callBackAction:(data)=>{
        setCategoryLoader(false)
      }
    });
    store.dispatch({
      type: actions.GET_VENDOR_LIST,
      callBackAction:(data)=>{
        setVendorLoader(false)
      }
    });
    if (state) {
      console.log("sss categoryid" + state.categoryid);
      console.log("sss vendorId" + vendorId);
      console.log("sss service_staff" + state.servicelang);

      setCategoryId(state.categoryid);
      setStaffId(state.servicelang ? getStaffdata(state.servicelang) : []);
      setVendorId(state.servicelang[0].vendorid);
      store.dispatch({
        type: actions.GET_VENDORSTAFF_LIST,
        id: state.servicelang[0].vendorid,
      });

      setStaffSelect(true);
    }
  }, []);

  const backTopage = () => {
    setPostLoader(false);
    localStorage.removeItem("serviceData");
    props.history.push("/admin/Services");
  };
  const updateImage = () => {
    let imgArr = [];
    var img1 = {};
    img1.id = "1";
    img1.path = state.image_url;
    imgArr.push(img1);

    LocalImageFunc(imgArr);
  };
  const onOfferChange = (e) => {
    setValue(e.target.value);
  };
  const onAvailChange = (e) => {
    setAvailability(e.target.value);
  };

  const closeModal = () => {
    form.resetFields();
    setModalVisible(false);
    setPostLoader(false);
  };

  const onFinish = (values) => {
    let durationValue = values.duration.format("HH:mm").toString();
    var priceArr = [];
    let pricingObj = {};
    let result = JSON.stringify(staffId);
    pricingObj.pricing_name = values.pricingname;
    pricingObj.duration = durationValue;
    pricingObj.pricetype = 1;
    pricingObj.price = values.price;
    pricingObj.special_price = "100";
    priceArr.push(pricingObj);
    var langArray = getAppLanguageList;
    var serviceArr = [];
    var langId = [];
    let ServiceObj = values;
    langArray.map((list, id) => {
      langId.push(list.id);
      let langid = `${list.id}service`;
      let obj = {};
      obj.languageid = list.id;
      obj.langshortname = list.languageshortname;
      obj.servicename = ServiceObj[langid];
      serviceArr.push(obj);
    });

    let data = {
      id: parseInt(serviceID),
      categoryid: parseInt(categoryId),
      vendorid: parseInt(vendorId),
      price: priceArr,
      service_staff: staffId,
      availability: availability,
      tax: 1, //parseInt(values.tax),
      language: serviceArr,
      status: 1,
      image_url: "",
      photopath: "", //"/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
    };
    setPostLoader(true);
    store.dispatch({
      type: actions.POST_VENDOR_SERVICES,
      payload: data,
      callBackAction: (status) => {
        if (status) {
          backTopage();
        }
      },
    });
  };
  const onFinishFailed = (errorInfo) => {};
  const onChange = (checked) => {};

  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

  const handleChangeVedor = (value) => {
    form.setFieldsValue({ categoryid: [] });
    form.setFieldsValue({ staffid: [] });

    setCategoryId();
    store.dispatch({
      type: actions.GET_VENDORSTAFF_LIST,
      id: value,
    });
    store.dispatch({
      type: actions.GET_VENDORCATEGORY_LIST,
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
  const toggleStaffselect = () => (isStaffSelect ? "show" : "hide");

  const filterServiceName = (arr, id) => {
    let servicename = arr.filter((i) => i.serviceid == serviceID);
    return servicename[0].servicename;
  };

  const filterPrice = (arr) => {
    let price_without_comission = arr.filter((i) => i.serviceid == serviceID);
    return price_without_comission[0].service[0].serviceprice[0]
      .price_without_comission;
  };

  const filterSpecialPrice = (arr) => {
    let price_without_comission = arr.filter((i) => i.serviceid == serviceID);
    return price_without_comission[0].service[0].serviceprice[0].special_price;
  };

  const filterDuration = (arr) => {
    let price_without_comission = arr.filter((i) => i.serviceid == serviceID);
    return price_without_comission[0].service[0].serviceprice[0].duration;
  };

  const filtertax = (arr) => {
    let price_without_comission = arr.filter((i) => i.serviceid == serviceID);
    return price_without_comission[0].service[0].tax;
  };

  const filteravailablity = (arr) => {
    let price_without_comission = arr.filter((i) => i.serviceid == serviceID);
    return price_without_comission[0].service[0].availability;
  };

  const getStaffdata = (val) => {
    if (val.length) {
      let service = val.filter((i) => i.serviceid == serviceID);
      var res = service[0].service_staff.split(",").map(function (v) {
        return parseInt(v, 10);
      });
      return res;
    }
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
        message:
          "You can't use number here!",
      }
    ],
  };
  const vendorIdConfig = {
    rules: [
      {
        required: false,
        message: getLocaleMessages({ id: "servicename.error" }),
      },
    ],
  };
  const categoryIdConfig = {
    rules: [{ required: false, message: "Please select a category!" }],
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
          <Spin size="large" spinning={loading || imageLoader || postLoader || VendorLoader || CategoryLoader}>
            <Form
              {...formProps}
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Tabs defaultActiveKey="1" onChange={callback}>
                {getAppLanguageList.length ? (
                  getAppLanguageList.map((lang, index) => (
                    <TabPane tab={lang.languagename} key={lang.id}>
                      <Row gutter={30}>
                        <Col span={24} className="inner-content">
                          <Form.Item
                            name={`${lang.id}service`}
                            label={getLocaleMessages({ id: "service.name" })}
                            initialValue={
                              state.servicelang
                                ? filterServiceName(state.servicelang, lang.id)
                                : ""
                            }
                            {...nameConfig}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
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
              <Row gutter={30}>
                <Col span={12} className="inner-content">
                  <Form.Item
                    label={getLocaleMessages({ id: "vendor.label" })}
                    name="vendorid"
                    {...vendorIdConfig}
                  >
                    <Select
                      defaultValue={state.servicelang[0].vendorid}
                      placeholder={getLocaleMessages({
                        id: "selectvendor.label",
                      })}
                      onChange={handleChangeVedor}
                    >
                      {vendorList &&
                        vendorList.length > 0 &&
                        vendorList.map((list, id) => (
                          <option value={list.id} key={id}>
                            {list.vendorname}
                          </option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} className="inner-content">
                  <Form.Item
                    label={getLocaleMessages({ id: "category.label" })}
                    name="categoryid"
                    {...categoryIdConfig}
                  >
                    <Select
                      defaultValue={state.categoryid ? state.categoryid : ""}
                      placeholder={getLocaleMessages({
                        id: "selectcategory.label",
                      })}
                      onChange={handleChangeCategory}
                    >
                      {categoryUpdateList &&
                        categoryUpdateList.length > 0 &&
                        categoryUpdateList.map((list, id) => (
                          <option value={list.id} key={id}>
                            {list.categoryname}
                          </option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row className={toggleStaffselect()} gutter={30}>
                <Col span={24} className="inner-content">
                  <Form.Item
                    label={getLocaleMessages({ id: "staff.label" })}
                    name="staffid"
                    {...staffConfig}
                  >
                    <Select
                      mode="multiple"
                      defaultValue={
                        state.servicelang ? getStaffdata(state.servicelang) : []
                      }
                      placeholder={getLocaleMessages({
                        id: "selectstaff.label",
                      })}
                      onChange={handleChangeStaff}
                    >
                      {staffList &&
                        staffList.length > 0 &&
                        staffList.map((list, id) => (
                          <option
                            value={list.id}
                            key={id}
                          >{`${list.firstname} ${list.lastname}`}</option>
                        ))}
                      {/* {staffList && staffList.length == 0 ? (
                        <option value={0}>{'No Preference'}</option>
                      ) : (
                        ''
                      )} */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={30}>
                {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="tax"
                    label="Tax"
                    initialValue={state.servicelang
                      ? filtertax(state.servicelang)
                      : ''
                    }
                    {...taxConfig}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
                <Col span={12} className="inner-content">
                  <Form.Item
                    label="Availability"
                    name="service_available"
                    initialValue={
                      state.servicelang
                        ? filteravailablity(state.servicelang)
                        : ""
                    }
                    {...availabilityConfig}
                  >
                    <Radio.Group onChange={onAvailChange} value={availability}>
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
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="duration"
                    label="Service Duration"
                    initialValue={moment(
                      state.servicelang
                        ? minutesToHours(filterDuration(state.servicelang))
                        : 0,
                      format
                    )}
                    {...durationConfig}
                  >
                    <TimePicker
                      format={format}
                      showNow={false}
                      minuteStep={15}
                    />
                  </Form.Item>
                </Col>
                {/* </Row>

              <Row gutter={30}> */}
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="price"
                    label="Price"
                    initialValue={
                      state.servicelang ? filterPrice(state.servicelang) : ""
                    }
                    {...priceConfig}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="specialprice"
                    label="Special Price"
                    initialValue={
                      state.servicelang
                      ? filterSpecialPrice(state.servicelang)
                      : ''
                    }
                    {...specialPriceConfig}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              <div className="button-center">
                <Button
                  type="primary"
                  htmlType="create"
                  loading={postLoader}
                  className="save-btn"
                >
                  {getLocaleMessages({ id: "serviceupdate.button" })}
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

export default UpdateService;
