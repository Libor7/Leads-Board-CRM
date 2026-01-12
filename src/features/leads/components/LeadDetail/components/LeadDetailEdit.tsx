import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLeadDetailContext } from "../context/use-lead-detail-context";
import { useLeadsContext } from "@/context/leads/use-leads-context";
import { leadFieldSchemas } from "@/features/leads/schemas/lead-field.schemas";
import type { LeadFieldValue } from "../lead-detail.types";
import { setValueByPath } from "@/shared/utils/setValueByPath";
import { LEAD_STATUSES, type Lead } from "@/types";

const LeadDetailEdit = memo(() => {
  const field = useLeadDetailContext(({ field }) => field);
  const inputType = useLeadDetailContext(({ inputType }) => inputType);
  const leadId = useLeadDetailContext(({ leadId }) => leadId);
  const registerSubmit = useLeadDetailContext(
    ({ registerSubmit }) => registerSubmit
  );
  const toggleMode = useLeadDetailContext(({ toggleMode }) => toggleMode);
  const value = useLeadDetailContext(({ value }) => value);
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

  const submitHandler = useCallback(
    ({ value: newValue }: { value: LeadFieldValue }) => {
      dispatch({
        type: "UPDATE_LEAD",
        payload: {
          leadId,
          updater: (lead) => setValueByPath<Lead>(lead, field, newValue),
        },
      });
      toggleMode();
    },
    [dispatch, field, leadId, toggleMode]
  );

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
});

export default LeadDetailEdit;
