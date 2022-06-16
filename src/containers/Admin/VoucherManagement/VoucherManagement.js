import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Table, Space, Card, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'assets/css/dashboard.scss';
// import { Button } from 'antd';
import CreateVoucherModal from './CreateVoucherModal';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/vendor/Voucher/actions';
import { store } from 'redux/store';
import DataTable from 'helpers/datatable';
import SweetAlert from 'helpers/sweetalert';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
  },
];

const VoucherManagement = (props) => {
  const [visible, setVisible] = useState(false);
  const { voucherList } = useSelector((state) => state.VendorVoucher);
  const { loading } = useSelector((state) => state.VendorVoucher);

  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_VOUCHER_LIST,
    });
  }, []);

  const columns = [
    {
      title: 'Voucher  Name',
      dataIndex: 'vouchername',
      key: 'vouchername',
      onFilter: (value, record) => record.vouchername.indexOf(value) === 0,
      sorter: (a, b) => a.vouchername.length - b.vouchername.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Voucher Code',
      dataIndex: 'vouchercode',
      key: 'vouchercode',
    },
    {
      title: 'Value',
      dataIndex: 'vouchervalue',
      key: 'vouchervaluevouchervalue',
      render: (text, record) => {
        if(record.vouchertype === 2) {
          return (<Space size="middle">
              {`${record.vouchervalue} %`} 
              </Space>)
        } else {
          return (
            <Space size="middle">
               {`${record.vouchervalue} SAR`}
            </Space>
          )
        }
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            <div className="edit">
              <EditOutlined
                name={text.id + 'name'}
                id={text.id}
                onClick={() => {
                  localStorage.setItem('voucherData', JSON.stringify(text));
                  props.history.push({
                    pathname: '/admin/VoucherManagement/update',
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
                    'voucher',
                    'DELETE_VOUCHER'
                  );
                }}
              />
            </div>
          </Space>
        );
      },
    },
  ];

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
          <Card title="Voucher"
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
            <Spin size="large" spinning={loading}>
              <DataTable columns={columns} dataSource={voucherList} />
            </Spin>

            <CreateVoucherModal
              modalVisible={visible}
              setModalVisible={setVisible}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VoucherManagement;
