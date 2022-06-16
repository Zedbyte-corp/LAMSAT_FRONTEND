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
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Services/actions";
import VendorAction from "redux/admin/adminvendorprofile/actions";
import { store } from "redux/store";
import settingActions from "redux/Settings/actions";

const { TabPane } = Tabs;

const { Option } = Select;

const format = "HH:mm";

function callback(key) {}

const CreateService = (props) => {
  /*useEffect(() => {

    store.dispatch({
      type:actions.GET_CATEGORY_LIST
    });
  },['categoryList']);*/
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    modalVisible,
    setModalVisible,
    selectedCatId,
    categoryServiceByAdmin,
    categoryServiceByVendorList,
  } = props;
  // console.log(
  //   "this is the value of the categoryServiceByVendorList",
  //   categoryServiceByVendorList
  // );

  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { categoryLoad } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const { categoryList } = useSelector((state) => state.Services);
  const { vendorList } = useSelector((state) => state.Services);
  const { staffList } = useSelector((state) => state.Services);
  const { categoryid, isvendorLoad } = useSelector(
    (state) => state.AdminVendorProfile
  );
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [categoryId, setCategoryId] = useState(selectedCatId);
  const [adminCategoryId, setAdminCategoryId] = useState(selectedCatId);
  const [vendorId, setVendorId] = useState(getLocalData("id"));
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [staffId, setStaffId] = useState([]);
  const [Loaderrr, setLoaderrr] = useState(false);
  // console.log("this is the value of the categoryId", selectedCatId);

  useEffect(() => {
    var categoryArr = [];

    store.dispatch({
      type: VendorAction.GET_SINGLE_VENDOR,
      value: getLocalData("id"),
    });

    /*  var splitCategoryid = getLocalData('categoryid').split(',');
    for (var i = 0; i < splitCategoryid.length; i++) {
      categoryArr[i] = parseInt(splitCategoryid[i]);
    }
*/

    store.dispatch({
      type: actions.GET_VENDORSTAFF_LIST,
      id: vendorId,
    });
  }, ["staffList", "categoryList", categoryId]);

  if (categoryLoad && categoryid.length) {
    //var catid = categoryid.split(',')?categoryid.split(','):categoryid;
    store.dispatch({
      type: actions.GET_VAENDOE_CATEGORY_SERVICES_LIST,
      categoryid: categoryid,
    });
  }
  useEffect(() => {
    if (isvendorLoad) {
      //var catid = categoryid.split(',')?categoryid.split(','):categoryid;
      store.dispatch({
        type: actions.GET_VAENDOE_CATEGORY_SERVICES_LIST,
        categoryid: categoryid,
      });
    }
  }, ["categoryList"]);
  const onOfferChange = (e) => {
    setValue(e.target.value);
  };
  const onAvailChange = (e) => {
    setAvailability(e.target.value);
  };
  const backTopage = () => {
    localStorage.removeItem("vendorServiceData");
    //props.history.push('/vendor/Services');

    store.dispatch({
      type: actions.GET_CATEGORY_LISTDATA_VENDOR,
      vendorid: getLocalData("id"),
    });

    store.dispatch({
      type: actions.GET_VENDOR_SERVICE_LISTDATA,
      vendorid: getLocalData("id"),
    });
  };
  const onFinish = (values) => {
    setLoaderrr(true);
    var d = "01:00";
    d = values.duration.format("HH:mm").toString();
    var priceArr = [];
    let pricingObj = {};
    pricingObj.pricing_name = values.pricingname;
    pricingObj.duration = d;
    pricingObj.pricetype = 1;
    pricingObj.price = values.price;
    pricingObj.special_price = "100"; //values.specialprice;
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
      categoryid: values.categoryid,
      admincategoryid: values.admincategoryid,
      vendorid: parseInt(vendorId),
      price: priceArr,
      service_staff: staffId.length > 0 ? staffId : [0],
      service_available: availability,
      availability: availability,
      tax: 1, //parseInt(values.tax),
      language: serviceArr,
      status: 1,
      permission: "Approved",
      photopath: "",
    };
    // console.log("this is the value of the dataa in the", data);
    // return;
    let mything = Object.values(values);
    const service_terms = data?.language.map((item) => item.servicename);
    console.log("11111", mything, service_terms, values, data);
    if (mything.length == 12) {
      store.dispatch({
        type: actions.POST_VENDOR_SERVICES,
        payload: data,
        callBackAction: (status) => {
          setLoaderrr(false);
          if (status) {
            console.log("this si the value of the status", status);
            dispatch({
              type: VendorAction.GET_SINGLE_VENDOR,
              value: getLocalData("id"),
            });
            form.resetFields();
            setModalVisible(false);
            window.location.reload();
            setTimeout(() => {
              backTopage();
            }, 1000);
          } else {
            setLoaderrr(false);
            // window.location.reload();
          }
        },
      });
    } else {
      setLoaderrr(false);
      message.warning("Please fill all fields");
    }
  };

  const onFinishFailed = (errorInfo) => {};
  const onChange = (checked) => {};

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

  const handleAdminChangeCategory = (value) => {
    setAdminCategoryId(value);
  };

  const handleChangeStaff = (value) => {
    setStaffId(value);
  };
  const toggleStaffselect = () => {
    return isStaffSelect ? "show" : "hide";
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
        required: false,
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
    rules: [{ required: false, message: "Please select service duration!" }],
  };
  const priceConfig = {
    rules: [{ required: true, message: "Please input price amount!" }],
  };
  const specialPriceConfig = {
    rules: [{ required: false, message: "Please input special price amount!" }],
  };

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: "service.createTitle" })}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => {
        setModalVisible(false);
        window.location.reload();
      }}
      footer={false}
    >
      <Spin size="large" spinning={Loaderrr}>
        <Form
          {...formProps}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={{
            categoryid:
              selectedCatId && selectedCatId != 0 ? selectedCatId : "",
          }}
        >
          <h3 className="header_seprate">
            Basic info <label className="sub">Add a service name</label>{" "}
          </h3>

          <Tabs defaultActiveKey="1" onChange={callback}>
            {getAppLanguageList.length ? (
              getAppLanguageList.map((lang, index) => (
                <TabPane tab={lang.languagename} key={lang.id}>
                  <Form.Item
                    name={lang.id + "service"}
                    label={getLocaleMessages({ id: "service.name" })}
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
            label={getLocaleMessages({ id: "admincategory.label" })}
            name="admincategoryid"
            {...categoryIdConfig}
          >
            <Select
              placeholder={getLocaleMessages({
                id: "selectadmincategory.label",
              })}
              onChange={handleAdminChangeCategory}
            >
              {categoryServiceByAdmin &&
                categoryServiceByAdmin.length > 0 &&
                categoryServiceByAdmin.map((list, id) => {
                  return (
                    <option value={list.id} key={id}>
                      {list.categoryname}
                    </option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            //label={getLocaleMessages({ id: "category.label" })}
            label="Saloon Category"
            name="categoryid"
            {...categoryIdConfig}
          >
            <Select
              placeholder={getLocaleMessages({
                id: "selectcategory.label",
              })}
              onChange={handleChangeCategory}
            >
              {categoryServiceByVendorList &&
                categoryServiceByVendorList.length > 0 &&
                categoryServiceByVendorList.map((list, id) => {
                  return (
                    <option value={list.categoryid} key={id}>
                      {list.categoryname}
                    </option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            label={getLocaleMessages({ id: "staff.label" })}
            name="staffid"
            {...staffConfig}
          >
            <Select
              mode="multiple"
              placeholder={getLocaleMessages({
                id: "selectstaff.label",
              })}
              allowClear
              showSearch
              showArrow
              onChange={handleChangeStaff}
            >
              {staffList &&
                staffList.length > 0 &&
                staffList.map((list, id) => {
                  if (list.isnopref != 1) {
                    return (
                      <option
                        value={list.id}
                        key={id}
                      >{`${list.firstname} ${list.lastname}`}</option>
                    );
                  }
                })}
            </Select>
          </Form.Item>

          <Row gutter={30}>
            <Col
              span={12}
              style={{ display: "none" }}
              className="inner-content"
            >
              <Form.Item name="tax" label="Tax" {...taxConfig}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                label="Availability"
                name="service_available"
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

          <h3 className="header_seprate">
            Pricing and Duration{" "}
            <label className="sub">
              Add the pricing options and duration of the service.
            </label>
          </h3>

          <Row gutter={30}>
            {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="pricingname"
                    label="Pricing Name"
                    {...priceNameConfig}
                  >
                    <Input />
                  </Form.Item>
                    </Col> */}
            <Col span={12} className="inner-content">
              <Form.Item
                name="duration"
                label="Service Duration"
                {...durationConfig}
              >
                <TimePicker defaultValue={""} format={format} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={30}>
            <Col span={12} className="inner-content">
              <Form.Item name="price" label="Price" {...priceConfig}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                style={{ display: "none" }}
                name="specialprice"
                label="Special Price"
                {...specialPriceConfig}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* <Row gutter={30}>
            <Col span={12} className="inner-content">
              <Form.Item
                name="offercost"
                label={getLocaleMessages({id:'offercost.label'})}
                rules={[
                  {
                    required: true,
                    message: getLocaleMessages({id:'offercost.error'}),
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                name="isoffer"
                label={getLocaleMessages({id:'isoffer.label'})}
                rules={[
                  {
                    required: true,
                    message: getLocaleMessages({id:'isoffer.error'}),
                  },
                ]}
              >
                <Radio.Group onChange={onOfferChange} value={value}>
                  <Radio value={1}>{getLocaleMessages({id:'confirmText.yes'})}</Radio>
                  <Radio value={0}>{getLocaleMessages({id:'cancelText.no'})}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row> */}
          <div style={{ display: "none" }}>
            <h3 className="header_seprate">Voucher sales:</h3>

            <Row gutter={30}>
              <Col span={12}>
                <Form.Item
                  name="sales"
                  label="Enable Voucher Sales"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="select"
                  label="Voucher Expiry Period"
                  hasFeedback
                >
                  <Select placeholder="Please select voucher expiry period">
                    <Option value="6">Default(6 Months)</Option>
                    <Option value="7">One Day</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="button-center">
            <Button loading={Loaderrr} type="primary" htmlType="create" className="save-btn">
              {getLocaleMessages({ id: "servicecreate.button" })}
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateService;
