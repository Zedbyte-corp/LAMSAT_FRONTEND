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
  Table,
  Spin
} from "antd";
import { getLocaleMessages } from "redux/helper";
//import Hoom from 'helpers/hoom';
import Actions from "redux/admin/PageContent/actions";
import {
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
//import Highlighter from 'react-highlight-words';
import "assets/css/dashboard.scss";
const Home = (props) => {
  const { faqLists, isPagemanagement,submitLoader } = useSelector(
    (state) => state.PageContent
  );
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPagemanagement) {
      dispatch({
        type: Actions.GET_FAQ_LIST,
      });
    }
  }, [faqLists]);

  console.log("this is the value of faqLists", faqLists);

  faqLists &&
    faqLists.length > 0 &&
    faqLists.map((list, id) => {
      list.statusvalue = list.status == 1 ? "Active" : "inActive";
      list.language &&
        list.language.length > 0 &&
        list.language.map((lt, i) => {
          if (i == 0) {
            list.question = lt.question;
            list.answer = lt.answer;
          }
        });
      return list;
    });
  console.log("this is the value of faqLists", faqLists);

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      Flter: true,
      onFilter: (value, record) => record.question.indexOf(value) === 0,
      sorter: (a, b) => a.question.length - b.question.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "statusvalue",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      dataIndex: "pagetitle",
      key: "x",
      render: (text, record) => {
        var record = record;
        return (
          <Space size="middle">
            <DeleteOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                SweetAlert.sweetConfirmHandler(id, "PageContent", "DELETE_FAQ");
              }}
            />
            <EditOutlined
              id={record.id}
              onClick={(e) => {
                let id = parseInt(record.id);
                onEdit(id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const onEdit = (id) => {
    props.history.push("/admin/faq/update?id=" + id);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: Actions.ASSIGN_SERCHED_DATA,
      value: selectedKeys[0],
      value1: dataIndex,
    });
  };

  const movetopage = () => {
    props.history.push("/admin/faq/create");
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
          <Card
            title={getLocaleMessages({ id: "FAQs" })}
            extra={
              <Button
                type="primary"
                htmlType="submit"
                onClick={movetopage}
                className="save-btn"
              >
                Create
              </Button>
            }
          >
            <div>
              <Spin spinning={submitLoader} size="large">
                <DataTable columns={columns} dataSource={faqLists} />
              </Spin>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
