import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Menu } from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import { DashboardOutlined } from '@ant-design/icons';

import 'assets/css/dashboard.scss';

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

function SidebarMenu({ singleOption, ...rest }) {
  let match = useRouteMatch();
  const { key, label, leftIcon } = singleOption;
  const url = stripTrailingSlash(match.url);

  return (
    <Menu.Item key={key} {...rest}>
      <DashboardOutlined />
      <Link to={`${url}/${key}`}>
        <span>
          {/* <img src={leftIcon} alt={key} /> */}
          <span className="sidebar-menu-item">
            <IntlMessages id={label} />
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
}

export default SidebarMenu;
