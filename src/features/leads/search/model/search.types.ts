export type LeadSearchField =
  | "company"
  | "contact.name"
  | "contact.email";

export type SearchState<F extends string> = {
  query: string;
  fields: readonly F[];
};
