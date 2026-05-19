# Redux Architecture & State Management

This document provides a detailed overview of the Redux state management system implemented in **Fast React Pizza Co.** using **Redux Toolkit (RTK)**.

---

## Table of Contents
1. [Store Configuration](#1-store-configuration)
2. [User Feature (`userSlice`)](#2-user-feature-userslice)
3. [Cart Feature (`cartSlice`)](#3-cart-feature-cartslice)
4. [React Integration & Usage Examples](#4-react-integration--usage-examples)
5. [Summary of RTK Patterns Used](#5-summary-of-rtk-patterns-used)

---

## 1. Store Configuration

The Redux store is configured using Redux Toolkit's `configureStore` and is defined in [`src/Store.js`](./src/Store.js).

### Store Structure
```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
```

### Integration with React
The store is provided to the entire application in [`src/main.jsx`](./src/main.jsx) using the `<Provider>` component from `react-redux`:
```javascript
import { Provider } from 'react-redux';
import store from './Store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

---

## 2. User Feature (`userSlice`)

Located at [`src/features/user/userSlice.js`](./src/features/user/userSlice.js), this slice manages the application user profile state, including username, loading status, geolocation coords, and geocoded address.

### State Schema
```javascript
const initialState = {
  username: '',
  status: 'idle',     // 'idle' | 'loading' | 'error'
  position: {},       // { latitude, longitude }
  address: '',        // Human-readable address string
  error: ''           // Error message if address fetching fails
};
```

### Synchronous Actions
* **`updateName(username)`**: Updates the `username` in state when the user submits the welcome form.

### Asynchronous Action (Thunk)
* **`fetchAddress`**: An async thunk created via `createAsyncThunk('user/fetchAddress')` that performs the following steps:
  1. Requests geolocation coordinate coordinates from the browser using `navigator.geolocation.getCurrentPosition`.
  2. Uses a reverse geocoding API helper (`getAddress`) to fetch the street/city name from coordinates.
  3. Returns `{ position, address }` to be processed by `extraReducers`.

#### Extra Reducers lifecycle:
* **`fetchAddress.pending`**: Sets `status` to `'loading'`.
* **`fetchAddress.fulfilled`**: Saves geolocation `position` and formatted `address` to state; sets `status` to `'idle'`.
* **`fetchAddress.rejected`**: Sets `status` to `'error'` and stores an error message.

---

## 3. Cart Feature (`cartSlice`)

Located at [`src/features/cart/cartSlice.js`](./src/features/cart/cartSlice.js), this slice manages the shopping cart state. It follows a highly selector-driven approach to minimize redundant state storage.

### State Schema
```javascript
const initialState = {
  cart: [], // Array of: { pizzaId, name, quantity, unitPrice, totalPrice }
};
```

### Actions & Reducers (Mutations)
* **`addItem(newItem)`**: Appends a new item object to the cart array.
* **`deleteItem(pizzaId)`**: Filters out the item corresponding to the given ID.
* **`increaseItemQuantity(pizzaId)`**: Increments `quantity` by 1 and updates the calculated `totalPrice`.
* **`decreaseItemQuantity(pizzaId)`**: Decrements `quantity` by 1 and updates `totalPrice`. If the quantity drops to 1 and is decremented again, it internally invokes the `deleteItem` reducer case to remove the item entirely.
* **`clearCart()`**: Resets the cart array to `[]`.

### Selectors (State Derived Values)
Selectors are exported to extract derived properties from the Redux store. Using them inside components ensures that calculations (like totaling cart quantities or prices) are clean and centralized.

* **`getCart`**: Returns the array of cart items.
  ```javascript
  export const getCart = (state) => state.cart.cart;
  ```
* **`getTotalCartQuantity`**: Computes the sum of all item quantities in the cart.
  ```javascript
  export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
  ```
* **`getTotalCartPrice`**: Computes the sum of all item total prices.
  ```javascript
  export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  ```
* **`getCurrentQuantityById(id)`**: Selects the current quantity of a specific pizza by its ID (returns `0` if not in cart).
  ```javascript
  export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  ```

---

## 4. React Integration & Usage Examples

### Reading State with `useSelector`
To display user or cart information in components, use the defined selectors:
```javascript
import { useSelector } from 'react-redux';
import { getCart, getTotalCartPrice } from './cartSlice';

function CartOverview() {
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const username = useSelector((state) => state.user.username);

  // Render logic...
}
```

### Dispatching Synchronous Actions
For user actions like adding/deleting items:
```javascript
import { useDispatch } from 'react-redux';
import { addItem, deleteItem } from './cartSlice';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return <button onClick={handleAddToCart}>Add to cart</button>;
}
```

### Dispatching Asynchronous Actions
For fetching geolocation address data in forms:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../user/userSlice';

function CreateOrder() {
  const dispatch = useDispatch();
  const { status, address, error } = useSelector((state) => state.user);

  return (
    <button 
      disabled={status === 'loading'} 
      onClick={() => dispatch(fetchAddress())}
    >
      Get Position
    </button>
  );
}
```

---

## 5. Summary of RTK Patterns Used

1. **Slice-based structure**: Colocates action creators, selectors, and reducers inside a single feature slice file (e.g., `cartSlice.js`).
2. **Direct mutations in reducers**: Leverages the Immer library internally, allowing state mutations inside slices (e.g., `state.cart.push(newItem)`) without manually spreading or deep-copying arrays/objects.
3. **Internal Reducer Redirection**: Inter-reducer delegation like calling `cartSlice.caseReducers.deleteItem(state, action)` inside `decreaseItemQuantity` allows code reuse across actions.
4. **Asynchronous Redux Lifecycle**: Handling pending, fulfilled, and rejected statuses inside `extraReducers` for async operations (reverse geocoding address retrieval).
