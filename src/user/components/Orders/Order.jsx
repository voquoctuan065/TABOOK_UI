/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import routes from '../../../config/routes';
import { deliveredOrder, getUserOrderHistory } from '../../../State/Order/Action';

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
            dispatch(getUserOrderHistory(jwt));
        }
    }, [jwt]);

    const handleOrderDetail = (orderId) => {
        navigate(`/orderDetail/${orderId}`);
    };

    const handleOrderComplete = (orderId) => {
        dispatch(deliveredOrder(orderId, jwt)).then(() => {
            dispatch(getUserOrderHistory(jwt));
        });
    };

    return (
        <>
            <Helmet>
                <title>Đơn hàng của tôi</title>
            </Helmet>
            <Navbar />
            <div className="bg-gray-200 pt-5 pb-5">
                <div className="px-5 lg:px-20">
                    {orders?.map((item) => (
                        <div
                            key={item.orderId}
                            className="flex items-center justify-between mt-4 py-4 px-2"
                            style={{
                                boxShadow:
                                    'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                            }}
                        >
                            <div>
                                {item.orderItemDto?.map((child) => (
                                    <div key={child.orderItemId} className="flex items-center">
                                        <img src={child.bookOrderDto.bookImage} alt="" className="w-[3.5rem]" />
                                        <span className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap inline-block max-w-[20rem]">
                                            {child.bookOrderDto.bookTitle}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div>
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
                            </div>

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
                                            : item.orderStatus === 'SHIPPING'
                                            ? 'Đang giao hàng'
                                            : 'Đã xác nhận'}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">Ngày order: </span>
                                    <span>{format(new Date(item.orderDate), 'dd/MM/yyyy HH:mm:ss')}</span>
                                </div>

                                {item.deliveryDate && (
                                    <div>
                                        <span className="font-semibold">Ngày nhận hàng: </span>
                                        <span>{format(new Date(item.deliveryDate), 'dd/MM/yyyy HH:mm:ss')}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                className="bg-slate-400 text-white px-[8px] py-[2px] rounded-sm"
                                onClick={() => handleOrderDetail(item.orderId)}
                            >
                                Xem chi tiết
                            </button>
                            {item.orderStatus === 'SHIPPING' && (
                                <button
                                    className="bg-cyan-400 text-white px-[8px] py-[2px] rounded-sm"
                                    onClick={() => handleOrderComplete(item.orderId)}
                                >
                                    Đã nhận được đơn hàng
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
