import { HOME_ROUTE, CART_ROUTE } from "./patches";
import { Cart } from "../pages/Cart";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const routes = [
    {
        path: HOME_ROUTE,
        element: <Home pizzas={[1, 2, 3]} />,
    },
    {
        path: CART_ROUTE,
        element: <Cart />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
