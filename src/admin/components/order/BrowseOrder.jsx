/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from 'react-helmet-async';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { cancelUserOrder, confirmedOrder, getPendingOrder } from '../../../State/Order/Action';
import useDebounce from '../../../hooks/useDebounce';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import OrderDetail from './OrderDetail';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

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

function BrowseOrder() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const debounced = useDebounce(keyword);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const [open, setOpen] = useState(false);

    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());

    const [cancelOrderId, setCancelOrderId] = useState(null);
    const [acceptOderId, setAcceptOrderId] = useState(null);

    const jwt = localStorage.getItem('adminJwt');

    const { orders } = useSelector((store) => ({
        orders: store.order.orders,
    }));

    const inputData = {
        keyword: debounced,
        page: currentPage - 1,
    };

    const handleSearchSubmit = () => {
        dispatch(getPendingOrder(inputData, jwt));
    };

    useEffect(() => {
        dispatch(getPendingOrder(inputData, jwt));
    }, [jwt, currentPage]);

    const handleAcceptOrder = (orderId) => {
        dispatch(confirmedOrder(orderId, jwt)).then(() => {
            dispatch(getPendingOrder(inputData, jwt));
        });

        setAcceptOrderId(null);
    };

    const handleCancelOrder = (orderId) => {
        dispatch(cancelUserOrder(orderId, jwt)).then(() => {
            dispatch(getPendingOrder(inputData, jwt));
        });
        setCancelOrderId(null);
    };

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

        dispatch(getPendingOrder(inputData, jwt));
    };

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOpen = (orderId) => {
        setSelectedOrderId(orderId);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return (
        <>
            <Helmet>
                <title>Xác nhận đơn hàng</title>
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

                <div className="flex flex-col items-center mt-10">
                    <span>
                        <b>Chú ý: </b> đọc ký thông tin đơn hàng trước khi{' '}
                        <span className="text-cyan-500">duyệt đơn</span>
                    </span>
                    <span>
                        <b>Hướng dẫn: </b> chọn <span className="text-cyan-500">xác nhận </span> để xác nhận đơn hàng
                        nhanh chóng{' '}
                    </span>
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
                                            {item.orderDto.shippingAddress.ward},{' '}
                                            {item.orderDto.shippingAddress.district},{' '}
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

                                        <TableCell>{item.orderDto.orderStatus === 'PENDING' && 'Chờ duyệt'}</TableCell>

                                        <TableCell>
                                            <span
                                                className="text-cyan-500 cursor-pointer hover:text-red-500"
                                                onClick={() => handleOpen(item.orderDto.orderId)}
                                            >
                                                Xem chi tiết
                                            </span>
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex flex-col w-[10rem]">
                                                <Button
                                                    onClick={() => setAcceptOrderId(item.orderDto.orderId)}
                                                    sx={{
                                                        marginBottom: '10px',
                                                    }}
                                                >
                                                    Xác nhận
                                                </Button>
                                                <Button onClick={() => setCancelOrderId(item.orderDto.orderId)}>
                                                    Huỷ bỏ
                                                </Button>
                                            </div>
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
            </div>

            {/* Dialog Confirm Order */}
            <Dialog
                open={acceptOderId !== null}
                onClose={() => setAcceptOrderId(null)}
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
                    <Button onClick={() => setAcceptOrderId(null)} color="primary">
                        Trở lại
                    </Button>
                    <Button onClick={() => handleAcceptOrder(acceptOderId)} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog Confirm */}

            {/* Dialog Cancel Order */}
            <Dialog
                open={cancelOrderId !== null}
                onClose={() => setCancelOrderId(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận huỷ đơn hàng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn huỷ đơn hàng này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelOrderId(null)} color="primary">
                        Trở lại
                    </Button>
                    <Button onClick={() => handleCancelOrder(cancelOrderId)} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog Confirm */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <OrderDetail selectedOrderId={selectedOrderId} />
                </Box>
            </Modal>
        </>
    );
}

export default BrowseOrder;
