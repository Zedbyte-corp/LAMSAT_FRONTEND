import React, {useEffect,useState}from 'react';
import { Row, Col, Input, Button, Table, Space, Card, Switch, Spin } from 'antd';
import { EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import 'assets/css/dashboard.scss';
import { useSelector,useDispatch } from "react-redux";
import { store } from 'redux/store';
import actions from 'redux/admin/enquiryManagement/actions';
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { getLocaleMessages } from "redux/helper";

const { Column, ColumnGroup } = Table;

const EnquiryManagemengt = (props) =>{
   useEffect(() => {
      store.dispatch({
         type: actions.GET_ADMIN_ENQUIRY_LIST
      })
   },[])
    const {enquiryList} = useSelector((state) => state.Enquiry);
    const { loading } = useSelector((state) => state.Enquiry);

    const columns = [
      {
        title: 'Name',//getLocaleMessages({id: 'label.firstName'}),
        dataIndex: 'firstname',
        key: 'firstname',
        onFilter: (value, record) => record.firstname.indexOf(value) === 0,
        sorter: (a, b) => a.firstname.length - b.firstname.length,
        sortDirections: ['descend', 'ascend']
      },
      // {
      //   title: getLocaleMessages({id: 'staff.lastname.label'}),
      //   dataIndex: 'lastname',
      //   key: 'lastname',
      //   onFilter: (value, record) => record.lastname.indexOf(value) === 0,
      //   sorter: (a, b) => a.lastname.length - b.lastname.length,
      //   sortDirections: ['descend', 'ascend']
      // },
      {
        title: getLocaleMessages({id: 'staff.contact.label'}),
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: getLocaleMessages({id: 'staff.email.label'}),
        dataIndex: 'email',
        key: 'email'
      },
      {
         title: getLocaleMessages({id: 'common.message'}),
         dataIndex: 'message',
         key: 'message'
      },
      {
        title: getLocaleMessages({id: 'Status'}),
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
            <div className="delete">
              <DeleteOutlined
                name={text.id+'name'} id={text.id}
                onClick={() => {
                  let id = parseInt(text.id);
                  SweetAlert.sweetConfirmHandler(id,'enquiry','DELETE_ENQUIRY');
                }}
              />
            </div>
          </Space>
        )},
      },
    ];
    return (
      <div>
        <Row>
        <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
            <Card title="Enquiry">
              <Row>
                <Col span={24} className="inner-content">
                  <Spin size="large" spinning={loading}>
                    <DataTable columns={columns} dataSource={enquiryList}/>
                  </Spin>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default EnquiryManagemengt;