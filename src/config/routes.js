const routes = {
    home: '/',
    signIn: '/sign-in',
    signUp: '/sign-up',
    categoryLevel: '/:category/:subcategory/:item',
    searchBook: '/book/search/:searchValue',
    bookDetail: '/book/:bookRequestId',
    adminSighIn: '/admin/sign-in',
    admin: '/admin',
    pageNotFound: '404',
    any: '*',
    unAuthorize: '/401',
};
export default routes;
