# React Router Architecture & Data Flows

This document details the routing implementation and data loading/mutation patterns used in **Fast React Pizza Co.** using **React Router (v6/v7 Data Router APIs)**.

---

## Table of Contents
1. [Route Configuration (`App.jsx`)](#1-route-configuration-appjsx)
2. [Layout & Loading Indicator (`AppLayout.jsx`)](#2-layout--loading-indicator-applayoutjsx)
3. [Data Fetching with Loaders](#3-data-fetching-with-loaders)
4. [Data Mutation with Actions & Form Submissions](#4-data-mutation-with-actions--form-submissions)
5. [Error Boundaries (`Error.jsx`)](#5-error-boundaries-errorjsx)
6. [Navigation Helpers](#6-navigation-helpers)

---

## 1. Route Configuration (`App.jsx`)

The routing schema is defined in [`src/App.jsx`](./src/App.jsx) using React Router's modern declarative data router API `createBrowserRouter` and provided via `RouterProvider`.

```javascript
const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Error/>,
    children : [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/menu",
        element: <Menu/>,
        loader: MenuLoader,
        errorElement: <Error/>,
      }, 
      {
        path: "/cart",
        element: <Cart/>
      }, 
      {
        path: "/order/new",
        element: <CreateOrder/>,
        action: CreateOrderAction,
      },
      {
        path: "/order/:orderID",
        element: <Order/>,
        loader: orderLoader,
        errorElement: <Error/>,
        action: updateOrderAction
      }
    ]
  }
])
```

---

## 2. Layout & Loading Indicator (`AppLayout.jsx`)

Instead of rendering routes in isolation, the app uses a persistent layout wrapped by `AppLayout` (`src/ui/AppLayout.jsx`).

- **`<Outlet />`**: Represents the placeholder component where the currently matched child route is rendered.
- **Global Loading State (`useNavigation`)**: When a loader starts fetching data for a new route transition, the transition state changes. `useNavigation().state` is checked: if it equals `"loading"`, the app renders a global fullscreen loading overlay (`<Loader />`).

```javascript
export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen bg-amber-300 grid grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
```

---

## 3. Data Fetching with Loaders

React Router's loaders fetch data **before** a route component is rendered, eliminating "fetch-on-render" waterfalls.

### Declaring a Loader (`src/features/menu/Menu.jsx` / `src/features/order/Order.jsx`)
Loaders are declared as simple async functions inside the feature files and exported:

```javascript
// src/features/order/Order.jsx
export async function loader({ params }) {
  // Access dynamic URL parameter: params.orderID
  const order = await getOrder(params.orderID);
  return order;
}
```

### Consuming Loader Data
Inside the component, retrieve the resolved loader data using `useLoaderData()`:

```javascript
import { useLoaderData } from "react-router-dom";

function Order() {
  const order = useLoaderData();
  // ... render page with order data ...
}
```

---

## 4. Data Mutation with Actions & Form Submissions

Mutations (such as submitting a new order or updating an existing order to "priority") are handled using React Router Actions. 

### Submitting Forms using `<Form>`
React Router overrides standard HTML `<form>` submissions with the `<Form>` (capital F) or `<fetcher.Form>` component. Instead of reloading the page, this automatically submits request payloads to the associated route's `action`.

```javascript
import { Form } from "react-router-dom";

function CreateOrder() {
  return (
    <Form method="POST">
      <input type="text" name="customer" required />
      <button type="submit">Place Order</button>
    </Form>
  );
}
```

### Defining the Action function
The action function processes incoming form data and returns redirects or errors:

```javascript
// src/features/order/CreateOrder.jsx
import { redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const createdOrder = await createOrder(newOrder);
  
  // Navigate away on success to the newly created order ID
  return redirect(`/order/${createdOrder.id}`);
}
```

### Fetcher Form (Non-navigation Mutations)
For actions that update data without navigating away from the current page (e.g., marking an order as priority inside `UpdateOrder.jsx`), use `useFetcher()`:

```javascript
// src/features/order/UpdateOrder.jsx
import { useFetcher } from 'react-router-dom';

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // Submits request to action defined on the current route "/order/:orderID"
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
```

---

## 5. Error Boundaries (`Error.jsx`)

When a loader or action throws an error (e.g., network failure, 404), React Router catches the bubble-up exception and displays the nearest matched `errorElement` instead of crashing the app.

In [`src/ui/Error.jsx`](./src/ui/Error.jsx), `useRouteError` is used to capture details of the thrown error:

```javascript
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>
    </div>
  );
}
```

---

## 6. Navigation Helpers

- **Programmatic Navigation (`useNavigate`)**: Used to trigger transitions in response to user actions (e.g. form submission triggers redirection, going back).
  ```javascript
  const navigate = useNavigate();
  navigate('/menu');
  navigate(-1); // Go back in history
  ```
- **Custom Link Wrapper (`LinkButton.jsx`)**: Implements an abstraction around `<Link>` to handle custom styles and action triggers consistently.
  ```javascript
  import { Link } from 'react-router-dom';
  
  function LinkButton({ children, to }) {
    if (to === "-1") return <button onClick={() => navigate(-1)}>{children}</button>;
    return <Link to={to}>{children}</Link>;
  }
  ```
