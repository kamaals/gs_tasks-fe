import React from "react";
import { OrderType } from "@/lib/types";
import { Button } from "@/components/atoms/button";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

function Order({
  priorityOrder,
  handleDoneOrder,
  doneOrder,
  handlePriorityOrder,
}: {
  priorityOrder: OrderType;
  handleDoneOrder: () => void;
  doneOrder: OrderType;
  handlePriorityOrder: () => void;
}) {
  return (
    <div className="flex gap-2 flex-col items-end px-4 py-2 border rounded-lg ">
      <span className={"text-sm font-semibold"}>Order</span>
      <div className="flex gap-2 items-center">
        <span className="text-xs">Priority</span>
        <Button onClick={handlePriorityOrder} type={"button"}>
          {priorityOrder === undefined ? (
            <ChevronsUpDown />
          ) : priorityOrder === "asc" ? (
            <ChevronDown />
          ) : (
            <ChevronUp />
          )}
        </Button>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs">Done</span>
        <Button onClick={handleDoneOrder} type={"button"}>
          {doneOrder === undefined ? (
            <ChevronsUpDown />
          ) : doneOrder === "asc" ? (
            <ChevronDown />
          ) : (
            <ChevronUp />
          )}
        </Button>
      </div>
    </div>
  );
}

export default Order;
