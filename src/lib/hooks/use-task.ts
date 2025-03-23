import { CadenceType, TaskType, TaskWithChildren } from "@/lib/types/task";
import { useState } from "react";
import { useUpdateTaskMutation } from "@/lib/store/api/taskService";

export default function useTask(data: TaskWithChildren) {
  const [loading, setLoading] = useState(false);
  const [update] = useUpdateTaskMutation();

  const handleUpdate = async (change: Partial<TaskType>) => {
    setLoading(true);
    await update({
      id: data.id,
      // @ts-expect-error: partial data
      data: { ...change },
    });
    setLoading(false);
  };

  const handleDoneChange = (done: boolean) => handleUpdate({ done });

  const handleRecurChange = (cadence: CadenceType) => handleUpdate({ cadence });
  const handlePriorityChange = (priority: number) => handleUpdate({ priority });

  return {
    loading,
    handleDoneChange,
    handleRecurChange,
    handlePriorityChange,
  };
}
