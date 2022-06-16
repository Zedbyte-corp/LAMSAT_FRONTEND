import React, { useState } from 'react';
import { Row, Col, Card, PageHeader, Button, Calendar, Select, Modal } from 'antd';
import 'assets/css/dashboard.scss';

const { Option, OptGroup } = Select;

function handleChange(value) {

}

function onPanelChange(value, mode) {


}


const App = () =>{
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return(

      <div>
        <Row>
                 <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto vendor">
                 <div className="site-page-header-ghost-wrapper">
               <PageHeader title="Calendar "
                extra={[<Select defaultValue="lucy" className="right-select" onChange={handleChange}>
                <OptGroup label="Manager">
                  <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    </OptGroup>
                 </Select>, <Button key="1" type="primary" className="save-btn" onClick={showModal}> Add New </Button>, ]}>
             </PageHeader>
             </div>
            <Card>
            <Calendar onPanelChange={onPanelChange} />
            </Card>
         </Col>
        </Row>

        <>

      <Modal title="Create Calender" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  width={12000} classNAme="create-calender">

      <Select defaultValue="Choose Date" className="right-select" onChange={handleChange}>
      <OptGroup>
      <Option value="jack">Jack</Option>
       <Option value="lucy">Lucy</Option>
        </OptGroup>
        </Select>
     <div className="site-card-border-less-wrapper">
       <Row>
     <Col xs={11} md={11} lg={11}>

    <Card bordered={false} className="card-calender">
    <Row>
    <Col xs={4} md={4} lg={4} className="c-c-inner-1">

      <label>Start Time</label>
    <Select defaultValue="Choose Date" className="right-select" onChange={handleChange}>
      <OptGroup>
      <Option value="jack">Jack</Option>
       <Option value="lucy">Lucy</Option>
        </OptGroup>
        </Select>
        <label>Duration</label>
        <Select defaultValue="Choose Date" className="right-select" onChange={handleChange}>
      <OptGroup>
      <Option value="jack">Jack</Option>
       <Option value="lucy">Lucy</Option>
        </OptGroup>
        </Select>
    </Col>
    <Col  xs={10} md={10} lg={10} className="c-c-inner-2">
    <label>Service</label>
    <Select defaultValue="Choose Date" className="right-select" onChange={handleChange}>
      <OptGroup>
      <Option value="jack">Jack</Option>
       <Option value="lucy">Lucy</Option>
        </OptGroup>
        </Select>
        <label>Staff</label>
        <Select defaultValue="Choose Date" className="right-select" onChange={handleChange}>
      <OptGroup>
      <Option value="jack">Jack</Option>
       <Option value="lucy">Lucy</Option>
        </OptGroup>
        </Select>

    </Col>
    </Row>
    </Card>

    </Col>
    <Col xs={11} md={11} lg={11}>
      </Col>

    </Row>


  </div>

      </Modal>
    </>

      </div>
    )
}


export default App;