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
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

const { TabPane } = Tabs;

function callback(key) {
}
const CreateCategory = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const [status, setStatus] = useState(true);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const [imageOnly, setImageOnlyFunc] = useState(false);
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

  const onFinish = (values) => {
    var langArray = getAppLanguageList;
    var categoryArr = [];
    var langId = [];
    let CategoryObj = values;
    langArray.map((list, id) => {
      langId.push(list.id);
      let langid = list.id + 'category';
      let langCatDesc = list.id + 'categorydesc';
      let obj = {};
      obj.languageid = list.id;
      obj.langshortname = list.languageshortname;
      obj.categoryname = CategoryObj[langid];
      categoryArr.push(obj);
    });

    if (imageOnly) {
      if (setLocalImage.length) {
        for (const localImage of setLocalImage) {
          let siteparam = new FormData();
          siteparam.set('files', localImage, localImage.name);
          let data = {
            language: categoryArr,
            status: status ? 1 : 0,
          };
          store.dispatch({
            type: settingActions.UPLOAD_SITEIMG,
            payload: siteparam,
            callBackAction: (filePath, imageURL) => {

              if (filePath) {
                store.dispatch({
                  type: actions.POST_CATEGORY,
                  payload: {
                    ...data,
                    photopath: filePath,
                    image_url: imageURL,
                  },
                  callBackAction: (status) => {
                    if (status) {
                      form.resetFields();
                      setLocalImageFunc([]);
                      setImageOnlyFunc(false);
                      setModalVisible(false);
                    }
                  },
                });
              }
            },
          });
        }
      } else {
        let error = getLocaleMessages({ id: 'categoryimage.error' });
        message.error(error);
      }
    } else {
      let data = {
        language: categoryArr,
        status: status ? 1 : 0,
        color: color,
        photopath: '',
        image_url: ''
      };

      store.dispatch({
        type: actions.POST_CATEGORY,
        payload: { ...data, photopath: '', image_url: '' },
        callBackAction: (status) => {
          if (status) {
            form.resetFields();
            setLocalImageFunc([]);
            setModalVisible(false);
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

  const nameConfig = {
    rules: [
      {
        required: true,
        message: getLocaleMessages({ id: 'categoryname.error' }),
      },
    ],
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
    setImageOnlyFunc(true);
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

  const onDeleteImage = (id) => {
  };

  return (
    <Modal
      className="create_category_modal"
      title={getLocaleMessages({ id: 'category.createTitle' })}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => {  setModalVisible(false) }}//window.location.reload();
      width={600}
      footer={false}
    >
      <Spin size="large" spinning={loading || imageLoader}>
        <Form
          {...formProps}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Col span={24} className="inner-content pd-20">
            <Tabs defaultActiveKey="1" onChange={callback}>
              {getAppLanguageList.length ? (
                getAppLanguageList.map((lang, index) => (
                  <TabPane tab={lang.languagename} key={lang.id}>
                    <Row gutter={30}>
                      <Col span={24} className="inner-content pd-20">
                        <Form.Item
                          name={lang.id + 'category'}
                          label={getLocaleMessages({ id: 'category.name' })}
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
              <Col span={24} className="inner-content">
                <Form.Item
                  label={getLocaleMessages({ id: 'categoryimage.label' })}
                >
                  <ImageUploader
                    isSingleImage={true}
                    images={[]}
                    onDropImage={onDropImage}
                    isRemoved={true}
                    deleteImage={onDeleteImage}
                  />
                </Form.Item>
                <Form.Item
                    label={getLocaleMessages({ id: 'Status' })}
                    name="status"
                >
                    <Switch
                        defaultChecked
                        onChange={onChange}
                    />
                </Form.Item>                
              </Col>
            </Row>
            <Row>
              <Col span={24} className="inner-content">
                <div className="button-center">
                  <Button type="primary" htmlType="create" className="save-btn">
                    {getLocaleMessages({ id: 'common.create' })}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateCategory;
