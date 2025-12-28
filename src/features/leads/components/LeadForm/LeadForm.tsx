import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import type { Lead, LeadDraft } from "@/types";

interface LeadFormProps {
  lead: Lead;
  onSubmit: (draft: LeadDraft) => void;
}

const LeadForm = ({ lead, onSubmit }: LeadFormProps) => {
  const [form, setForm] = useState<LeadDraft>({
    company: lead.company,
    contact: {
      name: lead.contact.name,
      email: lead.contact.email,
    },
    status: lead.status,
    details: {
      value: lead.details.value,
      tags: [...lead.details.tags],
      notes: lead.details.notes,
    },
  });

  const changeHandler =
    (field: string) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: target.value,
      }));
    };

  return (
    <Stack spacing={2}>
      <TextField
        label="Company"
        value={form.company}
        onChange={changeHandler("company")}
      />

      <TextField
        label="Contact name"
        value={form.contact.name}
        onChange={({ target }) =>
          setForm((prev) => ({
            ...prev,
            contact: { ...prev.contact, name: target.value },
          }))
        }
      />

      <TextField
        label="Email"
        value={form.contact.email}
        onChange={({ target }) =>
          setForm((prev) => ({
            ...prev,
            contact: { ...prev.contact, email: target.value },
          }))
        }
      />

      <TextField
        label="Value"
        type="number"
        value={form.details.value}
        onChange={({ target }) =>
          setForm((prev) => ({
            ...prev,
            details: {
              ...prev.details,
              value: Number(target.value),
            },
          }))
        }
      />

      <Button variant="contained" onClick={() => onSubmit(form)}>
        Save
      </Button>
    </Stack>
  );
};

export default LeadForm;
