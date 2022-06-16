// CategoryPage Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Tabs, Form, Input, Button, message, Space, Select, InputNumber, Checkbox, Radio, Table } from 'antd';
import { getLocaleMessages } from 'redux/helper';
//import Hoom from 'helpers/hoom'; 
import Dayz from 'dayz';
// could also import the sass if you have a loader at dayz/dayz.scss
//import 'dayz/dist/styles.css';
import moment from 'moment';

import Actions from 'redux/admin/PageContent/actions';
import 'assets/css/dashboard.scss';
import 'assets/css/dayz.scss';
import DataTable from "helpers/datatable";
import SweetAlert from "helpers/sweetalert";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
//import Highlighter from 'react-highlight-words';
//import { SearchOutlined } from '@ant-design/icons';
const Calendar = (props) => {
  const { cmsLists,isPagemanagement } = useSelector((state) => state.PageContent);
  const [getPage, setPage] = React.useState(1);
  const dispatch = useDispatch();  
  moment(date, "DD-MM-YYYY").add(5, 'days');
  const dataArr = [];    
  var date2 = new Date();
  var date = moment(date2).format('YYYY-MM-DD');
  const EVENTS = new Dayz.EventsCollection([
    { content: 'A short event',
      resizable: { step: 1 },
      range: moment.range( date,
        moment(date, "DD-MM-YYYY").add(1, 'days') ) },
    { content: 'Two Hours ~ 8-10',
      resizable: { step: 1 },
      range: moment.range( moment(date).hour(8),
      moment(date).hour(10) ) }
   /* { content: "A Longer Event",
      range: moment.range( date.subtract(2,'days'),
                           date.add(8,'days') ) }*/
]);


    return (
      <div>
      <Row>
        <Col span={24} className="dashboard-content">
        <Card>
            <div>
                <h4>{getLocaleMessages({ id: 'CMS' })}</h4>
                <Button type="primary" htmlType="submit" className="save-btn" >
                Create
                </Button>
                <Dayz
                display='week'
                date={date}
                events={EVENTS}
            />

            </div>
            </Card>
            </Col>
            </Row>
            </div>
    )
        }

        export default Calendar;
 






