/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ManageCategory from '../components/category/ManageCategory';
import ManageBook from '../components/book/ManageBook';
import ManageNxb from '../components/nxb/ManageNxb';
import Order from '../components/order/Order';
import { Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import routes from '../../config/routes';
import Overview from '../components/overview/Overview';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function DashBoard() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openUserMenu = Boolean(anchorEl);

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        if (!localStorage.getItem('adminJwt')) {
            navigate(routes.adminSighIn);
        }
    }, []);

    React.useEffect(() => {
        const jwt = localStorage.getItem('adminJwt');
        if (jwt) {
            const getUserProfile = async () => {
                try {
                    const response = await axios.get('http://localhost:8686/api/user/profile', {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    setUserProfile(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };

            getUserProfile();
        }
    }, []);

    React.useEffect(() => {
        if (userProfile) {
            if (userProfile.role === 'USER') {
                navigate('/401');
            }
        }
    }, [userProfile]);

    const handleLogout = () => {
        localStorage.removeItem('adminJwt');
        setUserProfile(null);
        window.location.reload();
    };

    return (
        <>
            <div className="bg-indigo-500 h-[65px] space-x-8">
                <div className="flex items-center h-full justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <div className="ml-4 lg:ml-0 mr-10">
                            <div onClick={() => navigate('/admin')} className="cursor-pointer">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-25" src="/images/logo/mainlogo.png" alt="" />
                            </div>
                        </div>
                        <Box sx={{ fontSize: '1.4rem' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab
                                    label="Tổng quan"
                                    {...a11yProps(0)}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: 'white',
                                            fontWeight: 600,
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'black',
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                                <Tab
                                    label="Sách"
                                    {...a11yProps(1)}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: 'white',
                                            fontWeight: 600,
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'black',
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                                <Tab
                                    label="Thể loại"
                                    {...a11yProps(2)}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: 'white',
                                            fontWeight: 600,
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'black',
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                                <Tab
                                    label="NXB"
                                    {...a11yProps(3)}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: 'white',
                                            fontWeight: 600,
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'black',
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                                <Tab
                                    label="Đơn hàng"
                                    {...a11yProps(4)}
                                    sx={{
                                        '&.Mui-selected': {
                                            color: 'white',
                                            fontWeight: 600,
                                        },
                                        '&:not(.Mui-selected)': {
                                            color: 'black',
                                            fontWeight: 500,
                                        },
                                    }}
                                />
                            </Tabs>
                        </Box>
                    </div>

                    <div>
                        {userProfile ? (
                            <div>
                                <Avatar
                                    onClick={handleUserClick}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    sx={{
                                        bgcolor: 'red',
                                        color: 'white',
                                    }}
                                    alt="Avatar"
                                    src={`/images/${userProfile.userImage}`}
                                />

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openUserMenu}
                                    onClose={handleCloseUserMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <div>
                                <Avatar
                                    onClick={handleUserClick}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    sx={{
                                        bgcolor: 'red',
                                        color: 'white',
                                    }}
                                    alt="Remy Sharp"
                                    src="/images/no-image.jpg"
                                />

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={openUserMenu}
                                    onClose={handleCloseUserMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                    <MenuItem>My Orders</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Box sx={{ width: '100%', margin: '0 auto' }}>
                <CustomTabPanel value={value} index={0}>
                    <Overview />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ManageBook />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ManageCategory />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <ManageNxb />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <Order />
                </CustomTabPanel>
            </Box>
        </>
    );
}

export default DashBoard;
