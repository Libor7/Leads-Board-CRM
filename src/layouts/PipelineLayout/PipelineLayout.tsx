import { Outlet } from "@tanstack/react-router";
import { Container } from "@mui/material";

import styles from "./PipelineLayout.module.scss";

const PipelineLayout = () => {
  return (
    <Container maxWidth={false} className={styles["pipeline-container"]}>
      <Outlet />
    </Container>
  );
};

export default PipelineLayout;
