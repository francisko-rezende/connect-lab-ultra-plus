import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog } from "../Dialog";
import { DialogButtonGroup } from "../DialogButtonGroup";
import { TextField } from "../TextField";
import { LinkSensorForm } from "@/types/LinkSensorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/zod/schemas";
import { trpc } from "@/utils/trpc";

type LinkSensorDialogProps = {
  trigger: React.ReactNode;
};

export function LinkSensorDialog({ trigger }: LinkSensorDialogProps) {
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
    formState: { errors },
  } = useForm<LinkSensorForm>({
    defaultValues,
    resolver: zodResolver(schemas.linkSensor),
  });

  const linkSensorMutation = trpc.linkSensor.useMutation();

  const handleLinkSensor: SubmitHandler<LinkSensorForm> = (data) => {
    linkSensorMutation.mutate(data);
  };

  const onSubmit = handleSubmit(handleLinkSensor);

  return (
    <Dialog
      title="Vincular Sensor"
      subtitle="Vincular um novo sensor ao local."
      trigger={trigger}
    >
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
    </Dialog>
  );
}
