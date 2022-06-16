import React from 'react';
import { Route, Switch } from 'react-router-dom';
import privateRoutes from 'routes/privateRoutes';
import { getLocalDataType } from 'redux/helper';

const AppRouter = (props) => {
  return (
    <Switch>
      {privateRoutes[['admin', 'vendor'].includes(getLocalDataType())? `${getLocalDataType()}` :'user'].map((singleRoute) =>

      <Route
        exact={true}
        key={singleRoute.path}
        path={`${['admin','vendor'].includes(getLocalDataType()) ? `/${getLocalDataType()}` : ''}/${singleRoute.path}`}
        component={singleRoute.component}
      />
    )}
    {['vendor','admin'].includes(getLocalDataType()) && privateRoutes['common'].map((singleRoute) =>
      <Route
        exact={true}
        key={singleRoute.path}
        path={`/${singleRoute.path}`}
        component={singleRoute.component}
      />
    )}
    </Switch>
  );
};

export default AppRouter;
