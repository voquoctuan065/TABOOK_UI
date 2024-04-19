import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './user/pages/HomePage';
import DashBoard from './admin/pages/DashBoard';
import SignIn from './user/pages/SignIn';
import SignUp from './user/pages/SignUp';
import AdminSignIn from './admin/pages/AdminSignIn';
import PageNotFound from './sections/PageNotFound';
import UnAuthorize from './sections/UnAuthorize';
import Product from './user/components/Product/Product';
import ProductDetail from './user/components/ProductDetail/ProductDetail';
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/:category/:subcategory/:item',
        element: <Product />,
    },
    {
        path: '/book/:bookRequestId',
        element: <ProductDetail />,
    },
    { path: '/admin/sign-in', element: <AdminSignIn /> },
    { path: '/admin', element: <DashBoard /> },
    { path: '404', element: <PageNotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '/401', element: <UnAuthorize /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
