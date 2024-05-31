import { createSlice } from '@reduxjs/toolkit';

const clearCartState = () => {
    localStorage.removeItem('cartState');
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        const parsedState = JSON.parse(serializedState);
        // Kiểm tra nếu cartTotalAmount là một giá trị không hợp lệ (ví dụ: âm hoặc không phải số)
        if (
            typeof parsedState.cartTotalAmount !== 'number' ||
            isNaN(parsedState.cartTotalAmount) ||
            parsedState.cartTotalAmount < 0
        ) {
            // Trả về một initialState mới nếu giá trị không hợp lệ
            return {
                cartItems: [],
                cartTotalQuantity: 0,
                cartTotalAmount: 0,
            };
        }
        return parsedState;
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);

        setTimeout(clearCartState, 5 * 60 * 1000);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};

const initialState = loadState() || {
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
                    state.cartTotalQuantity -= quantity;
                    state.cartTotalAmount -= state.cartItems[existingItemIndex].discountedPrice * quantity;
                } else {
                    const removedQuantity = state.cartItems[existingItemIndex].quantity;
                    state.cartTotalQuantity -= removedQuantity;
                    state.cartTotalAmount -= state.cartItems[existingItemIndex].discountedPrice * removedQuantity;
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

        clearCart(state) {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
        },
    },
});

const { actions, reducer } = cartSlice;
const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = actions;

const cartReducer = (state, action) => {
    const newState = reducer(state, action);
    saveState(newState);
    return newState;
};

export { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart };
export default cartReducer;
