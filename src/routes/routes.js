import Cart from '../customer/components/Cart/Cart';
import Checkout from '../customer/components/Checkout/Checkout';
import Order from '../customer/components/Order/Order';
import OrderDetail from '../customer/components/Order/OrderDetail';
import Product from '../customer/components/Product/Product';
import ProductDetail from '../customer/components/ProductDetail/ProductDetail';
import HomePage from '../customer/pages/HomePage';
import SignIn from '../customer/pages/SignIn';
import SignUp from '../customer/pages/SignUp';

const publicRoutes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/sign-up',
        component: SignUp,
    },
    {
        path: '/sign-in',
        component: SignIn,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/:levelOne/:levelTwo/:levelThree',
        component: Product,
    },
    {
        path: '/product/:productId',
        component: ProductDetail,
    },
    {
        path: '/checkout',
        component: Checkout,
    },
    {
        path: '/account/order',
        component: Order,
    },
    {
        path: '/account/order/:orderId',
        component: OrderDetail,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
