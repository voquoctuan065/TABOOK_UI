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
import { Menu, MenuItem } from '@mui/material';

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
    const [user, setUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openUserMenu = Boolean(anchorEl);

    // React.useEffect(() => {
    //     if (!user) {
    //         navigate('/admin/sign-in');
    //     }
    // }, []);

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="bg-indigo-500 h-[65px] space-x-8">
                <div className="flex items-center h-full justify-between container m-auto">
                    <div className="flex items-center">
                        <div className="ml-4 lg:ml-0 mr-10">
                            <div onClick={() => navigate('/')} className="cursor-pointer">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-25" src="/images/logo/mainlogo.png" alt="" />
                            </div>
                        </div>
                        <Box sx={{ fontSize: '1.4rem' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab
                                    label="Item One"
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
                                <Tab
                                    label="Thanh toán"
                                    {...a11yProps(5)}
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
                        <Avatar
                            className="text-white"
                            onClick={handleUserClick}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{
                                bgcolor: 'red',
                                color: 'white',
                            }}
                        >
                            A
                        </Avatar>

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
                            <MenuItem onClick={() => console.log('Yes, clicked!')}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <Box sx={{ width: '100%', margin: '0 auto' }} className="container">
                <CustomTabPanel value={value} index={0}>
                    <img
                        src="https://drive.google.com/thumbnail?id=1TBPy7wDeGDZncaw2IjnmBX43dydX2vyz"
                        alt=""
                        className="w-[100px] h-[100px]"
                    />
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
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={5}>
                    Item Three
                </CustomTabPanel>
            </Box>
        </>
    );
}

export default DashBoard;
