import React from 'react';

const Close = (props) => (
  <svg
    height="1em"
    viewBox="0 0 21 21"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 2)"
    >
      <circle cx={8.5} cy={8.5} r={8} />
      <path d="M5.5 5.5l6 6M11.5 5.5l-6 6" />
    </g>
  </svg>
);

export default Close;
