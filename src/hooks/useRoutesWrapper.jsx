import { useRoutes } from "react-router-dom";
import { routes } from "../utils/routes";

// через use
export function useRoutesWrapper() {
    return useRoutes(routes);
}
