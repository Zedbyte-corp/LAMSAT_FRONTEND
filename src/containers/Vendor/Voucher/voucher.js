import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Table, Space, Card, Spin } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "assets/css/dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/vendor/Voucher/actions";
import { store } from "redux/store";
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import CreateVoucherModal from "./CreateVoucherModal";

const Voucher = (props) => {
  const [visible, setVisible] = useState(false);
  const [listLoader, setlistLoader] = useState(false);
  const { vendorVoucherList } = useSelector((state) => state.VendorVoucher);
  const { loading, deleteLoader } = useSelector((state) => state.VendorVoucher);
  useEffect(() => {
    setlistLoader(true);
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_LIST,
      callBackAction: (res) => {
        setlistLoader(false);
      },
    });
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_CODE,
      callBackAction: (res) => {
        setlistLoader(false);
      },
    });
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_APP_TYPE,
      callBackAction: (res) => {
        setlistLoader(false);
      },
    });
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_TYPE,
      callBackAction: (res) => {
        setlistLoader(false);
      },
    });
    store.dispatch({
      type: actions.GET_VENDOR_VOUCHER_LANGUAGE_LIST,
      callBackAction: (res) => {
        setlistLoader(false);
      },
    });
  }, [deleteLoader]);

  const columns = [
    {
      title: "Voucher  Name",
      dataIndex: "vouchername",
      key: "vouchername",
      onFilter: (value, record) => record.vouchername.indexOf(value) === 0,
      sorter: (a, b) => a.vouchername.length - b.vouchername.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Voucher Code",
      dataIndex: "vouchercode",
      key: "vouchercode",
    },
    {
      title: "Value",
      dataIndex: "vouchervalue",
      key: "vouchervaluevouchervalue",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       {record.status ? <a>Active </a> : <a>Inactive</a>}
    //     </Space>
    //   ),
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
                  localStorage.setItem(
                    "vendorVoucherData",
                    JSON.stringify(text)
                  );
                  props.history.push({
                    pathname: "/vendor/voucher/update",
                  });
                }}
              />
            </div>
            <div className="delete">
              <DeleteOutlined
                name={text.id + "name"}
                id={text.id}
                onClick={() => {
                  let id = parseInt(text.voucherid);
                  SweetAlert.sweetConfirmHandler(
                    id,
                    "voucher",
                    "DELETE_VENDOR_VOUCHER"
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
        <Col span={24} className="dashboard-content vendor">
          <Card
            title="Vouchers"
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
            <Spin size="large" spinning={loading}>
              <DataTable columns={columns} dataSource={vendorVoucherList} />
            </Spin>

            <CreateVoucherModal
              modalVisible={visible}
              setModalVisible={setVisible}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Voucher;
