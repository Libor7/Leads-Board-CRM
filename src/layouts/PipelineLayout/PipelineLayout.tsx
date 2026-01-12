import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { Container } from "@mui/material";

import styles from "./PipelineLayout.module.scss";
import PageLoader from "@/shared/ui/components/PageLoader/PageLoader";

const PipelineLayout = () => {
  return (
    <Container maxWidth={false} className={styles["pipeline-container"]}>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default PipelineLayout;
