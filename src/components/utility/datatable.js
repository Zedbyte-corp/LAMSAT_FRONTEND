import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Tabs, Form, Input, Button, message, Space, Select, InputNumber, Checkbox, Radio, Table } from 'antd';
import { getLocaleMessages } from 'redux/helper';
//import Hoom from 'helpers/hoom';
import Actions from 'redux/admin/Administrator/actions';
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const DataTable = (props) => {

  const { selectedRowKeys,searchedColumn,fromPageNo } = useSelector((state) => state.Administrator);
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
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
          <Button>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              dispatch({
                type: Actions.ASSIGN_SERCHED_DATA,
                value: selectedKeys[0],
                value1: dataIndex,
                  })
              }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        text
      ) : (
        text
      ),
  });
  const incrementNumber = () => {
    let i = fromPageNo;
    return (index) => {
      index = index+1;
       if (getPage === 1) {
           return index;
        }
        return (getPage - 1) * 10 + index;
    };
};

const fromCurrentIndex = incrementNumber();
  const columns = [
    {
      title:"Index",
      key:"index",
      render: (text, record, index) => {  return fromCurrentIndex(index);  }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const dataArr = [];
  for (let i = 0; i < 46; i++) {
    if(i>2 && i%2 == 0){
    dataArr.push({
      key: i,
      name: `Onion King ${i}`,
      age: 32,
      address: `New York, Park Lane no USA. ${i}`,
    });
  }else{
    dataArr.push({
      key: i,
      name: `Edward Queen ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: Actions.ASSIGN_SERCHED_DATA,
      value: selectedKeys[0],
      value1: dataIndex,
  })

  };
    return (
        <Card>
          <div>
            <h4>{getLocaleMessages({ id: 'title.profileInformation' })}</h4>
            <Table columns={columns} dataSource={dataArr} pagination={{
              onChange(current) {
                setPage(current);
              }
            }}/>
          </div>
        </Card>
    )
        }

        export default DataTable;
