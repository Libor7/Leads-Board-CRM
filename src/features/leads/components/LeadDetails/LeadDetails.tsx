import { LEAD_FIELD_LABELS } from "@/shared/constants/lead-fields";
import type { Lead, LeadField } from "@/types";
import LeadDetail from "../LeadDetail/components/LeadDetail";
import type { LeadFieldValue } from "../LeadDetail/lead-detail.types";
import { flattenToDotNotation } from "@/shared/utils/flattenToDotNotation";

type LeadDetailsProps = {
  lead: Lead;
};

const LeadDetails = ({ lead }: LeadDetailsProps) => {
  const flatLead = flattenToDotNotation(lead);

  return (
    <>
      {(Object.keys(LEAD_FIELD_LABELS) as LeadField[]).map((field) => (
        <LeadDetail
          key={field}
          field={field}
          leadId={flatLead.id as string}
          label={LEAD_FIELD_LABELS[field]}
          value={flatLead[field] as LeadFieldValue}
        />
      ))}
    </>
  );
};

export default LeadDetails;
