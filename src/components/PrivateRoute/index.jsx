import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from 'context';
import { PATH } from 'constants';

const PrivateRoute = () => {
  const { user } = useContext(authContext);
  return user ? <Outlet /> : <Navigate to={`/${PATH}`} />;
};

export default PrivateRoute;