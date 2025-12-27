import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const rootIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/pipeline/leads" });
  },
});
