import type { SVGProps } from "react";

export function List(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="7" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="17" r="1" />
      <line x1="15" y1="7" x2="21" y2="7" />
      <line x1="15" y1="12" x2="21" y2="12" />
      <line x1="15" y1="17" x2="21" y2="17" />
    </svg>
  );
}
