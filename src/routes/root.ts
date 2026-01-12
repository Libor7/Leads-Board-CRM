import { createRootRoute, lazyRouteComponent } from "@tanstack/react-router";

import App from "@/App";

export const rootRoute = createRootRoute({
  component: App,
  errorComponent: lazyRouteComponent(() => import("@/pages/ErrorPage")),
});
