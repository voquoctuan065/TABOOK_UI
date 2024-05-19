import { AccountCircle, TrendingUp } from '@mui/icons-material';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../State/apiConfig';

function Overview() {
    const [totalOrder, setTotalOrder] = useState(null);
    const [totalUser, setTotalUser] = useState(null);
    const [totalProduct, setTotalProduct] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(null);

    const jwt = localStorage.getItem('adminJwt');
    useEffect(() => {
        const getTotalOrder = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/order/total`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (response.status === 200) {
                    setTotalOrder(response.data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        const getTotalUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/user/total`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (response.status === 200) {
                    setTotalUser(response.data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        const getTotalProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/book/total`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (response.status === 200) {
                    setTotalProduct(response.data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        const getTotalRevenue = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/revenue/total_revenue`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (response.status === 200) {
                    setTotalRevenue(response.data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        getTotalOrder();
        getTotalUser();
        getTotalProduct();
        getTotalRevenue();
    });

    const saleData = [
        {
            stats: `${totalOrder}`,
            title: 'Đơn hàng',
            color: '#03AED2',
            icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />,
        },
        {
            stats: `${totalUser}`,
            title: 'Người dùng',
            color: '#68D2E8',
            icon: <AccountCircle sx={{ fontSize: '1.75rem' }} />,
        },
        {
            stats: `${totalProduct}`,
            title: 'Sản phẩm',
            color: '#40A578',
            icon: <SettingsCellIcon sx={{ fontSize: '1.75rem' }} />,
        },
        {
            stats: `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(totalRevenue)}`,
            title: 'Tổng doanh thu',
            color: '#006769',
            icon: <AttachMoneyIcon sx={{ fontSize: '1.75rem' }} />,
        },
    ];

    const renderStats = () => {
        return saleData.map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        sx={{
                            mr: 3,
                            width: 44,
                            height: 44,
                            boxShadow: 3,
                            color: 'common.white',
                            backgroundColor: `${item.color}`,
                        }}
                    >
                        {item.icon}
                    </Avatar>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption">{item.title}</Typography>
                        <Typography variant="h6">{item.stats}</Typography>
                    </Box>
                </Box>
            </Grid>
        ));
    };
    return (
        <Card sx={{ bgcolor: '#242B2E', color: 'white' }}>
            
            <CardHeader
                title="Tổng quan"
                action={
                    <IconButton size="small">
                        <MoreVertIcon sx={{ color: 'white' }} />
                    </IconButton>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '.15px !important',
                    },
                }}
            />

            <CardContent
                sx={{
                    pt: (theme) => `${theme.spacing(3)} !important`,
                }}
            >
                <Grid container spacing={[5, 0]}>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default Overview;
