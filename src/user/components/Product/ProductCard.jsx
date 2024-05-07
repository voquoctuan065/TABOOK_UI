/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography, Stack, Box } from '@mui/material';
import { Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const shortenTitle = (title) => {
        if (title.length > 30) {
            return title.substring(0, 30) + '...';
        }
        return title;
    };
    return (
        <Card
            onClick={() => navigate(`/book/${product.bookId}`)}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                transition: 'transform 0.2s ease-in-out',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '2px 4px',
                    borderRadius: '5px',
                }}
            >
                {product.discountPercent && `-${product.discountPercent}%`}
            </Box>
            <CardMedia
                component="img"
                height="240"
                image={product.bookImage}
                alt={product.bookTitle}
                sx={{ width: '300px' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom>{shortenTitle(product.bookTitle)}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" gutterBottom component="div" className="text-red-500">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            product.discountedPrice,
                        )}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom component="div">
                        <Star sx={{ mr: 0.5 }} fontSize="inherit" className="text-yellow-500" />
                        {product.numRating}
                    </Typography>
                </Stack>
                <Typography variant="subtitle1" gutterBottom component="div" className="text-gray-700 line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.bookPrice)}
                </Typography>
                <Typography variant="body2" gutterBottom component="div">
                    Số lượng còn lại: {`${product.stockQuantity}`}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
