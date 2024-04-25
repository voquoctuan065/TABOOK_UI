import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CartItem from './CartItem';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import routes from '../../../config/routes';

export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, cart, auth } = useSelector((store) => ({
        cartItems: store.cart.cartItems,
        cart: store.cart,
        auth: store.auth,
    }));

    const deliveryCharge = cartItems.length > 0 ? 20000 : 0;
    const totalAmount = deliveryCharge + cart.cartTotalAmount;
    const handleCheckout = async () => {
        if (!auth.user) {
            navigate(routes.signIn);
            toast.warning('Vui lòng đăng nhập!');
        } else if (cartItems.length === 0) {
            toast.error('Opps! Vui lòng chọn sản phẩm trước khi thanh toán');
        } else {
            navigate(`${routes.checkout}?step=0`);
        }
    };

    return (
        <>
            <Helmet>
                <title>Giỏ hàng</title>
            </Helmet>
            <Navbar />

            <div className="bg-gray-200 pt-5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Grid container className="pb-4">
                        <Grid item xs={9} sx={{}}>
                            <div className="bg-white rounded-lg pb-3">
                                <div className="font-bold text-lg p-3">Thông tin sản phẩm</div>
                                {cartItems && cartItems.map((item) => <CartItem key={item.id} book={item} />)}

                                <div className="mt-3 px-2 flex justify-end">
                                    <div className="mr-4">
                                        <span className="font-semibold">Tổng số sản phẩm: </span>
                                        <span className="text-red-500 font-semibold">{cart.cartTotalQuantity}</span>
                                    </div>
                                    <div className="mr-2">
                                        <span className="font-semibold mr-2">Tổng đơn giá:</span>
                                        <span className="text-red-500 font-semibold">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(cart.cartTotalAmount)}
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
                                            }).format(cart.cartTotalAmount)}
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
                                        <span className="text-green-600">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(totalAmount)}
                                        </span>
                                    </div>

                                    <Button
                                        onClick={handleCheckout}
                                        variant="contained"
                                        className="w-full"
                                        sx={{ px: '2rem', py: '.7rem', bgcolor: '#9155fd' }}
                                    >
                                        Tiến hành thanh toán
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Footer />
        </>
    );
}
