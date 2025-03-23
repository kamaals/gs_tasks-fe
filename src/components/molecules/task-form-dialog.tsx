import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import TaskForm from "@/components/molecules/task-form";
import { TaskDocType } from "@/lib/types/task";

type Props = {
  open: boolean;
  openChange: (open: boolean) => void;
  parentNode?: TaskDocType;
  edit?: boolean;
};

function TaskFormDialog({ open, openChange, parentNode, edit }: Props) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {parentNode
              ? edit
                ? `Editing ${parentNode.title}`
                : `Add new under: ${parentNode.title}`
              : "Add New Task"}
          </DialogTitle>
        </DialogHeader>
        <TaskForm
          edit={edit}
          data={
            edit && parentNode
              ? {
                  title: parentNode.title,
                  id: parentNode.id,
                  priority: parentNode.priority,
                }
              : undefined
          }
          afterEndCallback={() => openChange(false)}
          parentId={parentNode?.id}
        />
      </DialogContent>
    </Dialog>
  );
}

export default TaskFormDialog;
