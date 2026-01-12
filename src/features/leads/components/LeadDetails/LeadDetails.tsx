import { lazy, Suspense } from "react";

import { LEAD_FIELD_LABELS } from "@/shared/constants/lead-fields";
import type { Lead, LeadField } from "@/types";
import type { LeadFieldValue } from "../LeadDetail/lead-detail.types";
import { flattenToDotNotation } from "@/shared/utils/flattenToDotNotation";

const LeadDetail = lazy(() => import("../LeadDetail/components/LeadDetail"));

type LeadDetailsProps = {
  lead: Lead;
};

const LeadDetails = ({ lead }: LeadDetailsProps) => {
  const flatLead = flattenToDotNotation(lead);

  return (
    <Suspense fallback={null}>
      {(Object.keys(LEAD_FIELD_LABELS) as LeadField[]).map((field) => (
        <LeadDetail
          key={field}
          field={field}
          leadId={flatLead.id as string}
          label={LEAD_FIELD_LABELS[field]}
          value={flatLead[field] as LeadFieldValue}
        />
      ))}
    </Suspense>
  );
};

export default LeadDetails;
