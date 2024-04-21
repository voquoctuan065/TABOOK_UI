import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import routes from '../config/routes';

function NotFoundView() {
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
                        Sory, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Xin lỗi, chúng tôi không thể tìm thấy trang mà bạn đang tìm kiếm. Có lẽ bạn đã nhập sai URL? Để
                        chắc chắn bạn hãy kiểm tra lại
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

                    <Button onClick={() => navigate(routes.home)} size="large" variant="contained">
                        Về trang chủ
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default NotFoundView;
