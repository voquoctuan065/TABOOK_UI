import { Helmet } from 'react-helmet-async';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    Rating,
    Stack,
    TextField,
} from '@mui/material';
import { Star } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookByCategory, getBookById } from '../../../State/Books/Action';
import ProductReviewCard from './ProductReviewCard';
import ProductCard from '../Product/ProductCard';

import { addToCart } from '../../../State/Cart/cartSlice';
import { toast } from 'react-toastify';

export default function ProductDetail() {
    const dispatch = useDispatch();
    const { book } = useSelector((store) => store);
    const [relateBook, setRelateBook] = useState([]);
    const { bookRequestId } = useParams();
    const [pathName, setPathName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getBookById(bookRequestId));
    }, [bookRequestId]);

    useEffect(() => {
        if (book.book) {
            setPathName(book.book.category.pathName);
        }
    }, [book.book, bookRequestId]);

    useEffect(() => {
        const data = {
            cleanItem: pathName,
            currentPage: 0,
        };

        dispatch(getBookByCategory(data));
    }, [pathName, bookRequestId]);

    useEffect(() => {
        if (book.books) {
            const data = book.books.booksDtoList.filter((item) => item.bookId !== book.book?.bookId);
            setRelateBook(data);
        }
    }, [book.books]);

    const handleMinusQuantityClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddQuantityClick = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: book.book?.bookId,
                title: book.book?.bookTitle,
                price: book.book?.bookPrice,
                discountedPrice: book.book?.discountedPrice,
                discountPercent: book.book?.discountPercent,
                bookImage: book.book?.bookImage,
                quantity: quantity,
            }),
        );
        toast.success('Sách đã được thêm vào giỏ hàng!');
    };

    const handleAddToCartSuccess = () => {
        setSuccessDialogOpen(false);
    };
    return (
        <>
            <Helmet>
                <title> Chi tiết sách </title>
            </Helmet>
            <Navbar />
            <div className="bg-gray-200">
                <div className="container mx-auto px-4">
                    <div className="pt-5">
                        <Grid container className="bg-white rounded p-5">
                            <Grid item xs={5} className="p-4">
                                <div className="mb-4 p-5 h-[100%]">
                                    <img src={`${book.book?.bookImage}`} className="h-[100%]" />
                                </div>
                            </Grid>
                            <Grid item xs={7} className="p-4">
                                <div className="ml-5">
                                    <h1
                                        className="font-semibold text-2xl overflow-hidden
                                        text-wrap
                                        whitespace-nowrap
                                        inline-block w-[100%]"
                                    >
                                        {book.book?.bookTitle}
                                    </h1>
                                    <div className="mt-5">
                                        <div
                                            className="
                                        overflow-hidden
                                        text-ellipsis
                                        whitespace-nowrap
                                        inline-block w-[60%] pr-[15px] "
                                            style={{}}
                                        >
                                            <span className="pr-[5px]">Nhà xuất bản:</span>
                                            <span className="font-semibold">{book.book?.nxb.nxbName}</span>
                                        </div>
                                        <div className="inline-block whitespace-nowrap overflow-hidden pl-[15px] text-ellipsis w-[39%]">
                                            <span className="pr-[5px]">Tác giả:</span>
                                            <span className="font-semibold">{book.book?.authorName}</span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div>
                                            <Star sx={{ mr: 0.5 }} fontSize="inherit" className="text-yellow-500" />(
                                            {book.book?.numRating} đánh giá)
                                        </div>
                                        <div className="mt-8 flex items-center">
                                            <h1 className="text-2xl text-red-700 font-bold mr-5">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(book.book?.discountedPrice)}
                                            </h1>
                                            <span className="mr-5 line-through">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(book.book?.bookPrice)}
                                            </span>
                                            <Box
                                                sx={{
                                                    width: '50px',
                                                    color: 'white',
                                                    padding: '2px 4px',
                                                    borderRadius: '5px',
                                                }}
                                                className="bg-red-700"
                                            >
                                                -{book.book?.discountPercent}%
                                            </Box>
                                        </div>

                                        <div className="flex mt-8" style={{ fontSize: '1em' }}>
                                            <div style={{ maxWidth: '200px', minWidth: '150px' }}>
                                                Chính sách đổi trả&nbsp;
                                            </div>
                                            <div
                                                style={{
                                                    minWidth: 'calc(100% - 200px)',
                                                    maxWidth: 'calc(100% - 150px)',
                                                }}
                                            >
                                                <div className="flex">
                                                    <div
                                                        className="cursor-tex select-text whitespace-nowrap
                                                    overflow-hidden text-ellipsis
                                                    "
                                                        style={{ maxWidth: 'calc(100%-100px)' }}
                                                    >
                                                        Đổi trả sản phẩm trong&nbsp;30&nbsp;ngày
                                                    </div>
                                                    <div
                                                        className="cursor-pointer w-[80px] text-indigo-500 font-semibold
                                                    pl-[10px] whitespace-nowrap
                                                    "
                                                    >
                                                        Xem thêm
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-center py-[8px] mt-4">
                                            <label
                                                style={{
                                                    fontSize: '1.2em',
                                                    textAlign: 'left',
                                                    maxWidth: '200px',
                                                    minWidth: '150px',
                                                    color: '#555555',
                                                }}
                                                className="pr-[8px] pt-[6px] font-semibold"
                                            >
                                                Số lượng:
                                            </label>
                                            <div
                                                className="flex items-center h-12"
                                                style={{
                                                    border: '1px solid #929191',
                                                    borderRadius: '6px',
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<RemoveIcon />}
                                                    sx={{
                                                        border: 'none',
                                                        height: '100%',
                                                        '&:hover': {
                                                            border: 'none',
                                                        },
                                                    }}
                                                    onClick={handleMinusQuantityClick}
                                                />
                                                <Stack
                                                    component="form"
                                                    sx={{
                                                        width: '8ch',
                                                        marginLeft: '10px',
                                                        marginRight: '10px',
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <TextField
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        hiddenLabel
                                                        value={quantity}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            '& .MuiInputBase-input': {
                                                                color: '#0D0E0F', // Màu sắc
                                                                fontWeight: 700, // Độ đậm
                                                                fontSize: '1.2em', // Kích thước chữ
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                border: 'none', // Loại bỏ border
                                                            },
                                                            '& .MuiOutlinedInput-notchedOutline': {
                                                                border: 'none', // Loại bỏ border
                                                            },
                                                        }}
                                                    />
                                                </Stack>
                                                <Button
                                                    variant="outlined"
                                                    className=""
                                                    endIcon={<AddIcon />}
                                                    sx={{
                                                        border: 'none',
                                                        height: '100%',
                                                        '&:hover': {
                                                            border: 'none',
                                                        },
                                                    }}
                                                    onClick={handleAddQuantityClick}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5" style={{ minWidth: '300px', maxWidth: '400px' }}>
                                            <Button variant="contained" color="error" onClick={handleAddToCart}>
                                                <AddShoppingCartIcon />
                                                <span className="ml-2">Thêm vào giỏ hàng</span>
                                            </Button>
                                            <Button
                                                style={{
                                                    border: '2px solid',
                                                    fontWeight: 700,
                                                    marginLeft: '50px',
                                                }}
                                                variant="outlined"
                                                color="error"
                                            >
                                                Mua ngay
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="p-[15px] rounded-lg bg-white mt-[15px]">
                        <div className="font-bold text-lg">Thông tin sản phẩm</div>
                        <div className="overflow-hidden max-h-[600px]">
                            <div style={{ borderBottom: '1px solid #c1c1c1' }}>
                                <table className="border-0 shadow-none w-[100%]">
                                    <colgroup>
                                        <col className="w-[25%]" />
                                        <col />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th
                                                className="border-0 p-[4px] text-left"
                                                style={{ fontSize: '1em', fontWeight: 'normal', color: '#777' }}
                                            >
                                                Tác giả{' '}
                                            </th>
                                            <td className="border-0 p-[4px] " style={{ fontSize: '1em' }}>
                                                {book.book?.authorName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th
                                                className="border-0 p-[4px] text-left"
                                                style={{ fontSize: '1em', fontWeight: 'normal', color: '#777' }}
                                            >
                                                NXB{' '}
                                            </th>
                                            <td className="border-0 p-[4px]" style={{ fontSize: '1em' }}>
                                                {book.book?.nxb.nxbName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th
                                                className="border-0 p-[4px] text-left"
                                                style={{ fontSize: '1em', fontWeight: 'normal', color: '#777' }}
                                            >
                                                Năm XB{' '}
                                            </th>
                                            <td className="border-0 p-[4px]" style={{ fontSize: '1em' }}>
                                                {book.book?.yearProduce}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="p-[0px]">
                                                <div>
                                                    Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành.
                                                    Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng
                                                    mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận
                                                    chuyển, phụ phí hàng cồng kềnh,...
                                                </div>
                                                <div style={{ color: '#C92127' }}>
                                                    Chính sách khuyến mãi trên Tabook.com không áp dụng cho Hệ thống Nhà
                                                    sách TABOOK trên toàn quốc
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: book.book?.bookDescription }} />
                    </div>

                    {/* Similar product */}
                    <section className="pt-10">
                        <h1 className="py-5 text-xl font-bold">Sản phẩm liên quan</h1>
                        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-6">
                            <div className="grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                                {relateBook.slice(0, 8).map((item) => (
                                    <ProductCard key={item.bookId} product={item} />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Rating and Reviews */}
                    <section className="mt-[15px] p-[15px] rounded-lg bg-white">
                        <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
                        <div className="border p-5">
                            <Grid container spacing={7}>
                                <Grid item xs={7}>
                                    <div className="space-y-5">
                                        {[1, 2, 3].map((item) => (
                                            <ProductReviewCard key={item} />
                                        ))}
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                                    <div className="flex items-center space-x-3">
                                        <Rating value={4.6} precision={0.5} readOnly />
                                        <p className="opacity-60">54 Ratings</p>
                                    </div>
                                    <Box className="mt-5">
                                        <Grid container alignItems="center" gap={2}>
                                            <Grid item xs={2}>
                                                <p>Excellent</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress
                                                    sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }}
                                                    variant="determinate"
                                                    value={40}
                                                    color="success"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" gap={2}>
                                            <Grid item xs={2}>
                                                <p>Very Good</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress
                                                    sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }}
                                                    variant="determinate"
                                                    value={30}
                                                    color="success"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container alignItems="center" gap={2}>
                                            <Grid item xs={2}>
                                                <p>Good</p>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <LinearProgress
                                                    sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }}
                                                    variant="determinate"
                                                    value={40}
                                                    color="success"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />

            <Dialog open={successDialogOpen} onClose={handleAddToCartSuccess}>
                <DialogTitle>Thành công!</DialogTitle>
                <DialogContent>
                    <p>Sách đã được thêm vào giỏ hàng thành công.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddToCartSuccess}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
