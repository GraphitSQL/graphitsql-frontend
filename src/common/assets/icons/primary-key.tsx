import { BaseIconProps } from './icons.types';

export const PrimaryKey = ({
  color = '#D0D5DD',
  iconWidth = 24,
  iconHeight = 24,
}: BaseIconProps) => (
  <svg
    width={iconWidth}
    height={iconHeight}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_26_5261)">
      <path
        d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8496 12.15L18.9996 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 5L20 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 8L17 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_26_5261">
        <rect width="24" height="24" fill={color} />
      </clipPath>
    </defs>
  </svg>
);
