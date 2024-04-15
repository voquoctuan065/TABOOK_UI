import NotFoundView from './NotFoundView';
import { Helmet } from 'react-helmet-async';
function PageNotFound() {
    return (
        <>
            <Helmet>
                <title> 404 Page Not Found </title>
            </Helmet>
            <NotFoundView />
        </>
    );
}

export default PageNotFound;
