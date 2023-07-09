import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog } from "../Dialog";
import { DialogButtonGroup } from "../DialogButtonGroup";
import { TextField } from "../TextField";
import { LinkSensorForm } from "@/types/LinkSensorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "@/lib/zod/schemas";

type LinkSensorDialogProps = {
  trigger: React.ReactNode;
};

export function LinkSensorDialog({ trigger }: LinkSensorDialogProps) {
  const mockSensors = [
    {
      value: "1",
      label: "Sensor de Umidade do Solo 1",
    },
    {
      value: "2",
      label: "Sensor de Temperatura 1",
    },
    {
      value: "3",
      label: "Sensor de Umidade 1",
    },
    {
      value: "4",
      label: "Sensor de Temperatura do Solo 1",
    },
    {
      value: "5",
      label: "Identificação de Agrotóxicos 1",
    },
    {
      value: "6",
      label: "Sensor de Qualidade do Ar 1",
    },
  ];

  const defaultValues = {
    device: "",
    deviceName: undefined,
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

  console.log(errors);

  const handleLinkSensor: SubmitHandler<LinkSensorForm> = (data) => {
    console.log(data);
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
          htmlFor="device"
          errorMessage={errors.deviceId?.message}
        >
          <TextField.Select
            hasError={!!errors["deviceId"]}
            {...register("deviceId")}
          >
            <option selected value={""} disabled>
              Selecione um sensor
            </option>
            {mockSensors.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField.Select>
        </TextField>

        <TextField
          label={"Nome"}
          htmlFor={"deviceName"}
          errorMessage={errors["deviceName"]?.message}
        >
          <TextField.Input
            id="deviceName"
            type="text"
            hasError={!!errors["deviceName"]}
            {...register("deviceName")}
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
            {...register("status")}
          >
            <option selected value={""} disabled>
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
