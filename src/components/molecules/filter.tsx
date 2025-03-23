import React from "react";
import Priority from "@/components/molecules/priority";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/toggle-group";
import { cn } from "@/lib/utils";
import { DoneFilterType } from "@/lib/types/task";

function Filter({
  handlePriorityFilterChange,
  setDoneFilter,
  doneFilter,
  priority,
}: {
  handlePriorityFilterChange: (priority?: number) => void;
  priority?: number;
  setDoneFilter: (e: DoneFilterType) => void;
  doneFilter?: string;
}) {
  return (
    <div className="flex gap-2 flex-col items-end p-2 border rounded-lg ">
      <span className={"text-sm font-semibold"}>Filter</span>
      <div className="flex gap-2 items-center">
        <span className="text-xs">Priority</span>
        <Priority
          priority={priority}
          handlePriorityChange={handlePriorityFilterChange}
        />
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs">Done</span>
        <ToggleGroup
          type={"single"}
          onValueChange={(value: string) => {
            setDoneFilter(value !== "" ? (value as DoneFilterType) : undefined);
          }}
          defaultValue={doneFilter}
          className={"justify-start"}
        >
          <ToggleGroupItem
            className={cn(
              "h-6 rounded-l-lg rounded-r-none",
              "data-[state=on]:bg-zinc-900 data-[state=on]:text-white px-2",
            )}
            value="true"
            aria-label="Yes"
          >
            <span className={"text-xs"}>Yes</span>
          </ToggleGroupItem>

          <ToggleGroupItem
            className={cn(
              "h-6 rounded-r-lg rounded-l-none",
              "data-[state=on]:bg-zinc-900 data-[state=on]:text-white px-2",
            )}
            value="false"
            aria-label="No"
          >
            <span className={"text-xs"}>No</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

export default Filter;
