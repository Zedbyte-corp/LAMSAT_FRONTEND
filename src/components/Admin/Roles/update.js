// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Card,
    Tabs,
    Row,
    Col,
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
import queryString from 'query-string';
import Checkbox from './Checkbox';
import ObjectAssign from 'object-assign';
import 'assets/css/dashboard.scss';
const Update = (props) => {
    const [UpdateForm] = Form.useForm();
    //const prevCountRef = useRef();
    let params = queryString.parse(props.location.search);
    const {
        rolesData,
        isRolesProfile,
        fruitsparent,
        fruitschild,
        isRolesSave,
        status,
        rolename,
        redirect,
        createupdateloader
    } = useSelector((state) => state.Roles);

    if (redirect == true) {
        props.history.push('/admin/roles');
    }

    const dispatch = useDispatch();
    /*useEffect(() => {
        if(isAdministratorProfile && params.id > 0 && params.id !== null && typeof(params.id) !== undefined){
            dispatch({
                type: Actions.GET_SINGLE_ADMINISTRATOR,
                payload: parseInt(params.id)
            })
        }
        UpdateForm.resetFields();
    },[UpdateForm, firstname,lastname, username, email, status, phone, roletype, adminid])*/
    useEffect(() => {
        if (
            params.id > 0 &&
            params.id !== null &&
            typeof params.id !== undefined &&
            isRolesProfile
        ) {
            dispatch({
                type: Actions.GET_SINGLE_ROLES,
                value: parseInt(params.id),
            });
        }
        UpdateForm.resetFields();
    }, [UpdateForm, rolename, rolesData, rolename, status]);

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
                type: Actions.UPDATE_ROLE,
                payload: {
                    status: values['status'],
                    id: parseInt(params.id),
                    rolename: values['rolename'],
                    role_json: output.toString(),
                },
            });
        }
    };
    const Stringcheckbox=(val)=>{
        if(val){
            var checkboxval = (val).charAt(0).toUpperCase()+(val).slice(1);
            return checkboxval;
        }
    }
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
                                      1 && fruitsparent.some((e)=> e.toLowerCase() == (item.id).toLowerCase())
                                    //   1 && fruitsparent.indexOf(item.id) > -1
                                    //       ? true
                                    //       : false
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
                                                    1 && fruitschild.some((e)=> e.toLowerCase() == (item.id + '/' + list).toLowerCase())
                                                    // 1 &&
                                                    // fruitschild.indexOf(
                                                    //     item.id + '/' + list
                                                    // ) > -1
                                                    //     ? true
                                                    //     : false
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

    const backtopage = () => {
        props.history.push('/admin/roles');
    };

    return (
        <Row>
            <Col span={2}></Col>
            <Col span={20} className="dashboard-content">
                <Card
                    title={getLocaleMessages({
                        id: 'title.profileInformation',
                    })}
                >
                <Spin spinning={createupdateloader || rolesData.length == 0}>
                    <Form
                        name="roles"
                        layout="vertical"
                        initialValues={{
                            rolename: rolename,
                            roles: '',
                            status: status,
                        }}
                        form={UpdateForm}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={getLocaleMessages({ id: 'Rolename' })}
                            name="rolename"
                            rules={[
                                {
                                    required: true,
                                    message: getLocaleMessages({
                                        id: 'Please enter a Rolename!',
                                    }),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <table className="role_table">
                                <tbody>{checkboxesToRender}</tbody>
                            </table>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label={getLocaleMessages({ id: 'Status' })}
                            value={status}
                            rules={[
                                {
                                    required: true,
                                    message: getLocaleMessages({
                                        id: 'Select Role',
                                    }),
                                },
                            ]}
                        >
                            <Radio.Group onChange={onChangeStatus}>
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>InActive</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <div className="button-center">
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>

                            <Button htmlType="submit" onClick={backtopage}>
                                Back
                            </Button>
                        </div>
                    </Form>
                </Spin>    
                </Card>
            </Col>
        </Row>
    );
};

export default Update;
