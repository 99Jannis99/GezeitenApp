import Svg, { Path, Text, TSpan, G, Image, Polygon } from "react-native-svg";

const WeatherWhiteIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="35"
      height="35"
      viewBox="0 0 256 256"
    >
      <Image
        id="cloudy_white"
        x="28"
        y="18"
        width="208"
        height="204"
        xlinkHref="data:img/png;base64,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"
      />
    </Svg>
  );
};
export default WeatherWhiteIcon;