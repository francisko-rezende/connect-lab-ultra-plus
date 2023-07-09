import * as RadixDialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import * as I from "../assets/icons";

type DialogProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  title: string;
  subtitle?: string;
};

export function Dialog({
  trigger,
  children,
  open,
  setOpen,
  title,
  subtitle,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-10 bg-overlay data-[state=open]:animate-overlayShow" />
        <RadixDialog.Content className=" fixed right-1/2 top-1/2 z-10 grid w-[min(563px,_90vw)] -translate-y-1/2 translate-x-1/2 gap-8 rounded-lg bg-white p-8 data-[state=open]:animate-overlayShow">
          <div className="grid gap-2">
            <RadixDialog.Title className="text-xl font-bold">
              {title}
            </RadixDialog.Title>
            <p>{subtitle}</p>
          </div>
          {children}
          <RadixDialog.Close asChild>
            <button className="absolute -right-10 -top-1" aria-label="Close">
              <I.Close />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
