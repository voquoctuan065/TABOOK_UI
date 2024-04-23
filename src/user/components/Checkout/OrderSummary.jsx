import { Box, Button, Grid } from '@mui/material';
import AddressCard from '../AddressCard/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderById } from '../../../State/Order/Action';
import { useLocation } from 'react-router-dom';

export default function OrderSummary() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { order } = useSelector((store) => ({ order: store.order.order }));

    const searchParams = new URLSearchParams(location.search);

    const deliveryCharge = order.orderItem.length > 0 ? 20000 : 0;

    const orderId = searchParams.get('order_id');
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId]);
    console.log(order);
    return (
        <>
            <div className="p-5 rounded-lg bg-white mb-2">
                <div className="font-bold text-lg mb-2">Thông tin địa chỉ giao hàng</div>
                <AddressCard address={order?.shippingAddress} />
            </div>

            <Grid container className="pb-4">
                <Grid item xs={9} sx={{}}>
                    <div className="bg-white rounded-lg pb-3">
                        <div className="font-bold text-lg p-3">Thông tin sản phẩm</div>
                        {order.orderItem &&
                            order.orderItem.map((item) => (
                                <div key={item.orderId} className="border m-2 px-2 rounded-lg">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="w-[5rem] h-[7rem] lg:w-[5rem] lg:h-[7rem] overflow-hidden rounded ml-3 py-[5px]">
                                            <img
                                                className="w-full h-full object-cover object-top transition-transform duration-300 transform hover:scale-90"
                                                src={item.books.bookImage}
                                                alt=""
                                            />
                                        </div>
                                        <span className="max-w-[200px] inline-block overflow-hidden whitespace-nowrap text-ellipsis">
                                            {item.books.bookTitle}
                                        </span>

                                        <div className="flex space-x-5 items-center text-gray-900">
                                            <p className="font-semibold">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.books.discountedPrice)}
                                            </p>
                                            <p className="opacity-50 line-through">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.books.bookPrice)}
                                            </p>
                                            <Box
                                                sx={{
                                                    width: '50px',
                                                    color: 'white',
                                                    padding: '2px 4px',
                                                    borderRadius: '5px',
                                                    backgroundColor: '#FC427B',
                                                }}
                                            >
                                                -{item.books.discountPercent}%
                                            </Box>
                                        </div>
                                        <div className="">
                                            <span className="font-semibold">Số lượng: </span>
                                            <span className="text-red-500 font-semibold">{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        <div className="mt-3 px-2 flex justify-end">
                            <div className="mr-4">
                                <span className="font-semibold">Tổng số sản phẩm: </span>
                                <span className="text-red-500 font-semibold">{order.totalItem}</span>
                            </div>
                            <div className="mr-2">
                                <span className="font-semibold mr-2">Tổng đơn giá:</span>
                                <span className="text-red-500 font-semibold">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(order.totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="bg-white rounded-lg ml-[10px] p-3">
                        <div className="font-bold text-lg">Thông tin thanh toán</div>

                        <div className="my-2 rounded-lg space-y-2">
                            <div className="flex justify-between pt-3 text-black">
                                <span className="font-semibold text-sm">Đơn giá</span>
                                <span className="text-m">
                                    {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(order.totalPrice)}
                                </span>
                            </div>

                            <div className="flex justify-between pt-3 text-black">
                                <span className="font-semibold text-sm">Phí Ship</span>
                                <span className="text-green-600">
                                    {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(deliveryCharge)}
                                                                  </span>
                            </div>
                            <div className="flex justify-between pt-3 text-black">
                                <span className="font-semibold text-sm">Tổng tiền</span>
                                <span className="text-green-600 font-semibold">
                                    {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(order.totalPrice + deliveryCharge)}
                                </span>
                            </div>

                            <Button
                                // onClick={handleCheckout}
                                variant="outlined"
                                color='warning'
                                className="w-full"
                                sx={{ px: '1.5rem', py: '.7rem' }}
                            >
                                Thanh toán khi nhận hàng
                            </Button>
                            <Button
                                // onClick={handleCheckout}
                                variant="outlined"
                                color='secondary'
                                className="w-full"
                                sx={{ px: '1.5rem', py: '.7rem' }}
                            >
                                Thanh toán qua thẻ
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
