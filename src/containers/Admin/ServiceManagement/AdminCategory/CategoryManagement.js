import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Button,
  Table,
  Space,
  Card,
  Spin,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getLocaleMessages } from "redux/helper";
import { useSelector, useDispatch } from "react-redux";
import "assets/css/dashboard.scss";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import actions from "redux/vendor/Services/actions";
import { store } from "redux/store";
import swal from "sweetalert";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import adminActions from "redux/admin/Administrator/actions";

const { Column, ColumnGroup } = Table;

const CategoryManagement = (props) => {
  const { catmgmttype } = useParams();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [categoryObj, setCategoryObj] = useState({});
  const [categoryId, setCategoryId] = useState();
  const { categoryList, categorylistloader } = useSelector((state) => state.Services);
  const { loading } = useSelector((state) => state.Services);
  const { stop } = useSelector((state) => state.Services);

  useEffect(() => {
    store.dispatch({
      type: actions.GET_CATEGORY_LIST_ADMIN
      //type: actions.GET_CATEGORY_LIST,
    });
  }, [props, categoryId]);

  const handleChangeVedor = (args) => {
    var s = args.split(",");

    store.dispatch({
      type: actions.UPDATE_ADMIN_CATEGORY_ENTRY,
      id: parseInt(s[0]),
      field: s[1],
      vendorid: parseInt(s[2]),
    });
  };
  const columns = [
    {
      title: "Category Name",
      dataIndex: "language.categoryname",
      key: "language.categoryname",
      onFilter: (value, record) => record.categoryname.indexOf(value) === 0,
      sorter: (a, b) => a.categoryname.length - b.categoryname.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <Space size="middle">{record.language[0].categoryname}</Space>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {record.status ? <a>active </a> : <a>Inactive</a>}
    //     </Space>
    //   ),
    // },

    // {
    //   title: 'Permission',
    //   dataIndex: 'permission',
    //   key: 'permission',
    //   render: (text, record) => {
    //     return (<div>
    //       {(record.permission == 'Pending') ? <Select

    //         placeholder='Select Permission'
    //         onChange={handleChangeVedor}
    //       > <option value={record.id + ',Approved,' + record.created_by}>Approve</option><option value={record.id + ',Rejected'}>Reject</option>

    //       </Select> : record.permission}</div>)
    //   }
    // },
    {
      title: "Action",
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
                  localStorage.setItem("categoryData", JSON.stringify(text));
                  props.history.push({
                    pathname: "/admin/Category/update?id=" + text.id,
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
                    "service",
                    "DELETE_CATEGORY"
                  );
                }}
              />
            </div>
          </Space>
        );
      },
    },
  ];
  const btnClick = (id) => {
    if (parseInt(categoryId) === id) {
      props.history.push({
        pathname: "/admin/Category/update",
      });
    }
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
            //title={getLocaleMessages({ id: "category.title" })}
            title={"Category"}
            extra={
              <Button
                type="primary"
                htmlType="create"
                onClick={() => setVisible(true)}
                className="save-btn"
              >
                Create
              </Button>
            }
          >
            <div>
              <Col span={24} className="inner-content">
                {/* <Table columns={columns} dataSource={categoryList} /> */}
                <Spin size="large" spinning={categorylistloader}>
                  <DataTable columns={columns} dataSource={categoryList} />
                </Spin>
              </Col>
            </div>
            {
              visible &&
              <CreateCategory
              modalVisible={visible}
              setModalVisible={setVisible}
            />
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryManagement;
