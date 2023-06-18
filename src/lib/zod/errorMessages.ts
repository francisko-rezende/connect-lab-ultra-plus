const getInvalidFieldValueMessage = (fieldName: string) =>
  `${fieldName} inválido`;

export const errorMessages = {
  required: "Campo obrigatório",
  invalidPhone: getInvalidFieldValueMessage("Telefone"),
  invalidEmail: getInvalidFieldValueMessage("Email"),
  invalidCNPJ: getInvalidFieldValueMessage("CNPJ"),
  invalidMACAddress: getInvalidFieldValueMessage("MAC Address"),
  passwordTooShort: "A senha precisa ter no mínimo 8 caracteres",
  outOfRange: {
    latitude: "A latitude precisa ficar entre -90 e +90",
    longitude: "A longitude precisa ficar entre -180 e +180",
  },
};
