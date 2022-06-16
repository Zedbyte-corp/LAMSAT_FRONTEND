import React, { useState, useEffect, useRef } from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip, Row, Col, Input, Table, Card, Spin } from 'antd';
import { DownOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getLocaleMessages, getLocalData } from 'redux/helper';
import { useSelector, useDispatch } from 'react-redux';
import 'assets/css/dashboard.scss';
import CreateCategory from './CreateCategory';
import CreateService from '../Services/CreateService';
import UpdateCategory from './UpdateCategory';
import actions from 'redux/vendor/Services/actions';
import { store } from 'redux/store';
import swal from 'sweetalert';
import DataTable from 'helpers/datatable';
import SweetAlert from 'helpers/sweetalert';
import adminActions from 'redux/admin/Administrator/actions';

const { Column, ColumnGroup } = Table;

const CategoryManagement = (props) => {
  const dropdownRef = useRef(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showService, setShowService] = useState(false);

  const [updateVisible, setUpdateVisible] = useState(false);
  const [categoryObj, setCategoryObj] = useState({});
  const [categoryId, setCategoryId] = useState();
  const { categoryList } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { stop } = useSelector((state) => state.Services);

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    store.dispatch({
      type: actions.GET_CATEGORY_LISTDATA_VENDOR,
      vendorid: getLocalData('id'),
    });
    if (categoryId) {

    }
  }, [props, categoryId]);

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryname',
      key: 'categoryname',
      onFilter: (value, record) => record.categoryname.indexOf(value) === 0,
      sorter: (a, b) => a.categoryname.length - b.categoryname.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Space size="middle">
          {record.status ? <a>active </a> : <a>Inactive</a>}
        </Space>
      ),
    },
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        var text = text;
        if (record.permission == 'Pending') {
          return (
            <Space size="middle">
              <div className="edit">
                <EditOutlined
                  name={text.id + 'name'}
                  id={text.id}
                  onClick={() => {
                    localStorage.setItem('categoryData', JSON.stringify(text));
                    props.history.push({
                      pathname: '/vendor/Category/update',
                    });
                  }}
                />
              </div>
              <div className="delete">
                <DeleteOutlined
                  name={text.id + 'name'}
                  id={text.id}
                  onClick={() => {
                    let id = parseInt(text.id);

                    SweetAlert.sweetConfirmHandler(
                      id,
                      'service',
                      'DELETE_VENDORCREATED_CATEGORY'
                    );
                  }}
                />
              </div>
            </Space>
          );
        }
      },
    },
  ];
  const btnClick = (id) => {

    if (parseInt(categoryId) === id) {
      props.history.push({
        pathname: '/admin/Category/update',
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="cat" onClick={() => setShowCategory(true)} icon={<UserOutlined />}>
        New Category
      </Menu.Item>
      <Menu.Item key="ser" onClick={() => setShowService(true)} icon={<UserOutlined />}>
        New Service
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Row>
        <Col span={24} className="dashboard-content">
          <Card
            title={getLocaleMessages({ id: 'category.title' })}
            extra={
              <>
                <Dropdown overlay={menu}>
                  <Button
                    type="primary"
                    htmlType="create"
                    className="save-btn"
                  >
                    Create <DownOutlined />
                  </Button>
                </Dropdown>
              </>
            }
          >
            <Spin size="large" spinning={loading}>
              <DataTable columns={columns} dataSource={categoryList} />
            </Spin>

            <CreateCategory
              modalVisible={showCategory}
              setModalVisible={setShowCategory}
            />

            <CreateService
              modalVisible={showService}
              setModalVisible={setShowService}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryManagement;
