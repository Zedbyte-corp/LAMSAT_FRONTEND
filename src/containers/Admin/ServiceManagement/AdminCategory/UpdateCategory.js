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
import ImageUploader from 'components/Shared/ImageUploadDef';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/vendor/Services/actions';
import { store } from 'redux/store';
import settingActions from 'redux/Settings/actions';

const { TabPane } = Tabs;

function callback(key) {
}
const UpdateCategory = (props) => {

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  const [imageOnly, setImageOnlyFunc] = useState(false);
  const [localImage, LocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { category_redirect } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const state = JSON.parse(localStorage.getItem('categoryData'));
  const [status, setStatus] = useState(true);
  const [user, setUser] = useState();
  const [defaultImage, setDefaultImage] = useState('');

  useEffect(() => {

    console.log("sss state.image_url" + state.image_url);

    updateImage();
  }, [user]);


  const backTopage = () => {
    props.history.push('/admin/Category');
  };
  const updateImage = () => {

    let imgArr = [];
    var img1 = {};
    img1.id = "1";
    img1.path = state.image_url;
    imgArr.push(img1);

    LocalImageFunc(imgArr);
  };

  const onFinish = (values) => {
    var categoryArr = state.language;
    if (imageOnly) {
      if (setLocalImage.length) {
        for (const localImage of setLocalImage) {
          let siteparam = new FormData();
          siteparam.set('files', localImage, localImage.name);
          let data = {
            id: state.id,
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
                      setLocalImageFunc([]);
                      setImageOnlyFunc(false);
                      backTopage();
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
        id: state.id,
        language: categoryArr,
        status: status ? 1 : 0,
        photopath: state.photopath,
      };
      store.dispatch({
        type: actions.POST_CATEGORY,
        payload: data,
        callBackAction: (status) => {
          if (status) {
            LocalImageFunc([]);
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

  const filterCatName = (arr, id) => {
    let categoryname = arr.filter((i) => i.languageid === id);
    return categoryname[0].categoryname;
  };

  const inputChange = (val) => {
    let value = val.target.value;
    let id = val.target.id;
    let index = state.language.findIndex((x) => x.languageid == id);
    let obj = state.language.find((x) => x.languageid == id);
    obj.categoryname = value;
    state.language[index] = obj;
    localStorage.setItem('categoryData', JSON.stringify(state));
  };

  const onDefaultImageChange = (e) => {
  };

  const onDeleteImage = (id) => {
    var newlocalImage = localImage.find(limage=> limage.id !== id)
    if(newlocalImage) LocalImageFunc(newlocalImage); else LocalImageFunc([]); 
  };

  return (
    <Row>
      <Col span={2}></Col>
      <Col span={20} className="dashboard-content">
        <Card title={getLocaleMessages({ id: 'categoryupdate.title' })}>
          <Spin size="large" spinning={loading || imageLoader}>
            <Form
              {...formProps}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Col span={24} className="inner-content">
                <Tabs defaultActiveKey="1" onChange={callback}>
                  {getAppLanguageList.length ? (
                    getAppLanguageList.map((lang, index) => (
                      <TabPane tab={lang.languagename} key={lang.id}>
                        <Row>
                          <Col span={24} className="inner-content">
                            <Form.Item
                              name={lang.id + 'category'}
                              label={getLocaleMessages({ id: 'category.name' })}
                              initialValue={
                                state.language
                                  ? filterCatName(state.language, lang.id)
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
                      label={getLocaleMessages({ id: 'categoryimage.label' })}
                    >
                      <ImageUploader
                        isSingleImage={true}
                        images={localImage.length ? localImage : []}
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

export default UpdateCategory;
