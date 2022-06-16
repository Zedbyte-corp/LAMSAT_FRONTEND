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
  InputNumber
} from "antd";
import moment from 'moment';
import { formProps } from "containers/OnBoarding/constant";
import "assets/css/dashboard.scss";
import ImageUploader from "components/Shared/ImageUpload";
import { useSelector,useDispatch } from "react-redux";
import actions  from "redux/vendor/Staff/actions";
import { store } from 'redux/store';
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import { getLocaleMessages , getLocalData} from "redux/helper";


const { TabPane } = Tabs;

const { Option } = Select;

const format = 'HH:mm';

function callback(key) {
}

const CreateService = (props) => {
  const { vendorServiceList , serviceVisible} = useSelector((state) => state.Services);
  useEffect(() => {
    if(serviceVisible){
    store.dispatch({
      type:serviceActions.GET_VENDOR_SERVICE_LISTDATA,
      vendorid:getLocalData('id')
    });
  }
/*store.dispatch({
      type:serviceActions.GET_SERVICES_LIST
    });

    store.dispatch({
      type:serviceActions.GET_VENDOR_LIST

    });*/
  },['vendorServiceList']);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { modalVisible, setModalVisible } = props;
  const [setLocalImage, setLocalImageFunc] = useState([]);
  //const [uploadImages, setUploadImageFunc] = useState([]);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const { uploadImages } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { categoryCreated } = useSelector((state) => state.Services);
  const { imageLoader } = useSelector((state) => state.Settings);
  const { categoryList } = useSelector((state) => state.Services);
  const { vendorList } = useSelector((state) => state.Services);
  const { staffList } = useSelector((state) => state.Services);
  const { serviceList } = useSelector((state) => state.Services);
  const [value, setValue] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [vendorId, setVendorId] = useState();
  const [isStaffSelect, setStaffSelect] = useState(false);
  const [serviceId,setServiceId] = useState([]);

  const onStatusChange = e => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    var d = values.joindate;
    d = d.format("DD-mm-yyyy").toString();
    if(setLocalImage.length) {
      for (const localImage of setLocalImage){
        let siteparam = new FormData();
        siteparam.set(
            'files',
            localImage,
            localImage.name
        );
        let data = {
          email: values.email,
          contactnumber: values.contact,
          employee_startdate: d,
          firstname: values.firstname,
          lastname: values.lastname,
          staff_title: values.title,
          notes: values.notes,
          status: values.status,
          vendorid: getLocalData('id'),
          serviceid: serviceId,
          photopath: "/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png",
        }
        store.dispatch({
          type: settingActions.UPLOAD_SITEIMG,
          payload: siteparam,
          callBackAction: (imagePath,image_url) => {
            if(imagePath) {
              store.dispatch({
                type: actions.POST_STAFF,
                payload: {...data, photopath: imagePath, image_url: image_url},
                callBackAction: (status) => {
                  if(status) {
                    form.resetFields();
                    setLocalImageFunc([]);
                    setModalVisible(false);


    store.dispatch({
      type:serviceActions.GET_STAFF_LIST,
      id: getLocalData('id')
    });

                  }
                }
              })
            }
          }
        })
      }
    } else {
      let error = getLocaleMessages({id:'staff.image.error'});
      message.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {

  };
  const onChange = (checked) => {

  };

  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  const handleChangeVedor = (value) => {
    setVendorId(value);
  }

  const handleChangeService = (value) => {
    setServiceId(value)

  }
  const toggleStaffselect = () => {
    return isStaffSelect ? 'show' : 'hide';
  }
  const onDateChange = (date, dateString) => {

  }

  return (
    <Modal
      className="add-vocher"
      title={getLocaleMessages({id: 'staff.create.button'})}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      width={1000}
    >
      <div className="modal-content">
      <Form {...formProps} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Col span={24} className="inner-content">
          <Row>
              <Col span={12} className="inner-content">
                  <Form.Item
                    name='firstname'
                    label={getLocaleMessages({id:'staff.firstname.label'})}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({id:'staff.firstname.error'}),
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                  <Form.Item
                    name='lastname'
                    label={getLocaleMessages({id:'staff.lastname.label'})}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({id:'staff.lastname.error'}),
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>
              </Col>
          </Row>

          <Row>
              <Col span={12} className="inner-content">
                  <Form.Item
                    name='title'
                    label={getLocaleMessages({id:'staff.title.label'})}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({id:'staff.title.error'}),
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>
              </Col>
              <Col span={12} className="inner-content">
                  <Form.Item
                    name='notes'
                    label={getLocaleMessages({id:'staff.notes.label'})}
                    rules={[
                      {
                        required: true,
                        message: getLocaleMessages({id:'staff.notes.error'}),
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>
              </Col>
          </Row>

          <Row>
            <Col span={12} className="inner-content">
              <Form.Item label={getLocaleMessages({id: 'staff.service.label'})}
              >
                <Select
                  mode="multiple"
                  name = "serviceid"
                  placeholder={getLocaleMessages({id: 'staff.service.placeholder'})}
                  onChange={handleChangeService}
                >
                  {vendorServiceList && vendorServiceList.length > 0 && vendorServiceList.map((list, id) => {
                      return (
                          <option value={list.id} key={id}>{list.servicename}</option>
                      )
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12} className="inner-content">
              <Form.Item
                name="email"
                label={getLocaleMessages({id: 'staff.email.label'})}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: getLocaleMessages({id: 'staff.email.error'}),
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                name="contact"
                label={getLocaleMessages({id:"staff.contact.label"})}
                rules={[
                  {
                    required: true,
                    message: getLocaleMessages({id:"staff.contact.error"}),
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12} className="inner-content">
              <Form.Item
                name="joindate"
                label={getLocaleMessages({id: 'staff.startdate.label'})}
                rules={[
                  {
                    required: true,
                    message: getLocaleMessages({id: 'staff.startdate.error'}),
                  },
                ]}
              >
                <DatePicker onChange={onDateChange} />
              </Form.Item>
            </Col>
            <Col span={12} className="inner-content">
              <Form.Item
                name="status"
                label="Status"
                initialValue={value}
                rules={[
                  {
                    required: true,
                    message: "Please select status!",
                  },
                ]}
              >
                <Radio.Group onChange={onStatusChange} >
                  <Radio value={1}>{getLocaleMessages({id:'active'})}</Radio>
                  <Radio value={0}>{getLocaleMessages({id:'inactive'})}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24} className="inner-content">
              <Form.Item label={getLocaleMessages({id: 'staff.image.label'})}>
                <ImageUploader
                  isSingleImage={true}
                  images={[]}
                  onDropImage={onDropImage}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="inner-content">
              <Button type="primary" htmlType="create" className="save-btn">
                {getLocaleMessages({id: 'staff.create.button'})}
              </Button>
            </Col>
          </Row>
        </Col>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateService;
