import React from 'react';
import { Modal, Form, Input, Checkbox, Button} from 'antd';
import { FacebookFilled, GoogleOutlined   } from '@ant-design/icons';
import { getLocaleMessages } from 'redux/helper';
import { NavLink } from "react-router-dom";


// const { Option } = Select;

const signupModal = (props) =>{
    const { visible, onFinish, onCancel, LoginSignup, loader } = props;
    return (
        <Modal
          footer={false}
          title={false}
          className="modal-ui-1"
          width="100%"
          visible={visible}
          onCancel={onCancel}
          destroyOnClose
        >
      <div className="modal-body-ui">
        <h2>Sign up</h2>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          initialValues={{
            mobile_number:{
              countrycode: '+966'
            }
          }}
        >
          <Form.Item
            name="firstname"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input placeholder={getLocaleMessages({ id: 'placeholder.firstName' })} />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input placeholder={getLocaleMessages({ id: 'placeholder.lastName' })} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your Email!",
              },
              {
                type: 'email',
                whitespace: true,
                message: 'Invalid email'
              }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="mobile_number"
          >
            <Input.Group compact>
              <Form.Item
                name={['mobile_number', 'countrycode']}
                noStyle
              >
                <Input style={{ width: '35%'}} readOnly={true} addonBefore={<img src={require('assets/img/sa_flag_lamsat.png')} width="20px" alt={'logo'}/>} />
              </Form.Item>
              <Form.Item
                noStyle
                name={['mobile_number', 'contactnumber']}
                rules={[{ required: true, message: 'Number is required' }]}
              >
                <Input
                  style={{ width: '65%' }}
                  placeholder="Phone Number"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          {/* <Form.Item
            name={'countryid'}
            rules={[{  required: true, message: 'Country is required' }]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              autoComplete={'off'}
              placeholder={'please select any country'}
              dropdownStyle={{minWidth: '200px'}}
            >
              <Option value={1}>{'please select any country'}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={'cityid'}
            rules={[{ required: true,message: 'City is required' }]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              autoComplete={'off'}
              placeholder={'please select any city'}
              dropdownStyle={{minWidth: '200px'}}
            >
              <Option value={1}>{'please select any city'}</Option>
            </Select>
          </Form.Item> */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input your Password!",
              },
              	{
				  min: 6,
				  message: 'Password must be minimum 6 characters.'
				},
				{
				  max: 16,
				  message: 'Password can be maximum 16 characters.'
				},
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            validateTrigger={['onSubmit']}
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Accept the condition'),
              },
            ]}
          >
            <Checkbox>I Agree
              <a className="login-form-forgot" href="">
                Terms and Conditions
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loader}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <span className="or">(OR)</span>
        <div className="contactsocial">
            <span className="btns"><FacebookFilled /></span>
            <span className="btns"><GoogleOutlined /></span>
        </div>
        <p className="new">Already have an account? <span onClick={()=> loader ? '':LoginSignup({signup:false,login:true})}>Sign in</span> </p>
        <div className="become-partner">
        <h2>Become a partner</h2>
        <p className="new">Manage your business with Lamsat by <NavLink to={'/partner-register'}><span> signing up as a professional</span> </NavLink></p>
        </div>
        </div>
      </Modal>

    )
}

export default signupModal;