import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  PageHeader,
  Button,
  DatePicker,
  Select,
  Table,
  Tabs,
  Spin,
  Space,
} from 'antd';
import 'assets/css/dashboard.scss';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import actions from 'redux/vendor/Staff/actions';
import CreateStaff from './CreateStaff';
import TimeStaff from './Time';
import { useSelector, useDispatch } from 'react-redux';
import { getLocaleMessages, getLocalData } from 'redux/helper';
import settingActions from 'redux/Settings/actions';
import serviceActions from 'redux/vendor/Services/actions';
import { store } from 'redux/store';
import SweetAlert from 'helpers/sweetalert';
import DataTable from 'helpers/datatable';
import StafTime from './StafTime';

const { TabPane } = Tabs;

const Staff = (props) => {
  const [visible, setVisible] = useState(false);
  const [staffLoader, setstaffLoader] = useState(true);
  const [getInitialStaff, setInitialStaff] = useState(0);
  const { Option, OptGroup } = Select;
  const [staffListtt, setstaffListtt] = useState([]);
  const [reloadPage, setreloadPage] = useState(0);
  console.log('thisis the vlaue og the staffListtt', staffListtt);

  const { staffList, staffVisible, staffTimeList } = useSelector(
    (state) => state.Services
  );

  const { loading } = useSelector((state) => state.Staffs);

  useEffect(() => {
    setstaffLoader(false);
    store.dispatch({
      type: serviceActions.GET_VENDORSTAFF_LIST,
      id: getLocalData('id'),
      callBackAction: (response) => {
        setstaffLoader(true);
      },
    });
  }, [reloadPage, loading]);

  // useEffect(() => {
  //   // console.log("this is the stafff list of the updates staff");
  //   if (staffVisible && staffList.length == 0) {
  //     store.dispatch({
  //       type: serviceActions.GET_VENDORSTAFF_LIST,
  //       id: getLocalData("id"),
  //       callBackAction: (response) => {
  //         console.log("this is the stafff list of the updates staff", response);
  //       },
  //     });
  //   }
  //   if (staffList.length > 0) {
  //     /*store.dispatch({
  //       type: serviceActions.GET_VENDOR_STAFFTIME_LIST,
  //       vendorid: getLocalData('id'),
  //       staffid: staffList[0].id,
  //     });*/
  //   }
  // }, [staffList, staffVisible, staffTimeList, ]);

  const staffOpt = [];
  //staffList.length>0?setInitialStaff(25):setInitialStaff(0);
  var staffListcont =
    staffList.length > 0
      ? staffList.map((stafLst, k) => {
          staffOpt.push(
            <Option selected key={stafLst.id}>
              {stafLst.firstname}
            </Option>
          );
        })
      : '';

  //summa = staffList.length>0?setInitialStaff(staffList[0].id):0;
  //closed dates

  function callback(key) {}
  const dateFormat = 'DD/MM/YYYY';

  function handleChange(value) {}

  const handleChangeStaff = (selectedItems) => {
    //this.setState({ selectedItems });
    setInitialStaff(selectedItems);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      onFilter: (value, record) => record.firstname.indexOf(value) === 0,
      sorter: (a, b) => a.firstname.length - b.firstname.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      onFilter: (value, record) => record.lastname.indexOf(value) === 0,
      sorter: (a, b) => a.lastname.length - b.lastname.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Mobile Number',
      dataIndex: 'contactnumber',
      key: 'contactnumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Space size="middle">
          {record.status ? <a>Active </a> : <a>Inactive</a>}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        var text = text;
        return (
          <Space size="middle">
            {text.isnopref !== 1 ? (
            <DeleteOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                SweetAlert.sweetConfirmHandler(id, 'staff', 'DELETE_STAFF');
              }}
            />
            ) :(
              <></>
            )
            }
            {text.isnopref !== 1 ? (
            <EditOutlined
              id={record.id}
              onClick={(e) => {
                localStorage.setItem('staffData', JSON.stringify(text));
                let id = parseInt(record.id);
                onEdit(id);
              }}
            />
            ) :(
              <></>
            )
            }
          </Space>
        );
      },
    },
  ];
  const reLoadTheList = () => {
    setreloadPage(1);
    console.log('this is the value of the reload');
  };

  const onEdit = (id) => {
    props.history.push('/vendor/staff/update?id=' + id);
  };
  const Demo = () => (
    <div>
      <Row>
        <Col span={24}>
          <Card
            title={getLocaleMessages({ id: 'staff.title.label' })}
            extra={
              <Button
                type="primary"
                htmlType="create"
                onClick={() => setVisible(true)}
                className="save-btn"
              >
                Create
              </Button>
            }
          >
            <div>
              <Row>
                <Col span={24} className="inner-content">
                  {!staffLoader ? (
                    <Spin size="large">
                      <DataTable columns={columns} dataSource={staffList} />
                    </Spin>
                  ) : (
                    <DataTable columns={columns} dataSource={staffList} />
                  )}
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      {/* <Table /> */}
    </div>
  );
  return (
    <Row>
      <Col
        offset={0}
        xs={22}
        md={22}
        lg={22}
        className="dashboard-content mg-auto"
      >
        <Tabs
          defaultActiveKey="1"
          size="large"
          tabBarGutter={15}
          className="nav_tabs"
        >
          <TabPane tab="Staff" key="1">
            <div>
              <Demo />

              <CreateStaff
                modalVisible={visible}
                reLoadTheList={reLoadTheList}
                setModalVisible={setVisible}
              />
            </div>
          </TabPane>
          <TabPane tab="Staff Time" key="2">
            <StafTime prop={props} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
export default Staff;
