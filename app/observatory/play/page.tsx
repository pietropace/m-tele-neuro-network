import EEGSignalStabilizer from "@/components/sections/EEGSignalStabilizer";

export const metadata = {
  title: "EEG Signal Stabilizer | ICS Maugeri Tele-Neurophysiology Network",
  description: "A minimal interactive EEG signal stabilization game inspired by remote neurophysiology reporting.",
};

export default function ObservatoryPlayPage() {
  return <EEGSignalStabilizer />;
}
