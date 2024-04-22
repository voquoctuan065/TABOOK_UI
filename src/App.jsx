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
import routes from './config/routes';
import Cart from './user/components/Cart/Cart';
const router = createBrowserRouter([
    {
        path: routes.home,
        element: <HomePage />,
    },
    {
        path: routes.cart,
        element: <Cart />,
    },
    {
        path: routes.signIn,
        element: <SignIn />,
    },
    {
        path: routes.signUp,
        element: <SignUp />,
    },
    {
        path: routes.categoryLevel,
        element: <Product />,
    },
    {
        path: routes.searchBook,
        element: <Product />,
    },
    {
        path: routes.bookDetail,
        element: <ProductDetail />,
    },
    { path: routes.adminSighIn, element: <AdminSignIn /> },
    { path: routes.admin, element: <DashBoard /> },
    { path: routes.pageNotFound, element: <PageNotFound /> },
    { path: routes.any, element: <Navigate to="/404" replace /> },
    { path: routes.unAuthorize, element: <UnAuthorize /> },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
