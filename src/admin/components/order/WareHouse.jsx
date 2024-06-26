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
    'Trạng thái',
    'Hành động',
    // 'Hành động',
];

function WareHouse() {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const debounced = useDebounce(keyword);
    const [currentPage, setCurrentPage] = useState(1);
    const [wareHouseOrderId, setWareHouseOrderId] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [open, setOpen] = useState(false);

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

    const handleOpen = (orderId) => {
        setSelectedOrderId(orderId);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

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
                                        {item.orderDto.orderStatus === 'PACKED' && (
                                            <span
                                                className="bg-cyan-400
                                    text-white px-[5px] py-[2px] rounded-sm
                                    "
                                            >
                                                Chờ xuất kho
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell align="right">
                                        <div className="flex flex-col w-[5rem]">
                                            <button
                                                onClick={() => setWareHouseOrderId(item.orderDto.orderId)}
                                                className="bg-yellow-400 text-white rounded-sm"
                                            >
                                                Xuất kho
                                            </button>
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

            <Dialog
                open={wareHouseOrderId !== null}
                onClose={() => setWareHouseOrderId(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xuất kho đơn hàng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn đơn hàng đã rời khỏi kho hàng?
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

export default WareHouse;
