const routes = {
    home: '/',
    signIn: '/sign-in',
    signUp: '/sign-up',
    categoryLevel: '/:category/:subcategory/:item',
    bookDetail: '/book/:bookRequestId',
    searchBook: '/book/search/:searchValue',
    cart: '/cart',
    orders: 'orders',
    checkout: '/checkout',
    checkoutSuccess: '/payment/success',
    checkoutFailure: '/payment/failure',
    adminSighIn: '/admin/sign-in',
    admin: '/admin',
    pageNotFound: '404',
    any: '*',
    unAuthorize: '/401',
};
export default routes;
