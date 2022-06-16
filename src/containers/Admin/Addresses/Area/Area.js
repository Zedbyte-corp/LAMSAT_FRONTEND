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
import CreateArea from "./CreateArea";
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

const Area = (props) => {
  const [visible, setVisible] = useState(false);
  const { RangePicker } = DatePicker;
  const { areaList } = useSelector((state) => state.Address);
  const { loading } = useSelector((state) => state.Services);
  const { languageChange } = useSelector((state) => state.Auth);
  const lang = localStorage.getItem("site_language");

  useEffect(() => {
    store.dispatch({
      type: actions.GET_ADMIN_AREA_LIST,
    });
    if(languageChange) {
      store.dispatch({
        type: actions.GET_ADMIN_AREA_LIST,
      });
    }
  }, [languageChange]);

  const columns = [
    {
      title: getLocaleMessages({id:'area.name'}),
      dataIndex: "areaname",
      key: "areaname",
      render: (text, record) => (
         <Space size="middle">{record.areaname}</Space>
      ),
    },
    {
      title: getLocaleMessages({id:'Status'}),
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
          {record.status ? <a>active </a> : <a>Inactive</a>}
        </Space>
      ),
    },
    {
      title: getLocaleMessages({id:'Actions'}),
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
                    type:actions.GET_AREA,
                    id:text.id,
                    callBackAction: (status,data) => {
                       if(status) {
                          localStorage.setItem("areaData", JSON.stringify(data));
                          props.history.push({
                            pathname: "/admin/Area/update",
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
                    "DELETE_AREA"
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
          <Card title={"Area"}
          //title={getLocaleMessages({ id: "area.title" })}

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
                <Col span={24} className="inner-content">
                  {/* <Table columns={columns} dataSource={categoryList} /> */}
                  <Spin size="large" spinning={loading}>
                    <DataTable columns={columns} dataSource={areaList} />
                  </Spin>
                </Col>
            </div>
            <CreateArea
              modalVisible={visible}
              setModalVisible={setVisible}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Area;
