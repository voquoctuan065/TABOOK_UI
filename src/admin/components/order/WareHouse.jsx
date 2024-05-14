import { Helmet } from 'react-helmet-async';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { getPackedOrder, shippingOrder } from '../../../State/Order/Action';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        border: '1px solid red',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `1.2em`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
}));

const tableCell = [
    'Mã hoá đơn',
    'Tên khách hàng',
    'Địa chỉ nhận',
    'SĐT',
    'Ngày tạo',
    'Phương thức',
    'Thanh toán',
    'Trạng thái',
    'Xem chi tiết',
    'Hành động',
];

function WareHouse() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const debounced = useDebounce(keyword);
    const [currentPage, setCurrentPage] = useState(1);
    const [wareHouseOrderId, setWareHouseOrderId] = useState(null);

    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());

    const jwt = localStorage.getItem('adminJwt');

    const { orders } = useSelector((store) => ({
        orders: store.order.orders,
    }));

    const inputData = {
        keyword: debounced,
        page: currentPage - 1,
    };

    const handleSearchSubmit = () => {
        dispatch(getPackedOrder(inputData, jwt));
    };

    useEffect(() => {
        dispatch(getPackedOrder(inputData, jwt));
    }, [jwt, currentPage]);

    const handleKeywordChange = (e) => {
        const keywordValue = e.target.value;
        if (!keywordValue.startsWith(' ')) {
            setKeyword(keywordValue);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0'); // Giờ
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Phút
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Giây
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const handleFilterByDate = () => {
        const inputData = {
            keyword: debounced,
            startTime: formatDate(new Date(startTime)),
            endTime: formatDate(new Date(endTime)),
            page: currentPage - 1,
        };

        dispatch(getPackedOrder(inputData, jwt));
    };

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleWareHouseOrder = (orderId) => {
        dispatch(shippingOrder(orderId, jwt)).then(() => {
            dispatch(getPackedOrder(inputData, jwt));
        });
        setWareHouseOrderId(null);
    };

    console.log(orders.content);
    return (
        <>
            <Helmet>
                <title>Xuất kho đơn hàng</title>
            </Helmet>
            <div className="mt-8">
                <div className="flex justify-between">
                    <form>
                        <Search className="relative">
                            <StyledInputBase
                                placeholder="Tìm kiếm đơn hàng..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={keyword}
                                onChange={handleKeywordChange}
                            />

                            <span
                                onClick={handleSearchSubmit}
                                onMouseDown={(e) => e.preventDefault()}
                                className="cursor-pointer absolute w-[72px] h-[30px] bg-red-700 flex items-center justify-center rounded-lg"
                                style={{
                                    top: 'calc(50% - 0px)',
                                    right: '4px',
                                    transform: 'translate(0, -50%)',
                                    fontWeight: 'normal',
                                    fontSize: '21px',
                                    zIndex: 3,
                                    border: '2px solid #C92127',
                                }}
                            >
                                <SearchIcon sx={{ color: 'white' }} />
                            </span>
                        </Search>
                    </form>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                            <div className="flex ">
                                <DateTimePicker
                                    label="Ngày bắt đầu"
                                    value={startTime}
                                    onChange={(newValue) => setStartTime(newValue)}
                                />
                                <DateTimePicker
                                    sx={{ marginLeft: '10px' }}
                                    label="Ngày kết thúc"
                                    value={endTime}
                                    onChange={(newValue) => setEndTime(newValue)}
                                />
                                <Button
                                    onClick={handleFilterByDate}
                                    sx={{ marginLeft: '10px' }}
                                    variant="contained"
                                    color="error"
                                >
                                    Tìm kiếm
                                </Button>
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
            <div className="mt-8">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead className="bg-indigo-400 ">
                            <TableRow>
                                {tableCell.map((item) => (
                                    <TableCell key={item} align="left">
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.content?.map((item) => (
                                <TableRow
                                    key={item.orderDto.orderId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.orderDto.orderId}
                                    </TableCell>
                                    <TableCell align="left">{item.orderDto.userDto.fullName}</TableCell>
                                    <TableCell>
                                        {item.orderDto.shippingAddress.streetAddress},{' '}
                                        {item.orderDto.shippingAddress.ward}, {item.orderDto.shippingAddress.district},{' '}
                                        {item.orderDto.shippingAddress.province}
                                    </TableCell>
                                    <TableCell>{item.orderDto.shippingAddress.phoneNumber}</TableCell>
                                    <TableCell>
                                        {format(new Date(item.orderDto.orderDate), 'dd/MM/yyyy HH:mm:ss')}
                                    </TableCell>
                                    <TableCell>
                                        {item.paymentInfoDto.paymentStatus === 'Chờ thanh toán'
                                            ? 'COD'
                                            : 'STRIPE PAYMENT'}
                                    </TableCell>

                                    <TableCell>
                                        {item.paymentInfoDto.paymentStatus === 'Chờ thanh toán'
                                            ? 'Chờ thanh toán'
                                            : 'Đã thanh toán'}
                                    </TableCell>

                                    <TableCell>{item.orderDto.orderStatus === 'PACKED' && 'Đã đóng gói'}</TableCell>

                                    <TableCell>
                                        <span className="text-cyan-500 cursor-pointer hover:text-red-500">
                                            Xem chi tiết
                                        </span>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => setWareHouseOrderId(item.orderDto.orderId)}
                                            sx={{
                                                marginBottom: '10px',
                                            }}
                                        >
                                            Xuất kho
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack
                    spacing={2}
                    sx={{ marginTop: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Pagination
                        sx={{ margin: '0 auto' }}
                        count={orders.pageSize}
                        color="secondary"
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </div>

            <Dialog
                open={wareHouseOrderId !== null}
                onClose={() => setWareHouseOrderId(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận duyệt đơn hàng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn duyệt đơn hàng này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setWareHouseOrderId(null)} color="primary">
                        Trở lại
                    </Button>
                    <Button onClick={() => handleWareHouseOrder(wareHouseOrderId)} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default WareHouse;
