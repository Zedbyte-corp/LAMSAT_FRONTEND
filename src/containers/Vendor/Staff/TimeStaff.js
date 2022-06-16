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
  Radio,
  TimePicker,
  InputNumber,
  Table,
} from 'antd';
import moment from 'moment';
import { formProps } from 'containers/OnBoarding/constant';
import 'assets/css/dashboard.scss';
import ImageUploader from 'components/Shared/ImageUpload';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/vendor/Staff/actions';
import { store } from 'redux/store';
import settingActions from 'redux/Settings/actions';
import serviceActions from 'redux/vendor/Services/actions';
import { getLocaleMessages, getLocalData } from 'redux/helper';

const { TabPane } = Tabs;

const { Option } = Select;

const format = 'HH:mm';

function callback(key) {

}

const TimeStaff = (props) => {
  const { vendorServiceList, serviceVisible } = useSelector(
    (state) => state.Services
  );
  useEffect(() => {
    if (serviceVisible) {
      store.dispatch({
        type: serviceActions.GET_VENDOR_SERVICE_LISTDATA,
        vendorid: getLocalData('id'),
      });
    }
    /*store.dispatch({
      type:serviceActions.GET_SERVICES_LIST
    });

    store.dispatch({
      type:serviceActions.GET_VENDOR_LIST

    });*/
  }, ['vendorServiceList']);

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
  const [serviceId, setServiceId] = useState([]);

  const onStatusChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    var d = values.joindate;
    d = d.format('DD-mm-yyyy').toString();
    if (setLocalImage.length) {
      for (const localImage of setLocalImage) {
        let siteparam = new FormData();
        siteparam.set('files', localImage, localImage.name);
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
          photopath:
            '/var/www/vhosts/lamsat-node/src/app/admin/controllers/__uploads/1605941084158_head.png',
        };
        store.dispatch({
          type: settingActions.UPLOAD_SITEIMG,
          payload: siteparam,
          callBackAction: (imagePath, image_url) => {
            if (imagePath) {
              store.dispatch({
                type: actions.POST_STAFF,
                payload: {
                  ...data,
                  photopath: imagePath,
                  image_url: image_url,
                },
                callBackAction: (status) => {
                  if (status) {
                    form.resetFields();
                    setLocalImageFunc([]);
                    setModalVisible(false);

                    store.dispatch({
                      type: serviceActions.GET_STAFF_LIST,
                      id: getLocalData('id'),
                    });
                  }
                },
              });
            }
          },
        });
      }
    } else {
      let error = getLocaleMessages({ id: 'staff.image.error' });
      message.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {

  };
  const onChange = (checked) => {

  };

  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };

  const onDropImage = (pictureFiles) => {
    setLocalImageFunc(pictureFiles);
  };

  const handleChangeVedor = (value) => {
    setVendorId(value);
  };

  const handleChangeService = (value) => {
    setServiceId(value);

  };
  const toggleStaffselect = () => {
    return isStaffSelect ? 'show' : 'hide';
  };
  const onDateChange = (date, dateString) => {

  };

  return (
    <section className="ad-section light-3">
      <div className="pad-top-125">
        <Col sm="12" lg={{ size: 10, offset: 2 }} md={{ size: 10, offset: 2 }}>
          <h2>Staff Time Management</h2>
          <div className="btn btn-primary">
            {getLocaleMessages({ id: 'Create' })}
          </div>

          <div className="time-zone">
            <Table
              className="time-pick"
              ref="tbl"
              striped
              hover
              responsive
              bordered
              id="data-table-zero"
            >
              <thead>
                <tr>
                  <th>{getLocaleMessages({ id: 'Days' })}</th>
                  <th>{getLocaleMessages({ id: 'Opening Hours' })}</th>
                  <th>{getLocaleMessages({ id: 'Closed Hours' })}</th>
                  <th>{getLocaleMessages({ id: 'Status' })}</th>
                  <th>{getLocaleMessages({ id: 'Status' })}</th>
                </tr>

                <tr>
                  {' '}
                  <td>111111 : {5 * 2}</td>
                  <td>
                    <button>{getLocaleMessages({ id: 'Update' })}</button>
                  </td>
                </tr>
              </thead>
            </Table>
          </div>
        </Col>
      </div>
    </section>
  );
};

export default TimeStaff;
