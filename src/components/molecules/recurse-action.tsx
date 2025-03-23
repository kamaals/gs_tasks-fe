"use client";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";
import { RefreshCcw } from "lucide-react";
import { CadenceType, TaskWithChildren } from "@/lib/types/task";
import { useState } from "react";
import RemainingToRecurse from "@/components/molecules/remaining-to-recurse";

export function RecurseAction({
  data,
  handleRecurActionChange,
}: {
  data: TaskWithChildren;
  handleRecurActionChange: (cadence: CadenceType) => void;
}) {
  const handleRecursive = (cadence: CadenceType) => {
    handleRecurActionChange(cadence);
  };
  const [isOpen, setOpen] = useState(false);
  return data.lastGeneratedTime && data.cadence && data.recurTime ? (
    <RemainingToRecurse data={data} />
  ) : (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                title={"Recursive"}
                type="button"
                size="sm"
                variant="ghost"
              >
                <RefreshCcw />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Recursive</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent align={"start"} className="w-56">
        <DropdownMenuLabel>Recurring</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              handleRecursive("day");
            }}
          >
            By Day
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleRecursive("week");
            }}
          >
            By Week
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleRecursive("month");
            }}
          >
            By Month
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
