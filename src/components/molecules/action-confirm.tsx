"use client";
import React from "react";
import { Button } from "@/components/atoms/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActionConfirmProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
};

function ActionConfirm({ onConfirm, onCancel }: ActionConfirmProps) {
  const [show, setShow] = React.useState<"init" | "show" | "hide">("init");
  // Track whether the component has mounted to prevent initial animation
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirm = () => {
    onConfirm?.();
    setShow("hide");
  };

  const handleCancel = () => {
    onCancel?.();
    setShow("hide");
  };

  // Only apply animation classes after the component has mounted
  const animationClasses = React.useMemo(() => {
    return show === "show"
      ? "motion-scale-in-[0] motion-translate-x-in-[-1%] motion-translate-y-in-[50%]"
      : show === "hide"
        ? "motion-scale-out-[0] motion-translate-x-out-[-1%] motion-translate-y-out-[50%]"
        : "scale-0 translate-x-0 translate-y-0 motion-paused";
  }, [show, mounted]);

  return (
    <div className="w-full min-h-8 px-2 py-1.5 flex items-center overflow-hidden relative rounded-md">
      <div
        onClick={() => setShow((prev) => (prev !== "show" ? "show" : "hide"))}
        className="absolute z-1 flex items-center justify-start w-full text-sm gap-2"
        aria-label="Delete"
      >
        <Trash2 className="w-4 h-4 text-red-600" />
        Delete
      </div>

      <div
        className={cn(
          "absolute top-0 left-0  right-0 grid grid-cols-2 items-center gap-2 bg-accent rounded-md motion-duration-200 z-10",
          animationClasses,
        )}
      >
        <Button
          onClick={handleConfirm}
          type="button"
          variant="destructive"
          size="sm"
          className="text-white"
          aria-label="Confirm"
        >
          Yes, Delete
        </Button>
        <Button
          onClick={handleCancel}
          type="button"
          variant="outline"
          size="sm"
          className="flex-grow-1"
          aria-label="Cancel"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ActionConfirm;
