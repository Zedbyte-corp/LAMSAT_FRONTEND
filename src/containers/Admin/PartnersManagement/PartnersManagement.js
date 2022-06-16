import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Switch,
  Spin,
  Modal,
  Select,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import 'assets/css/dashboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'redux/store';
import actions from 'redux/admin/partnersManagement/actions';
import DataTable from 'helpers/datatable';
import SweetAlert from 'helpers/sweetalert';
import { getLocaleMessages } from 'redux/helper';

const { Column, ColumnGroup } = Table;

const PartnersManagemengt = (props) => {
  const { partnersList, cityList } = useSelector((state) => state.Partners);
  const { loading } = useSelector((state) => state.Partners);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(0);
  var cityArrList = [];

  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_PARTNERS_LIST,
    });
    if (cityList.length == 0) {
      store.dispatch({
        type: actions.GET_ALL_CITY_LIST_PARTNERS,
      });
    }
  }, ['partnersList', 'cityList']);


  if (cityList.length > 0) {
    let obj = {};
    cityList.map((list) => {
      obj[list.cityid] = list.cityname;
    });

    cityArrList.push(obj);
  }

  cityArrList.length > 0 &&
    partnersList &&
    partnersList.length > 0 &&
    partnersList.map((list, id) => {
      var x = list.location;

      list.location = list.location != 0 ? cityArrList[0][list.location] : '-';
      return list;
    });

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const viewDetails = (id) => {
    //setSelectedPartnerId(id);
    //setIsModalVisible(true);
    var data = partnersList.filter((data)=> data.id == id);
    if(data.length)
    {
      localStorage.setItem("ParnersDataByID",JSON.stringify(data));
      props.history.push("/admin/partnersapplication");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isAccept = (id, state) => {

    let accept = true;
    state ? accept = 1 : accept = 2;
    let data = {
      id: id,
      isaccepted: accept
    };
    store.dispatch({
      type: actions.ACCEPT_REQ,
      payload: data,
      callBackAction: (sate) => {
        setIsModalVisible(false);
        store.dispatch({
          type: actions.GET_ADMIN_PARTNERS_LIST,
        });
      },
    });

  }

  const columns = [
    {
      title: getLocaleMessages({ id: 'label.saloonName' }),
      dataIndex: 'saloonname',
      key: 'saloonname',
      onFilter: (value, record) => record.saloonname.indexOf(value) === 0,
      sorter: (a, b) => a.saloonname.length - b.saloonname.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: getLocaleMessages({ id: 'label.contact' }),
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: getLocaleMessages({ id: 'staff.email.label' }),
      dataIndex: 'email_address',
      key: 'email_address',
    },
    {
      title: getLocaleMessages({ id: 'Status' }),
      dataIndex: 'isaccepted',
      key: 'isaccepted',
      render: (text, record) => {
        var text = text;

        return (
          record.isaccepted === 0 ? "Pending" : (record.isaccepted === 1 ? "Accepted" : "Rejected")
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        var text = text;

        return (
          <Space size="middle">
            {
              <EyeOutlined
                id={record.id}
                onClick={(e) => {
                  viewDetails(parseInt(record.id));
                }}
              />
            }
          </Space>
        );
      },
    },
  ];
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
          <Card title="Partners">
            {/* <Modal
              title="Details"
              className="create_category_modal"
             visible={isModalVisible}
             onOk={handleOk}
             onCancel={handleCancel}
              footer={false}
            >
              {partnersList.map((key, index) => {
                if (key.id == selectedPartnerId) {
                  return (
                    <div className="booking_details_content">
                      <Spin size="large" spinning={loading}>
                      <p>
                        <span className="leftside">Saloon Name :</span>{' '}
                        <span className="right">{`${key.saloonname}`}</span>
                      </p>
                      <p>
                        <span className="leftside">Description :</span>{' '}
                        <span className="right">{`${key.description}`}</span>
                      </p>
                      <p>
                        <span className="leftside">First Name :</span>{' '}
                        <span className="right">{`${key.firstname}`}</span>
                      </p>
                      <p>
                        <span className="leftside">Last Name :</span>{' '}
                        <span className="right">{`${key.lastname}`}</span>
                      </p>
                      <p>
                        <span className="leftside">Contact Number :</span>{' '}
                        <span className="right">{`${key.mobile}`}</span>
                      </p>
                      <p>
                        <span className="leftside">Email :</span>{' '}
                        <span className="right">{`${key.email_address}`}</span>
                      </p>

                      <p>
                        <span className="leftside">Services :</span>{' '}
                        <span className="right">{`${key.service_name}`}</span>
                      </p>

                      <p>
                        <span className="leftside">Address :</span>{' '}
                        <span className="right">{`${key.partnerAddress}`}</span>
                      </p>

                      <p>
                        <span className="leftside">District :</span>{' '}
                        <span className="right">{`${key.partnerDistrict}`}</span>
                      </p>

                      <p>
                        <span className="leftside">Region :</span>{' '}
                        <span className="right">{`${key.partnerRegion}`}</span>
                      </p>

                      <p>
                        <span className="leftside">Postal code :</span>{' '}
                        <span className="right">{`${key.partnerPostcode}`}</span>
                      </p>

                      <p>
                        <span className="leftside">Hear About Lamsat :</span>{' '}
                        <span className="right">{`${key.hearAboutFresha}`}</span>
                      </p>

                      <p>
                        <span className="leftside">VAT No. :</span>{' '}
                        <span className="right">{`${key.vatnumber !== undefined ? key.vatnumber : ""}`}</span>
                      </p>

                      <p>
                        <span className="leftside">VAT Percentage :</span>{' '}
                        <span className="right">{`${key.vatpercent !== undefined ? key.vatpercent : ""}`} {key.vatpercent ? "%" : ""}</span>
                      </p>

                      <p>
                        <span className="leftside">VAT Document :</span>{' '}
                        <span className="right"><a className="login-form-forgot" href={`${key.vatdocument_url}`} target="_blank">{key.vatdocument_url ? "View" : ""}</a></span>
                      </p>

                      <p>
                        <span className="leftside">CR Document :</span>{' '}
                        <span className="right"><a className="login-form-forgot" href={`${key.crdocument_url}`} target="_blank">{key.crdocument_url ? "View" : ""}</a></span>
                      </p>
                      {
                        key.isaccepted === 0 ? (
                          <p>
                            <Button type="primary" htmlType="create" className="save-btn"
                              onClick={() => isAccept(key.id, true)}
                            >
                              {getLocaleMessages({ id: 'common.accept' })}
                            </Button>
                            <span>     </span>
                            <Button type="primary" htmlType="create" className="save-btn"
                              onClick={() => isAccept(key.id, false)}
                            >
                              {getLocaleMessages({ id: 'common.reject' })}
                            </Button>
                          </p>
                        ) : (<></>)
                      }
                      </Spin>
                    </div>
                  );
                }
              })}
            </Modal> */}
            <Col span={24} className="inner-content">
              
                <DataTable columns={columns} dataSource={partnersList} />
              
            </Col>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnersManagemengt;
