import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { id, title, price, discountedPrice, discountPercent, bookImage, quantity } = action.payload;
            const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);

            if (existingItemIndex !== -1) {
                // If the item already exists in the cart, update its quantity and total amount
                state.cartItems[existingItemIndex].quantity += quantity;
                state.cartItems[existingItemIndex].total += price * quantity;
            } else {
                // If it's a new item, add it to the cart
                state.cartItems.push({
                    id,
                    title,
                    price,
                    discountedPrice,
                    discountPercent,
                    bookImage,
                    quantity,
                    total: discountedPrice * quantity,
                });
            }

            state.cartTotalQuantity += quantity;
            state.cartTotalAmount += discountedPrice * quantity;
        },

        removeFromCart(state, action) {
            const { id, quantity } = action.payload;
            const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);

            if (existingItemIndex !== -1) {
                if (state.cartItems[existingItemIndex].quantity > quantity) {
                    state.cartItems[existingItemIndex].quantity -= quantity;
                    state.cartItems[existingItemIndex].total -=
                        state.cartItems[existingItemIndex].discountedPrice * quantity;
                } else {
                    state.cartTotalQuantity -= state.cartItems[existingItemIndex].quantity;
                    state.cartTotalAmount -= state.cartItems[existingItemIndex].total;
                    state.cartItems.splice(existingItemIndex, 1);
                }
            }
        },

        increaseQuantity(state, action) {
            const { id } = action.payload;
            const itemIndex = state.cartItems.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity++;
                state.cartTotalQuantity++;
                state.cartTotalAmount += state.cartItems[itemIndex].discountedPrice;
            }
        },

        decreaseQuantity(state, action) {
            const { id } = action.payload;
            const itemIndex = state.cartItems.findIndex((item) => item.id === id);
            if (itemIndex !== -1 && state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity--;
                state.cartTotalQuantity--;
                state.cartTotalAmount -= state.cartItems[itemIndex].discountedPrice;
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
