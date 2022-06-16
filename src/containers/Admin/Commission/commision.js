// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Input, Button, Select, Row, Col, Spin } from 'antd';
import { getLocaleMessages } from 'redux/helper';
//import Hoom from 'helpers/hoom';
import Actions from "redux/admin/Commission/actions";
import 'assets/css/dashboard.scss';

const Commission = (props) => {
  const dispatch = useDispatch();
  const { commissionData,commissionLoader } = useSelector(
    (state) => state.Commission,
  );  
  const [UpdateForm] = Form.useForm();  
  const optvalu=[
    {label: "Percentage",value: 1},
    {label: "Amount",value: 2}
  ];

  useEffect(()=>{
    dispatch({
        type:Actions.GET_COMMISSION_LIST,
        payload: false
    });
  },[])

  useEffect(()=>{
    if(commissionData.length>0){
        UpdateForm.setFieldsValue({
               commission: commissionData[0].commision,
               commissiontype: commissionData[0].commisiontype
        })
    }
  },[commissionData])  

  const handleChange = (value) => {
    UpdateForm.setFieldsValue({ commissiontype: value });
  };
  
  const onFinishCommission = (values) => {
    if(values){  
        if(commissionData.length>0)
        {
            var cdata = {
                commissiontype: values.commissiontype,
                commission: values.commission,
                id: commissionData[0].id
            }
            dispatch({
            type: Actions.NEW_COMMISSION,
            payload: cdata,
            });     
        } else {
            var cdata = {
                commissiontype: values.commissiontype,
                commission: values.commission
            }
            dispatch({
                type: Actions.NEW_COMMISSION,
                payload: cdata,
            });
        }
    }
  };  

return (
    <Row>
      <Col
        offset={0}
        xs={22}
        md={22}
        lg={22}
        className="dashboard-content mg-auto smsize"
      >
        <h2 className="dash_title">Commission</h2>
        <div className="dashboard-content">
          <Card>
            <div className="dashboard-form s-center"> 
            <Spin size="large" spinning={commissionLoader}>  
              <Form
                name="basic"
                form={UpdateForm}
                layout="vertical"
                onFinish={onFinishCommission}
              >
                <Row className="center-row" gutter="30">
                  <Col span={24} className="inner-content">
                    <Form.Item
                      label={'Commission Type'}
                      name={'commissiontype'}
                      rules={[
                        {
                          required: true,
                          message: 'please select commissiontype!',
                        },
                      ]}
                    >
                    <Select options={optvalu} onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  </Row>
                  <Row className="center-row" gutter="30">
                  <Col span={24} className="inner-content">
                    <Form.Item
                      label={'Amount'}
                      name={'commission'}
                      rules={[
                        {
                          required: true,
                          message: 'Fields are requireds',
                        },
                      ]}
                    >
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <div className="button-center">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="save-btn"
                    >
                      Save
                    </Button>
                  </div>
                </Form.Item>
              </Form>
              </Spin>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
)
}

export default Commission;







