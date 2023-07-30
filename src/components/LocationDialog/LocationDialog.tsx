import { useState } from "react";
import { Dialog } from "../Dialog";
import { LocationForm } from "../LocationForm";
import { Location } from "@/types/Location";

type LocationDialogProps = {
  trigger: React.ReactNode;
  locationData?: Location;
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
