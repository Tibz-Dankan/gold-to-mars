import { addCommasToNumber } from "../../utils/addCommaToNumber";

interface RocketSpeedAltitudeTableProps {
  altitude: number;
  speed: number;
}

export const RocketSpeedAltitudeTable: React.FC<
  RocketSpeedAltitudeTableProps
> = (props) => {
  return (
    <table className="border-separate border-spacing-0  w-full overflow-x-auto">
      {/* No Table heading */}
      <tbody className="text-gray-300">
        <tr
          className="h-8 [&>*]:border-y-[1px] [&>*]:border-gray-400 
             text-[12px] font-[400]"
        >
          <td className="px-2 pl-4 w-16 border-x-[1px] border-gray-400">
            Speed
          </td>
          <td className="px-2 border-r-[1px] border-gray-400 w-20">
            {addCommasToNumber(parseFloat(props.speed.toFixed(2)))} km/hr
          </td>
        </tr>
        <tr
          className="h-8 [&>*]:border-b-[1px] [&>*]:border-gray-400 
             text-[12px] font-[400]"
        >
          <td className="px-2 pl-4 border-x-[1px] border-gray-400">Altitude</td>
          <td className="px-2 border-r-[1px] border-gray-400">
            {addCommasToNumber(parseFloat(props.altitude.toFixed(2)))} km
          </td>
        </tr>
      </tbody>
    </table>
  );
};
