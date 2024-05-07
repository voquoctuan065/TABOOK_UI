import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CheckoutFailure() {
    const navigate = useNavigate();
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
        navigate('/');
    };
    return (
        <>
            {renderHeader}
            <div className="bg-gray-100">
                <div className="bg-white p-6  md:mx-auto">
                    <img src="/images/logo/cancel-icon.png" alt="" className="w-16 h-16 mx-auto my-6" />
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Thất bại!</h3>
                        <p className="text-gray-600 my-2">Đơn thanh toán đã bị huỷ bởi người mua.</p>
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

export default CheckoutFailure;
