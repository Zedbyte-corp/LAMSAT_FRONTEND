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
} from "antd";
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Services/actions";
import { store } from "redux/store";
import { getLocaleMessages, getLocalData } from "redux/helper";
import settingActions from "redux/Settings/actions";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

const { TabPane } = Tabs;

const CreateCategory = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  //const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const [color, setColor] = useState("#ffffff");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [Loaderrr, setLoaderrr] = useState(false);
  const styles = reactCSS({
    default: {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `${color}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const onFinish = (values) => {
    setLoaderrr(true);
    var langArray = getAppLanguageList;
    var categoryArr = [];
    var langId = [];
    let CategoryObj = values;
    let mything = Object.values(values);
    console.log("11111", values, values.length, mything, mything.length);

    langArray.map((list, id) => {
      let obj = {};
      langId.push(list.id);
      let langCat = list.id + "category";
      let langCatDesc = list.id + "categorydesc";
      obj.languageid = list.id;
      obj.langshortname = list.languageshortname;
      obj.categoryname = CategoryObj[langCat];
      obj.categorydesc = CategoryObj[langCatDesc];
      categoryArr.push(obj);
    });

    let data = {
      language: categoryArr,
      status: 1,
      color: color,
      permission: "Approved",
      photopath: "",
      vendorid: getLocalData("id"),
    };
    if (mything.length > 4) {
      store.dispatch({
        type: actions.POST_VENDOR_CREATE_CATEGORY,
        payload: data,
        callBackAction: (status) => {
          props.callthiscategory();
          if (status) {
            setLoaderrr(false);
            setTimeout(() => {
              form.resetFields();
              setModalVisible(false);
              store.dispatch({
                type: actions.GET_CATEGORY_LISTDATA_VENDOR,
                vendorid: getLocalData("id"),
              });

              store.dispatch({
                type: actions.GET_VENDOR_SERVICE_LISTDATA,
                vendorid: getLocalData("id"),
              });
            }, 1000);
          } else {
            setLoaderrr(false);
          }
        },
      });
    } else {
      setLoaderrr(false);
      message.warning("Please fill all fields");
    }
  };
  const onFinishFailed = (errorInfo) => {
    // message.warning("Please fill all fields");
  };
  const onChange = (checked) => {};

  const nameConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: "categoryname.error" }),
      },
    ],
  };

  const handleColorPickerClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleColorPickerClose = () => {
    setDisplayColorPicker(false);
  };

  const handleColorPickerChange = (colorSelected) => {
    setColor(colorSelected.hex);
  };

  const handleModalClose = () => {
    setLoaderrr(false);
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: "category.createTitle" })}
      centered
      visible={modalVisible}
      onOk={handleModalClose}
      onCancel={handleModalClose}
      footer={false}
    >
      <Spin spin={"large"} spinning={Loaderrr}>
        <Form
          {...formProps}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Tabs defaultActiveKey="1">
            {getAppLanguageList.length ? (
              getAppLanguageList.map((lang, index) => (
                <TabPane tab={lang.languagename} key={lang.id}>
                  <Row>
                    <Col span={24} className="inner-content">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please fill category",
                          },
                        ]}
                        name={lang.id + "category"}
                        label={getLocaleMessages({ id: "category.name" })}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="inner-content">
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please fill category description",
                          },
                        ]}
                        name={lang.id + "categorydesc"}
                        label={getLocaleMessages({ id: "categorydesc.name" })}
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
            <Col span={24} className="inner-content">
              <Form.Item
                name={"color"}
                label={getLocaleMessages({ id: "Color" })}
              >
                <div style={styles.swatch} onClick={handleColorPickerClick}>
                  <div style={styles.color} />
                </div>
                {displayColorPicker ? (
                  <div style={styles.popover}>
                    <div
                      style={styles.cover}
                      onClick={handleColorPickerClick}
                    />
                    <SketchPicker
                      color={color}
                      onChange={handleColorPickerChange}
                    />
                  </div>
                ) : null}
              </Form.Item>
            </Col>
          </Row>

          <div className="button-center">
            <Button type="primary" htmlType="submit" className="save-btn">
              {getLocaleMessages({ id: "common.create" })}
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateCategory;
