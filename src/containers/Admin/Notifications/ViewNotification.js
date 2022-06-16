import { Row, Spin, Col, Card } from 'antd';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import actions from 'redux/Notifications/actions';
import { store } from 'redux/store';

export default function ViewNotification() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      store.dispatch({
        type: actions.GET_NOTIFICATION,
        payload: { id: id },
      });
    }
  }, [id]);

  const { loader, notification } = useSelector(
    (state) => state.ViewNotification
  );
  console.log('id', id, loader, notification);
  return (
    <Spin spinning={loader}>
      <Row>
        <Col
          offset={0}
          xs={24}
          md={24}
          lg={24}
          className="dashboard-content mg-auto"
        >
          <Card title={notification?.notification_title?.en}>
            <p style={{ fontSize: 16, marginBottom: 0 }}>
              {notification?.notification_content?.en}
            </p>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
}
