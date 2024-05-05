import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { getLatestBook } from '../../State/Books/Action';
// import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
// import { Star } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
import ProductCard from '../../user/components/Product/ProductCard';

import FiberNewIcon from '@mui/icons-material/FiberNew';

function LatestBook() {
    // const navigate = useNavigate();

    const dispatch = useDispatch();
    const { books } = useSelector((store) => ({
        books: store.book.books,
    }));

    // const shortenTitle = (title) => {
    //     if (title.length > 30) {
    //         return title.substring(0, 30) + '...';
    //     }
    //     return title;
    // };

    useEffect(() => {
        dispatch(getLatestBook());
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-[30px] mb-[30px] ">
            <div className="border border-red-600 p-3 rounded-lg bg-white">
                <div className="p-3 flex items-center">
                    <FiberNewIcon sx={{ fontSize: '30px', color: '#b33939' }} />
                    <span className="font-semibold ml-2" style={{ fontSize: '24px' }}>
                        Sách mới
                    </span>
                </div>
                {books && books?.length > 0 && (
                    <div className="grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                        {books?.map((product) => (
                            <ProductCard key={product.bookId} product={product} />
                            // <Card
                            //     key={product}
                            //     onClick={() => navigate(`/book/${product.bookId}`)}
                            //     sx={{
                            //         cursor: 'pointer',
                            //         display: 'flex',
                            //         flexDirection: 'column',
                            //         height: '100%',
                            //         position: 'relative',
                            //         transition: 'transform 0.2s ease-in-out',
                            //         '&:hover': {
                            //             transform: 'scale(1.05)',
                            //             boxShadow:
                            //                 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
                            //         },
                            //     }}
                            // >
                            //     <Box
                            //         sx={{
                            //             position: 'absolute',
                            //             top: '5px',
                            //             left: '5px',
                            //             backgroundColor: 'red',
                            //             color: 'white',
                            //             padding: '2px 4px',
                            //             borderRadius: '5px',
                            //         }}
                            //     >
                            //         {product.discountPercent && `-${product.discountPercent}%`}
                            //     </Box>
                            //     <CardMedia
                            //         component="img"
                            //         height="240"
                            //         image={product.bookImage}
                            //         alt={product.bookTitle}
                            //         sx={{ width: '300px' }}
                            //     />
                            //     <CardContent sx={{ flexGrow: 1 }}>
                            //         <Typography gutterBottom>{shortenTitle(product.bookTitle)}</Typography>
                            //         <Stack direction="row" justifyContent="space-between" alignItems="center">
                            //             <Typography
                            //                 variant="subtitle1"
                            //                 gutterBottom
                            //                 component="div"
                            //                 className="text-red-500"
                            //             >
                            //                 {new Intl.NumberFormat('vi-VN', {
                            //                     style: 'currency',
                            //                     currency: 'VND',
                            //                 }).format(product.discountedPrice)}
                            //             </Typography>
                            //             <Typography variant="subtitle2" gutterBottom component="div">
                            //                 <Star sx={{ mr: 0.5 }} fontSize="inherit" className="text-yellow-500" />
                            //                 {product.numRating}
                            //             </Typography>
                            //         </Stack>
                            //         <Typography
                            //             variant="subtitle1"
                            //             gutterBottom
                            //             component="div"
                            //             className="text-gray-700 line-through"
                            //         >
                            //             {new Intl.NumberFormat('vi-VN', {
                            //                 style: 'currency',
                            //                 currency: 'VND',
                            //             }).format(product.bookPrice)}
                            //         </Typography>
                            //         <Typography variant="body2" gutterBottom component="div">
                            //             Số lượng còn lại: {`${product.stockQuantity}`}
                            //         </Typography>
                            //     </CardContent>
                            // </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LatestBook;
