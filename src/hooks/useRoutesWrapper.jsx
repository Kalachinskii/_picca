import { useRoutes } from "react-router-dom";
import { routes } from "../utils/routes";

// через use
export function useRoutesWrapper() {
    // +внешнии хуки и логика
    // возвращяем результат а не верстку
    return useRoutes(routes);
}
