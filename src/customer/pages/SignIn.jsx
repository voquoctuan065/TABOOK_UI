import React from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
const SignIn = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        console.log('inputData', inputData);
    };
    return (
        <div>
            <header className="relative bg-indigo-500">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center md:justify-between sm:justify-between lg:justify-between">
                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0 items-center">
                            <a href="/">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="/mainlogo.png" alt="" />
                            </a>

                            <span className="font-bold text-xl ml-10">Đăng nhập</span>
                        </div>

                        <div className="ml-4 flow-root lg:ml-6">
                            <a href="/support" className="group flex items-center">
                                <span className="text-red-950 font-semibold hover:text-red-800">Bạn cần hỗ trợ?</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pb-12 pt-4 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng nhập</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="Email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="password"
                                    required
                                    id="password"
                                    name="password"
                                    label="Mật khẩu"
                                    fullWidth
                                    autoComplete="Mật khẩu"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    className="bg-[#9155FD] w-full"
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ padding: '.8rem 0', bgcolor: '#9155fd' }}
                                >
                                    Đăng nhập
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Chưa có tài khoản?
                        <span
                            onClick={() => navigate('/sign-up')}
                            className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
                        >
                            Tạo tài khoản
                        </span>
                    </p>

                    <div className="mt-2 text-center">
                        <p className="border-t-2 border-neutral-300 text-center text-red-500 p-2">Hoặc</p>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="w-full"
                            style={{
                                paddingTop: '14px',
                                paddingBottom: '14px',
                                paddingLeft: '35px',
                                paddingRight: '35px',
                                marginBottom: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>Đăng nhập với Facebook</span>
                            <img src="/facebook-logo.png" alt="" />
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            className="w-full"
                            style={{
                                paddingTop: '14px',
                                paddingBottom: '14px',
                                paddingLeft: '35px',
                                paddingRight: '35px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span>Đăng nhập với Google</span>
                            <img src="/google-logo.png" alt="" />
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SignIn;
