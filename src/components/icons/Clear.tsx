import type { SVGProps } from "react";

export function Clear(props: SVGProps<SVGSVGElement>) {
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
      <path d="M7 21h10l2-7H5l2 7Z" />
      <path d="M12 9v4" />
      <path d="M8 9v4" />
      <path d="M16 9v4" />
      <path d="M5 7h14l-1-3H6l-1 3Z" />
    </svg>
  );
}
