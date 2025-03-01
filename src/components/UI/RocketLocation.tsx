import { useEffect, useState } from "react";
import { EventBus } from "../../game/EventBus";
import { useStatisticsStore } from "../../store/statistics";

export const RocketLocation: React.FC = () => {
  const [rocketLocation, setRocketLocation] = useState({
    location: "",
    isApproachingEarth: false,
    isApproachingMars: false,
    distanceToEarthKm: 0,
    distanceToMarsKm: 0,
    distanceFromEarthToMarsKm: 0,
  });

  const cargo = useStatisticsStore((state) => state.cargo);
  const hasCargo: boolean = cargo.quantity > 0;

  const marsReddishOrange = "#B7410E";
  const earthBluish = "#1E90FF";
  const spacePinkish = "#f783ac";
  const isEarth: boolean = rocketLocation.location.toUpperCase() === "EARTH";
  const isMars: boolean = rocketLocation.location.toUpperCase() === "MARS";

  let locationColor: string = spacePinkish;
  if (isEarth) {
    locationColor = earthBluish;
  } else if (isMars) {
    locationColor = marsReddishOrange;
  } else {
    locationColor = spacePinkish;
  }

  useEffect(() => {
    const updateLocation = (data: typeof rocketLocation) =>
      setRocketLocation(data);

    EventBus.on("rocketLocation", updateLocation);

    return () => {
      EventBus.off("rocketLocation", updateLocation);
    };
  }, []);

  return (
    <table className="border-separate border-spacing-0  w-full overflow-x-auto">
      {/* No Table heading */}

      <tbody className="text-gray-300">
        <tr
          className="h-8 [&>*]:border-t-[1px] [&>*]:border-gray-400 
             text-[12px] font-[400]"
        >
          <td className="px-2 pl-4 border-x-[1px] border-gray-400 w-28">
            Cargo onboard
          </td>
          <td className="px-2 border-r-[1px] border-gray-400 w-32">
            {hasCargo && (
              <span>
                {cargo.quantity.toFixed(0)} tonnes of {cargo.name}
              </span>
            )}
            {!hasCargo && <span>N/A</span>}
          </td>
        </tr>
        <tr
          className="h-8 [&>*]:border-y-[1px] [&>*]:border-gray-400 
             text-[12px] font-[400]"
        >
          <td className="px-2 pl-4 border-x-[1px] border-gray-400 w-28">
            Location
          </td>
          <td
            className={`px-2 border-r-[1px] border-gray-400  w-32 font-bold
            `}
            style={{ color: locationColor }}
          >
            {rocketLocation.location}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
