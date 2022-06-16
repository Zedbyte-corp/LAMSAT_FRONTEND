import React from 'react';
import { Row, Col, Card, PageHeader, Button, Table } from 'antd';
import 'assets/css/dashboard.scss';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Price',
      key: 'tags',
      dataIndex: 'tags',

    },

  ];

const data = [
    {
      key: '1',
      name: 'Blow Try',
      address: 'New York No. 1 Lake Park',
      tags: ['50.0', 'SAR'],
    },

  ];
const setup = () =>{
    return(
      <div>
      <Row>
  <Col className="dashboard-content mg-auto vendor">
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        title="Services"
        extra={[
          <Button key="2" className="export-btn">
            Export
          </Button>,
          <Button key="1" type="primary" className="save-btn">
            Add New
          </Button>,
        ]}
      ></PageHeader>
    </div>
    <Card title="Hair">
      <Table columns={columns} dataSource={data} />
    </Card>
  </Col>
</Row>
      </div>
    )
}

export default setup;