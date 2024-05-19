import { Helmet } from 'react-helmet-async';
import routes from '../../config/routes';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../State/apiConfig';
import Footer from '../components/Footer/Footer';

function SendForgotMessage() {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [helperText, setHelperText] = useState('');

    const [sended, setSended] = useState(false);

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        if (inputEmail !== '') {
            setHelperText('');
            setError(false);
        }
        setEmail(inputEmail);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailBlur = () => {
        if (email === '') {
            setHelperText('Trường này không được để trống');
            setError(true);
        } else if (!validateEmail(email)) {
            setHelperText('Trường này phải là email');
            setError(true);
        } else {
            setHelperText('');
            setError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/forgot_password/${email}`);
            if (response.status === 200) {
                setSended(true);
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    return (
        <>
            <Helmet>
                <title> Quên mật khẩu </title>
            </Helmet>

            <header className="relative bg-indigo-500">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center md:justify-between sm:justify-between lg:justify-between">
                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0 items-center cursor-pointer">
                            <div onClick={() => navigate(routes.home)}>
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="/images/logo/mainlogo.png" alt="" />
                            </div>

                            <span className="font-bold text-xl ml-10">Quên mật khẩu</span>
                        </div>

                        <div className="ml-4 flow-root lg:ml-6">
                            <a href="/support" className="group flex items-center">
                                <span className="text-red-950 font-semibold hover:text-red-800">Bạn cần hỗ trợ?</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {sended ? (
                <div>
                    <Box
                        sx={{
                            py: 12,
                            maxWidth: 480,
                            mx: 'auto',
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h3" sx={{ mb: 3 }}>
                            Thông báo!
                        </Typography>

                        <Typography sx={{ color: 'text.secondary' }}>
                            Link để đặt lại mật khẩu đã được gửi qua email của bạn! Xin vui lòng kiểm tra email để lấy
                            link.
                        </Typography>

                        <Button
                            sx={{
                                mt: '20px',
                            }}
                            onClick={() => navigate(routes.home)}
                            size="large"
                            variant="contained"
                        >
                            Về trang chủ
                        </Button>
                    </Box>
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                            marginTop: '32px',
                            marginBottom: '32px',
                        }}
                        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pb-12 pt-4 lg:px-8 w-[500px] m-auto"
                    >
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Email lấy lại mật khẩu
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form ref={formRef} className="space-y-6">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            type="email"
                                            error={error}
                                            id="email"
                                            label="Email"
                                            fullWidth
                                            helperText={helperText}
                                            value={email}
                                            onChange={handleEmailChange}
                                            onBlur={handleEmailBlur}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            className="bg-[#9155FD] w-full"
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            sx={{ padding: '.8rem 0', bgcolor: '#9155fd' }}
                                            onClick={handleSubmit}
                                        >
                                            Gửi đi
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default SendForgotMessage;
