import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// import HomePage from './user/pages/HomePage';
// import DashBoard from './admin/pages/DashBoard';
// import SignIn from './user/pages/SignIn';
// import SignUp from './user/pages/SignUp';
// import AdminSignIn from './admin/pages/AdminSignIn';
// import PageNotFound from './sections/PageNotFound';
// import UnAuthorize from './sections/UnAuthorize';
// import Product from './user/components/Product/Product';
// import ProductDetail from './user/components/ProductDetail/ProductDetail';
import routes from './config/routes';
import { lazy, Suspense } from 'react';
// import Cart from './user/components/Cart/Cart';
// import Checkout from './user/components/Checkout/Checkout';
// import CheckoutSuccess from './sections/CheckoutSuccess';
// import CheckoutFailure from './sections/CheckoutFailure';
// import Order from './user/components/Orders/Order';

import { SpinStretch } from 'react-cssfx-loading';

import HomePage from './user/pages/HomePage';
const DashBoard = lazy(() => import('./admin/pages/DashBoard'));
const SignIn = lazy(() => import('./user/pages/SignIn'));
const SignUp = lazy(() => import('./user/pages/SignUp'));
const AdminSignIn = lazy(() => import('./admin/pages/AdminSignIn'));
const PageNotFound = lazy(() => import('./sections/PageNotFound'));
const UnAuthorize = lazy(() => import('./sections/UnAuthorize'));
const Product = lazy(() => import('./user/components/Product/Product'));
const ProductDetail = lazy(() => import('./user/components/ProductDetail/ProductDetail'));
const Cart = lazy(() => import('./user/components/Cart/Cart'));
const Checkout = lazy(() => import('./user/components/Checkout/Checkout'));
const CheckoutSuccess = lazy(() => import('./sections/CheckoutSuccess'));
const CheckoutFailure = lazy(() => import('./sections/CheckoutFailure'));
const Order = lazy(() => import('./user/components/Orders/Order'));

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
    return (
        <Suspense
            fallback={
                <div className="h-[100vh] flex items-center justify-center">
                    <SpinStretch color="blue" width="100px" height="100px" duration="2s" className="mx-auto" />
                </div>
            }
        >
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
