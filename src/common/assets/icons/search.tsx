import { BaseIconProps } from './icons.types';

export const Search = ({ color = '#D0D5DD' }: BaseIconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_26_5597)">
      <path
        d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_26_5597">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
