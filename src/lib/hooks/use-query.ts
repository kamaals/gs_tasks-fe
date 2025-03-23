import { useMemo, useState } from "react";
import type { DoneFilterType } from "@/lib/types/task";
import { buildQueryString } from "@/lib/hooks/utils";
import { useGetAllTasksQuery } from "@/lib/store/api/taskService";
import { OrderType } from "@/lib/types";

export default function useQuery() {
  const [priorityFilter, setPriorityFilter] = useState<number | undefined>(
    undefined,
  );
  const [doneFilter, setDoneFilter] = useState<DoneFilterType>(undefined);

  const [priorityOrder, setPriorityOrder] = useState<OrderType>(undefined);

  const [doneOrder, setDoneOrder] = useState<OrderType>(undefined);

  const query = useMemo(() => {
    console.log(doneFilter);
    console.log(priorityFilter);

    return [
      {
        key: "filter_done",
        val: doneFilter,
      },
      {
        key: "filter_priority",
        val: priorityFilter,
      },
      {
        key: "order_done",
        val: doneOrder,
      },
      {
        key: "order_priority",
        val: priorityOrder,
      },
    ]
      .map((s) => buildQueryString(s.val as string, s.key))
      .filter(Boolean)
      .join("&");
  }, [priorityFilter, doneFilter, doneOrder, priorityOrder]);

  const handlePriorityOrder = () => {
    const newOrder =
      priorityOrder === undefined
        ? "asc"
        : priorityOrder === "asc"
          ? "desc"
          : undefined;
    setPriorityOrder(newOrder);
  };

  const handleDoneOrder = () => {
    const newOrder =
      doneOrder === undefined
        ? "asc"
        : doneOrder === "asc"
          ? "desc"
          : undefined;
    setDoneOrder(newOrder);
  };

  const { data: tasks } = useGetAllTasksQuery(query);

  return {
    priorityFilter,
    doneFilter,
    setPriorityFilter,
    setDoneFilter,
    priorityOrder,
    handleDoneOrder,
    doneOrder,
    handlePriorityOrder,
    tasks,
  };
}
