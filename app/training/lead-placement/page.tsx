import LeadPlacementSimulator from "@/components/training/lead-placement/LeadPlacementSimulator";

export const metadata = {
  title: "Training - Lead Placement | ICS Maugeri Tele-Neurophysiology Network",
  description: "Interactive EEG 10-20 electrode placement simulator with drag-and-drop validation.",
};

export default function TrainingLeadPlacementPage() {
  return <LeadPlacementSimulator />;
}
