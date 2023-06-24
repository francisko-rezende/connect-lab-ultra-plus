import { schemas } from "@/lib/zod/schemas";
import { EditProfileForm } from "@/types/EditProfileForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(schemas.editProfile),
    defaultValues,
  });

  const handleSubmitEditProfileForm: SubmitHandler<EditProfileForm> = (
    data
  ) => {
    console.log(data);
  };

  const onSubmit = handleSubmit(handleSubmitEditProfileForm);

  return {
    errors,
    onSubmit,
    register,
  };
}
