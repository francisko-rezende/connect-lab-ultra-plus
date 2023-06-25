import Image from "next/image";
import { CardValue } from "../CardValue";
import temperatureIcon from "public/temperature.png";
import moistureIcon from "public/moisture.png";
import soilTemperatureIcon from "public/soil-temperature.png";
import soilMoistureIcon from "public/soil-moisture.png";
import { useMemo } from "react";

type StatItemProps = {
  type: "temperature" | "moisture" | "soilTemperature" | "soilMoisture";
  value: number;
};

export function StatItem({ type, value }: StatItemProps) {
  const iconData = useMemo(
    () => ({
      temperature: { src: temperatureIcon, title: "Temperatura", unit: "ºC" },
      moisture: { src: moistureIcon, title: "Umidade", unit: "%" },
      soilTemperature: {
        src: soilTemperatureIcon,
        title: "Temperatura do solo",
        unit: "ºC",
      },
      soilMoisture: {
        src: soilMoistureIcon,
        title: "Umidade do solo",
        unit: "%",
      },
    }),
    []
  );

  const { src, title, unit } = iconData[type];

  return (
    <li className="flex items-center gap-3">
      <Image src={src} width={52} height={52} alt={title} />
      <div>
        <p>{title}</p>
        <CardValue>
          {value}
          {unit}
        </CardValue>
      </div>
    </li>
  );
}
