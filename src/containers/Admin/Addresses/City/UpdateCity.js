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
import actions from 'redux/admin/address/actions';
import { store } from 'redux/store';
import settingActions from 'redux/Settings/actions';

const { TabPane } = Tabs;

function callback(key) {
}
const UpdateCity = (props) => {

  const [form] = Form.useForm();
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { city } = useSelector((state) => state.Address);
  const { loading } = useSelector((state) => state.Address);
  const { city_redirect } = useSelector((state) => state.Address);
  const { countryList } = useSelector((state) => state.Address);
  const { imageLoader } = useSelector((state) => state.Settings);
  const state = JSON.parse(localStorage.getItem('cityData'));
  const [status, setStatus] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_COUNTRY_LIST,
    });
    if (state.status === 1) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [user]);

  const backTopage = () => {
    props.history.push('/admin/City');
  };

  const onFinish = (values) => {

    var cityArr = state.language;

    let langCheck = cityArr.filter((d, i) => {
      if (typeof d.cityname === 'undefined') {
        return true;
      }
    });

    if (langCheck.length > 0) {
      let error = getLocaleMessages({ id: 'common.language.error' });
      message.error(error);
    } else {
      let data = {
        id: state.id,
        countryid: values.countryid,
        language: cityArr,
        status: status ? 1 : 0,
      };
      store.dispatch({
        type: actions.POST_CITY,
        payload: data,
        callBackAction: (status) => {
          if (status) {
            backTopage();
          }
        },
      });
    }
  };
  const onFinishFailed = (errorInfo) => {

  };
  const onChange = (checked) => {
    setStatus(checked);
  };
  const inputChange = (val) => {
    let value = val.target.value;
    let id = val.target.id;
    let index = state.language.findIndex((x) => x.languageid == id);
    let obj = state.language.find((x) => x.languageid == id);
    obj.cityname = value;
    state.language[index] = obj;
    localStorage.setItem('cityData', JSON.stringify(state));
  };

  const nameConfig = {
    rules: [
      {
        whitespace: true,
        required: true,
        message: getLocaleMessages({ id: 'cityname.error' }),
      },
    ],
  };
  const countryConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: 'countryname.error' }),
      },
    ],
  };

  const filterCityName = (arr, id) => {
    let cityname = arr.filter((i) => i.languageid === id);
    return cityname[0].cityname;
  };
  return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} className="dashboard-content">
        <Card title={getLocaleMessages({ id: 'cityupdate.title' })}>
          <Spin size="large" spinning={loading}>
            <Form
              {...formProps}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                countryid: state.countryid,
              }}
            >
              <Col span={24} className="inner-content">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  {getAppLanguageList.length ? (
                    getAppLanguageList.map((lang, index) => (
                      <TabPane tab={lang.languagename} key={lang.id}>
                        <Row>
                          <Col span={24} className="inner-content">
                            <Form.Item
                              name={lang.id + 'city'}
                              label={getLocaleMessages({
                                id: 'city.name',
                              })}
                              initialValue={
                                state.language
                                  ? filterCityName(state.language, lang.id)
                                  : ''
                              }
                              {...nameConfig}
                            >
                              <Input id={lang.id} onChange={inputChange} />
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
                  <Col span={24} className="inner-content">
                    <Form.Item
                      name="countryid"
                      label={getLocaleMessages({ id: 'Country' })}
                      {...countryConfig}
                    >
                      <Select
                        placeholder={getLocaleMessages({
                          id: 'country.select.label',
                        })}
                      >
                        {countryList &&
                          countryList.length > 0 &&
                          countryList.map((list, id) => {
                            return (
                              <Select.Option value={list.id} key={id}>
                                {list.language[0].countryname}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={getLocaleMessages({ id: 'Status' })}
                      name="status"
                    >
                      <Switch
                        defaultChecked={state.status}
                        onChange={onChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <div className="button-center">
                <Button type="primary" htmlType="create" className="save-btn">
                  {getLocaleMessages({ id: 'common.update' })}
                </Button>

                <Button
                  onClick={() => {
                    backTopage();
                  }}
                  className="save-btn"
                >
                  {getLocaleMessages({ id: 'Back' })}
                </Button>
              </div>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateCity;
