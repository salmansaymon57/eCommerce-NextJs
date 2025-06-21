import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  image: string;
  variant: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.variant === action.payload.variant
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; variant: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id && item.variant === action.payload.variant);
      if (item) {
        item.quantity = action.payload.quantity > 0 ? action.payload.quantity : 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; variant: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.variant === action.payload.variant)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;