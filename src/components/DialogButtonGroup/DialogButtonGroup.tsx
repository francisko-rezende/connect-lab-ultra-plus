import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "../Button";

export function DialogButtonGroup() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-2">
      <RadixDialog.Close asChild>
        <Button variant={"outlined"}>Cancelar</Button>
      </RadixDialog.Close>
      <Button type="submit" variant={"primary"}>
        Salvar
      </Button>
    </div>
  );
}
