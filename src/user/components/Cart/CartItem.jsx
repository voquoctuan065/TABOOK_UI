/* eslint-disable react/prop-types */
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton, Button, Box, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { useDispatch } from 'react-redux';

import { useSpring, motion } from 'framer-motion';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../../State/Cart/cartSlice';
const BoxFramer = styled(motion.div)`
    background: #282c34;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
`;

// eslint-disable-next-line react/prop-types
export default function CartItem({ book }) {
    const initialScale = 0.5;
    const springConfig = { damping: 15, stiffness: 300 };
    const opacity = useSpring(0, springConfig);
    const scale = useSpring(initialScale, springConfig);

    const dispatch = useDispatch();

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

    const showToastMessage = () => {
        toast.success('Sách đã được xoá khỏi giỏ hàng!');
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({ id: book.id, quantity: book.quantity }));
        showToastMessage();
    };

    const handleIncreaseQuantity = () => {
        dispatch(increaseQuantity({ id: book.id }));
    };

    const handleDecreaseQuantity = () => {
        dispatch(decreaseQuantity({ id: book.id }));
    };

    return (
        <div className="border m-2 px-2 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[9rem] overflow-hidden rounded ml-3 py-[5px]">
                    <img
                        className="w-full h-full object-cover object-top transition-transform duration-300 transform hover:scale-90"
                        src={book.bookImage}
                        alt=""
                    />
                </div>

                <div className="space-y-1 max-w-[350px] w-full">
                    <div className="overflow-hidden text-wrap whitespace-nowrap block w-full">
                        <HeadlessTippy
                            render={(attrs) => (
                                <BoxFramer tabIndex="-1" style={{ scale, opacity }} {...attrs}>
                                    <span>{book.title}</span>
                                </BoxFramer>
                            )}
                            animation={true}
                            onMount={onMount}
                            onHide={onHide}
                            arrow={true}
                        >
                            <span className="block overflow-hidden whitespace-nowrap text-ellipsis">{book.title}</span>
                        </HeadlessTippy>
                    </div>

                    <div className="pt-6 flex space-x-5 items-center text-gray-900">
                        <p className="font-semibold">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(book.discountedPrice)}
                        </p>
                        <p className="opacity-50 line-through">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(book.price)}
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
                            -{book.discountPercent}%
                        </Box>
                    </div>
                </div>

                <div className="lg:flex items-center lg:space-x-10 pt-4">
                    <div className="flex items-center space-x-2">
                        <IconButton onClick={handleDecreaseQuantity}>
                            <RemoveCircleIcon
                                sx={{
                                    color: '#1e272e',
                                    '&:hover': {
                                        color: '#eb2f06',
                                    },
                                }}
                            />
                        </IconButton>
                        <span className="py-1 px-7 border rounded-sm">{book.quantity}</span>
                        <IconButton onClick={handleIncreaseQuantity}>
                            <AddCircleIcon
                                sx={{
                                    color: '#1e272e',
                                    '&:hover': {
                                        color: '#4cd137',
                                    },
                                }}
                            />
                        </IconButton>
                    </div>

                    <Button onClick={handleRemoveFromCart}>
                        <DeleteIcon sx={{ color: '#EA2027' }} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
