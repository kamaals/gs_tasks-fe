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
import { EllipsisVertical, Plus, Edit } from "lucide-react";
import ActionConfirm from "@/components/molecules/action-confirm";
import React from "react";
import { TaskWithChildren } from "@/lib/types/task";

type Props = {
  addAction?: () => void;
  deleteAction?: () => void;
  editAction?: () => void;
  selected?: TaskWithChildren;
};

function TaskActions({ addAction, deleteAction, editAction, selected }: Props) {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button type="button" size="sm" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"start"} className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {selected && !selected.parentId && (
            <DropdownMenuItem onClick={addAction}>
              <Plus /> Add
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={editAction}>
            <Edit /> Edit
          </DropdownMenuItem>
          <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
            <ActionConfirm onConfirm={deleteAction} />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskActions;
