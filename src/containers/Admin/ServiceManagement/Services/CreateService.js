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

const CreateService = (props) => {
  useEffect(() => {
    console.log(
      "GET_CATEGORY_LIST GET_CATEGORY_LIST GET_CATEGORY_LIST GET_CATEGORY_LIST GET_CATEGORY_LIST"
    );
    store.dispatch({
      type: actions.GET_CATEGORY_LIST,
    });
    store.dispatch({
      type: actions.GET_VENDOR_LIST,
    });
  }, []);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;

  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const {
    categoryList,
    categoryUpdateList,
    categoryServiceByVendorList,
  } = useSelector((state) => state.Services);
  const { vendorList } = useSelector((state) => state.Services);
  const { staffList } = useSelector((state) => state.Services);

  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [categoryId, setCategoryId] = useState();
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [staffId, setStaffId] = useState([]);
  const [postLoader, setPostLoader] = useState(false);

  const [load, setLoad] = useState(false);

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
    let d = values.duration.format("HH:mm").toString();

    var priceArr = [];
    let pricingObj = {};
    pricingObj.pricing_name = values.pricingname;
    pricingObj.duration = d;
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
      let langid = list.id + "service";
      let obj = {};
      obj.languageid = list.id;
      obj.langshortname = list.languageshortname;
      obj.servicename = ServiceObj[langid];
      serviceArr.push(obj);
    });

    let data = {
      categoryid: parseInt(categoryId),
      vendorid: parseInt(vendorId),
      price: priceArr,
      service_staff: staffId,
      availability: availability,
      tax: 1, //parseInt(values.tax),
      language: serviceArr,
      status: 1,
      permission: "Approved",
      image_url: "",
      photopath: "", //"/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
    };

    setPostLoader(true);
    store.dispatch({
      type: actions.POST_VENDOR_SERVICES,
      payload: data, //{...data, photopath: imagePath, image_url: image_url},

      callBackAction: (status) => {
        if (status) {
          store.dispatch({
            type: actions.GET_SERVICES_LIST,
            vendorid: parseInt(vendorId),
            callBackAction: (data) => {},
          });
          closeModal();
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
    setLoad(true);
    store.dispatch({
      type: actions.GET_VENDORSTAFF_LIST,
      id: value,
    });
    store.dispatch({
      type: actions.GET_VENDORCATEGORY_LIST,
      id: value,
    });
    store.dispatch({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_LATEST,
      vendorid: value,
      languageid: 1,
      callBackAction: (response) => {
        if (response) {
          setLoad(false);
        }
      },
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
    rules: [{ required: true, message: "Please select a staff!" }],
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
    <Modal
      className="add-vocher create_category_modal"
      title={getLocaleMessages({ id: "service.createTitle" })}
      centered
      visible={modalVisible}
      onOk={closeModal}
      onCancel={closeModal}
      width={1000}
      footer={false}
    >
      <div className="modal-content">
        <Spin
          size="large"
          spinning={loading || load || imageLoader || postLoader}
        >
          <Form
            {...formProps}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Col span={24} className="inner-content pd-20 service-create">
              <Tabs defaultActiveKey="1" onChange={callback}>
                {getAppLanguageList.length ? (
                  getAppLanguageList.map((lang, index) => (
                    <TabPane tab={lang.languagename} key={lang.id}>
                      <Row gutter={30}>
                        <Col span={24} className="inner-content">
                          <Form.Item
                            name={lang.id + "service"}
                            label={getLocaleMessages({ id: "service.name" })}
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
              <Row>
                <Col span={12} className="inner-content">
                  <Form.Item
                    label={getLocaleMessages({ id: "vendor.label" })}
                    name="vendorid"
                    {...vendorIdConfig}
                  >
                    <Select
                      placeholder={getLocaleMessages({
                        id: "selectvendor.label",
                      })}
                      onChange={handleChangeVedor}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      // onSearch={onSearch}
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
                    label={getLocaleMessages({ id: "category.label" })}
                    name="categoryid"
                    {...categoryIdConfig}
                  >
                    <Select
                      placeholder={getLocaleMessages({
                        id: "selectcategory.label",
                      })}
                      onChange={handleChangeCategory}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {/* {categoryUpdateList &&
                        categoryUpdateList.length > 0 &&
                        categoryUpdateList.map((list, id) => {
                          return (
                            <option value={list.id} key={id}>
                              {list.categoryname}
                            </option>
                          );
                        })} */}
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
                </Col>
              </Row>

              <Row className={toggleStaffselect()}>
                <Col span={24} className="inner-content">
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
                      onChange={handleChangeStaff}
                    >
                      {staffList &&
                        staffList.length > 0 &&
                        staffList.map((list, id) => {
                          return (
                            <option
                              value={list.id}
                              key={id}
                            >{`${list.firstname} ${list.lastname}`}</option>
                          );
                        })}
                      {staffList && staffList.length == 0 ? (
                        <option value={0}>{"No Preference"}</option>
                      ) : (
                        ""
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="tax"
                    label="Tax"
                    {...taxConfig}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
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

              <Row>
                {/* <Col span={12} className="inner-content">
              <Form.Item
                name="pricingname"
                label="Pricing Name"
                {...priceNameConfig}
              >
                <Input/>
              </Form.Item>
                </Col>*/}
                <Col span={12} className="inner-content">
                  <Form.Item
                    name="duration"
                    label="Service Duration"
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

              <Row> */}
                <Col span={12} className="inner-content">
                  <Form.Item name="price" label="Price" {...priceConfig}>
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col span={12} className="inner-content">
                  <Form.Item
                    name="specialprice"
                    label="Special Price"
                    {...specialPriceConfig}
                  >
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              {/* <Row>
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

              {/*
          <Row>
            <Col span={24} className="inner-content">
              <Form.Item label={getLocaleMessages({id: 'serviceimage.label'})}>
                <ImageUploader
                  isSingleImage={true}
                  images={[]}
                  onDropImage={onDropImage}
                />
              </Form.Item>
            </Col>
          </Row>
          */}
              <Row>
                <Col span={24} className="inner-content">
                  <div className="button-center">
                    <Button
                      type="primary"
                      htmlType="create"
                      className="save-btn"
                      loading={postLoader}
                    >
                      {getLocaleMessages({ id: "servicecreate.button" })}
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
