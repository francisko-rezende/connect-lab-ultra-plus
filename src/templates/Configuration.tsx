import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { TextField } from "@/components/TextField";
import useEditProfileForm from "@/hooks/useEditProfileForm";

export function Configuration() {
  const { errors, onSubmit, register, isLoading } = useEditProfileForm();

  return (
    <>
      <SectionTitle>Configurações</SectionTitle>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-20 grid w-full max-w-[480px] gap-5"
      >
        <TextField
          label={"Empresa"}
          htmlFor={"company"}
          errorMessage={errors["company"]?.message}
        >
          <TextField.Input
            id="company"
            type="text"
            readOnly
            hasError={!!errors["company"]}
            {...register("company")}
          />
        </TextField>
        <TextField
          label={"CNPJ"}
          htmlFor={"cnpj"}
          errorMessage={errors["cnpj"]?.message}
        >
          <TextField.MaskedInput
            id="cnpj"
            type="text"
            mask={"00.000.000/0000-00"}
            readOnly
            hasError={!!errors["cnpj"]}
            {...register("cnpj")}
          />
        </TextField>
        <TextField
          label={"Responsável"}
          htmlFor={"responsible"}
          errorMessage={errors["responsible"]?.message}
        >
          <TextField.Input
            id="responsible"
            type="text"
            readOnly
            hasError={!!errors["responsible"]}
            {...register("responsible")}
          />
        </TextField>

        <div className="grid grid-cols-2 items-start gap-x-2 gap-y-5">
          <TextField
            label={"E-mail"}
            htmlFor={"email"}
            errorMessage={errors["email"]?.message}
          >
            <TextField.Input
              id="email"
              type="email"
              readOnly
              hasError={!!errors["email"]}
              {...register("email")}
            />
          </TextField>

          <TextField
            label={"Telefone"}
            htmlFor={"phone"}
            errorMessage={errors["phone"]?.message}
          >
            <TextField.MaskedInput
              id="phone"
              type="tel"
              mask={"(00) 0 0000-0000"}
              hasError={!!errors["phone"]}
              {...register("phone")}
            />
          </TextField>

          <TextField
            label={"Senha"}
            htmlFor={"password"}
            errorMessage={errors["password"]?.message}
          >
            <TextField.Input
              id="password"
              type="password"
              hasError={!!errors["password"]}
              {...register("password")}
            />
          </TextField>

          <TextField
            label={"Confirmar senha"}
            htmlFor={"confirmPassword"}
            errorMessage={errors["confirmPassword"]?.message}
          >
            <TextField.Input
              id="confirmPassword"
              type="password"
              hasError={!!errors["confirmPassword"]}
              {...register("confirmPassword")}
            />
          </TextField>
        </div>

        <Button
          isLoading={isLoading}
          type="submit"
          variant="primary"
          className="mt-9"
        >
          Salvar
        </Button>
      </form>
    </>
  );
}
