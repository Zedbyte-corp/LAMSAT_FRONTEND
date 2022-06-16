import React from 'react';
import { Row, Col, Card, PageHeader, Input, Button, Select, Table} from 'antd';
import 'assets/css/dashboard.scss';

const { Option, OptGroup } = Select;
const { Search } = Input;

function handleChange(value) {

}
const onSearch = (value) => {};

const clients = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      number: 987654321,
      email: "demo@gmail.com",
      gender: ["Male"],
    },
  ];

  return (
    <div>
      <Row>
        <Col offset={0} xs={18} className="dashboard-content mg-auto vendor">
          <div className="site-page-header-ghost-wrapper">
            <PageHeader
              title="Clients "
              extra={[
                <Search
                  onSearch={onSearch}
                  placeholder="Search by name,e-mail or mobile number"
                  className="search-box-client"
                />,
                <Select
                  defaultValue="lucy"
                  onChange={handleChange}
                  className="right-select"
                >
                  <OptGroup>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                  </OptGroup>
                </Select>,
                <Button key="1" type="primary" className="save-btn">
                  Add New
                </Button>,
              ]}
            ></PageHeader>
          </div>
          <Card>
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default clients;