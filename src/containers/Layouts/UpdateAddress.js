import React, { useState, useEffect } from 'react';
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
} from 'antd';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import { getLocaleMessages } from 'redux/helper';
import ImageUploader from 'components/Shared/ImageUpload';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/vendor/Services/actions';
import { store } from 'redux/store';
import settingActions from 'redux/Settings/actions';
import Action from 'redux/AddressBook/actions';
import { checkValid, getLocalData, getLocalDataType } from 'redux/helper';
import Mymap from 'components/Admin/VendorProfile/Mymap';

const { TextArea } = Input;

const { TabPane } = Tabs;

function callback(key) {

}
const UpdateAddress = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    editmodalVisible,
    setEditModalVisible,
    updateData,
    countryList,
  } = props;
  const { cityList } = useSelector((state) => state.AddressBook);
  const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);

  const { lat, lng } = useSelector((state) => state.AdminVendorProfile);
  const [flatNo, setFlatNo] = useState(0);
  const [state, setstate] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [countryy, setCountryy] = useState('');
  const [cityy, setCityy] = useState('');
  const [postalCode, setPostalCode] = useState(0);

  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lng);

  useEffect(() => {
      setLatitude(lat);
      setLongitude(lng);
  }, [lat, lng]);

  useEffect(() => {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      latitude +
      ',' +
      longitude +
      '&key=' +
      'AIzaSyADWxNxOiNs0LRXkgRb2qlmz2BPGycoOJ4';
    async function mapAddress() {
      const response = await fetch(url);
      const data = await response.json();

      data.results.map((data, index) => {
        switch (index) {
          case 0:
            setFlatNo(data.formatted_address);
            break;
          case 1:
            setCityy(data.formatted_address);
            break;
          case 2:
            setAddress(data.formatted_address);
            break;
          case 3:
            setCountryy(data.formatted_address);
            break;
          default:
            break;
        }
      });
    }
    mapAddress();
  }, [latitude, longitude]);


  useEffect(() => {
    form.setFieldsValue(updateData);
  }, [updateData]);
  useEffect(() => {
    dispatch({
      type: Action.GETALL_CITY,
      countryid: updateData.country,
    });

    form.setFieldsValue(updateData);
  }, [updateData]);

  const country = [];
  var countryListcont =
    countryList.length > 0
      ? countryList.map((countryLst) => {
          let obj = {
            label: countryLst.language[0].countryname,
            value: countryLst.id,
          };
          country.push(obj);
        })
      : '';

  const city = [];
  var cityListcont =
    cityList.length > 0
      ? cityList.map((cityLst) => {
          let obj = { label: cityLst.cityname, value: cityLst.cityid };
          city.push(obj);
        })
      : '';

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item
      name="prefix"
      noStyle
      rules={[{ required: false, message: 'Select Country code!' }]}
    >
      <Select
        defaultValue="966"
        style={{
          width: 90,
        }}
      >
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );

  const handleChange = (value) => {
    form.setFieldsValue({ country: value });
    dispatch({
      type: Action.GETALL_CITY,
      countryid: value,
    });
  };

  const onFinish = (values) => {
    values['userid'] = getLocalData('id');
    values['id'] = updateData.id;
    store.dispatch({
      type: Action.UPDATE_ADDRESS,
      payload: values,
      callBackAction: (status) => {
        if (status == 200) {
          setEditModalVisible(false);

          message.success(
            getLocaleMessages({ id: 'Address Updated Successfully!' })
          );
        }
      },
    });
  };
  const onFinishFailed = (errorInfo) => {

  };
  const onChange = (checked) => {

  };

  const nameConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: 'categoryname.error' }),
      },
    ],
  };

  const onDropImage = (pictureFiles) => {};

  const getLatLng = (event) => {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  };

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: 'Update' })}
      centered
      visible={editmodalVisible}
      onOk={() => setEditModalVisible(false)}
      onCancel={() => setEditModalVisible(false)}
      width={800}
      destroyOnClose={true}
      footer={false}
    >
      <Spin size="large" spinning={loading}>
        <Form
          {...formProps}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={30}>
            <Col sm={12} md={12} className="inner-content">
              <Form.Item
                name={'fullname'}
                label={getLocaleMessages({ id: 'Full Name' })}
                rules={[
                  {
                    required: true,
                    message: 'Please input your first & last name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={'mobile'}
                label={getLocaleMessages({ id: 'Mobile number' })}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Mobile number!',
                  },
                ]}
              >
                <Input
                  type="number"
                  addonBefore={prefixSelector}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item
                name={'flatno'}
                // label={getLocaleMessages({ id: "Flat" })}
                label={flatNo}
                rules={[
                  {
                    required: true,
                    message:
                      'Please input your House,Flat no.,Building, Company, Apartment!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={'address'}
                // label={getLocaleMessages({ id: "Address" })}
                label={address}
                rules={[
                  { required: true, message: 'Please input your Address!' },
                ]}
              >
                <TextArea />
              </Form.Item>
            </Col>
            <Col sm={12} md={12} className="inner-content">
              <Form.Item
                name={'landmark'}
                label={getLocaleMessages({ id: 'Landmark' })}
                rules={[
                  {
                    required: true,
                    message: 'Please input your LandMark Details!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="country"
                // label="Country"
                label={countryy}
                rules={[{ required: true, message: 'Country Select one!' }]}
              >
                <Select options={country} onChange={handleChange} />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'City Select one!' }]}
              >
                <Select options={city} />
              </Form.Item>

              <Form.Item
                name={'postal'}
                label={getLocaleMessages({ id: 'Postal Code' })}
                rules={[
                  { required: true, message: 'Please input your Phone!' },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              {/*  <Form.Item
                name={'country'}
                label={getLocaleMessages({id:'Country'})}
                rules={[{ required: true, message: 'Please input your Country name!' }]}
                >
                <Input/>
                </Form.Item>
                <Form.Item
                name={'postal'}
                label={getLocaleMessages({id:'Postal Code'})}
                rules={[{ required: true, message: 'Please input your Phone!' }]}
                >
                <Input/>
              </Form.Item> */}
            </Col>
          </Row>
          <div className="address_map">
            <Mymap latitude={latitude} longitude={longitude} getLatLng={getLatLng} />
          </div>

          <div className="button-center">
            <Button type="primary" htmlType="create" className="save-btn">
              {getLocaleMessages({ id: 'common.update' })}
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default UpdateAddress;
