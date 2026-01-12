import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import PageLoader from "@/shared/ui/components/PageLoader/PageLoader";

const App = () => (
  <Suspense fallback={<PageLoader />}>
    <Outlet />
  </Suspense>
);

export default App;
