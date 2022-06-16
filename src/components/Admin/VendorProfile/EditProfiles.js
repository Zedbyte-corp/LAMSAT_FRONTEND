
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'assets/css/dashboard.scss';
import React, { useState, useEffect } from 'react';
//import ImageUpload from 'components/Shared/ImageUpload';
import { Card, Tabs, Form, Input, Button, message, Col } from 'antd';
import { getLocalData, getLocaleMessages } from 'redux/helper';
import { formProps } from 'containers/OnBoarding/constant';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'redux/auth/actions';
import userDetailActions from "redux/UserDetail/actions";
import { store } from 'redux/store';

const { TabPane } = Tabs;

const Profileupdate = () => {

    const { 
        getAppLanguageList ,
      } = useSelector(state=>state.Auth);

  //const { vendorLanguange, vendorProfileLoader, isVendorProfile } = useSelector(state=>state.Auth);

  // let getLanguageDetails = getLocalData('language');
  const [getLanguageIndex, setLangauageindex] = useState(0);
  const [vendorLanguageShortName, setVendorLanguageShortName] = useState(null);
  const dispatch = useDispatch(); 
  const [usedForm] = Form.useForm();
  const { profileLoader } = useSelector((state) => state.Auth);
  const [profileUsedForm] = Form.useForm();



  /*useEffect(()=>{
    if(isVendorProfile){
        store.dispatch({
            type: actions.VENDOR_EDIT_PROFILE_STATUS,
            payload: false,
        })
        profileUsedForm.resetFields();
    }

},[ profileUsedForm,isVendorProfile])*/
  
  const onFinishProfile = values => {
    dispatch({
      type: actions.ADMIN_EDIT_PROFILE,
      payload: values,
    })
  };


  const onFinish = (values)=>{
    //let newArrayLanguage = [...vendorLanguange];
  }
  const callbackTabKey = (key)=> {
  /*  setLangauageindex(key);
  /*  setVendorLanguageShortName(vendorLanguange[`${key}`]['languageshortname']);
   /* profileUsedForm.setFieldsValue({
        vendorname: vendorLanguange[`${key}`]['vendorname'],
        vendoraddress: vendorLanguange[`${key}`]['vendoraddress'],
        vendordescription: vendorLanguange[`${key}`]['vendordescription'],
    })**/
   // profileUsedForm.validateFields()
}


const getLocaleLanguage = ()=>{
  return vendorLanguageShortName ? vendorLanguageShortName: 'en';
} 

const onChangeLanguageValue = ({event, languageid, key})=>{
  event.preventDefault();
  dispatch({
      type: actions.SET_VENDOR_LANGUAGE_DETAILS,
      payload: {
          languageid: languageid,
          value: event.target.value,
          key: key,
      }  
  })
}

  return ( 
    <Col span={24}  className="inner-content profile-edit" key={'profile_form-col'}>
        <Form
            name="profile_update"
            className="login-form"
            key={'profile_form'}
            onFinish={onFinishProfile}
            initialValues={{
            email: getLocalData('email'),
            firstname: getLocalData('firstname'),
            lastname: getLocalData('lastname'),
            }}
            {...formProps}
            onFinish={onFinish}
        >
        <Tabs onChange={callbackTabKey} type="card">
                    { /* vendorLanguange.map((languageDetail,index)=>{
                        return  <TabPane tab={languageDetail['languagename']} key={index}>
                            <Form.Item
                                label={getLocaleMessages({ id: 'label.saloonName' , localeLanguage: getLocaleLanguage()})}
                                name="vendorname"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: getLocaleMessages({ id: 'errorMessage.saloonName' , localeLanguage: getLocaleLanguage()}),
                                    }
                                ]}
                            >
                                <Input 
                                    placeholder={getLocaleMessages({ id: 'placeholder.saloonName' , localeLanguage: getLocaleLanguage()})}
                                    onChange={(event)=>onChangeLanguageValue({event: event,languageid: languageDetail['languageid'], key:'vendorname'})} 
                                />
                            </Form.Item>
                            <Form.Item
                                label={getLocaleMessages({id: 'label.saloonDescription' , localeLanguage: getLocaleLanguage()})}
                                name="vendordescription"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: getLocaleMessages({id:'errorMessage.saloonDescription', localeLanguage: getLocaleLanguage()}),
                                    }
                                ]}
                            >
                                <Input.TextArea 
                                    placeholder={getLocaleMessages({id:'placeholder.saloonDescription', localeLanguage: getLocaleLanguage()})} 
                                    autoSize={{
                                        minRows: 2.5,
                                        maxRows: 4,
                                    }}
                                    onChange={(event)=>onChangeLanguageValue({event: event,languageid: languageDetail['languageid'], key:'vendordescription'})}
                                />
                            </Form.Item>
                        </TabPane>;   
                    }) */}
                </Tabs>
            <Form.Item
            name="firstname"
            rules={[{ required: true, message: 'Please input your firstname!' }]}
            >
            <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Firstname"
            />
            </Form.Item>
            <Form.Item
            name="lastname"
            rules={[{ required: true, message: 'Please input your lastname!' }]}
            >
            <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Lastname" 
            />
            </Form.Item>
            <Form.Item
            name="email"
            rules={[
                {
                required: true,
                message:  'Please enter your email',
                },
                {
                type: 'email',
                message: 'Invalid Email',
                },
            ]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter your email"
            />
            </Form.Item>
            <div className="button-center">
            <Form.Item >
                <Button 
                type="primary" 
                htmlType="submit"
                className="login-form-button save-btn"
                loading={profileLoader}
                disabled={profileLoader}
                >
                Update Profile
                </Button>
            </Form.Item>
            </div>
        </Form>
    </Col>
  );
};
export default Profileupdate;