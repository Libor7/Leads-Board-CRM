import type { LeadDraft } from "@/types";
import type { LeadFormErrors } from "@/types/form-errors";

export const validateLeadDraft = (draft: LeadDraft): LeadFormErrors => {
  const errors: LeadFormErrors = {};

  if (!draft.company.trim()) {
    errors.company = "Company is required";
  }

  if (!draft.contact.name.trim()) {
    errors.contactName = "Contact name is required";
  }

  if (draft.details.value < 0) {
    errors.value = "Value must be greater or equal to 0";
  }

  if (draft.contact.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(draft.contact.email)) {
      errors.contactEmail = "Invalid email format";
    }
  }

  return errors;
};
