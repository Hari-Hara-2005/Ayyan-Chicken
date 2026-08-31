import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "meatshop_cart";

function loadCartFromStorage() {
  try {
    const serialized = localStorage.getItem(CART_STORAGE_KEY);
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch (err) {
    console.error("Could not load cart from localStorage:", err);
    return [];
  }
}

function saveCartToStorage(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Could not save cart to localStorage:", err);
  }
}

const initialState = {
  items: loadCartFromStorage(), // [{ lineId, productId, title, image, weight, pieces, price, mrp, qty }]
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // payload: { productId, title, image, weight, pieces, price, mrp, qty }
    // Dedupe rule: same productId + same weight = same line (lineId), so
    // clicking "Add" again on an already-added variant increments qty
    // instead of pushing a second, duplicate entry into the cart.
    addToCart: (state, action) => {
      const { productId, title, image, weight, pieces, price, mrp, qty } =
        action.payload;

      const lineId = `${productId}-${weight}`;
      const existing = state.items.find((item) => item.lineId === lineId);

      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({
          lineId,
          productId,
          title,
          image,
          weight,
          pieces,
          price,
          mrp,
          qty,
        });
      }

      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const lineId = action.payload;
      state.items = state.items.filter((item) => item.lineId !== lineId);
      saveCartToStorage(state.items);
    },

    incrementQty: (state, action) => {
      const lineId = action.payload;
      const item = state.items.find((i) => i.lineId === lineId);
      if (item) item.qty += 1;
      saveCartToStorage(state.items);
    },

    decrementQty: (state, action) => {
      const lineId = action.payload;
      const item = state.items.find((i) => i.lineId === lineId);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter((i) => i.lineId !== lineId);
        }
      }
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = CartSlice.actions;


export const selectCartItems = (state) => state.cart.items;
export const selectCartQty = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartCount = (state) => state.cart.items.length;

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty * i.price, 0);

export default CartSlice.reducer;
