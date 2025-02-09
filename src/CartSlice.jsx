import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        if (action.payload.quantity > 0) {
          item.quantity = action.payload.quantity;
        } else {
          state.items = state.items.filter(i => i.name !== action.payload.name);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
});

// Selector to calculate the total cost of all items in the cart
export const calculateTotalAmount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity * item.cost, 0);

// Selector to calculate total quantity of all items in the cart
export const calculateTotalQuantity = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Function to calculate the subtotal for each plant type
export const calculateItemSubtotal = (item) => item.quantity * item.cost;

// Handle "Continue Shopping"
export const handleContinueShopping = (navigate) => {
  navigate('/'); // Adjust the path as needed
};

// Placeholder checkout function
export const handleCheckoutShopping = () => {
  alert('Functionality to be added for future reference');
};

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
