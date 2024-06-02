import { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { login } from '../../State/Auth/Action';
import routes from '../../config/routes';

const validateEmail = (email) => {
    // Regex pattern kiểm tra định dạng email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [helperText, setHelperText] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    // -------------------------------- Validate Form ----------------------------------------//
    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        if (inputEmail !== '') {
            setHelperText('');
            setError(false);
        }
        setEmail(inputEmail);
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
    // -------------------------------- End Validate Form ----------------------------------------//
    const formRef = useRef(null);

    // -------------------------------- Handle Submit Form ----------------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputData = {
            email: email,
            password: password,
        };

        try {
            dispatch(login(inputData, navigate));
        } catch (error) {
            setSuccessDialogOpen(true);
        }
    };

    const handleLoginFailure = () => {
        setSuccessDialogOpen(false);
    };
    // -------------------------------- End Handle Submit Form ----------------------------------------//

    return (
        <div>
            <Helmet>
                <title> Đăng nhập </title>
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

            <div>
                <div
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginTop: '32px', marginBottom: '32px' }}
                    className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 pb-12 pt-4 lg:px-8 w-[500px] m-auto"
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Đăng nhập
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
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
                                    <Button
                                        className="bg-[#9155FD] w-full"
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ padding: '.8rem 0', bgcolor: '#9155fd' }}
                                        onClick={handleSubmit}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        <div className="flex mt-10 justify-between">
                            <div className=" text-sm text-gray-500">
                                Chưa có tài khoản?{' '}
                                <button
                                    onClick={() => navigate(routes.signUp)}
                                    className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-[2px]"
                                >
                                    Tạo tài khoản
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate(routes.sendmail)}
                                    className="cursor-pointer leading-6 hover:text-red-500 ml-2"
                                >
                                    Quên mật khẩu?
                                </button>
                            </div>
                        </div>

                        {/* <div className="mt-2 text-center">
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
                        </div> */}
                    </div>
                </div>
            </div>

            <Dialog open={successDialogOpen} onClose={handleLoginFailure}>
                <DialogTitle>Không thành công!</DialogTitle>
                <DialogContent>
                    <p>Email hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoginFailure}>Đóng</Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </div>
    );
}

export default SignIn;
