import { SubmitHandler, useForm } from "react-hook-form";
import { DialogButtonGroup } from "../DialogButtonGroup";
import { CreateLocationForm } from "@/types/CreateLocationForm";
import { TextField } from "../TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/zod/schemas";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect } from "react";
import { LocationRow } from "@/types/LocationRow";

type LocationFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  locationData?: LocationRow;
};

export function LocationForm({ setIsOpen, locationData }: LocationFormProps) {
  const defaultValues = {
    locationName: "",
    latitude: "",
    longitude: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateLocationForm>({
    defaultValues,
    resolver: zodResolver(schemas.createLocation),
  });

  useEffect(() => {
    if (locationData) {
      setValue("latitude", String(locationData.latitude));
      setValue("longitude", String(locationData.longitude));
      setValue("locationName", locationData.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEditForm = !!locationData;

  if (isEditForm) {
  }

  const utils = trpc.useContext();

  const handleMutationSuccess = () => {
    utils.getLocations.invalidate();
    setIsOpen(false);
    reset();
  };

  const createLocationMutation = trpc.createLocation.useMutation({
    onSuccess: handleMutationSuccess,
  });

  const updateLocationMutation = trpc.updateLocation.useMutation({
    onSuccess: handleMutationSuccess,
  });

  const handleCreateLocation: SubmitHandler<CreateLocationForm> = (data) =>
    toast.promise(
      isEditForm
        ? updateLocationMutation.mutateAsync({
            ...data,
            locationId: locationData.id,
          })
        : createLocationMutation.mutateAsync(data),
      {
        loading: "Processando...",
        success: isEditForm
          ? "Local atualizado com sucesso!"
          : "Local registrado com sucesso!",
        error: isEditForm
          ? "Houve um erro na atualização do local"
          : "Houve um erro no registro do local",
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

  const onSubmit = handleSubmit(handleCreateLocation);

  return (
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
        <TextField.Input
          type="text"
          id="latitude"
          placeholder="-21.2976"
          hasError={!!errors.latitude}
          {...register("latitude")}
        />
      </TextField>
      <TextField
        htmlFor="longitude"
        label="Longitude"
        errorMessage={errors.longitude?.message}
      >
        <TextField.Input
          type="text"
          id="longitude"
          placeholder="135.5678"
          hasError={!!errors.longitude}
          {...register("longitude")}
        />
      </TextField>
      <DialogButtonGroup />
    </form>
  );
}
