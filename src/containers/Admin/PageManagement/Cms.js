import React,  { useState } from 'react';
import { Row, Col, Input, Button, Table, Space, Select, Card, Modal } from 'antd';
import 'assets/css/dashboard.scss';
const { TextArea } = Input;

const { Option } = Select;
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
  },

];
const PageManagement = () => {
  function handleChange(value) {
  }
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Row>
        <Col span={2}></Col>
        <Col span={20} className="dashboard-content">
          <Card title="Page Management">
            <Row className="inner-title">
              <Col span={12} className="title">
                <h3>CMS</h3>
              </Col>
              <Col span={12} className="time">
                <Button
                  type="primary"
                  htmlType="create"
                  onClick={() => setVisible(true)}
                  className="save-btn"
                >
                  Create
                </Button>
              </Col>
            </Row>
            <div>
              <Row>
              <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
                  <Table dataSource={data}>
                    <ColumnGroup
                      title="#"
                      key="action"
                      render={(text, record) => <Space size="middle"></Space>}
                    ></ColumnGroup>
                    <ColumnGroup title="CMS Name"></ColumnGroup>
                    <Column title="Sort Order" />
                    <Column
                      title="CMS Status"
                      key="action"
                      render={(text, record) => (
                        <Select defaultValue="All" onChange={handleChange}>
                          <Option value="Android">All</Option>
                          <Option value="Android">Android</Option>
                          <Option value="Ios">Ios</Option>
                        </Select>
                      )}
                    />
                    <Column title="Action" />
                  </Table>
                  ,
                </Col>
              </Row>
            </div>
            <Modal
              title="Create CMS Page"
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={1000}
            >
              <Row className="modal-content">
                <Col span={12} className="inner-content">
                  <label>Page Title</label>
                  <Input placeholder="" autoSize />
                  <label>Metta Keyword</label>
                  <Input placeholder="" autoSize />
                  <label>Page Description</label>
                  <Input placeholder="" autoSize />

                  <label>Page Content</label>
                  <TextArea
                    placeholder=""
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Col>
                <Col span={12} className="inner-content">
                  <label>Metta Description</label>
                  <TextArea
                    placeholder=""
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                  <label>Fav Icon</label>
                  <Input placeholder="" autoSize />
                </Col>
              </Row>
            </Modal>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PageManagement;
