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
  Spin
} from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { getLocaleMessages } from "redux/helper";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Services/actions";
import { store } from 'redux/store';
import settingActions from "redux/Settings/actions";
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

const { TabPane } = Tabs;

function callback(key) {

}
const UpdateCategory = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;

  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { loading } = useSelector((state) => state.Services);
  const { category_redirect } = useSelector((state) => state.Services);
  const state = JSON.parse(localStorage.getItem('categoryData'));
  const [user, setUser] = useState();
  const [color, setColor] = useState('#ffffff');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${color}`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const backTopage = () => {

    localStorage.removeItem('categoryData');
    props.history.push('/vendor/Services');
  }
  const onFinish = (values) => {
    var categoryArr = state.language;

    let data = {
      id: state.id,
      language: categoryArr,
      status: 0,
      photopath: state.photopath,
    }

    store.dispatch({
      type: actions.POST_VENDOR_UPDATE_CATEGORY,
      payload: data,
      callBackAction: (status) => {
        if (status) {
          backTopage();
        }
      }
    });
  };
  const onFinishFailed = (errorInfo) => {

  };
  const onChange = (checked) => {

  };

  const nameConfig = {
    rules: [{ required: true, message: getLocaleMessages({ id: 'categoryname.error' }) }],
  };

  const filterCatName = (arr, id) => {
    let categoryname = arr.filter(i => i.languageid === id);
    return categoryname[0].categoryname;
  }

  const filterCatDesc = (arr, id) => {
    let categorydesc = arr.filter(i => i.languageid === id);
    return categorydesc[0].categorydesc;
  }

  const inputChange = (val) => {
    let value = val.target.value;
    let id = val.target.id;
    let index = state.language.findIndex(x => x.languageid == id);
    let obj = state.language.find(x => x.languageid == id);
    obj.categoryname = value;
    state.language[index] = obj;
    localStorage.setItem("categoryData", JSON.stringify(state));
  }

  const handleColorPickerClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorPickerClose = () => {
    setDisplayColorPicker(false);
  };

  const handleColorPickerChange = (colorSelected) => {
    setColor(colorSelected.hex);
  };

  return (
    <Row>
      <Col span={24} className="dashboard-content">
        <Card title={getLocaleMessages({ id: 'categoryupdate.title' })}>
          <div>
            <div className="modal-content">
              <Spin size="large" spinning={loading}>
                <Form {...formProps} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                  <Col span={24} className="inner-content">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                      {getAppLanguageList.length ?
                        getAppLanguageList.map((lang, index) =>
                          <TabPane tab={lang.languagename} key={lang.id}>
                            <Row>
                              <Col span={24} className="inner-content">
                                <Form.Item
                                  name={lang.id + 'category'}
                                  label={getLocaleMessages({ id: 'category.name' })}
                                  initialValue={(state.language) ? filterCatName(state.language, lang.id) : ''}
                                  {...nameConfig}
                                >
                                  <Input id={lang.id} onChange={inputChange}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24} className="inner-content">
                                <Form.Item
                                  name={lang.id + 'categorydesc'}
                                  label={getLocaleMessages({ id: 'categorydesc.name' })}
                                  initialValue={(state.language) ? filterCatDesc(state.language, lang.id) : ''}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                            </Row>
                          </TabPane>
                        )

                        :
                        <Row>
                          <Col>
                            <p>No languages created</p>
                          </Col>
                        </Row>
                      }
                    </Tabs>
                    <Row>
                      <Col span={24} className="inner-content">
                        <Form.Item
                          name={'color'}
                          label={getLocaleMessages({ id: 'Color' })}
                        >
                          <div style={styles.swatch} onClick={handleColorPickerClick}>
                            <div style={styles.color} />
                          </div>
                          {displayColorPicker ? <div style={styles.popover}>
                            <div style={styles.cover} onClick={handleColorPickerClick} />
                            <SketchPicker color={color} onChange={handleColorPickerChange} />
                          </div> : null}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12} className="inner-content">
                        <Button type="primary" htmlType="create" className="save-btn">
                          {getLocaleMessages({ id: 'common.update' })}
                        </Button>
                      </Col>
                      <Col span={12} className="inner-content">
                        <Button type="primary" onClick={() => { backTopage() }} className="save-btn">
                          {getLocaleMessages({ id: 'Back' })}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Form>
              </Spin>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateCategory;
