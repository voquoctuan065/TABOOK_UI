import AddressCard from '../AddressCard/AddressCard';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Modal,
    styled,
} from '@mui/material';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { cancelUserOrder, getOrderById } from '../../../State/Order/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';
import HeadlessTippy from '@tippyjs/react/headless';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import routes from '../../../config/routes';
import BooksRate from './BooksRate';

const BoxFramer = styled(motion.div)`
    background: #282c34;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

export default function OrderDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [selectedBookId, setSelectedBookId] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rateOpen, setRateOpen] = useState(false);

    const handleRateOpen = (bookId) => {
        setSelectedBookId(bookId);
        setRateOpen(true);
    };
    const handleRateClose = () => setRateOpen(false);

    const { order } = useSelector((store) => ({
        order: store.order.order,
    }));

    const initialScale = 0.5;
    const springConfig = { damping: 15, stiffness: 300 };
    const opacity = useSpring(0, springConfig);
    const scale = useSpring(initialScale, springConfig);

    function onMount() {
        scale.set(1);
        opacity.set(1);
    }

    function onHide({ unmount }) {
        const cleanup = scale.on('change', (value) => {
            if (value <= initialScale) {
                cleanup();
                unmount();
            }
        });

        scale.set(initialScale);
        opacity.set(0);
    }

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        dispatch(getOrderById(orderId, jwt));
    }, [dispatch, orderId, jwt]);

    const handleCancelOrder = () => {
        dispatch(cancelUserOrder(orderId, jwt));
        handleClose();
        toast.success('Bạn đã huỷ đơn hàng thành công!');
        navigate(routes.order);
    };
    console.log(orderId);
    console.log('ORder', order);
    return (
        <>
            <Navbar />
            <div className="px-5 lg:pl-20  bg-gray-200 justify-center pt-5 pb-5">
                <Grid className="space-x-3" container>
                    <Grid item xs={3}>
                        <div className="bg-white rounded-lg p-5 w-full">
                            <AddressCard address={order?.shippingAddress} />
                        </div>
                    </Grid>
                    <Grid item xs={8.4} className="w-full w-[860px]">
                        {order?.orderItemDto?.map((item) => (
                            <Grid
                                key={item.orderItemId}
                                container
                                className="bg-white shadow-xl rounded-md p-5 border w-full"
                                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                            >
                                <Grid item xs={8} className="flex items-center">
                                    <div className="w-[4rem] lg:w-[4rem] lg:h-[6rem] overflow-hidden rounded ml-3 py-[5px]">
                                        <img
                                            className="w-full h-full object-cover object-top transition-transform duration-300 transform hover:scale-90"
                                            src={item.bookOrderDto.bookImage}
                                            alt=""
                                        />
                                    </div>

                                    <div className="space-y-1 max-w-[350px] w-full ml-4">
                                        <div className="overflow-hidden text-wrap whitespace-nowrap block w-full">
                                            <HeadlessTippy
                                                render={(attrs) => (
                                                    <BoxFramer tabIndex="-1" style={{ scale, opacity }} {...attrs}>
                                                        <span>{item.bookOrderDto.bookTitle}</span>
                                                    </BoxFramer>
                                                )}
                                                animation={true}
                                                onMount={onMount}
                                                onHide={onHide}
                                                arrow={true}
                                            >
                                                <span className="block overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {item.bookOrderDto.bookTitle}
                                                </span>
                                            </HeadlessTippy>
                                        </div>

                                        <div className="flex items-center text-gray-900">
                                            <p className="font-semibold mr-3">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.bookOrderDto.discountedPrice)}
                                            </p>
                                            <p className="mr-3 opacity-50 line-through">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.bookOrderDto.bookPrice)}
                                            </p>
                                            <Box
                                                sx={{
                                                    width: '50px',
                                                    color: 'white',
                                                    padding: '2px 4px',
                                                    borderRadius: '5px',
                                                    backgroundColor: '#FC427B',
                                                }}
                                            >
                                                -{item.bookOrderDto.discountPercent}%
                                            </Box>
                                        </div>
                                    </div>
                                </Grid>

                                <Grid item xs={3.5}>
                                    {order?.orderStatus === 'CANCELLED' && (
                                        <span className="flex mb-[12px]">
                                            Trạng thái: <p className="font-semibold  text-red-900 ml-[10px]">Đã huỷ</p>
                                        </span>
                                    )}

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRateOpen(item.bookOrderDto.bookId)}
                                    >
                                        <StarBorderIcon
                                            sx={{ fontSize: '2rem', fontWeight: 600 }}
                                            className="px-2 text-xl"
                                        />
                                        <span>Đánh giá sản phẩm</span>
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        {order?.orderStatus === 'PENDING' && (
                            <Button
                                onClick={handleOpen}
                                className="flex items-center justify-end"
                                variant="contained"
                                color="error"
                                sx={{ marginBottom: '5px', marginTop: '15px', float: 'right' }}
                            >
                                <ClearIcon sx={{ fontSize: '2rem', fontWeight: 600 }} className="px-2 text-xl" />
                                <span>Huỷ đơn hàng</span>
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </div>

            <Modal
                open={rateOpen}
                onClose={handleRateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <BooksRate handleRateClose={handleRateClose} bookId={selectedBookId} />
                </Box>
            </Modal>

            <Dialog
                open={open}
                onClose={handleClose}
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
                    <Button onClick={handleClose} color="primary">
                        Huỷ bỏ
                    </Button>
                    <Button onClick={handleCancelOrder} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
}
