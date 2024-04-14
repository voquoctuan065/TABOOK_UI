import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './user/pages/HomePage';
import DashBoard from './admin/pages/DashBoard';
import SignIn from './user/pages/SignIn';
import SignUp from './user/pages/SignUp';
import AdminSignIn from './admin/pages/AdminSignIn';

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
    { path: '/admin/sign-in', element: <AdminSignIn /> },
    { path: '/admin', element: <DashBoard /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
