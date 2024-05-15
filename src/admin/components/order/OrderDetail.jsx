/* eslint-disable react/prop-types */

import { Helmet } from 'react-helmet-async';
import AddressCard from '../../../user/components/AddressCard/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderById } from '../../../State/Order/Action';
import HeadlessTippy from '@tippyjs/react/headless';
import { Box, styled } from '@mui/material';
import { motion, useSpring } from 'framer-motion';
const BoxFramer = styled(motion.div)`
    background: #282c34;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
`;

function OrderDetail({ selectedOrderId }) {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('adminJwt');
    const { order } = useSelector((store) => ({
        order: store.order.order,
    }));

    useEffect(() => {
        dispatch(getOrderById(selectedOrderId, jwt));
    }, [dispatch, selectedOrderId, jwt]);

    const initialScale = 0.5;
    const springConfig = { damping: 15, stiffness: 300 };
    const opacity = useSpring(0, springConfig);
    const scale = useSpring(initialScale, springConfig);

    function onMount() {
        scale.set(1);
        opacity.set(1);
    }

    function onHide({ unmount }) {
        const cleanup = scale.on('change', (value) => {
            if (value <= initialScale) {
                cleanup();
                unmount();
            }
        });

        scale.set(initialScale);
        opacity.set(0);
    }
    return (
        <>
            <Helmet>
                <title>Chi tiết đơn hàng</title>
            </Helmet>

            <div className="text-center font-semibold text-2xl mb-3">Chi tiết đơn hàng</div>

            <div className="px-5 lg:pl-20 bg-gray-200 justify-center pt-5 pb-5">
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-md p-5 border shadow-xl">
                        <div className="font-semibold text-lg text-center mb-4">Địa chỉ giao hàng</div>
                        <AddressCard address={order.shippingAddress} />
                    </div>
                    <div className="col-span-2">
                        {order?.orderItemDto?.map((item) => (
                            <div
                                key={item.orderItemId}
                                className="bg-white shadow-xl rounded-md p-5 border w-full mb-4"
                            >
                                <div className="flex items-center">
                                    <div className="w-[4rem] lg:w-[4rem] lg:h-[6rem] overflow-hidden rounded ml-3 py-[5px]">
                                        <img
                                            className="w-full h-full object-cover object-top transition-transform duration-300 transform hover:scale-90"
                                            src={item.bookOrderDto.bookImage}
                                            alt=""
                                        />
                                    </div>

                                    <div className="space-y-1 max-w-[350px] w-full ml-4">
                                        <div className="overflow-hidden text-wrap whitespace-nowrap block w-full">
                                            <HeadlessTippy
                                                render={(attrs) => (
                                                    <BoxFramer tabIndex="-1" style={{ scale, opacity }} {...attrs}>
                                                        <span>{item.bookOrderDto.bookTitle}</span>
                                                    </BoxFramer>
                                                )}
                                                animation={true}
                                                onMount={onMount}
                                                onHide={onHide}
                                                arrow={true}
                                            >
                                                <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {item.bookOrderDto.bookTitle}
                                                </span>
                                            </HeadlessTippy>
                                        </div>

                                        <div className="flex items-center text-gray-900">
                                            <p className="font-semibold mr-3">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.bookOrderDto.discountedPrice)}
                                            </p>
                                            <p className="mr-3 opacity-50 line-through">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.bookOrderDto.bookPrice)}
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
                                                -{item.bookOrderDto.discountPercent}%
                                            </Box>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {order?.orderStatus === 'CANCELLED' && (
                                        <span className="flex mb-[12px]">
                                            Trạng thái: <p className="font-semibold  text-red-900 ml-[10px]">Đã huỷ</p>
                                        </span>
                                    )}
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
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
