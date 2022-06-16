import React from 'react';
import { Row, Col, Input, Button, Table, Space, Select, Card } from 'antd';
import 'assets/css/dashboard.scss';
import { DeleteOutlined  } from "@ant-design/icons";
// import { Button } from 'antd';

const { Column, ColumnGroup } = Table;
const { Option } = Select;
const data = [
  {
    key: '1',
  },

];

const Roles = () =>{
    function handleChange(value) {

    }
    return <div>

        <Row>
        <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
    <Card title="Administrator Management">
   <div>
      <Row>
         <Col span={22}>
            <Button type="primary" htmlType="create" className="save-btn">
            Create-1111
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
            <ColumnGroup title="Role Name"
               key="action"
               render={(text, record) =>
               (
               <Space size="middle">
                  <Input placeholder="" autoSize />
               </Space>
               )}

               >
            </ColumnGroup>
            <Column title="First Name"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )} />
            <Column title="Last Name"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )} />
            <Column title="User Name"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
            <Column
               title="User Type"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
             <Column
               title="Email ID"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
              <Column
               title="Password"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
              <Column
               title="Conform Password"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
            <Column
               title="Secret Password"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
               <Input placeholder="" autoSize />
            </Space>
            )}
            />
            <Column
               title="Status"
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
               title="Action"
               key="action"
               render={(text, record) =>
            (
            <Space size="middle">
                <div className="delete">
                <DeleteOutlined />
                </div>
            </Space>
            )}


               />

         </Table>
         ,
         </Col>
      </Row>
   </div>
</Card>
</Col>
</Row>
     </div>
}

export default Roles;