import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { rootRoute } from "@/routes/root";
import { leadsRoute, leadDetailRoute } from "@/routes/leads";
import { LeadsProvider } from "@/context/leads/leads-provider";
import "@/index.css";

const routeTree = rootRoute.addChildren([leadsRoute, leadDetailRoute]);

const router = createRouter({
  routeTree,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LeadsProvider>
      <RouterProvider router={router} />
    </LeadsProvider>
  </StrictMode>
);
