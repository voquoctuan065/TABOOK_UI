import { Button, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import routes from '../../../config/routes';
import { getUserOrderHistory } from '../../../State/Order/Action';

export default function Order() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders } = useSelector((store) => ({
        orders: store.order.orders,
    }));

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (!jwt) {
            navigate(routes.signIn);
        } else {
            dispatch(getUserOrderHistory());
        }
    }, [jwt]);

    const handleOrderDetail = (orderId) => {
        navigate(`/orderDetail/${orderId}`);
    };

    return (
        <>
            <Helmet>
                <title>Đơn hàng của tôi</title>
            </Helmet>
            <Navbar />
            <div className="bg-gray-200 pt-5 pb-5">
                <div className="px-5 lg:px-20">
                    <Grid container>
                        <Grid item xs={12}>
                            <div className="space-y-5 p-5 shadow-lg hover:shadow-2xl bg-white rounded-lg">
                                {orders?.map((item) => (
                                    <Grid
                                        key={item.orderId}
                                        container
                                        spacing={2}
                                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <Grid item xs={5}>
                                            {item.orderItem.map((child) => (
                                                <div key={child.orderItemId} className="flex items-center">
                                                    <img src={child.books.bookImage} alt="" className="w-[3.5rem]" />
                                                    <span className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap inline-block max-w-[20rem]">
                                                        {child.books.bookTitle}
                                                    </span>
                                                </div>
                                            ))}
                                        </Grid>

                                        <Grid item xs={2}>
                                            <div className="flex">
                                                <span className="mr-[5px] font-semibold">Tổng tiền: </span>
                                                <span>
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item.totalPrice)}
                                                </span>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-[5px] font-semibold">Tổng số lượng: </span>
                                                <span>{item.totalItem}</span>
                                            </div>
                                        </Grid>

                                        <Grid item xs={5} className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <div>
                                                    <span className="font-semibold">Trạng thái: </span>
                                                    <span>
                                                        {item.orderStatus === 'PENDING'
                                                            ? 'Chờ xác nhận'
                                                            : item.orderStatus === 'CANCELLED'
                                                            ? 'Đã huỷ'
                                                            : item.orderStatus === 'DELIVERED'
                                                            ? 'Đã giao hàng'
                                                            : 'Đã xác nhận'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="font-semibold">Ngày order: </span>
                                                    <span>
                                                        {format(new Date(item.orderDate), 'dd/MM/yyyy HH:mm:ss')}
                                                    </span>
                                                </div>

                                                {item.deliveryDate && (
                                                    <div>
                                                        <span className="font-semibold">Ngày nhận hàng: </span>
                                                        <span>
                                                            {format(new Date(item.deliveryDate), 'dd/MM/yyyy HH:mm:ss')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <Button
                                                onClick={() => handleOrderDetail(item.orderId)}
                                                variant="contained"
                                                color="error"
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </Grid>
                                    </Grid>
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
