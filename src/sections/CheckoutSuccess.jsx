import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentSuccessAction } from '../State/Payment/Action';

function CheckoutSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const querySearch = new URLSearchParams(location.search);

    const orderId = querySearch.get('order_id');
    const totalAmount = querySearch.get('total_amount');

    const renderHeader = (
        <Box
            component="header"
            sx={{
                top: 0,
                left: 0,
                width: 1,
                lineHeight: 0,
                position: 'fixed',
                p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
            }}
        >
            <img src="/images/logo/mainlogo.png" alt="logo shop" />
        </Box>
    );
    const handleSuccess = () => {
        const jwt = localStorage.getItem('jwt');
        const reqData = {
            orderId: orderId,
            totalAmount: totalAmount,
            navigate,
        };
        dispatch(paymentSuccessAction(reqData, jwt));
    };
    return (
        <>
            {renderHeader}
            <div className="bg-gray-100">
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path
                            fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                        ></path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Thành công!</h3>
                        <p className="text-gray-600 my-2">
                            Bạn đã thanh toán thành công. Đơn hàng của bạn đang chờ nhân viên xác nhận, đóng gói và gửi
                            tới bạn.
                        </p>
                        <p> Chúc bạn mua hàng vui vẻ! </p>
                        <div className="py-10 text-center">
                            <button
                                onClick={handleSuccess}
                                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg"
                            >
                                Trở về
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutSuccess;
