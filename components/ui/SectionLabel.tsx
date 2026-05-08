type Props = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: Props) {
  return (
    <div className="mb-6 md:mb-8">
      <span className="text-[10px] uppercase tracking-[0.24em] text-[#377082] md:text-[11px] md:tracking-[0.3em]">
        {children}
      </span>
    </div>
  );
}
