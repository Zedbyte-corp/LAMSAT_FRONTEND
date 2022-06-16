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
    Radio,
    Spin
} from 'antd';
import { getLocaleMessages } from 'redux/helper';
import Actions from 'redux/admin/RolesManagement/actions';
import Checkbox from './Checkbox';
import ObjectAssign from 'object-assign';
import 'assets/css/dashboard.scss';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Create = (props) => {
    const [CreateForm] = Form.useForm();

    const { Option } = Select;
    const dispatch = useDispatch();
    const backtopage = () => {
        props.history.push('/admin/roles');
    };
    const {
        rolesData,
        isRolesProfile,
        fruitsparent,
        fruitschild,
        isRolesSave,
        redirect,
        createupdateloader
    } = useSelector((state) => state.Roles);

    if (redirect == true) {
        props.history.push('/admin/roles');
    }
    useEffect(() => {
        if (isRolesProfile) {
            dispatch({
                type: Actions.GET_ONLY_ROLES,
            });
        }
    }, [rolesData]);
    const roles = [
        { label: 'Admin', value: '1' },
        { label: 'SubAdmin', value: '2' },
    ];
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

    const onChangeRole = (e) => {
        /*dispatch({
            type: Actions.ROLE_TYPE,
            value:ev.target.value
        })   */
    };
    const onChange = (e) => {
        //setValue(e.target.value);
    };

    const onFinish = (values) => {
        var output = [];
        var joi = '';

        fruitschild.map((child, i) => {
            var len = fruitschild.length;
            child = child.charAt(0).toLowerCase() + child.slice(1);
            if (i == 0) {
                joi = "[{'id':'" + child + "','state':1}";
            } else if (i == len - 1) {
                joi = "{'id':'" + child + "','state':1}]";
            } else {
                joi = "{'id':'" + child + "','state':1}";
            }
            output.push(joi);
        });
        if (isRolesSave) {
            dispatch({
                type: Actions.CREATE_ROLE_JS,
                payload: {
                    rolename: values['rolename'],
                    role_json: output.toString(),
                    status: values['status'] == '' ? 0 : 1,
                },
            });
        }
    };
    const checkboxesToRender = rolesData
        ? rolesData.map((item) => {
              var arr = [];
              arr = item.list.length > 1 ? item.list.split(',') : item.list;
              return (
                  <tr className="border">
                      <td>
                          <div className="custom-control custom-checkbox">
                              <Checkbox
                                  name={item.id}
                                  id={item.id}
                                  value={item.id}
                                  checked={
                                      1 && fruitsparent.indexOf(item.id) > -1
                                          ? true
                                          : false
                                  }
                                  onChange={(event) => {
                                      onChangeParentcheck(
                                          event,
                                          item.id,
                                          rolesData
                                      );
                                  }}
                                  type="checkbox"
                              />
                              <label htmlFor={item.id}>{item.id}</label>
                          </div>
                      </td>
                      <td className="aln-right">
                          {item.list.length > 0
                              ? arr.map((list) => {
                                    return (
                                        <div className="custom-control custom-checkbox">
                                            <Checkbox
                                                name={item.id}
                                                id={item.id + list}
                                                value={item.id + '/' + list}
                                                checked={
                                                    1 &&
                                                    fruitschild.indexOf(
                                                        item.id + '/' + list
                                                    ) > -1
                                                        ? true
                                                        : false
                                                }
                                                onChange={(event) => {
                                                    onChangeChildcheck(
                                                        event,
                                                        list,
                                                        item.id,
                                                        arr
                                                    );
                                                }}
                                                type="checkbox"
                                            />
                                            <label htmlFor={item.id + list}>
                                                {list}
                                            </label>
                                        </div>
                                    );
                                })
                              : ''}
                      </td>
                  </tr>
              );
          })
        : '';

    const onChangeParentcheck = (e, value, rolesData) => {
        let parentcheckedObject,
            obj = {};
        let checked = e.target.checked;
        var clicked;
        var child_checked = [];
        if (checked) {
            parentcheckedObject = ObjectAssign({}, obj, {
                parent_checked: true,
                parent_active_checked: value,
            });
            clicked = value;
        } else {
            parentcheckedObject = ObjectAssign({}, obj, {
                parent_checked: false,
                parent_active_checked: value,
            });
            clicked = '';
        }

        dispatch({
            type: Actions.UPDATE_PARENT_CHECK,
            value: value,
            clicked: clicked,
            object: parentcheckedObject,
            rolesData: rolesData,
        });
    };
    const onChangeChildcheck = (e, value, name, listData) => {
        //onChangeChildcheck(e,value,name,listData) {
        let childcheckedObject,
            obj = {};
        let checked = e.target.checked;
        var clicked;
        var child_checked = false;
        if (checked) {
            childcheckedObject = ObjectAssign({}, obj, {
                child_checked: true,
                child_active_checked: value,
                parent_value: name,
            });
            clicked = value;
        } else {
            childcheckedObject = ObjectAssign({}, obj, {
                child_checked: false,
                child_active_checked: value,
                parent_value: name,
            });
            clicked = '';
        }
        dispatch({
            type: Actions.UPDATE_CHILD_CHECK,
            value: value,
            clicked: clicked,
            object: childcheckedObject,
            listData: listData,
        });
    };

    return (
        <div>
            <Row>
                <Col span={2}></Col>
                <Col span={20} className="dashboard-content">
                    <Card title={getLocaleMessages({ id: 'Roles' })}>
                        <Spin spinning={createupdateloader}>
                        <Form
                            name="basic"
                            layout="vertical"
                            initialValues={{
                                rolename: '',
                                roles: '',
                                status: '',
                            }}
                            form={CreateForm}
                            onFinish={onFinish}
                        >
                            <Row>
                                <Col span={24} className="inner-content">
                                    <Form.Item
                                        label={getLocaleMessages({
                                            id: 'Rolename',
                                        })}
                                        name="rolename"
                                        rules={[
                                            {
                                                required: true,
                                                message: getLocaleMessages({
                                                    id:
                                                        'Please enter a Rolename!',
                                                }),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <table className="role_table">
                                    <tbody>{checkboxesToRender}</tbody>
                                </table>
                            </Form.Item>

                            <Row>
                                <Col span={24} className="inner-content">
                                    <Form.Item
                                        name="status"
                                        label={getLocaleMessages({
                                            id: 'Status',
                                        })}
                                        rules={[
                                            {
                                                required: true,
                                                message: getLocaleMessages({
                                                    id: 'Select Role',
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
                                </Col>
                            </Row>

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

export default Create;
