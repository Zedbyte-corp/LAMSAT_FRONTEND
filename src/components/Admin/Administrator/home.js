// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Space } from 'antd';
import { getLocaleMessages } from 'redux/helper';
//import Hoom from 'helpers/hoom';
import Actions from 'redux/admin/Administrator/actions';

import SweetAlert from 'helpers/sweetalert';
import DataTable from 'helpers/datatable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'assets/css/dashboard.scss';
const Home = (props) => {
  const { AdministratorassignedData, isAdministratorProfile } = useSelector(
    (state) => state.Administrator
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdministratorProfile) {
      dispatch({
        type: Actions.GET_ASSIGNED_ADMINISTRATOR,
      });
    }
  }, [AdministratorassignedData]);

  AdministratorassignedData &&
    AdministratorassignedData.length > 0 &&
    AdministratorassignedData.map((list, id) => {
      list.statusvalue = list.status == 1 ? 'Active' : 'inActive';
      return list;
    });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      Flter: true,
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'Status',
      dataIndex: 'statusvalue',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: 'Action',
      dataIndex: 'username',
      key: 'x',
      render: (text, record) => {
        var record = record;
        return (
          <Space size="middle">
            <div className="edit">
              <DeleteOutlined
                id={record.id}
                onClick={(e) => {
                  let id = parseInt(record.id);
                  SweetAlert.sweetConfirmHandler(
                    id,
                    'Administrator',
                    'DELETE_ADMINISTRATOR'
                  );
                }}
              />
            </div>

            <div className="delete">
              <EditOutlined
                id={record.id}
                onClick={(e) => {
                  let id = parseInt(record.id);
                  onEdit(id);
                }}
              />
            </div>
          </Space>
        );
      },
    },
  ];

  const onEdit = (id) => {
    props.history.push('/admin/administrator/update?id=' + id);
  };

  const movetopage = () => {
    props.history.push('/admin/administrator/create');
  };
  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={22}
          md={22}
          lg={22}
          className="dashboard-content mg-auto"
        >
          <Card
            title={getLocaleMessages({ id: 'Administrator' })}
            extra={
              <Button
                type="primary"
                htmlType="create"
                onClick={movetopage}
                className="save-btn"
              >
                Create
              </Button>
            }
          >
            <DataTable
              columns={columns}
              dataSource={AdministratorassignedData}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
