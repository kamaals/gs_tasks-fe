"use client";
import { useState, useCallback } from "react";
import {
  useDeleteTaskMutation,
  useGetAllTasksQuery,
} from "@/lib/store/api/taskService";
import { TaskWithChildren } from "@/lib/types/task";
import { Plus } from "lucide-react";
import Tree from "@/components/molecules/tree";
import { Button } from "@/components/atoms/button";
import TaskFormDialog from "@/components/molecules/task-form-dialog";
import TaskActions from "@/components/molecules/task-actions";

function Tasks() {
  const { data: tasks } = useGetAllTasksQuery();

  const [handleDeleteTask] = useDeleteTaskMutation();

  const [edit, setEdit] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleAdd = useCallback(
    (root = false) => {
      if (root) {
        setSelected(undefined);
      }
      setEdit(false);
      setOpenDialog(() => true);
    },
    [setOpenDialog],
  );

  const [selectedTask, setSelected] = useState<TaskWithChildren | undefined>(
    undefined,
  );

  const handleEdit = useCallback(() => {
    setEdit(true);
    setOpenDialog(() => true);
  }, [setOpenDialog]);

  const handleDelete = useCallback(() => {
    if (selectedTask) {
      handleDeleteTask(selectedTask);
    }
  }, [handleDeleteTask, selectedTask]);

  return (
    Array.isArray(tasks) && (
      <div>
        <TaskFormDialog
          openChange={setOpenDialog}
          open={openDialog}
          edit={edit}
          parentNode={selectedTask}
        />
        <Tree<TaskWithChildren>
          onSelectChange={(selected) => {
            setSelected(selected as TaskWithChildren);
          }}
          actions={
            <TaskActions
              selected={selectedTask}
              addAction={() => handleAdd(false)}
              deleteAction={handleDelete}
              editAction={handleEdit}
            />
          }
          data={tasks as Array<TaskWithChildren>}
        />
        <Button
          onClick={() => handleAdd(true)}
          type="button"
          variant="ghost"
          className={"bg-white hover:bg-primary hover:text-primary-foreground"}
        >
          <Plus />
        </Button>
      </div>
    )
  );
}

export default Tasks;
