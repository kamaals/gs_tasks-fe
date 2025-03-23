import React from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";

function Priority({
  priority,
  handlePriorityChange,
}: {
  priority?: number;
  handlePriorityChange: (priority?: number) => void;
}) {
  return (
    <ToggleGroup
      type={"single"}
      onValueChange={(value: string) => {
        handlePriorityChange(value !== "" ? Number(value) : undefined);
      }}
      defaultValue={`${priority}`}
      className={"justify-start"}
    >
      <ToggleGroupItem
        className={cn(
          "h-6 rounded-l-lg rounded-r-none",
          "data-[state=on]:bg-blue-300 px-2",
        )}
        value="0"
        aria-label="Low"
      >
        <span className={"text-xs"}>L</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className={cn(
          "h-6 rounded-r-none rounded-l-none px-2",
          "data-[state=on]:bg-amber-300 px-2",
        )}
        value="1"
        aria-label="Medium"
      >
        <span className={"text-xs"}>M</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        className={cn(
          "h-6 rounded-r-lg rounded-l-none",
          "data-[state=on]:bg-red-300 px-2",
        )}
        value="2"
        aria-label="High"
      >
        <span className={"text-xs"}>H</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default Priority;
