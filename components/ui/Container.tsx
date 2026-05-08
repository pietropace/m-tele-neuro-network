import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "w-full max-w-[1600px] mx-auto section-padding",
        className
      )}
    >
      {children}
    </div>
  );
}