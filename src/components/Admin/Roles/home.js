// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  message,
  Space,
  Select,
  InputNumber,
  Checkbox,
  Radio,
  Table,
  Row,
  Col,
  Spin,
} from 'antd';
import { getLocaleMessages } from 'redux/helper';
//import Hoom from 'helpers/hoom';
import Actions from 'redux/admin/RolesManagement/actions';

import { SearchOutlined } from '@ant-design/icons';
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SweetAlert from 'helpers/sweetalert';
import DataTable from 'helpers/datatable';

const Home = (props) => {
  const { selectedRowKeys, searchedColumn, fromPageNo } = useSelector(
    (state) => state.Administrator
  );
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();

  const { isRolesProfile, rolesassignedData,deleteRoleloader } = useSelector(
    (state) => state.Roles
  );
  useEffect(() => {
    if (isRolesProfile) {
      dispatch({
        type: Actions.GET_ASSIGNED_ROLES,
      });
    }
  }, [rolesassignedData]);

  rolesassignedData &&
    rolesassignedData.length > 0 &&
    rolesassignedData.map((list, id) => {
      list.statusvalue = list.status == 1 ? 'Active' : 'inActive';
      return list;
    });
  const columns = [
    {
      title: 'rolename',
      dataIndex: 'rolename',
      Flter: true,
      onFilter: (value, record) => record.rolename.indexOf(value) === 0,
      sorter: (a, b) => a.rolename.length - b.rolename.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'statusvalue',
      sorter: (a, b) => a.statusvalue.length - b.statusvalue.length,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'Action',
      dataIndex: 'username',
      key: 'x',
      render: (text, record) => {
        var record = record;
        return (
          <Space size="middle">
            <DeleteOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                //SweetAlert.sweetConfirmHandler(id, 'Roles', 'DELETE_ROLE');
                dispatch({
                  type: Actions.DELETE_ROLE,
                  payload: {
                    id: id
                  }
                });
              }}
            />
            <EditOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                onEdit(id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const onEdit = (id) => {
    props.history.push('/admin/roles/update?id=' + id);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: Actions.ASSIGN_SERCHED_DATA,
      value: selectedKeys[0],
      value1: dataIndex,
    });
  };

  const movetopage = () => {
    props.history.push('/admin/roles/create');
  };
  return (
    <div>
      <Row>
        <Col
          offset={0}
          xs={24}
          md={24}
          lg={24}
          className="dashboard-content mg-auto"
        >
          <Card
            title={getLocaleMessages({ id: 'Roles' })}
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
            <div>
              <Row>
                <Col span={24} className="inner-content">
                  {/* <Table columns={columns} dataSource={categoryList} /> */}
                  <Spin spinning={deleteRoleloader}>
                    <DataTable columns={columns} dataSource={rolesassignedData} />
                  </Spin>      
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
