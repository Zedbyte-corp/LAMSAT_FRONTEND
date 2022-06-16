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
import queryString from 'query-string';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'assets/css/dashboard.scss';
var createTextVersion = require('textversionjs');
const { TabPane } = Tabs;
const Update = (props) => {
    const [UpdateForm] = Form.useForm();

    const [getLanguageIndex, setLangauageindex] = useState(0);
    const [vendorLanguageShortName, setVendorLanguageShortName] = useState(
        null
    );

    const [sssss, setsssss] = useState('ssssssss');
    const { getAppLanguageList } = useSelector((state) => state.Auth);
    // const { pagetitle,vendorAddress,pagecontent,imageUploadLoader, lat, lng } = useSelector(state => state.AdminVendorProfile);
    const {
        isPagemanagement,
        saloonLanguange,
        initailLoadUpdate,
        cms_status,
        cms_content,
        yourHtml,
        yourHtml1,
        iscmsLoad,
        cms_redirect,
        initialLoad,
        submitLoader
    } = useSelector((state) => state.PageContent);

    var textVersion = createTextVersion(yourHtml);
    var textVersion1 = createTextVersion(yourHtml1);

    let params = queryString.parse(props.location.search);

    useEffect(() => {
        if (getAppLanguageList.length > 0 && saloonLanguange.length == 0) {
            dispatch({
                type: Actions.ASSIGN_SALOON_LANGUAGE,
                payload: getAppLanguageList,
            });

            if (
                params.id > 0 &&
                params.id !== null &&
                typeof params.id !== undefined
            ) {
                dispatch({
                    type: Actions.GET_SINGLE_CMS,
                    value: parseInt(params.id),
                });
                var key = 0;

                //setLangauageindex(key);
                //setVendorLanguageShortName(saloonLanguange[0]['languageshortname']);
            }
        }
        if (cms_redirect) {
            props.history.push('/admin/cms');
        }
        if (saloonLanguange.length > 0 && initialLoad) {
            UpdateForm.setFieldsValue({
                pagetitle: saloonLanguange[0]['pagetitle'],
                pagecontent: saloonLanguange[0]['pagecontent'],
                status: cms_status,
            });
            UpdateForm.validateFields();

            dispatch({
                type: Actions.LOADED,
                value: false,
            });
        }
    });

    const { Option } = Select;
    const dispatch = useDispatch();

    const getLocaleLanguage = () => {
        if (getAppLanguageList.length > 0) {
            return vendorLanguageShortName ? vendorLanguageShortName : 'en';
        }
    };
    const [value, setValue] = React.useState(1);
    const onChangeStatus = (ev) => {
        dispatch({
            type: Actions.CMS_STATUS,
            value: ev.target.value,
        });
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
        saloonLanguange.map((list) => {

        });
        if (1) {
            dispatch({
                type: Actions.UPDATE_CMS,
                payload: {
                    id: params.id,
                    status: cms_status == 1 ? 1 : 0,
                    language: saloonLanguange,
                },
            });
        }
    };

    useEffect(() => {
        if (vendorLanguageShortName === null && getAppLanguageList.length > 0) {
            setVendorLanguageShortName(
                getAppLanguageList[`${getLanguageIndex}`]['languageshortname']
            );
        }
    }, [getAppLanguageList]);
    const callbackTabKey = (key) => {
        setLangauageindex(key);
        if (saloonLanguange.length > 0) {
            setVendorLanguageShortName(
                saloonLanguange[`${key}`]['languageshortname']
            );
            saloonLanguange[`${key}`]['pagecontent'] =
                key == 0 ? textVersion : textVersion1;
            // (key == 0)?setsssss(textVersion):setsssss(textVersion1);
            UpdateForm.setFieldsValue({
                pagetitle: saloonLanguange[`${key}`]['pagetitle'],
                pagecontent: key == 0 ? textVersion : textVersion1,
                status: cms_status,
            });
        }
        /* dispatch({
            type: Actions.CMS_CONTENT,
            value:saloonLanguange[`${key}`]['pagecontent']
        })   */

        //setsssss(saloonLanguange[`${key}`]['pagecontent']);

        UpdateForm.validateFields();
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
    /*
    if(initailLoadUpdate && saloonLanguange.length != 0){
        callbackTabKey(0);

       /* setLangauageindex(0);
        setVendorLanguageShortName(saloonLanguange[0]['languageshortname']);
        UpdateForm.setFieldsValue({
            pagetitle: saloonLanguange[0]['pagetitle'],
            pagecontent: saloonLanguange[0]['pagecontent'],
            status: 1,
        })
        UpdateForm.validateFields();
        dispatch({
            type: Actions.INITIAL_LOAD,
            value: false,
        })

    }*/

    const backtopage = () => {
        props.history.push('/admin/cms');
    };

    return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} className="dashboard-content">
                    <Card title={getLocaleMessages({ id: 'CMS update' })}>
                        <Spin spinning={submitLoader} size="large">
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{
                                status: cms_status,
                                // pagetitle: saloonLanguange.length>0?saloonLanguange[0].pagetitle:'',
                                //  pagecontent: 'pagecontent'
                            }}
                            form={UpdateForm}
                            onFinish={onFinish}
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
                                                                  id:
                                                                      'Please enter a content',
                                                                  localeLanguage: getLocaleLanguage(),
                                                              }
                                                          )}
                                                          name="pagecontent"
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  //whitespace: true,
                                                                  message: getLocaleMessages(
                                                                      {
                                                                          id:
                                                                              'Please enter a content',
                                                                          localeLanguage: getLocaleLanguage(),
                                                                      }
                                                                  ),
                                                              },
                                                          ]}
                                                      >
                                                          {iscmsLoad &&
                                                          index == 0 ? (
                                                              <CKEditor
                                                                  editor={
                                                                      ClassicEditor
                                                                  }
                                                                  data={
                                                                      yourHtml
                                                                  }
                                                                  onReady={(
                                                                      editor
                                                                  ) => {
                                                                      // You can store the "editor" and use when it is needed.

                                                                  }}

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
                                                                  }}


                                                              />
                                                          ) : (
                                                              <CKEditor
                                                                  editor={
                                                                      ClassicEditor
                                                                  }
                                                                  data={
                                                                      yourHtml1
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
                                                                  }}
                                                              />
                                                          )}
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

                            <div className="button-center">
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

export default Update;
