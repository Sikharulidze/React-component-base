type PropsType = {
  size?: number;
  color?: string;
  bgColor?: string;
};

const Exclamation: React.FC<PropsType> = ({
  size = 24,
  color = "#ff2147",
  bgColor = "#fff",
}) => {
  return (
    <svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="exclamation">
          <circle id="background" cx="256" cy="256" fill={color} r="256" />
          <g fill={bgColor}>
            <path d="m256 307.2a35.89 35.89 0 0 1 -35.86-34.46l-4.73-119.44a35.89 35.89 0 0 1 35.86-37.3h9.46a35.89 35.89 0 0 1 35.86 37.3l-4.73 119.44a35.89 35.89 0 0 1 -35.86 34.46z" />
            <rect
              height="71.66"
              rx="35.83"
              width="71.66"
              x="220.17"
              y="324.34"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Exclamation;
