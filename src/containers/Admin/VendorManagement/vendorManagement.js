import React, { useState } from 'react';
import { Row, Col, Input, Button, Table, Space, Select, Card } from 'antd';
import 'assets/css/dashboard.scss';
import { DeleteOutlined, EditOutlined  } from "@ant-design/icons";
import CreateVendor from "./CreateVendor";

const { Option } = Select;
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
  },

];

const App = () =>{

   const [visible, setVisible] = useState(false);

  function handleChange(value) {
  }

    return <div>
       <Row>
       <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
<Card title="Create Vendor">
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
               render={(text, record) =>
               (
               <Space size="middle">
               </Space>
               )}
               >
            </ColumnGroup>
            <ColumnGroup title="Saloon Name"
               key="action"
               render={(text, record) =>
               (
               <Space size="middle">
                  <Input placeholder="" autoSize />
               </Space>
               )}

               >
            </ColumnGroup>
            <Column title="Saloon Email"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )} />
            <Column title="Vendor Contact No"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )} />
            <Column title="City"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
            <Column
               title="Area"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
            <Column
               title="Vendor Status"
               key="action"
               render={(text, record) =>
            (
            <Select defaultValue="All" onChange={handleChange}>
               <Option value="Android">All</Option>
               <Option value="Android">Android</Option>
               <Option value="Ios">Ios</Option>
            </Select>
            )}
            />
            <Column
               title="Service Location"
               render={(text, record) =>
            (
            <Select defaultValue="Saloon" onChange={handleChange}>
               <Option value="Saloon">Android</Option>
               <Option value="Android">Android</Option>
               <Option value="Ios">Ios</Option>
            </Select>
            )}
            />
            <Column
               title="Create Date"
               />
            <Column
               title="Action"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
                <div className="edit">
                <EditOutlined />
                </div>
                <div className="delete">
                <DeleteOutlined />
                </div>
            </Space>
            )}
               />
         </Table>
         </Col>
      </Row>
   </div>
   <CreateVendor modalVisible={visible} setModalVisible={setVisible} />
</Card>
     </Col>
     </Row>
     </div>
}

export default App;