import React, { useState, useEffect } from "react";
import { Row, Col, Card, PageHeader, Button, DatePicker, Select, Table, Tabs, Spin, Space} from 'antd';
import 'assets/css/dashboard.scss';
import moment from 'moment';
import { EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import actions from "redux/vendor/Staff/actions";
import TimeData from "./Time";
import { useSelector,useDispatch } from "react-redux";
import { getLocaleMessages , getLocalData} from "redux/helper";
import settingActions from "redux/Settings/actions";
import serviceActions from "redux/vendor/Services/actions";
import { store } from 'redux/store';
import SweetAlert from "helpers/sweetalert";
import DataTable from "helpers/datatable";


const Timeslot = (props) => {
  const [visible, setVisible] = useState(false);
  const [getInitialStaff, setInitialStaff] = useState(0);
  const { Option, OptGroup } = Select;



  const { staffList, loading, staffVisible, staffTimeList } = useSelector((state) => state.Services);
  useEffect(() => {
    if(staffVisible && staffList.length==0){
    store.dispatch({
      type:serviceActions.GET_VENDORSTAFF_LIST,
      id: getLocalData('id')
    });
  }
  if( staffList.length>0){
    store.dispatch({
      type:serviceActions.GET_VENDOR_STAFFTIME_LIST,
      vendorid: getLocalData('id'),
      staffid : staffList[0].id
    });
  }
  },[staffList, staffVisible,loading , staffTimeList]);

  /*useEffect(() => {
    if(!staffVisible && staffList.length>0){
    store.dispatch({
      type:serviceActions.GET_VENDOR_STAFFTIME_LIST,
      vendorid: getLocalData('id'),
      staffid : staffList[0].id
    });
  }
  },[staffTimeList]);*/


    const staffOpt = [];
    //staffList.length>0?setInitialStaff(25):setInitialStaff(0);
    var staffListcont = staffList.length>0?staffList.map((stafLst , k ) => {
        staffOpt.push(<Option selected key={stafLst.id}>{stafLst.firstname}</Option>);
    }):''

    //summa = staffList.length>0?setInitialStaff(staffList[0].id):0;
//closed dates

const { TabPane } = Tabs;
function callback(key) {

}
const dateFormat = 'DD/MM/YYYY';

function handleChange(value) {

}


const handleChangeStaff = selectedItems => {
    //this.setState({ selectedItems });
    setInitialStaff(selectedItems)
  }

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
    onFilter: (value, record) => record.firstname.indexOf(value) === 0,
    sorter: (a, b) => a.firstname.length - b.firstname.length,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Contact Number',
    dataIndex: 'contactnumber',
    key: 'contactnumber'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <Space size="middle">
        {record.status ? <a>Active </a>:<a>Inactive</a> }
      </Space>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      var text = text;
      return (
        <Space size="middle">
          <DeleteOutlined id={record.id} onClick={(e) => {
            let id = parseInt(record.id);
            SweetAlert.sweetConfirmHandler(id,'staff','DELETE_STAFF');
          }}/>
          <EditOutlined id={record.id} onClick={(e) => {

            localStorage.setItem('staffData',JSON.stringify(text));
            let id = parseInt(record.id);
            onEdit(id);
          }} />
        </Space>
    )},
  },
];

const onEdit = (id) =>{
  props.history.push('/vendor/staff/update?id='+id);
}

  return (
    <div>
      <Row>
        <Col xsOffset={3} xs={22} md={22} lg={22} className="dashboard-content mg-auto vendor">
        <PageHeader
              title="Hours Mngt"
            >

            <TimeData/>
            </PageHeader>
          <Card>
          <Demo />
          </Card>
        </Col>
      </Row>

    </div>
  );
};
export default Timeslot;