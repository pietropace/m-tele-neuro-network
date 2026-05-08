type Props = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: Props) {
  return (
    <div className="mb-8">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#377082]">
        {children}
      </span>
    </div>
  );
}