import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog } from "../Dialog";
import { DialogButtonGroup } from "../DialogButtonGroup";
import { CreateLocationForm } from "@/types/CreateLocationForm";
import { TextField } from "../TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/zod/schemas";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { toast } from "react-hot-toast";

type CreateLocationDialogProps = {
  trigger: React.ReactNode;
};

export function CreateLocationDialog({ trigger }: CreateLocationDialogProps) {
  const defaultValues = {
    locationName: "",
    latitude: "",
    longitude: "",
  };

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLocationForm>({
    defaultValues,
    resolver: zodResolver(schemas.createLocation),
  });

  const utils = trpc.useContext();

  const mutation = trpc.createLocation.useMutation({
    onSuccess: () => {
      utils.getLocations.invalidate();
      setIsOpen(false);
      reset();
    },
  });

  const handleCreateLocation: SubmitHandler<CreateLocationForm> = (data) =>
    toast.promise(
      mutation.mutateAsync(data),
      {
        loading: "Processando...",
        success: "Local registrado com sucesso!",
        error: "Houve um erro no registro do local",
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "✅",
        },
        error: {
          duration: 5000,
          icon: "❌",
        },
      }
    );

  // mutation.mutate(data);

  const onSubmit = handleSubmit(handleCreateLocation);

  return (
    <Dialog
      open={isOpen}
      setOpen={setIsOpen}
      title="Criar Local"
      subtitle="Adicionar um novo local à empresa."
      trigger={trigger}
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <TextField
          htmlFor="locationName"
          label="Nome"
          errorMessage={errors.locationName?.message}
        >
          <TextField.Input
            type="text"
            id="locationName"
            placeholder="Campo de soja"
            hasError={!!errors.locationName}
            {...register("locationName")}
          />
        </TextField>

        <TextField
          htmlFor="latitude"
          label="Latitude"
          errorMessage={errors.latitude?.message}
        >
          <TextField.MaskedInput
            type="text"
            id="latitude"
            placeholder="-21.2976"
            hasError={!!errors.latitude}
            {...register("latitude")}
            mask={"[{A}]00.0000"}
            definitions={{ A: /[+-]/ }}
          />
        </TextField>
        <TextField
          htmlFor="longitude"
          label="Longitude"
          errorMessage={errors.longitude?.message}
        >
          <TextField.MaskedInput
            type="text"
            id="longitude"
            placeholder="135.5678"
            hasError={!!errors.longitude}
            {...register("longitude")}
            mask={"[{A}0]00.0000"}
            definitions={{ A: /[+-]/ }}
          />
        </TextField>
        <DialogButtonGroup />
      </form>
    </Dialog>
  );
}
