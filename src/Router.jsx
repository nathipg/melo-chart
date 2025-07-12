import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createHashRouter, Navigate, RouterProvider, useLocation, useNavigate, useSearchParams } from 'react-router';

import { Default } from './layouts';
import { Chart, Home, Login } from './pages';
import { UserSlice } from './store/slices';

const CheckLoginRedirectRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);

  useEffect(() => {
    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || '/';

      navigate(redirectUrl, { replace: true });
    }
  }, [ isLoggedIn, navigate, searchParams ]);

  return children;
};

const ProtectedRoute = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [ searchParams ] = useSearchParams();

  const isLoggedIn = useSelector(UserSlice.selectors.isLoggedIn);
  const isLoginVerificationComplete = useSelector(UserSlice.selectors.isLoginVerificationComplete);

  useEffect(() => {
    if (!isLoggedIn) {
      const currentPath = location.pathname + location.search;
      const urlParam = isLoginVerificationComplete ? '' : `?url=${currentPath}`;

      navigate(`/login${urlParam}`, { replace: true });
    }

    if(isLoggedIn) {
      const redirectUrl = searchParams.get('url') || null;

      redirectUrl && navigate(redirectUrl, { replace: true });
    }
  }, [ isLoggedIn, isLoginVerificationComplete, location.pathname, location.search, navigate, searchParams ]);

  return children;
};

const router = createHashRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <CheckLoginRedirectRoute>
            <Login />
          </CheckLoginRedirectRoute>
        ),
      },
      {
        path: 'chart',
        element: (
          <ProtectedRoute>
            <Chart />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};

export { Router };
