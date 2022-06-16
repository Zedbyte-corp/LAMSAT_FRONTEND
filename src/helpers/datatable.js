import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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
} from "antd";
import { getLocaleMessages } from "redux/helper";
//import Hoom from 'helpers/hoom';
import Actions from "redux/admin/Administrator/actions";
//import 'antd/dist/antd.css';
import { SearchOutlined } from "@ant-design/icons";
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const DataTable = (props) => {
  const { selectedRowKeys, searchedColumn, fromPageNo } = useSelector(
    (state) => state.Administrator
  );
  console.log("data2", props);
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)}>Reset</Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              dispatch({
                type: Actions.ASSIGN_SERCHED_DATA,
                value: selectedKeys[0],
                value1: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) => (searchedColumn === dataIndex ? text : text),
  });
  const incrementNumber = () => {
    let i = fromPageNo;
    return (index) => {
      index = index + 1;
      if (getPage === 1) {
        return index;
      }
      return (getPage - 1) * 10 + index;
    };
  };

  const fromCurrentIndex = incrementNumber();
  const columns = [
    {
      title: "SN",
      key: "index",
      render: (text, record, index) => {
        return fromCurrentIndex(index);
      },
    },
  ];
  /*props.dataSource.map((data,index) =>{
    data.statusvalue = (data.status =='1') ? 'dddd': 'ddddffff';
  })*/
  console.log("data1", props.columns, props.dataSource);
  props.columns.map((data, index) => {
    var name = data.dataIndex;
    var fil = data.filters;
    // console.log("data", data);
    let obj = {
      title: data.title,
      key: data.key,
      dataIndex: data.dataIndex,
      // onFilter: data.Flter,
      sorter: data.sorter,
      // filters:fil.length>0?data.filters:'',
      // filterMultiple: data.minFilter?true:false,
      //onFilter: data.minFilter? (value, data.dataIndex)=>data.dataIndex.indexOf(value) === 0:'',
      //onFilter:data.onFilter,
      render: data.render,
      //onFilter: (value, record) => data.record.indexOf(value) === 0,
      ...(data.Flter ? getColumnSearchProps(data.dataIndex) : ""),
    };
    columns.push(obj);
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: Actions.ASSIGN_SERCHED_DATA,
      value: selectedKeys[0],
      value1: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    // setSelectedKeys("");
  };
  const renderRow = (record, index) => {
    if (props.rowModify && props.field === 'RATING' ) {
      return (record.rating > 1 ? "" : "red")
    } else if (props.rowModify && props.field === 'BOOKING_STATUS') {
      return (record.booking_process === "Confirmed" ? "red" : "")
    }
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={props.dataSource}
        rowClassName={(record, index) => renderRow(record, index)}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
    </>
  );
};

export default DataTable;
