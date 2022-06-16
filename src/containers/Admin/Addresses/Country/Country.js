import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Switch,
  DatePicker,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getLocaleMessages } from "redux/helper";
import moment from "moment";
import "assets/css/dashboard.scss";
import CreateCountry from "./CreateCountry";
// import { Button } from 'antd';
import { store } from "redux/store";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/admin/address/actions";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
const { Column, ColumnGroup } = Table;

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const Country = (props) => {
  const [visible, setVisible] = useState(false);
  const { RangePicker } = DatePicker;
  const { countryList } = useSelector((state) => state.Address);
  const { loading } = useSelector((state) => state.Services);
  const lang = localStorage.getItem("site_language");

  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_COUNTRY_LIST,
    });
  }, []);

  const columns = [
    {
      title: getLocaleMessages({id:"countryName"}),
      dataIndex: "countryname",
      key: "countryname",
      render: (text, record) => (
        <Space size="middle">{record.countryname}</Space>
      ),
    },
    {
      title: getLocaleMessages({id:"country.code.label"}),
      dataIndex: "countrycode",
      key: "countrycode",
      render: (text, record) => (
        <Space size="middle">{record.countrycode}</Space>
      ),
    },
    {
      title: getLocaleMessages({id:"country.iso.label"}),
      dataIndex: "countryiso",
      key: "countryiso",
      render: (text, record) => (
        <Space size="middle">{record.countryiso}</Space>
      ),
    },
    {
      title: getLocaleMessages({id:"Status"}),
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
          {record.status ? <a>active </a> : <a>Inactive</a>}
        </Space>
      ),
    },
    {
      title: getLocaleMessages({id:"Actions"}),
      key: "action",

      render: (text, record) => {
        var text = text;

        return (
          <Space size="middle">
            <div className="edit">
              <EditOutlined
                name={text.id + "name"}
                id={text.id}
                onClick={() => {

                  store.dispatch({
                    type:actions.GET_COUNTRY,
                    id:text.id,
                    callBackAction: (status,data) => {
                       if(status) {
                          localStorage.setItem("countryData", JSON.stringify(data));
                          props.history.push({
                             pathname: "/admin/Country/update",
                          });
                       }
                    }
                  });
                }}
              />
            </div>
            <div className="delete">
              <DeleteOutlined
                name={text.id + "name"}
                id={text.id}
                onClick={() => {
                  let id = parseInt(text.id);

                  SweetAlert.sweetConfirmHandler(
                    id,
                    "address",
                    "DELETE_COUNTRY"
                  );
                }}
              />
            </div>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Row>
        <Col offset={0} xs={22} md={22} lg={22} className="dashboard-content mg-auto">
          <Card title={"Country"}
           //title={getLocaleMessages({ id: "country.title" })}

          extra={
            <Button
               type="primary"
               htmlType="create"
               onClick={() => setVisible(true)}
               className="save-btn"
            >
                  {getLocaleMessages({id:'common.create'})}
            </Button>
         }
         >
            <div>
              <Row>
                <Col span={24} className="inner-content">
                  {/* <Table columns={columns} dataSource={categoryList} /> */}
                  <Spin size="large" spinning={loading}>
                    <DataTable columns={columns} dataSource={countryList} />
                  </Spin>
                </Col>
              </Row>
            </div>
            <CreateCountry
              modalVisible={visible}
              setModalVisible={setVisible}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Country;
