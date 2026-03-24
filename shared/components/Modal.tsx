"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

type ModalProps = {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Modal = ({
  trigger,
  title,
  children,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-background p-6 shadow-elevated border border-border/50 sm:p-8">
          <Dialog.Title className="mb-6 text-2xl font-black text-foreground tracking-tight">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
