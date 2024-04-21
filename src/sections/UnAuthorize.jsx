import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';

function UnAuthorize() {
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

    const handleUnAuthorize = () => {
        navigate(routes.home);
        localStorage.removeItem('adminJwt');
    };

    return (
        <>
            <Helmet>
                <title> 401 UnAuthorize </title>
            </Helmet>
            {renderHeader}

            <Container>
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
                        Sorry, you don&apos;t have permission!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Xin lỗi, bạn không thể truy cập vào trang này vì chưa được cấp quyền. Vui lòng liên hệ Admin để
                        giải quyết vấn đề này
                    </Typography>

                    <Box
                        component="img"
                        src="/images/logo/illustration_404.svg"
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />

                    <Button onClick={handleUnAuthorize} size="large" variant="contained">
                        Về trang chủ
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default UnAuthorize;
