import { BaseIconProps } from "./icons.types";

export const ChevronDown = ({ color = '#D0D5DD' }: BaseIconProps) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_78_7176)">
      <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_78_7176">
        <rect width="10" height="10" fill={color} />
      </clipPath>
    </defs>
  </svg>
)
