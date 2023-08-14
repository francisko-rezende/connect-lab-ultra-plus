import { Dialog } from "@/components/Dialog";
import { SensorForm } from "@/components/SensorForm";
import { GetSensorsOutputItem } from "@/types/GetSensorsOutputItem";
import { useState } from "react";

type LinkSensorDialogProps = {
  trigger: React.ReactNode;
  sensorData?: GetSensorsOutputItem;
};

export function LinkSensorDialog({
  trigger,
  sensorData,
}: LinkSensorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      setOpen={setIsOpen}
      title="Vincular Sensor"
      subtitle="Vincular um novo sensor ao local."
      trigger={trigger}
    >
      <SensorForm sensorData={sensorData} setIsOpen={setIsOpen} />
    </Dialog>
  );
}
