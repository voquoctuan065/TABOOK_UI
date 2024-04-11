import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ManageCategory from '../components/category/ManageCategory';
import ManageBook from '../components/book/ManageBook';

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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', margin: '0 auto' }} className="container">
            <div className="flex items-center justify-between border-b border-red-500">
                <div className='flex items-center'>
                    <div className="ml-4 lg:ml-0 mr-10">
                        <div onClick={() => navigate('/')} className="cursor-pointer">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-25" src="/images/logo/mainlogo.png" alt="" />
                        </div>
                    </div>
                    <Box sx={{ fontSize: '1.4rem' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Sách" {...a11yProps(1)} />
                            <Tab label="Thể loại" {...a11yProps(2)} />
                            <Tab label="Đơn hàng" {...a11yProps(3)} />
                            <Tab label="Thanh toán" {...a11yProps(4)} />
                        </Tabs>
                    </Box>
                </div>

                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </div>

            <CustomTabPanel value={value} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ManageBook />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <ManageCategory />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Item Three
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                Item Three
            </CustomTabPanel>
        </Box>
    );
}

export default DashBoard;
