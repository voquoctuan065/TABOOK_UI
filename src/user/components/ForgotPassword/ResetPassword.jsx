/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';
import { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../../State/apiConfig';
import Footer from '../Footer/Footer';

function ResetPassword({ token }) {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState(false);
    const [rePasswordHelperText, setRePasswordHelperText] = useState('');

    const handlePasswordChange = (event) => {
        const inputPassword = event.target.value;
        if (inputPassword !== '') {
            setPasswordError(false);
            setPasswordHelperText('');
        }
        setPassword(inputPassword);
    };

    const handlePasswordBlur = () => {
        if (password === '') {
            setPasswordError(true);
            setPasswordHelperText('Truờng này không được để trống!');
        }
    };

    const handleRePasswordChange = (event) => {
        const inputRePassword = event.target.value;
        if (inputRePassword !== '') {
            setRePasswordHelperText('');
            setRePasswordError(false);
        }
        setRePassword(inputRePassword);
    };

    const handleRePasswordBlur = () => {
        if (rePassword === '') {
            setRePasswordHelperText('Trường này không được để trống!');
            setRePasswordError(true);
        } else if (rePassword !== password) {
            setRePasswordHelperText('Nhập lại mật khẩu không khớp với mật khẩu!');
            setRePasswordError(true);
        } else {
            setRePasswordHelperText('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            password: password,
            rePassword: rePassword,
        };
        try {
            if (passwordError || rePasswordError) {
                toast.error('Dữ liệu nhập vào chưa được đảm bảo');
            } else {
                const response = await axios.put(`${API_BASE_URL}/api/user/reset_password?token=${token}`, data);
                if (response.status === 200) {
                    toast.success('Thay đổi mật khẩu thành công!');
                    navigate(routes.home);
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    return (
        <>
            <Helmet>
                <title> Đặt lại mật khẩu </title>
            </Helmet>

            <header className="relative bg-indigo-500">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center md:justify-between sm:justify-between lg:justify-between">
                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0 items-center cursor-pointer">
                            <button onClick={() => navigate(routes.home)}>
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="/images/logo/mainlogo.png" alt="" />
                            </button>

                            <span className="font-bold text-xl ml-10">Đặt lại mật khẩu</span>
                        </div>

                        <div className="ml-4 flow-root lg:ml-6">
                            <a href="/support" className="group flex items-center">
                                <span className="text-red-950 font-semibold hover:text-red-800">Bạn cần hỗ trợ?</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            <div>
                <div
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginTop: '32px', marginBottom: '32px' }}
                    className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pb-12 pt-4 lg:px-8 w-[500px] m-auto"
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Đặt lại mật khẩu
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        type="password"
                                        required
                                        id="password"
                                        name="password"
                                        label="Mật khẩu"
                                        fullWidth
                                        error={passwordError}
                                        autoComplete="Mật khẩu"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordBlur}
                                        helperText={passwordHelperText}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="password"
                                        required
                                        id="rePassword"
                                        name="rePassword"
                                        label="Nhập lại mật khẩu"
                                        fullWidth
                                        error={rePasswordError}
                                        autoComplete="Mật khẩu"
                                        value={rePassword}
                                        onChange={handleRePasswordChange}
                                        onBlur={handleRePasswordBlur}
                                        helperText={rePasswordHelperText}
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

            <Footer />
        </>
    );
}

export default ResetPassword;
