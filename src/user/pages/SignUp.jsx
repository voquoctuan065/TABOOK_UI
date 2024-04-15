import { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function SignUp() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [fullNameHelperText, setFullNameHelperText] = useState(null);
    const [emailHelperText, setEmailHelperText] = useState(null);
    const [passwordHelperText, setPasswordHelperText] = useState(null);
    const [rePasswordHelperText, setRePasswordHelperText] = useState(null);

    const [failureDialogOpen, setFailureDialogOpen] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [isExistEmail, setIsExistEmail] = useState(false);

    // -------------------------------- Validate Form ----------------------------------------//

    const handleFullNameChange = (event) => {
        const inputFullName = event.target.value;
        const regex = /[!@#$%^&*\d]/; // Biểu thức chính quy để kiểm tra chỉ chứa chữ cái và dấu cách

        if (inputFullName !== '') {
            if (regex.test(inputFullName)) {
                setFullNameHelperText('Tên không được chứa các ký tự đặc biệt hoặc số!');
            } else if (inputFullName.length > 100) {
                setFullNameHelperText('Tên không được quá 100 ký tự!');
            } else {
                setFullNameHelperText('');
            }
        } else {
            setFullNameHelperText('');
        }
        setFullName(inputFullName);
    };

    const handleFullNameBlur = () => {
        if (fullName === '') {
            setFullNameHelperText('Trường này không được để trống!');
        }
    };

    const validateEmail = (email) => {
        // Regex pattern kiểm tra định dạng email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        if (inputEmail !== '') {
            setEmailHelperText('');
        } else if (inputEmail.length > 255) {
            setEmailHelperText('Email không được quá 255 ký tự!');
        }
        setEmail(inputEmail);
    };

    const handleEmailBlur = () => {
        if (email === '') {
            setEmailHelperText('Trường này không được để trống');
        } else if (!validateEmail(email)) {
            setEmailHelperText('Trường này phải là email');
        } else {
            setEmailHelperText('');
        }
    };

    const handlePasswordChange = (event) => {
        const inputPassword = event.target.value;
        if (inputPassword !== '') {
            setPasswordHelperText('');
        }
        setPassword(inputPassword);
    };

    const handlePasswordBlur = () => {
        const minLength = 8;
        const maxLength = 20;
        if (password === '') {
            setPasswordHelperText('Trường này không được để trống!');
        } else if (password.length < minLength) {
            setPasswordHelperText(`Mật khẩu phải có ít nhất ${minLength} ký tự!`);
        } else if (password.length > maxLength) {
            setPasswordHelperText(`Mật khẩu không được quá ${maxLength} ký tự!`);
        } else if (!/[A-Z]/.test(password)) {
            setPasswordHelperText('Mật khẩu phải chứa ít nhất một chữ cái viết hoa.');
        } else if (!/[!@#$%^&*]/.test(password)) {
            setPasswordHelperText('Mật khẩu phải chứa ít nhất một ký tự đặc biệt!');
        } else {
            setPasswordHelperText('');
        }
    };
    const handleRePasswordChange = (event) => {
        const inputRePassword = event.target.value;
        if (inputRePassword !== '') {
            setRePasswordHelperText('');
        }
        setRePassword(inputRePassword);
    };

    const handleRePasswordBlur = () => {
        if (rePassword === '') {
            setRePasswordHelperText('Trường này không được để trống!');
        } else if (rePassword !== password) {
            setRePasswordHelperText('Nhập lại mật khẩu không khớp với mật khẩu!');
        } else {
            setRePasswordHelperText('');
        }
    };
    // -------------------------------- End Validate Form ----------------------------------------//

    // -------------------------------- Handle Submit Form ----------------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputData = {
            fullName: fullName,
            email: email,
            password: password,
            rePassword: rePassword,
        };
        if (fullNameHelperText || emailHelperText || passwordHelperText || rePasswordHelperText) {
            setFailureDialogOpen(true);
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8686/auth/signup`, inputData);
            const user = response.data;
            if (user.jwt) {
                localStorage.setItem('jwt', user.jwt);
            }
            setSuccessDialogOpen(true);
        } catch (error) {
            setIsExistEmail(true);
        }
    };
    const handleRegisFailure = () => {
        setFailureDialogOpen(false);
    };

    const handleRegisSuccess = () => {
        setSuccessDialogOpen(false);
        navigate('/');
    };

    const handleExistEmail = () => {
        setIsExistEmail(false);
    }
    // -------------------------------- End Handle Submit Form ----------------------------------------//
    return (
        <div>
            <Helmet>
                <title> Đăng ký </title>
            </Helmet>
            <header className="relative bg-indigo-500">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center md:justify-between sm:justify-between lg:justify-between">
                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0 items-center cursor-pointer">
                            <div onClick={() => navigate('/')}>
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="/images/logo/mainlogo.png" alt="" />
                            </div>

                            <span className="font-bold text-xl ml-10">Đăng ký</span>
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
                    className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[500px] m-auto"
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Đăng ký
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="fullName"
                                        name="fullName"
                                        label="Họ tên"
                                        fullWidth
                                        error={fullNameHelperText && true}
                                        autoComplete="Họ và tên"
                                        helperText={fullNameHelperText}
                                        onChange={handleFullNameChange}
                                        onBlur={handleFullNameBlur}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        label="Email"
                                        error={emailHelperText && true}
                                        fullWidth
                                        autoComplete="Email"
                                        helperText={emailHelperText}
                                        onChange={handleEmailChange}
                                        onBlur={handleEmailBlur}
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
                                        error={passwordHelperText && true}
                                        onChange={handlePasswordChange}
                                        onBlur={handlePasswordBlur}
                                        helperText={passwordHelperText}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        type="password"
                                        id="rePassword"
                                        name="rePassword"
                                        label="Nhập lại mật khẩu"
                                        fullWidth
                                        autoComplete="Nhập lại mật khẩu"
                                        error={rePasswordHelperText && true}
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
                                    >
                                        Đăng ký
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Đã có tài khoản?
                            <span
                                onClick={() => navigate('/sign-in')}
                                className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
                            >
                                Đăng nhập
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
            </div>

            <Dialog open={failureDialogOpen} onClose={handleRegisFailure}>
                <DialogTitle>Không thành công!</DialogTitle>
                <DialogContent>
                    <p>Thông tin nhập vào không hợp lệ! Vui lòng kiểm tra lại</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegisFailure}>Đóng</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successDialogOpen} onClose={handleRegisSuccess}>
                <DialogTitle>Thành công!</DialogTitle>
                <DialogContent>
                    <p>Đăng ký thành công! Bạn đã được đăng nhập vào hệ thống </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegisSuccess}>Đóng</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isExistEmail} onClose={handleExistEmail}>
                <DialogTitle>Không thành công!</DialogTitle>
                <DialogContent>
                    <p>Email này đã được sử dụng! Vui lòng dùng email khác </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleExistEmail}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </div>
    );
}

export default SignUp;
