// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Tabs, Form, Input, Button, message, Space, Select, InputNumber, Checkbox, Radio, Table, Spin } from 'antd';
import { getLocaleMessages } from 'redux/helper';
//import Hoom from 'helpers/hoom'; 
import Actions from 'redux/admin/PageContent/actions';
import 'assets/css/dashboard.scss';
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';
const Home = (props) => {
  const { cmsLists,isPagemanagement,submitLoader } = useSelector((state) => state.PageContent);
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();

useEffect(() => {   
  if(isPagemanagement){ 
  dispatch({
      type: Actions.GET_CMS_LIST
  })
  }
},[cmsLists])


cmsLists && cmsLists.length > 0 && cmsLists.map((list, id) => {
  list.statusvalue = list.status == 1 ? 'Active' : 'inActive';
  list.language && list.language.length > 0 && list.language.map((lt, i) => {
    list.pagetitle = lt.pagetitle;
  })
  return list;
})
  const columns = [

    {
      title: 'pagetitle',
      dataIndex: 'pagetitle',
      Flter:true,
      onFilter: (value, record) => record.pagetitle.indexOf(value) === 0,
      sorter: (a, b) => a.pagetitle.length - b.pagetitle.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'statusvalue',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.statusvalue.length - b.statusvalue.length,
    },

  {
    title: 'Action', dataIndex: 'pagetitle', key: 'x',    
    render: (text, record) => {
      var record = record;
      return (
      <Space size="middle">
        <DeleteOutlined id={record.id} onClick={(e) => {
          let id = parseInt(record.id);
          SweetAlert.sweetConfirmHandler(id,'PageContent','DELETE_CMS');
        }}/>
        <EditOutlined id={record.id} onClick={(e) => {
          let id = parseInt(record.id);
          onEdit(id);
        }} />
      </Space>
    )},
  },
  /*  {
      title: 'Action', dataIndex: 'pagetitle', key: 'x',
      
      render: (text, record) => {
        let id1= '';
        var record = record;
        return (
        <Space size="middle">
          <button id={record.id} onClick={(e) => {
            let id = parseInt(e.target.id);
            id1 = parseInt(e.target.id);
            SweetAlert.sweetConfirmHandler(id,'PageContent','DELETE_CMS');
          }}>Delete</button>


          <button id={record.id} onClick={(e) => {
            let id = parseInt(e.target.id);
            onEdit(id);
          }}>Edit</button>
        </Space>
      )},
    },*/

  ];
  
  const dataArr = [];
    


  const onEdit = (id) =>{ 
    props.history.push('/admin/cms/update?id='+id);
  }
  const movetopage = () =>{ 
    props.history.push('/admin/cms/create');
  }
  return (
    <div>
      <Row>
        <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
          <Card title={getLocaleMessages({ id: 'CMS' })}
                  extra={
                    <Button type="primary" htmlType="submit" onClick={movetopage} className="save-btn" >
                      Create
                    </Button>
                  }
               >
            <div>
              <Spin spinning={submitLoader} size="large">
                <DataTable columns={columns} dataSource={cmsLists} />
              </Spin>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Home;
 






