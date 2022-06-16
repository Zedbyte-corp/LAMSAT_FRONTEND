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
import 'assets/css/dashboard.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const Update = (props) => {
    const [UpdateForm] = Form.useForm();

    const [getLat, setLat] = useState(0);
    const [getLng, setLng] = useState(0);
    const [getLanguageIndex, setLangauageindex] = useState(0);
    const [vendorLanguageShortName, setVendorLanguageShortName] = useState(
        null
    );
    const { getAppLanguageList } = useSelector((state) => state.Auth);
    const { faq_redirect } = useSelector((state) => state.PageContent);
    //const { saloonLanguange} = useSelector(state => state.AdminVendorProfile);
    const {
        isPagemanagement,
        saloonLanguange,
        initailLoadUpdate,
        faqstatus,
        iscmsLoad,
        yourHtml,
        yourHtml1,
        initialLoad,
        submitLoader
    } = useSelector((state) => state.PageContent);

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
                    type: Actions.GET_SINGLE_FAQ,
                    value: parseInt(params.id),
                });
            }
        }

        if (faq_redirect) {
            props.history.push('/admin/faq');
        }
    });

    const { Option } = Select;
    const dispatch = useDispatch();

    if (saloonLanguange.length > 0 && initialLoad) {
        UpdateForm.setFieldsValue({
            question: saloonLanguange[0]['question'],
            answer: saloonLanguange[0]['answer'],
            status: faqstatus,
        });
        UpdateForm.validateFields();

        dispatch({
            type: Actions.LOADED,
            value: false,
        });
    }
    const getLocaleLanguage = () => {
        if (getAppLanguageList.length > 0) {
            return vendorLanguageShortName ? vendorLanguageShortName : 'en';
        }
    };
    const [value, setValue] = React.useState(1);

    const onChangeStatus = (ev) => {
        dispatch({
            type: Actions.FAQ_STATUS,
            value: ev.target.value,
        });
    };

    const onFinish = (values) => {
        let newArrayLanguage = [...saloonLanguange];

        newArrayLanguage = newArrayLanguage.filter(
            (singleLanguageList) =>
                singleLanguageList['question'] &&
                singleLanguageList['question'].length > 0 &&
                singleLanguageList['answer'] &&
                singleLanguageList['answer'].length
        );

        if (1) {
            dispatch({
                type: Actions.UPDATE_FAQ,
                payload: {
                    id: params.id,
                    status: values['status'] == '' ? 0 : 1,
                    language: saloonLanguange,
                },
            });
        }
    };

    const callbackTabKey = (key) => {
        setLangauageindex(key);
        setVendorLanguageShortName(
            saloonLanguange[`${key}`]['languageshortname']
        );
        UpdateForm.setFieldsValue({
            question: saloonLanguange[`${key}`]['question'],
            answer: saloonLanguange[`${key}`]['answer'],
            status: faqstatus,
        });
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

    const backtopage = () => {
        props.history.push('/admin/faq');
    };

    return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} className="dashboard-content">
                    <Card title={getLocaleMessages({ id: 'FAQ update' })}>
                        <Spin spinning={submitLoader} size="large">
                        <Form
                            name="basic"
                            initialValues={{
                                status: '',
                            }}
                            form={UpdateForm}
                            onFinish={onFinish}
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
                                                                      'question',
                                                                  localeLanguage: getLocaleLanguage(),
                                                              }
                                                          )}
                                                          name="question"
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  whitespace: true,
                                                                  message: getLocaleMessages(
                                                                      {
                                                                          id:
                                                                              'Please enter a question',
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
                                                                          'Please enter a question',
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
                                                                              'question',
                                                                      }
                                                                  )
                                                              }
                                                          />
                                                      </Form.Item>
                                                      <Form.Item
                                                          label={getLocaleMessages(
                                                              {
                                                                  id: 'answer',
                                                                  localeLanguage: getLocaleLanguage(),
                                                              }
                                                          )}
                                                          name="answer"
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  //whitespace: true,
                                                                  message: getLocaleMessages(
                                                                      {
                                                                          id:
                                                                              'Please enter a answer',
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
                                                                                  'answer',
                                                                          },
                                                                      });
                                                                  }}
                                                              />
                                                          ) : iscmsLoad &&
                                                            index == 1 ? (
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
                                                                                  'answer',
                                                                          },
                                                                      });
                                                                  }}
                                                              />
                                                          ) : (
                                                              ''
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
                                        message: getLocaleMessages({
                                            id: 'Select any status',
                                            localeLanguage: getLocaleLanguage(),
                                        }),
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
