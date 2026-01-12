import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { lazy, memo, Suspense, useCallback, useRef, useState } from "react";

import { formatLeadDetailValue } from "@/features/leads/utils/formatLeadDetailValue";
import type {
  LeadDetailContextValue,
  LeadDetailMode,
  LeadFieldValue,
} from "../lead-detail.types";
import LeadDetailLayout from "./LeadDetailLayout";
import { LeadDetailContext } from "../context/lead-detail-context";
import { useLeadDetailContext } from "../context/use-lead-detail-context";
import { type LeadField } from "@/types";
import { leadDetailInputMap } from "../lead-detail.input-map";
import Icon from "@/shared/ui/components/Icon/Icon";
import { leadDetailActions } from "../leadDetailActions";
import type { SupportedIcons } from "@/shared/ui/components/Icon/icon.constants";

const LeadDetailEditLazy = lazy(() => import("./LeadDetailEdit"));

const LeadDetailEdit = () => (
  <Suspense fallback={null}>
    <LeadDetailEditLazy />
  </Suspense>
);

type LeadDetailProps = {
  field: LeadField;
  label: string;
  leadId: string;
  value: LeadFieldValue;
};

type LeadDetailActionButtonProps = {
  icon: SupportedIcons;
  execute: (ctx: LeadDetailContextValue) => void;
};

const LeadDetail = ({ field, label, leadId, value }: LeadDetailProps) => {
  const [mode, setMode] = useState<LeadDetailMode>("view");
  const submitRef = useRef<() => void>(null);
  const inputType = leadDetailInputMap[field];

  const toggleMode = useCallback(() => {
    setMode((prevState) => (prevState === "view" ? "edit" : "view"));
  }, []);

  const submit = useCallback(() => {
    submitRef.current?.();
  }, []);

  const registerSubmit = (fn: (() => void) | null) => {
    submitRef.current = fn;
  };

  return (
    <LeadDetailContext.Provider
      value={{
        field,
        inputType,
        leadId,
        mode,
        registerSubmit,
        submit,
        toggleMode,
        value,
      }}
    >
      <LeadDetailLayout label={label}>
        {mode === "edit" ? <LeadDetail.Edit /> : <LeadDetail.View />}
        <LeadDetail.Actions />
      </LeadDetailLayout>
    </LeadDetailContext.Provider>
  );
};

const LeadDetailActionButton = memo(
  ({ icon, execute }: LeadDetailActionButtonProps) => {
    const ctx = useLeadDetailContext((ctx) => ctx);

    return (
      <IconButton onClick={() => execute(ctx)}>
        <Icon icon={icon} />
      </IconButton>
    );
  }
);

const LeadDetailActions = () => {
  const mode = useLeadDetailContext(({ mode }) => mode);

  return (
    <>
      {leadDetailActions
        .filter(({ modes }) => modes.includes(mode))
        .map(({ icon, execute }) => (
          <LeadDetailActions.Button key={icon} icon={icon} execute={execute} />
        ))}
    </>
  );
};

const LeadDetailView = memo(() => {
  const value = useLeadDetailContext(({ value }) => value);
  const formattedValue = formatLeadDetailValue(value);

  return <Typography>{formattedValue}</Typography>;
});

LeadDetail.Actions = LeadDetailActions;
LeadDetail.View = LeadDetailView;
LeadDetail.Edit = LeadDetailEdit;
LeadDetailActions.Button = LeadDetailActionButton;

export default LeadDetail;
