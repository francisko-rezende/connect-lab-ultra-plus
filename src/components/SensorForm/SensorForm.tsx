import { trpc } from "@/utils/trpc";
import { TextField } from "../TextField";
import { LinkSensorForm } from "@/types/LinkSensorForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/zod/schemas";
import { useRouter } from "next/router";
import { DialogButtonGroup } from "../DialogButtonGroup";
import { toast } from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect } from "react";
import { GetSensorsOutputItem } from "@/types/GetSensorsOutputItem";

type SensorFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sensorData?: GetSensorsOutputItem;
};

export function SensorForm({ setIsOpen, sensorData }: SensorFormProps) {
  const sensorTypeQuery = trpc.sensorTypes.useQuery();
  const { data: sensorTypes } = sensorTypeQuery;

  const defaultValues = {
    sensorTypeId: undefined,
    sensorName: undefined,
    macAddress: undefined,
    status: undefined,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LinkSensorForm>({
    defaultValues,
    resolver: zodResolver(schemas.linkSensor),
  });

  useEffect(() => {
    if (sensorData) {
      setValue("macAddress", sensorData.macAddress);
      setValue("sensorName", sensorData.sensorName);
      setValue("sensorTypeId", String(sensorData.sensorTypeId));
      setValue("status", sensorData.status ? "true" : "false");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const locationId = (router.query.locationId as string | undefined) || "";

  const utils = trpc.useContext();

  const handleMutationSuccess = () => {
    utils.getSensors.invalidate();
    setIsOpen(false);
  };

  const linkSensorMutation = trpc.linkSensor.useMutation({
    onSuccess: handleMutationSuccess,
  });

  const handleLinkSensor: SubmitHandler<LinkSensorForm> = (data) => {
    toast.promise(
      linkSensorMutation.mutateAsync({
        locationId: parseInt(locationId),
        sensorData: data,
      }),
      {
        loading: "Processando...",
        success: "Sensor vinculado com sucesso!",
        error: "Houve um erro na vinculação do sensor.",
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
  };

  const onSubmit = handleSubmit(handleLinkSensor);

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <TextField
        label="Dispositivo"
        htmlFor="sensorType"
        errorMessage={errors.sensorTypeId?.message}
      >
        <TextField.Select
          hasError={!!errors["sensorTypeId"]}
          defaultValue={""}
          {...register("sensorTypeId")}
        >
          <option value={""} disabled>
            Selecione um sensor
          </option>
          {sensorTypes &&
            sensorTypes.map(({ sensorTypeName, sensorTypeId }) => (
              <option key={sensorTypeId} value={sensorTypeId}>
                {sensorTypeName}
              </option>
            ))}
        </TextField.Select>
      </TextField>

      <TextField
        label={"Nome"}
        htmlFor={"sensorName"}
        errorMessage={errors["sensorName"]?.message}
      >
        <TextField.Input
          id="sensorName"
          type="text"
          hasError={!!errors["sensorName"]}
          {...register("sensorName")}
        />
      </TextField>

      <TextField
        label={"Endereço MAC"}
        htmlFor={"macAddress"}
        errorMessage={errors["macAddress"]?.message}
      >
        <TextField.MaskedInput
          id="cnpj"
          type="text"
          mask={"{AA}:{AA}:{AA}:{AA}:{AA}:{AA}"}
          definitions={{ A: /[a-fA-F0-9]/ }}
          prepare={(value: string) => value.toUpperCase()}
          {...register("macAddress")}
          hasError={!!errors["macAddress"]}
        />
      </TextField>

      <TextField
        label="Status"
        htmlFor="status"
        errorMessage={errors.status?.message}
      >
        <TextField.Select
          hasError={!!errors["status"]}
          defaultValue={""}
          {...register("status")}
        >
          <option value={""} disabled>
            Selecione o estado do sensor
          </option>
          <option value={"true"}>Ativo</option>
          <option value={"false"}>Inativo</option>
        </TextField.Select>
      </TextField>

      <DialogButtonGroup />
    </form>
  );
}
