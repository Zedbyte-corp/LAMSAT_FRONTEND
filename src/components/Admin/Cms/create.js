// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Row,
    Col,
    Card,
    Tabs,
    Form,
    Input,
    Button,
    message,
    Space,
    Select,
    InputNumber,
    Checkbox,
    Radio,
    Spin
} from 'antd';
import { getLocaleMessages } from 'redux/helper';
import Actions from 'redux/admin/PageContent/actions';
import adminvendorprofileAction from 'redux/admin/adminvendorprofile/actions';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'assets/css/dashboard.scss';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const Create = (props) => {
    const [CreateForm] = Form.useForm();

    const [getLat, setLat] = useState(0);
    const [getLng, setLng] = useState(0);
    const [getLanguageIndex, setLangauageindex] = useState(0);
    const [vendorLanguageShortName, setVendorLanguageShortName] = useState(
        null
    );
    const { getAppLanguageList } = useSelector((state) => state.Auth);
    const {
        pagetitle,
        vendorAddress,
        pagecontent,
        imageUploadLoader,
        saloonLanguange,
        //cms_redirect,
        submitLoader,
    } = useSelector((state) => state.AdminVendorProfile);

    const { cms_redirect,cmsLoader } = useSelector((state) => state.PageContent);

    useEffect(() => {
        if (getAppLanguageList.length > 0 && saloonLanguange.length == 0) {
            dispatch({
                type: Actions.ASSIGN_SALOON_LANGUAGE,
                payload: getAppLanguageList,
            });
        }
        if (cms_redirect) {
            props.history.push('/admin/cms');
        }
    });
    // useEffect(()=>{
    //     if (cms_redirect) {
    //         props.history.push('/admin/cms');
    //     }
    // },[cms_redirect])

    const { Option } = Select;
    const dispatch = useDispatch();

    const getLocaleLanguage = () => {
        if (getAppLanguageList.length > 0) {
            return vendorLanguageShortName ? vendorLanguageShortName : 'en';
        }
    };
    const [value, setValue] = React.useState(1);
    const onChangeStatus = (ev) => {
        if (ev.target.name === 'isActive') {
            if (ev.target.value === 'active') {
                var value = 1;
            } else if (ev.target.value === 'inactive') {
                var value = 0;
            }

            dispatch({
                type: Actions.ADMINISTRATOR_STATUS,
                value: value,
            });
        }
    };

    const onFinishFailed = (error) => {

    };
    const onFinish = (values) => {
        let newArrayLanguage = [...saloonLanguange];

        newArrayLanguage = newArrayLanguage.filter(
            (singleLanguageList) =>
                singleLanguageList['pagetitle'] &&
                singleLanguageList['pagetitle'].length > 0 &&
                singleLanguageList['pagecontent'] &&
                singleLanguageList['pagecontent'].length
        );
        const exist = saloonLanguange.some((ch) => {
            if (ch.pagecontent) {
                return true;
            } else {
                return false;
            }
        });
        if (1) {
            if (exist) {
                dispatch({
                    type: Actions.CREATE_CMS,
                    payload: {
                        status: values['status'] == '' ? 0 : 1,
                        language: saloonLanguange,
                    },
                });
            } else {
                message.error('Please Enter CMS Content!');
            }
        }
    };

    const callbackTabKey = (key) => {
        setLangauageindex(key);
        setVendorLanguageShortName(
            saloonLanguange[`${key}`]['languageshortname']
        );
        CreateForm.setFieldsValue({
            pagetitle: saloonLanguange[`${key}`]['pagetitle'],
            pagecontent: saloonLanguange[`${key}`]['pagecontent'],
        });
        CreateForm.validateFields();
    };

    const onChangeLanguageValue = ({ event, languageid, key }) => {
        event.preventDefault();

        dispatch({
            type: Actions.SET_LANGUAGE_ALL_DETAILS,
            payload: {
                languageid: languageid,
                value: event.target.value,
                key: key,
            },
        });
    };

    const backtopage = () => {
        props.history.push('/admin/cms');
    };

    return (
        <div>
            <Row>
                <Col
                    offset={0}
                    xs={22}
                    md={22}
                    lg={22}
                    className="dashboard-content mg-auto"
                >
                    <Card title={getLocaleMessages({ id: 'CMS create' })}>
                    <Spin spinning={cmsLoader}>
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{
                                status: '',
                            }}
                            form={CreateForm}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                        >
                            <Tabs onChange={callbackTabKey}>
                                {getAppLanguageList.length > 0
                                    ? getAppLanguageList.map(
                                          (languageDetail, index) => {
                                              return (
                                                  <TabPane
                                                      tab={
                                                          languageDetail[
                                                              'languagename'
                                                          ]
                                                      }
                                                      key={index}
                                                  >
                                                      <Form.Item
                                                          label={getLocaleMessages(
                                                              {
                                                                  id:
                                                                      'pagetitle',
                                                                  localeLanguage: getLocaleLanguage(),
                                                              }
                                                          )}
                                                          name="pagetitle"
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  whitespace: true,
                                                                  message: getLocaleMessages(
                                                                      {
                                                                          id:
                                                                              'Please enter a title',
                                                                          localeLanguage: getLocaleLanguage(),
                                                                      }
                                                                  ),
                                                              },
                                                          ]}
                                                      >
                                                          <Input
                                                              placeholder={getLocaleMessages(
                                                                  {
                                                                      id:
                                                                          'Please enter a title',
                                                                      localeLanguage: getLocaleLanguage(),
                                                                  }
                                                              )}
                                                              onChange={(
                                                                  event
                                                              ) =>
                                                                  onChangeLanguageValue(
                                                                      {
                                                                          event: event,
                                                                          languageid:
                                                                              languageDetail[
                                                                                  'id'
                                                                              ],
                                                                          key:
                                                                              'pagetitle',
                                                                      }
                                                                  )
                                                              }
                                                          />
                                                      </Form.Item>
                                                      <Form.Item
                                                          label={getLocaleMessages(
                                                              {
                                                                  id: 'Content',
                                                                  localeLanguage: getLocaleLanguage(),
                                                              }
                                                          )}
                                                          name="pagecontent"
                                                          // rules={[
                                                          //     {
                                                          //         required: false,
                                                          //         whitespace: true,
                                                          //         message: getLocaleMessages({ id: 'Please enter a content', localeLanguage: getLocaleLanguage() }),
                                                          //     }
                                                          // ]}
                                                      >
                                                          <CKEditor
                                                              editor={
                                                                  ClassicEditor
                                                              }
                                                              data={
                                                                  typeof languageDetail[
                                                                      'id'
                                                                  ] ===
                                                                  'undefined'
                                                                      ? ''
                                                                      : languageDetail[
                                                                            'id'
                                                                        ]
                                                              }
                                                              onBlur={(
                                                                  event,
                                                                  editor
                                                              ) => {

                                                                  dispatch({
                                                                      type:
                                                                          Actions.SET_LANGUAGE_DETAILS,
                                                                      payload: {
                                                                          languageid:
                                                                              languageDetail[
                                                                                  'id'
                                                                              ],
                                                                          value: editor.getData(),
                                                                          key:
                                                                              'pagecontent',
                                                                      },
                                                                  });
                                                                  /*dispatch({
                                                        type: Actions.SET_SALOON_LANGUAGE_DETAILS,
                                                        payload: {
                                                            languageid: languageDetail['id'],
                                                            value: editor.getData(),
                                                            key: 'pagecontent',
                                                        }
                                                    })*/
                                                              }}
                                                          />
                                                      </Form.Item>
                                                  </TabPane>
                                              );
                                          }
                                      )
                                    : ''}
                            </Tabs>

                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Status is required!',
                                    },
                                ]}
                            >
                                <Radio.Group
                                    onChange={onChangeStatus}
                                    value={value}
                                >
                                    <Radio value={1}>Active</Radio>
                                    <Radio value={0}>InActive</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <div className="button-center m-10">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="save-btn mr-20"
                                >
                                    Save
                                </Button>

                                <Button
                                    htmlType="submit"
                                    onClick={backtopage}
                                    className="save-btn"
                                >
                                    Back
                                </Button>
                            </div>
                        </Form>
                    </Spin>    
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Create;
