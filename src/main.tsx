if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_WDYR === "true") {
  await import("./wdyr");
}

import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createRouter,
  lazyRouteComponent,
  RouterProvider,
} from "@tanstack/react-router";
import qs from "qs";

import { rootRoute } from "@/routes/root";
import { pipelineRoute } from "@/routes/pipeline";
import { leadsRoute, leadDetailRoute, leadsIndexRoute } from "@/routes/leads";
import { LeadsProvider } from "@/context/leads/leads-provider";
import { rootIndexRoute } from "@/routes/root-index";
import { pipelineIndexRoute } from "@/routes/pipeline-index";
import PageLoader from "@/shared/ui/components/PageLoader/PageLoader";
import { theme } from "./theme";
import "@/index.css";

const routeTree = rootRoute.addChildren([
  rootIndexRoute,
  pipelineRoute.addChildren([
    pipelineIndexRoute,
    leadsRoute.addChildren([leadsIndexRoute, leadDetailRoute]),
  ]),
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: lazyRouteComponent(
    () => import("@/pages/NotFoundPage")
  ),
  defaultPendingComponent: PageLoader,
  defaultPendingMs: 300,
  defaultPendingMinMs: 500,
  stringifySearch: (search) => {
    const query = qs.stringify(search, {
      arrayFormat: "comma",
      encode: false,
    });
    return query ? `?${query}` : "";
  },
  parseSearch: (search) =>
    qs.parse(search, {
      ignoreQueryPrefix: true,
    }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LeadsProvider>
        <RouterProvider router={router} />
      </LeadsProvider>
    </ThemeProvider>
  </StrictMode>
);
