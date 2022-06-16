import React from 'react';
import { Row, Col, Card, PageHeader, Statistic, Button, DatePicker, Tabs} from 'antd';
import moment from 'moment';
import 'assets/css/dashboard.scss';

const { TabPane } = Tabs;

function callback(key) {

  }
  const dateFormat = 'DD/MM/YYYY'
const staff = () => {

  const Demo = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Dashboard" key="3">
      <div className="site-page-header-ghost-wrapper staf-head">
            <PageHeader
              extra={[
                <DatePicker key="date-picker" defaultValue={moment('02/01/2021', dateFormat)} format={dateFormat} />,
                <Button key="1" type="primary" className="save-btn">
                   New Staf
                </Button>
              ]}
            >
            </PageHeader>
            <Row className="analytics-dashboard">
              <Col span={8}>
                <Card >
                  <h2>Total Booking</h2>
                  <Statistic value={35} />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card >
                  <h2>Online Appoinments</h2>
                  <Statistic value={35} />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card >
                  <h2>Occupancy</h2>
                  <Statistic value={5} />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h2>Total Sales</h2>
                  <Statistic value={100} title="SAR" />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h2>Average Sale</h2>
                  <Statistic value={35 }  title="SAR" />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h2>Client Retentation(Sales)</h2>
                  <Statistic value={5} title="SAR"/>
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
              </Col>
            </Row>
            <Row>
            <Col span={24}>
                <Card title="Total Appointments">
                <p>line char appear here</p>
                </Card>
                </Col>
            </Row>
            <Row>
            <Col span={24}>
                <Card title="Total Sales">
                <p>line char appear here</p>
                </Card>
                </Col>
            </Row>
          </div>
      </TabPane>
      <TabPane tab="Reports" key="4">

      <Row className="analytics-dashboard">
      <Row>
      <Col flex={3}> <Card >
                  <h2>Total Booking</h2>
                  <Statistic value={35} />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card></Col>
      <Col flex={3}><Row>
                <Col span={10}>
                       <Card >
                  <h2>Total Booking</h2>
                  <Statistic value={35} />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
                </Col>
                <Col span={10}>
                       <Card >
                  <h2>Total Booking</h2>
                  <Statistic value={35} />
                  <p> -2 Previous Day </p>
                  <p> Completed (10.0% ) </p>
                  <p> Most Completed (10.0% ) </p>
                  <p> Not Completed ( 8% ) </p>
                  <p> Canceled (1.0% ) </p>
                  <p> Not Show (0%) </p>
                </Card>
                </Col>
               </Row></Col>
    </Row>

      </Row>
      </TabPane>
    </Tabs>
  );
  return (
    <div>
      <Row>
        <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto vendor">
        <PageHeader
              title="Analytics"
            ></PageHeader>
          <Card>
           <Demo />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default staff;