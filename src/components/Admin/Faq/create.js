// CategoryPage Component
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
} from "antd";
import { getLocaleMessages } from "redux/helper";
import Actions from "redux/admin/PageContent/actions";
import adminvendorprofileAction from "redux/admin/adminvendorprofile/actions";
//import CKEditor from 'ckeditor4-react';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "assets/css/dashboard.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const Create = (props) => {
  const [CreateForm] = Form.useForm();
  const [getLat, setLat] = useState(0);
  const [getLng, setLng] = useState(0);
  const [getLanguageIndex, setLangauageindex] = useState(0);
  const [vendorLanguageShortName, setVendorLanguageShortName] = useState(null);
  const { getAppLanguageList } = useSelector((state) => state.Auth);
  const {
    vendorAddress,
    answer,
    imageUploadLoader,
    saloonLanguange,
    lat,
    lng,
  } = useSelector((state) => state.AdminVendorProfile);
  //const { saloonLanguange } = useSelector(state => state.pageManagement);

  const { faq_redirect, yourHtml, yourHtml1, submitLoader } = useSelector(
    (state) => state.PageContent
  );
  useEffect(() => {
    if (getAppLanguageList.length > 0 && saloonLanguange.length == 0) {
      dispatch({
        type: adminvendorprofileAction.ASSIGN_SALOON_LANGUAGE,
        payload: getAppLanguageList,
      });
    }

    if (faq_redirect) {
      props.history.push("/admin/faq");
    }
  });

  const { Option } = Select;
  const dispatch = useDispatch();

  const getLocaleLanguage = () => {
    if (getAppLanguageList.length > 0) {
      return vendorLanguageShortName ? vendorLanguageShortName : "en";
    }
  };
  const [value, setValue] = React.useState(1);
  const onChangeStatus = (ev) => {
    if (ev.target.name === "isActive") {
      if (ev.target.value === "active") {
        var value = 1;
      } else if (ev.target.value === "inactive") {
        var value = 0;
      }

      dispatch({
        type: Actions.ADMINISTRATOR_STATUS,
        value: value,
      });
    }
  };

  const onFinish = (values) => {
    let newArrayLanguage = [...saloonLanguange];
    // console.log("this is the value of the lamsat", newArrayLanguage);
    // return;

    newArrayLanguage = newArrayLanguage.filter(
      (singleLanguageList) =>
        singleLanguageList["question"] &&
        singleLanguageList["question"].length > 0 &&
        singleLanguageList["answer"] &&
        singleLanguageList["answer"].length
    );

    // saloonLanguange.map((list) => {
    //   list.answer = list.id == 1 ? yourHtml1 : list.id == 2 ? yourHtml : "";
    //   list.answer = list.id == 2 ? (list.answer = yourHtml1) : "";
    //   return list;
    // });

    // console.log("this is the value of the list given", saloonLanguange);
    // return;

    dispatch({
      type: Actions.CREATE_FAQ,
      payload: {
        status: values["status"] == "" ? 0 : 1,
        language: saloonLanguange,
      },
    });
  };

  const callbackTabKey = (key) => {
    setLangauageindex(key);
    setVendorLanguageShortName(saloonLanguange[`${key}`]["languageshortname"]);
    CreateForm.setFieldsValue({
      question: saloonLanguange[`${key}`]["question"],
      answer: saloonLanguange[`${key}`]["answer"],
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
    props.history.push("/admin/faq");
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
          <Card title={getLocaleMessages({ id: "FAQ create" })}>
            <Spin spinning={submitLoader} size="large">
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                status: "",
              }}
              form={CreateForm}
              onFinish={onFinish}
            >
              <Tabs onChange={callbackTabKey}>
                {getAppLanguageList.length > 0
                  ? getAppLanguageList.map((languageDetail, index) => {
                      return (
                        <TabPane
                          tab={languageDetail["languagename"]}
                          key={index}
                        >
                          <Form.Item
                            label={getLocaleMessages({
                              id: "question",
                              localeLanguage: getLocaleLanguage(),
                            })}
                            name="question"
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: getLocaleMessages({
                                  id: "Please enter a question",
                                  localeLanguage: getLocaleLanguage(),
                                }),
                              },
                            ]}
                          >
                            <Input
                              placeholder={getLocaleMessages({
                                id: "Please enter a question",
                                localeLanguage: getLocaleLanguage(),
                              })}
                              onChange={(event) =>
                                onChangeLanguageValue({
                                  event: event,
                                  languageid: languageDetail["id"],
                                  key: "question",
                                })
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label={getLocaleMessages({
                              id: "answer",
                              localeLanguage: getLocaleLanguage(),
                            })}
                            name="answer"
                            rules={[
                              {
                                required: true,
                                // whitespace: true,
                                message: getLocaleMessages({
                                  id: "Please enter a answer",
                                  localeLanguage: getLocaleLanguage(),
                                }),
                              },
                            ]}
                          >
                            <CKEditor
                              editor={ClassicEditor}
                              data={
                                typeof languageDetail["id"] === "undefined"
                                  ? ""
                                  : languageDetail["id"]
                              }
                              onBlur={(event, editor) => {
                                dispatch({
                                  type: Actions.SET_LANGUAGE_DETAILS,
                                  payload: {
                                    languageid: languageDetail["id"],
                                    value: editor.getData(),
                                    key: "answer",
                                  },
                                });
                              }}
                            />

                            {/*  <CKEditor
                                onChange={ ( event, editor ) =>

        dispatch({
            type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
            payload: {
                languageid: languageDetail['id'],
                value: event.editor.getData(),
                key: 'answer',
            }
        })
                                   /* dispatch({
                                        type: adminvendorprofileAction.SET_SALOON_LANGUAGE_DETAILS,
                                        payload: {
                                            languageid: languageDetail['id'],
                                            value: event.editor.getData(),
                                            key: 'pagecontent',
                                        }
                                    })
                                }
                                data={typeof languageDetail['id'] === "undefined" ? '':languageDetail['id']}
                            />*/}
                          </Form.Item>
                        </TabPane>
                      );
                    })
                  : ""}
              </Tabs>

              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: getLocaleMessages({
                      id: "Select any status",
                      localeLanguage: getLocaleLanguage(),
                    }),
                  },
                ]}
              >
                <Radio.Group onChange={onChangeStatus} value={value}>
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
