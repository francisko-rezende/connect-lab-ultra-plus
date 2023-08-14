import { useState } from "react";
import { Dialog } from "../Dialog";
import { LocationForm } from "../LocationForm";
import { GetLocationsOutputItem } from "@/types/GetLocationsOutputItem";

type LocationDialogProps = {
  trigger: React.ReactNode;
  locationData?: GetLocationsOutputItem;
};

export function LocationDialog({ trigger, locationData }: LocationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      setOpen={setIsOpen}
      title="Criar Local"
      subtitle="Adicionar um novo local à empresa."
      trigger={trigger}
    >
      <LocationForm setIsOpen={setIsOpen} locationData={locationData} />
    </Dialog>
  );
}
