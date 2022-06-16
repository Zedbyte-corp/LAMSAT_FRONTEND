import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Spin,
  Form,
  Menu,
  Dropdown,
  Select,
  Switch,
  Tabs,
  Radio,
  TimePicker,
  Modal,
  Collapse,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  DownOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import CreateCategory from './../Category/CreateCategory';
import { getLocaleMessages, getLocalData } from 'redux/helper';
import { useSelector, useDispatch } from 'react-redux';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import CreateService from './CreateService';
import UpdateService from './UpdateService';
import actions from 'redux/vendor/Services/actions';
import { store } from 'redux/store';
import swal from 'sweetalert';
import DataTable from 'helpers/datatable';
import SweetAlert from 'helpers/sweetalert';
import { findLastIndex } from 'lodash';

const { Column, ColumnGroup } = Table;

const demoLoop = [1, 2, 3, 4, 5];
const { TabPane } = Tabs;
function callback(key) {}
const { Option } = Select;
const { Panel } = Collapse;
const format = 'HH:mm';
const ServiceManagement = (props) => {
  var categoryArr = [];

  const [catLoader, setcatLoader] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showService, setShowService] = useState(false);
  const [editServicess, seteditServicess] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState();
  const [updateVisible, setUpdateVisible] = useState(false);
  const [serviceId, setServiceId] = useState(0);
  const [dataupdating, setdataupdating] = useState(0);
  const [Loaderrr, setLoaderrr] = useState(false);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { staffList } = useSelector((state) => state.Services);
  const [availability, setAvailability] = useState(1);
  const [serviceUpdate, setserviceUpdate] = useState();
  const [getServiceUpdate, setgetServiceUpdate] = useState();
  const [categoryUpdate, setcategoryUpdate] = useState();
  const [adminCategoryId, setAdminCategoryId] = useState('');
  const [staffId, setStaffId] = useState([]);

  console.log('this is hte value do teh service data', getServiceUpdate);

  // console.log("serviceUpdate", serviceUpdate, categoryUpdate);

  // console.log("this is the value of the staff created", staffId, staffList);

  // console.log("this is the value of the service select id", selectedCatId);
  const callthiscategory = () => {
    window.location.reload();
  };
  const {
    categoryServiceByVendorList,
    categoryServiceByAdmin,
    categoryServiceByVendorListwithlanguage,
    loadingCategoryServiceByVendorList,
  } = useSelector((state) => state.Services);
  // console.log(
  //   "this is the value service listtttttttt",
  //   categoryServiceByVendorList
  // );
  useEffect(() => {
    setStaffId([
      categoryUpdate && parseInt(categoryUpdate[0].service[0].service_staff),
    ]);
  }, [categoryUpdate]);
  const { loading } = useSelector((state) => state.Services);
  const nameConfig = {
    rules: [
      {
        whitespace: true,
        required: true,
        message: getLocaleMessages({ id: 'servicename.error' }),
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
        required: true,
        message: getLocaleMessages({ id: 'servicename.error' }),
      },
    ],
  };
  const categoryIdConfig = {
    rules: [{ required: true, message: 'Please select a category!' }],
  };
  const taxConfig = {
    rules: [
      {
        required: false,
        message: getLocaleMessages({ id: 'servicecost.error' }),
      },
    ],
  };
  const staffConfig = {
    rules: [
      {
        required: true,
        message: 'Please select a staff or select no preference!',
      },
    ],
  };
  const availabilityConfig = {
    rules: [{ required: true, message: 'Please Choose anyone!' }],
  };
  const priceNameConfig = {
    rules: [{ required: true, message: 'Please input price name!' }],
  };
  const durationConfig = {
    rules: [{ required: false, message: 'Please select service duration!' }],
  };
  const priceConfig = {
    rules: [{ required: true, message: 'Please input price amount!' }],
  };
  const specialPriceConfig = {
    rules: [{ required: false, message: 'Please input special price amount!' }],
  };
  const handleChangeCategory = (value) => {
    // setCategoryId(value);
  };
  const handleChangeStaff = (value) => {
    setStaffId(value);
  };
  const onAvailChange = (e) => {
    setAvailability(e.target.value);
  };
  useEffect(() => {}, [selectedCatId]);

  useEffect(() => {
    setcatLoader(true);
    store.dispatch({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_LATEST,
      vendorid: getLocalData('id'),
      languageid: 1,
      callBackAction: (response) => {
        setcatLoader(false);
      },
    });
    store.dispatch({
      type: actions.GET_CATEGORY_LIST_ADMIN,
      languageid: 1,
      callBackAction: (response) => {
        console.log('-----++++++', response);
        setcatLoader(false);
      },
    });
    store.dispatch({
      type: actions.GET_CATEGORY_SERVICE_By_VENDOR_LIST_WITH_LANGUAGE,
      vendorid: getLocalData('id'),
      languageid: 1,
      callBackAction: (response) => {},
    });
  }, [loading]);

  const menuCreate = (
    <Menu>
      <Menu.Item key="cat" onClick={() => setShowCategory(true)}>
        New Category
      </Menu.Item>
      <Menu.Item
        key="ser"
        onClick={() => {
          setSelectedCatId(0);
          setShowService(true);
        }}
      >
        New Service
      </Menu.Item>
    </Menu>
  );

  const [form] = Form.useForm();

  const staffData = [];
  const dataa = getServiceUpdate && getServiceUpdate.service_staff.split(',');
  dataa &&
    dataa.map((elem) => {
      staffData.push(parseInt(elem));
    });

  const onFinish = (values) => {
    setLoaderrr(true);
    var timeDuration =
      values.duration && values.duration.format('HH:mm').toString();
    var langArray = getAppLanguageList;
    var serviceArr = [];
    var langId = [];
    let ServiceObj = values;
    langArray.map((list, id) => {
      langId.push(list.id);
      let langid = 'service' + list.id;
      let obj = {};
      obj.languageid = list.id;
      obj.langshortname = list.languageshortname;
      obj.servicename = ServiceObj[langid];
      serviceArr.push(obj);
    });

    var priceArr = [];
    let pricingObj = {};
    pricingObj.pricing_name = 'price_name';
    pricingObj.duration = timeDuration;
    pricingObj.pricetype = 1;
    pricingObj.price = values.price;
    pricingObj.special_price = '100'; //values.specialprice;
    priceArr.push(pricingObj);

    console.log('this is the value of the data sector', priceArr);

    const payload = {
      id: getServiceUpdate && getServiceUpdate.servicelanguage[0].serviceid,
      vendorid: getServiceUpdate && getServiceUpdate.vendorid,
      categoryid: getServiceUpdate.categoryid,
      admincategoryid:
        adminCategoryId != ''
          ? adminCategoryId
          : getServiceUpdate.admincategoryid,
      service_available: values.service_available,
      availability: values.service_available,
      tax: 10,
      service_staff: values.staffid,
      photopath:
        '/var/www/vhosts/gatepass-node/src/app/admin/controllers/__uploads/1607056296611_head_neck_shoulder_massage.jpg',
      language: serviceArr,
      price: priceArr,
      status: 1,
    };

    // console.log("this is the value of the vendorrr", payload);
    // return;
    store.dispatch({
      type: actions.POST_VENDOR_SERVICES,
      payload: payload,
      languageid: 1,
      callBackAction: (response) => {
        if (response) {
          setLoaderrr(false);
          seteditServicess(false);
          window.location.reload();
        } else {
          setLoaderrr(false);
        }
      },
    });
  };

  const onFinishFailed = () => {
    setLoaderrr(false);
  };

  const onMenuClick = (status, catId) => {
    // console.log("catId: " + catId);
    setShowService(status);
    setSelectedCatId(catId);
  };

  const minutesToHours = (totalMinutes) => {
    console.log(
      'this is the value this is the value of dattaaaa',
      totalMinutes
    );
    if (totalMinutes) {
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;

      return `${hours} : ${minutes} `;
    }
  };

  const editService = (item, servicessss) => {
    store.dispatch({
      type: actions.GET_VENDOR_BY_ID,
      id: servicessss,
      callBackAction: (response) => {
        setgetServiceUpdate(response.data.data[0]);
        seteditServicess(true);
      },
    });
    return;
    const category = categoryServiceByVendorListwithlanguage.filter(
      (category) => {
        return category.categoryid == item;
      }
    );

    const cateservice = category[0].service.map((service) => {
      return service.servicelang.filter((service) => {
        return service.serviceid == servicessss;
      });
    });
    setserviceUpdate(cateservice);
    setcategoryUpdate(category);
  };
  const handleAdminChangeCategory = (value) => {
    setAdminCategoryId(value);
  };

  return (
    <div>
      <Spin spinning={catLoader} size={'large'}>
        <Row>
          <Col span={24} className="dashboard-content">
            <Card
              title="Menu"
              extra={
                <>
                  <Dropdown overlay={menuCreate}>
                    <Button
                      type="primary"
                      htmlType="create"
                      className="save-btn"
                    >
                      Create <DownOutlined />
                    </Button>
                  </Dropdown>
                </>
              }
            >
              {/*
            <Spin size="large" spinning={loading}>
              <DataTable columns={columns} dataSource={vendorServiceList} />
            </Spin>
            */}

              {categoryServiceByVendorList.length > 0
                ? categoryServiceByVendorList.map((item, index) =>
                    item.permission &&
                    (item.permission == 'Pending' ||
                      item.permission == 'Approved') ? (
                      <>
                        <div className="service_cat_head">
                          <div>
                            <h3>
                              {item.categoryname}{' '}
                              <span className="pending">{item.permission}</span>
                            </h3>
                          </div>
                          <div>
                            <Dropdown
                              overlay={
                                <Menu className="add__category">
                                  <Menu.Item icon={<EditOutlined />}>
                                    <a
                                      onClick={() => {
                                        localStorage.setItem(
                                          'categoryData',
                                          JSON.stringify(item)
                                        );
                                        props.history.push({
                                          pathname: '/vendor/Category/update',
                                        });
                                      }}
                                    >
                                      Edit Category
                                    </a>
                                  </Menu.Item>
                                  <Menu.Item danger icon={<DeleteOutlined />}>
                                    <a
                                      onClick={() => {
                                        let id = parseInt(item.id);

                                        SweetAlert.sweetConfirmHandler(
                                          id,
                                          'service',
                                          'DELETE_VENDORCREATED_CATEGORY'
                                        );
                                      }}
                                    >
                                      Delete Category
                                    </a>
                                  </Menu.Item>
                                </Menu>
                              }
                              className="drop__item"
                            >
                              <MoreOutlined />
                            </Dropdown>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="service_cat_head">
                          <div>
                            <h3>{item.categoryname}</h3>
                            {/* <p>{item.isadmin === 1 ? "by admin" : ""}</p> */}
                          </div>
                          <div>
                            <Space size="middle">
                              <EditOutlined
                                name={item.id + 'name'}
                                id={item.categoryid}
                                onClick={() => {
                                  localStorage.setItem('categoryData', JSON.stringify(item));
                                  props.history.push({
                                    pathname: '/vendor/Category/update',
                                  });
                                }}
                              />
                              <DeleteOutlined
                                id={item.categoryid}
                                onClick={(e) => {
                                  let id = parseInt(item.categoryid);
                                  SweetAlert.sweetConfirmHandler(
                                    id,
                                    'service',
                                    'DELETE_SERVICE_LATEST'
                                  );
                                }}
                              />
                              <Dropdown
                                overlay={
                                  <Menu className="add__category">
                                    <Menu.Item icon={<PlusOutlined />}>
                                      <a
                                        onClick={() =>
                                          onMenuClick(true, item.categoryid)
                                        }
                                      >
                                        Add New Service
                                      </a>
                                    </Menu.Item>
                                  </Menu>
                                }
                                className="drop__item"
                              >
                                <MoreOutlined />
                              </Dropdown>
                            </Space>
                          </div>
                        </div>

                        <ul className="service_cat_head_child">
                          {item.service.length > 0 &&
                            item.service.map((service) => {
                              // console.log("this is service", service);
                              return (
                                service.servicelang.length > 0 &&
                                service.servicelang.map((servicelan) => {
                                  // console.log(
                                  //   "this is servicelang",
                                  //   servicelan.servicename
                                  // );
                                  return (
                                    <>
                                      <li>
                                        {servicelan.servicename &&
                                          <Collapse ghost>
                                            <Panel showArrow={false} header={`${servicelan.servicename}`} key={servicelan.id}>
                                              <p>{`${servicelan.serviceprice ?
                                                      servicelan.serviceprice.length &&
                                                      servicelan.serviceprice[0].price ?
                                                      `$ ${servicelan.serviceprice[0].price}` 
                                                      : ""
                                                    : ""}`
                                                  }
                                              </p>
                                            </Panel>
                                          </Collapse>
                                        }
                                        {/* <p>
                                          {servicelan.servicename &&
                                            `${servicelan.servicename}`}
                                        </p> */}
                                        {servicelan.servicename && (
                                          <>
                                            <Space size="middle">
                                              <EditOutlined
                                                onClick={() => {
                                                  editService(
                                                    item.categoryid,
                                                    servicelan.serviceid
                                                  );
                                                }}
                                              />
                                              <DeleteOutlined
                                                id={item.categoryid}
                                                onClick={(e) => {
                                                  let id = parseInt(
                                                    servicelan.serviceid
                                                  );
                                                  SweetAlert.sweetConfirmHandler(
                                                    id,
                                                    'service',
                                                    'DELETE_SERVICE_LATEST_UNIQUE_SERVICE'
                                                  );
                                                }}
                                              />
                                            </Space>
                                          </>
                                        )}
                                      </li>
                                    </>
                                  );
                                })
                              );
                            })}
                        </ul>

                        <ul className="service_cat_head_child">
                          {item.servicelang && item.servicelang.length > 0
                            ? item.servicelang.map((serviceData, index) =>
                                serviceData.serviceid &&
                                serviceData.serviceid > 0 ? (
                                  <li>
                                    <h4>{serviceData.servicename}</h4>{' '}
                                    <i>
                                      {serviceData.permission !== 'Approved'
                                        ? `(waiting for approval)`
                                        : ''}
                                    </i>
                                    {/*<p>
                                    serviceData.price[0].duration+' min'
                                  </p>
                                  */}
                                    {/*<p className="">
                                    <span>SAR{serviceData.price[0] ? serviceData.price[0].price : 0 }</span> SAR
                                    {serviceData.price[0] ? serviceData.price[0].special_price : 0}
                                  </p>
                                  */}
                                    <div className="options">
                                      <EditOutlined
                                        name={serviceData.id + 'name'}
                                        id={serviceData.id}
                                        onClick={() => {
                                          localStorage.setItem(
                                            'vendorServiceData',
                                            JSON.stringify(serviceData)
                                          );
                                          props.history.push({
                                            pathname: '/vendor/Services/update',
                                          });
                                        }}
                                      />
                                      <DeleteOutlined
                                        name={serviceData.id + 'name'}
                                        id={serviceData.id}
                                        onClick={() => {
                                          let id = parseInt(serviceData.id);
                                          SweetAlert.sweetConfirmHandler(
                                            id,
                                            'service',
                                            'DELETE_VENDOR_SERVICE'
                                          );
                                        }}
                                      />
                                    </div>
                                  </li>
                                ) : (
                                  ''
                                )
                              )
                            : ''}
                        </ul>
                      </>
                    )
                  )
                : ''}

              <CreateCategory
                modalVisible={showCategory}
                callthiscategory={callthiscategory}
                setModalVisible={setShowCategory}
              />

              <CreateService
                modalVisible={showService}
                setModalVisible={setShowService}
                selectedCatId={selectedCatId}
                categoryServiceByVendorList={categoryServiceByVendorList}
                categoryServiceByAdmin={categoryServiceByAdmin}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
      <Modal
        className="create_category_modal"
        title={'Edit Service'}
        centered
        visible={editServicess}
        onOk={() => seteditServicess(false)}
        onCancel={() => {
          seteditServicess(false);
          window.location.reload();
        }}
        footer={false}
      >
        {getServiceUpdate ? (
          <Spin size="large" spinning={Loaderrr}>
            <Form
              {...formProps}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                categoryid: getServiceUpdate && getServiceUpdate.categoryid,
                admincategoryid:
                  getServiceUpdate && getServiceUpdate.admincategoryid,
                staffid: staffData.length > 0 && staffData,
                service1:
                  getServiceUpdate &&
                  getServiceUpdate.servicelanguage[0].servicename,
                service2:
                  getServiceUpdate &&
                  getServiceUpdate.servicelanguage[1].servicename,
                service_available:
                  getServiceUpdate && getServiceUpdate.availability,
                duration: moment(
                  minutesToHours(getServiceUpdate.serviceprice[0].duration),
                  format
                ),
                price:
                  getServiceUpdate && getServiceUpdate.serviceprice.length > 0
                    ? getServiceUpdate.serviceprice[0].price
                    : '',
              }}
              layout="vertical"
            >
              <h3 className="header_seprate">
                Basic info <label className="sub">Update a service name</label>{' '}
              </h3>

              <Tabs defaultActiveKey="1" onChange={callback}>
                {getAppLanguageList.length ? (
                  getAppLanguageList.map((lang, index) => (
                    <TabPane tab={lang.languagename} key={lang.id}>
                      <Form.Item
                        name={'service' + lang.id}
                        // name={"service"}
                        label={'Service Name'}
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
                label={getLocaleMessages({ id: 'admincategory.label' })}
                name="admincategoryid"
                {...categoryIdConfig}
              >
                <Select
                  placeholder={getLocaleMessages({
                    id: 'selectadmincategory.label',
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
                    id: 'selectcategory.label',
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
                label={getLocaleMessages({ id: 'staff.label' })}
                name="staffid"
                {...staffConfig}
              >
                <Select
                  mode="multiple"
                  placeholder={getLocaleMessages({
                    id: 'selectstaff.label',
                  })}
                  onChange={handleChangeStaff}
                >
                  {staffList &&
                    staffList.length > 0 &&
                    staffList.map((list, id) => {
                      // if (list.firstname != "No") {
                      return (
                        <option
                          value={list.id}
                          key={id}
                        >{`${list.firstname} ${list.lastname}`}</option>
                      );
                      // }
                    })}
                </Select>
              </Form.Item>

              <Row gutter={30}>
                <Col
                  span={12}
                  style={{ display: 'none' }}
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
                        {getLocaleMessages({ id: 'confirmText.yes' })}
                      </Radio>
                      <Radio value={0}>
                        {getLocaleMessages({ id: 'cancelText.no' })}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <h3 className="header_seprate">
                Pricing and Duration{' '}
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
                    <TimePicker format={format} />
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
                    style={{ display: 'none' }}
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
              <div style={{ display: 'none' }}>
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
              <Form.Item>
                <div className="button-center">
                  <Button type="primary" htmlType="submit" className="save-btn">
                    Update Service
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Spin>
        ) : (
          <Spin size="large" spinning={true}>
            <Form
              {...formProps}
              form={form}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              // initialValues={{
              //   categoryid: getServiceUpdate && getServiceUpdate.categoryid,
              //   staffid: parseInt(
              //     getServiceUpdate && getServiceUpdate.service_staff
              //   ),
              //   service1:
              //     getServiceUpdate &&
              //     getServiceUpdate.servicelanguage[0].servicename,
              //   service2:
              //     getServiceUpdate &&
              //     getServiceUpdate.servicelanguage[1].servicename,
              //   service_available:
              //     getServiceUpdate && getServiceUpdate.availability,
              //   // duration:
              //   //   serviceUpdate &&
              //   // serviceUpdate.length > 0 &&
              //   //   serviceUpdate[0][0].serviceprice[0].duration &&
              //   //   serviceUpdate[0][0].serviceprice[0].duration,
              //   price:
              //     getServiceUpdate && getServiceUpdate.serviceprice[0].price,
              // }}
              layout="vertical"
            >
              <h3 className="header_seprate">
                Basic info <label className="sub">Update a service name</label>{' '}
              </h3>

              <Tabs defaultActiveKey="1" onChange={callback}>
                {getAppLanguageList.length ? (
                  getAppLanguageList.map((lang, index) => (
                    <TabPane tab={lang.languagename} key={lang.id}>
                      <Form.Item
                        name={'service' + lang.id}
                        // name={"service"}
                        label={'Service Name'}
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
                label={getLocaleMessages({ id: 'category.label' })}
                name="categoryid"
                {...categoryIdConfig}
              >
                <Select
                  placeholder={getLocaleMessages({
                    id: 'selectcategory.label',
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
                label={getLocaleMessages({ id: 'staff.label' })}
                name="staffid"
                {...staffConfig}
              >
                <Select
                  mode="multiple"
                  placeholder={getLocaleMessages({
                    id: 'selectstaff.label',
                  })}
                  // onChange={handleChangeStaff}
                >
                  {staffList &&
                    staffList.length > 0 &&
                    staffList.map((list, id) => {
                      // if (list.firstname != "No") {
                      return (
                        <option
                          value={list.id}
                          key={id}
                        >{`${list.firstname} ${list.lastname}`}</option>
                      );
                      // }
                    })}
                </Select>
              </Form.Item>

              <Row gutter={30}>
                <Col
                  span={12}
                  style={{ display: 'none' }}
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
                        {getLocaleMessages({ id: 'confirmText.yes' })}
                      </Radio>
                      <Radio value={0}>
                        {getLocaleMessages({ id: 'cancelText.no' })}
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <h3 className="header_seprate">
                Pricing and Duration{' '}
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
                    <TimePicker defaultValue={''} format={format} />
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
                    style={{ display: 'none' }}
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
              <div style={{ display: 'none' }}>
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
                {/* <Button type="primary" htmlType="create" className="save-btn">
                  Update Service
                </Button> */}
              </div>
            </Form>
          </Spin>
        )}
      </Modal>
    </div>
  );
};

export default ServiceManagement;
