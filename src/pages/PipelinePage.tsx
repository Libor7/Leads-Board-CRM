import { useLeadsContext } from "@/context/leads/use-leads-context";

const PipelinePage = () => {
  const { leads } = useLeadsContext(({ state }) => state);
  console.log("leads: ", leads);

  return null;
};

export default PipelinePage;
