import { z } from "zod";
import { LEAD_STATUSES } from "@/types";

export const leadSchema = z.object({
  company: z.string().min(1, "Company is required"),
  contact: z.object({
    name: z.string().min(2, "Contact name is required"),
    email: z.union([
      z.email({ message: "Invalid email format" }),
      z.literal(""),
    ]),
  }),
  status: z.enum(LEAD_STATUSES),
  details: z.object({
    value: z.number().min(0, "Value must be greater or equal to 0"),
    tags: z.string().refine((val) => /^[a-zA-Z0-9 ,]*$/.test(val), {
      message: "Tags can only contain letters, numbers, spaces and commas",
    }),
    notes: z.string(),
  }),
});

export type LeadValues = z.infer<typeof leadSchema>;
