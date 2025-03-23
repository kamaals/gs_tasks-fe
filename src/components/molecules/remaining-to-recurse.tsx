import React, { useMemo } from "react";
import { TaskWithChildren } from "@/lib/types/task";
import { differenceInHours, formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/atoms/progress";

function RemainingToRecurse({ data }: { data: TaskWithChildren }) {
  const progress = useMemo(() => {
    const total =
      data.cadence === "day" ? 24 : data.cadence === "week" ? 24 * 7 : 24 * 30;
    const remains = differenceInHours(
      data.lastGeneratedTime as Date,
      new Date(),
    );
    return 100 * ((total - remains) / total);
  }, [data.lastGeneratedTime, data.cadence]);
  return (
    <div className="flex flex-col justify-between gap-1 mx-3">
      <Progress value={progress} className="w-28 h-1.5" />
      <span className="text-sm">
        Recurs in {formatDistanceToNow(data.lastGeneratedTime as Date)}
      </span>
    </div>
  );
}

export default RemainingToRecurse;
