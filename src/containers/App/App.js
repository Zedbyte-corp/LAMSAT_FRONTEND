import React from 'react';
import { Layout } from 'antd';
import AppRouter from 'routes/AppRouter';
import Sidebar from 'containers/Sidebar/Sidebar';
import VendorSidebar from 'containers/Sidebar/VendorSidebar';
// import { history, store } from 'redux/store';
// import actions from 'redux/app/actions';
import Header from 'containers/Layouts/Header';
import CustomerHeader from 'containers/Layouts/CustomerHeader';
import { getLocalDataType } from 'redux/helper';

const { Content } = Layout;

function App(props) {
  const { location } = props;

  return (
    <Layout>
      { getLocalDataType() === 'user' ? <CustomerHeader/> :<Header /> }
      <Layout>
        {location.pathname.startsWith('/admin/') && getLocalDataType() === 'admin' && <Sidebar />}
        {location.pathname.startsWith('/vendor/') && getLocalDataType() === 'vendor' && <VendorSidebar />}
        <Content>
          <div className={'layout-content'}>
            <AppRouter />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
