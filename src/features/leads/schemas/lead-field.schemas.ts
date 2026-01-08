import { z } from "zod";
import { leadSchema } from "./lead.schema";

type PathImpl<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? PathImpl<T[Key], keyof T[Key]> extends infer P
      ? P extends string
        ? `${Key}.${P}`
        : never
      : never
    : Key
  : never;

type Paths<T> = PathImpl<T>;

export type FieldValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? FieldValue<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type LeadFieldPaths = Paths<z.infer<typeof leadSchema>>;

export const leadFieldSchemas: {
  [K in LeadFieldPaths]: z.ZodType<FieldValue<z.infer<typeof leadSchema>, K>>;
} = {
  company: leadSchema.shape.company,
  status: leadSchema.shape.status,

  "contact.name": leadSchema.shape.contact.shape.name,
  "contact.email": leadSchema.shape.contact.shape.email,

  "details.value": leadSchema.shape.details.shape.value,
  "details.tags": leadSchema.shape.details.shape.tags,
  "details.notes": leadSchema.shape.details.shape.notes,
};
