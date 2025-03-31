import { HOME_ROUTE, CART_ROUTE } from "./patches";
import { Cart } from "../pages/Cart";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: HOME_ROUTE,
                element: <Home pizzas={[1, 2, 3]} loading={true} />,
            },
            {
                path: CART_ROUTE,
                element: <Cart />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];
