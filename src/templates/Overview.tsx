import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { Map } from "@/components/Map";
import { Card } from "@/components/Card";
import { LineChart, LineChartProps } from "@/components/LineChart/LineChart";
import { CardTitle } from "@/components/CardTitle";
import { CardSubtitle } from "@/components/CardSubtitle/CardSubtitle";
import { CardValue } from "@/components/CardValue";
import { StatItem } from "@/components/StatItem";

export function Overview() {
  const mockTemperatureData: LineChartProps["data"] = [
    { date: new Date(), measurement: 25 },
    {
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      measurement: 20,
    },
    {
      date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      measurement: 18,
    },
    {
      date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      measurement: 22,
    },
    {
      date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
      measurement: 26,
    },
    {
      date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      measurement: 23,
    },
    {
      date: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000),
      measurement: 28,
    },
  ];

  const mockMoistureData: LineChartProps["data"] = [
    { date: new Date(), measurement: 62 },
    {
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      measurement: 47,
    },
    {
      date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      measurement: 32,
    },
    {
      date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
      measurement: 55,
    },
    {
      date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
      measurement: 70,
    },
    {
      date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      measurement: 42,
    },
    {
      date: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000),
      measurement: 65,
    },
  ];

  const stats = [
    {
      type: "temperature",
      value: 26,
    },
    {
      type: "moisture",
      value: 78,
    },
    {
      type: "soilTemperature",
      value: 37,
    },
    {
      type: "soilMoisture",
      value: 54,
    },
  ] as const;

  return (
    <>
      <SectionTitle>Campo de Soja</SectionTitle>
      <section className="grid max-w-[1373px] grid-cols-overview grid-rows-[repeat(auto-fill,_325px)] gap-5">
        <Card hasPadding>
          <CardTitle>Médias</CardTitle>
          <ul className="mt-14 grid grid-cols-[auto_auto] justify-between gap-y-14">
            {stats.map((statProps) => (
              <StatItem key={statProps.type} {...statProps} />
            ))}
          </ul>
        </Card>
        <Card variant="map" hasPadding={false}>
          <div className="mx-7 mt-8 flex items-baseline justify-between">
            <CardTitle>Mapa</CardTitle>
            <p>
              Sensores: <CardValue>5</CardValue>
            </p>
          </div>
          <Map />
        </Card>
        <Card hasPadding>
          <CardTitle hasMarginBottom>Histórico de Temperatura</CardTitle>
          <CardSubtitle>Em graus Celsius (º C)</CardSubtitle>
          <LineChart data={mockTemperatureData} />
        </Card>
        <Card hasPadding>
          <CardTitle hasMarginBottom>Histórico de umidade do solo</CardTitle>
          <CardSubtitle>Em porcentagem</CardSubtitle>
          <LineChart data={mockMoistureData} />
        </Card>
      </section>
    </>
  );
}
