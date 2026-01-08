import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { leadFieldSchemas } from "@/features/leads/schemas/lead-field.schemas";
import { formatLeadDetailValue } from "@/features/leads/utils/formatLeadDetailValue";
import type { LeadDetailMode, LeadFieldValue } from "../lead-detail.types";
import LeadDetailLayout from "./LeadDetailLayout";
import { LeadDetailContext } from "../context/lead-detail-context";
import { useLeadDetailContext } from "../context/use-lead-detail-context";
import { LEAD_STATUSES, type Lead, type LeadField } from "@/types";
import { leadDetailInputMap } from "../lead-detail.input-map";
import Icon from "@/shared/ui/components/Icon/Icon";
import { leadDetailActions } from "../leadDetailActions";
import { useLeadsContext } from "@/context/leads/use-leads-context";
import { setValueByPath } from "@/shared/utils/setValueByPath";

type LeadDetailProps = {
  field: LeadField;
  label: string;
  leadId: string;
  value: LeadFieldValue;
};

const LeadDetail = ({ field, label, leadId, value }: LeadDetailProps) => {
  const [mode, setMode] = useState<LeadDetailMode>("view");
  const submitRef = useRef<() => void>(null);
  const inputType = leadDetailInputMap[field];

  const toggleMode = () => {
    setMode((prevState) => (prevState === "view" ? "edit" : "view"));
  };

  const submit = () => {
    submitRef.current?.();
  };

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

LeadDetail.Actions = () => {
  const ctx = useLeadDetailContext();

  return (
    <>
      {leadDetailActions
        .filter(({ modes }) => modes.includes(ctx.mode))
        .map(({ icon, execute }) => (
          <IconButton key={icon} onClick={() => execute(ctx)}>
            <Icon icon={icon} />
          </IconButton>
        ))}
    </>
  );
};

LeadDetail.View = () => {
  const { value } = useLeadDetailContext();
  const formattedValue = formatLeadDetailValue(value);

  return <Typography>{formattedValue}</Typography>;
};

LeadDetail.Edit = () => {
  const { field, inputType, leadId, registerSubmit, toggleMode, value } =
    useLeadDetailContext();
  const dispatch = useLeadsContext(({ dispatch }) => dispatch);
  const formSchema = z.object({
    value: leadFieldSchemas[field],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value,
    },
    mode: "onBlur",
  });

  const submitHandler = ({ value: newValue }: { value: LeadFieldValue }) => {
    dispatch({
      type: "UPDATE_LEAD",
      payload: {
        leadId,
        updater: (lead) => setValueByPath<Lead>(lead, field, newValue),
      },
    });
    toggleMode();
  };

  useEffect(() => {
    registerSubmit(handleSubmit(submitHandler));
    return () => registerSubmit(null);
  }, [handleSubmit, submitHandler, registerSubmit]);

  if (inputType === "select") {
    return (
      <TextField
        select
        defaultValue={value ?? ""}
        error={!!errors.value}
        helperText={errors.value?.message}
        {...register("value", {
          onBlur: handleSubmit(submitHandler),
        })}
      >
        {LEAD_STATUSES.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  return (
    <TextField
      type={
        inputType === "email"
          ? "email"
          : inputType === "number"
          ? "number"
          : "text"
      }
      multiline={inputType === "multiline"}
      minRows={inputType === "multiline" ? 3 : undefined}
      error={!!errors.value}
      helperText={errors.value?.message}
      {...register(
        "value",
        inputType === "number" ? { valueAsNumber: true } : {}
      )}
      onKeyDown={({ key }) => {
        if (key === "Enter") handleSubmit(submitHandler)();
        if (key === "Escape") toggleMode();
      }}
    />
  );
};

export default LeadDetail;
