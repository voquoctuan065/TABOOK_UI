import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';

function InvalidToken() {
    const navigate = useNavigate();
    const renderHeader = (
        <Box
            onClick={() => navigate(routes.home)}
            component="header"
            sx={{
                top: 0,
                left: 0,
                width: 1,
                cursor: 'pointer',
                lineHeight: 0,
                position: 'fixed',
                p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
            }}
        >
            <img src="/images/logo/mainlogo.png" alt="logo shop" />
        </Box>
    );
    return (
        <>
            {renderHeader}

            <div>
                <Box
                    sx={{
                        py: 12,
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Invalid Token!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Xin lỗi, token để đặt lại mật khẩu bạn không đúng. Xin vui lòng thực hiện lại các bước để đặt
                        lại mật khẩu
                    </Typography>

                    <Box
                        component="img"
                        src="/images/logo/Internal500.jpg"
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />

                    <Button onClick={() => navigate(routes.home)} size="large" variant="contained">
                        Về trang chủ
                    </Button>
                </Box>
            </div>
        </>
    );
}

export default InvalidToken;
