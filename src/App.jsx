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
import Checkout from './user/components/Checkout/Checkout';
import CheckoutSuccess from './sections/CheckoutSuccess';
import CheckoutFailure from './sections/CheckoutFailure';
import Order from './user/components/Orders/Order';
import OrderDetail from './user/components/Orders/OrderDetail';
import KommunicateChat from './user/components/ChatBot/chat';
import { useSelector } from 'react-redux';

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
        path: routes.checkout,
        element: <Checkout />,
    },
    {
        path: routes.orders,
        element: <Order />,
    },
    {
        path: routes.orderDetail,
        element: <OrderDetail />,
    },
    {
        path: routes.checkoutSuccess,
        element: <CheckoutSuccess />,
    },
    {
        path: routes.checkoutFailure,
        element: <CheckoutFailure />,
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
    const { user } = useSelector((store) => ({
        user: store.auth.user,
    }));

    return (
        <>
            <RouterProvider router={router} />
            <KommunicateChat user={user} />
        </>
    );
}

export default App;
