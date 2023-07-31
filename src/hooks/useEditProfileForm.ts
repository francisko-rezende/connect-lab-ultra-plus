import { schemas } from "@/lib/zod/schemas";
import { EditProfileForm } from "@/types/EditProfileForm";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatToCNPJ, formatToPhone } from "brazilian-values";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function useEditProfileForm() {
  const defaultValues = {
    company: "",
    cnpj: "",
    responsible: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const loggedInCompanyQuery = trpc.me.useQuery();
  const { data: companyData } = loggedInCompanyQuery;

  const {
    setValue,
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(schemas.editProfile),
    defaultValues,
  });

  useEffect(() => {
    if (companyData) {
      setValue("company", companyData.companyName);
      setValue("cnpj", formatToCNPJ(companyData.cnpj));
      setValue("responsible", companyData.responsible);
      setValue("email", companyData.email);
      setValue("phone", formatToPhone(companyData.phone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyData]);

  const utils = trpc.useContext();

  const updateCompanyMutation = trpc.updateCompany.useMutation({
    onSuccess: () => {
      utils.me.invalidate();
      resetField("password");
      resetField("confirmPassword");
    },
  });

  const handleSubmitEditProfileForm: SubmitHandler<EditProfileForm> = (
    data
  ) => {
    toast.promise(
      updateCompanyMutation.mutateAsync(data),
      {
        loading: "Processando...",
        success: "Dados atualizados!",
        error: "Houve um erro na atualização dos dados",
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

  const onSubmit = handleSubmit(handleSubmitEditProfileForm);

  return {
    errors,
    onSubmit,
    register,
    isLoading: updateCompanyMutation.isLoading,
  };
}
