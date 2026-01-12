import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LEAD_STATUSES, type Lead } from "@/types";
import { leadSchema, type LeadValues } from "../../schemas/lead.schema";
import { LEAD_FIELD_LABELS } from "@/shared/constants/lead-fields";
import { useLeadsContext } from "@/context/leads/use-leads-context";

type LeadFormProps = {
  lead: Lead;
};

const LeadForm = ({ lead }: LeadFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = lead;
  const defaultValues: LeadValues = {
    ...rest,
    details: {
      ...rest.details,
      tags: rest.details.tags ?? "",
    },
  };
  const dispatch = useLeadsContext(({ dispatch }) => dispatch);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues,
    mode: "onBlur",
  });

  const submitHandler = (values: LeadValues) => {
    dispatch({
      type: "UPDATE_LEAD",
      payload: {
        leadId: lead.id,
        updater: (lead) => ({
          ...lead,
          ...values,
        }),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={2}>
        <TextField
          label={LEAD_FIELD_LABELS["company"]}
          {...register("company")}
          error={!!errors.company}
          helperText={errors.company?.message}
        />
        <TextField
          label={LEAD_FIELD_LABELS["contact.name"]}
          {...register("contact.name")}
          error={!!errors.contact?.name}
          helperText={errors.contact?.name?.message}
        />
        <TextField
          label={LEAD_FIELD_LABELS["contact.email"]}
          {...register("contact.email")}
          error={!!errors.contact?.email}
          helperText={errors.contact?.email?.message}
        />
        <TextField
          label={LEAD_FIELD_LABELS["status"]}
          {...register("status")}
          error={!!errors.status}
          helperText={errors.status?.message}
          select
          slotProps={{
            select: {
              native: true,
            },
          }}
        >
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </TextField>
        <TextField
          label={LEAD_FIELD_LABELS["details.value"]}
          type="number"
          {...register("details.value", { valueAsNumber: true })}
          error={!!errors.details?.value}
          helperText={errors.details?.value?.message}
        />
        <TextField
          label={LEAD_FIELD_LABELS["details.tags"]}
          {...register("details.tags")}
          error={!!errors.details?.tags}
          helperText={errors.details?.tags?.message}
        />
        <TextField
          label={LEAD_FIELD_LABELS["details.notes"]}
          {...register("details.notes")}
          error={!!errors.details?.notes}
          helperText={errors.details?.notes?.message}
          multiline
          minRows={3}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || isSubmitting}
        >
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default LeadForm;
