import React, { useState } from 'react';
import { Row, Col, Input, Button, Table, Space, Card } from 'antd';
import 'assets/css/dashboard.scss';
import CreatePackage from "./CreatePackage";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
  },

];

const ServiceManagement = () =>{
    const [visible, setVisible] = useState(false);

    return <div>
        <Row>
        <Col span={24} className="dashboard-content">
        <Card title="Service Management">
          <div>
          <Row>
         <Col span={22}  className="inner-content">
            <Button type="primary" htmlType="create" onClick={()=> setVisible(true)} className="save-btn">
            Create
            </Button>
         </Col>
      </Row>
     <Row>
      <Col span={24}  className="inner-content">
  <Table dataSource={data}>
  <ColumnGroup title="#"
    key="action"
    render={(text, record) => (
      <Space size="middle">

      </Space>
    )}
    >
  </ColumnGroup>


    <ColumnGroup title="Service Categories"
    key="action"
    render={(text, record) => (
      <Space size="middle">
        <Input placeholder="" autoSize />
      </Space>
    )}
    >

    </ColumnGroup>
    <Column title="Service Sub-Categories"
    key="action"
    render={(text, record) => (
      <Space size="middle">
        <Input placeholder="" autoSize />
      </Space>
    )} />
    <Column title="Manage Service"
    key="action"
    render={(text, record) => (
      <Space size="middle">
        <Input placeholder="" autoSize />
      </Space>
    )} />
    <Column title="Service Location Type Charge"
    key="action"
    render={(text, record) => (
      <Space size="middle">
        <Input placeholder="" autoSize />
      </Space>
    )}
      />

     <Column
      title="Action"

    />

  </Table>,
</Col>
     </Row>

     </div>
     <CreatePackage modalVisible={visible} setModalVisible={setVisible} />
     </Card>
     </Col>
     </Row>
     </div>
}

export default ServiceManagement;