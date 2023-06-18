import * as RadixDialog from "@radix-ui/react-dialog";
import { Button } from "../Button";

export function DialogButtonGroup() {
  return (
    <div className="mt-8 flex gap-2">
      <RadixDialog.Close asChild>
        <Button variant={"outlined"}>Cancelar</Button>
      </RadixDialog.Close>
      {/* <RadixDialog.Close asChild> */}
      <Button type="submit" variant={"primary"}>
        Salvar
      </Button>
      {/* </RadixDialog.Close> */}
    </div>
  );
}
