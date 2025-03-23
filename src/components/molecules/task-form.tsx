"use client";
import React from "react";
import { TaskDocType, TaskType } from "@/lib/types/task";
import { taskSchema } from "@/lib/zod-schemas/task";
import FormMaker from "@/components/molecules/form-maker";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/lib/store/api/taskService";
import RHFInput from "@/components/atoms/rhf/rhf-input";
import RHFToggleGroup from "@/components/atoms/rhf/rhf-toggle-group";
import { ToggleGroupItem } from "@/components/atoms/toggle-group";
import { cn } from "@/lib/utils";

function TaskForm({
  parentId,
  afterEndCallback,
  edit,
  data,
}: {
  parentId?: string;
  edit?: boolean;
  data?: TaskDocType;
  afterEndCallback?: () => void;
}) {
  const [defaultValues, setDefaultValues] = React.useState<Partial<TaskType>>({
    parentId,
  });

  React.useEffect(() => {
    if (parentId) {
      setDefaultValues({ parentId });
    }
  }, [parentId]);

  React.useEffect(() => {
    if (edit && data) {
      setDefaultValues({
        ...data,
      });
    }
  }, [edit, data]);

  return (
    <div className="max-w-lg">
      <FormMaker<TaskType>
        afterEndCallback={afterEndCallback}
        defaultValues={defaultValues}
        createHook={edit ? useUpdateTaskMutation : useCreateTaskMutation}
        schema={taskSchema}
        id={edit ? parentId : undefined}
      >
        <div>
          <RHFInput
            name="title"
            label="Title"
            className={"grid grid-cols-4 gap-2"}
            inputClassName={"col-span-3"}
          />
          <RHFToggleGroup
            name={`priority`}
            label={"Priority"}
            type={"single"}
            className={cn("gap-0 mt-0 space-y-0")}
          >
            <ToggleGroupItem
              className={cn("h-6 rounded-l-lg rounded-r-none")}
              value="0"
              aria-label="Low"
            >
              <span>Low</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              className={cn("h-6 rounded-r-lg rounded-l-none")}
              value="1"
              aria-label="Medium"
            >
              <span>Medium</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              className={cn("h-6 rounded-r-lg rounded-l-none")}
              value="2"
              aria-label="High"
            >
              <span>High</span>
            </ToggleGroupItem>
          </RHFToggleGroup>
        </div>
      </FormMaker>
    </div>
  );
}

export default TaskForm;
