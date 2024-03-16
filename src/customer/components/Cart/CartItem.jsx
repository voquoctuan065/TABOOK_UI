import { IconButton, Button } from '@mui/material';
import React from 'react';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const CartItem = () => {
    return (
        <div className="p-5 shadow-lg-border rounded-md">
            <div className="flex items-center">
                <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                    <img
                        className="w-full h-full object-cover object-top"
                        src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
                        alt=""
                    />
                </div>

                <div className="ml-5 space-y-1">
                    <p className="fonts-semibold">Men Slim Mid Rise Black Jeans</p>

                    <div className="pt-6 flex space-x-5 items-center text-gray-900">
                        <p className="font-semibold">$199</p>
                        <p className="opacity-50 line-through">$211</p>
                        <p className="text-green-600 font-semibold">5% off</p>
                    </div>
                </div>

                <div className="lg:flex items-center lg:space-x-10 pt-4">
                    <div className="flex items-center space-x-2">
                        <IconButton>
                            <RemoveCircleIcon />
                        </IconButton>
                        <span className="py-1 px-7 border rounded-sm">3</span>
                        <IconButton sx={{ bgcolor: 'RGB(45,85,253)' }}>
                            <AddCircleIcon />
                        </IconButton>
                    </div>

                    <div>
                        <Button>remove</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
