import { Grid } from '@mui/material';
import OrderCard from './OrderCard';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';

const orderStatus = [
    { label: 'Delivered', value: 'delivered' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Returned', value: 'returned' },
];

export default function Order() {
    const navigate = useNavigate();
    const { user } = useSelector((store) => ({
        user: store.auth.user,
    }));

    useEffect(() => {
        if (!user) {
            navigate(routes.signIn);
        }
    }, [user]);
    return (
        <>
            <Helmet>
                <title>Đơn hàng của tôi</title>
            </Helmet>
            <Navbar />
            <div className="bg-gray-200 pt-5">
                <div className="px-5 lg:px-20">
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Grid item xs={2.5}>
                            <div className="h-auto shadow-lg bg-white p-5 top-5">
                                <h1 className="font-bold text-lg">Filter</h1>
                                <div className="space-y-4 mt-10">
                                    <h1 className="font-semibold">Order status</h1>
                                    {orderStatus.map((option) => (
                                        <div key={option.value} className="flex items-center">
                                            <input
                                                defaultValue={option.value}
                                                type="checkbox"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label className="ml-3 text-sm text-gray-600" htmlFor={option.value}>
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={9}>
                            <div className="space-y-5 ">
                                {[1, 1, 1, 1].map((item) => (
                                    <OrderCard key={item} />
                                ))}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <Footer />
        </>
    );
}
