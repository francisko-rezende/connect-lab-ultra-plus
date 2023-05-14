const getInvalidFieldValueMessage = (fieldName: string) =>
  `${fieldName} inválido`;

export const errorMessages = {
  required: "Campo obrigatório",
  invalidPhone: getInvalidFieldValueMessage("Telefone"),
  invalidEmail: getInvalidFieldValueMessage("Email"),
  invalidCNPJ: getInvalidFieldValueMessage("CNPJ"),
  passwordTooShort: "A senha precisa ter no mínimo 8 caracteres",
};
