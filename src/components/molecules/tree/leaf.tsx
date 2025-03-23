import { TreeDataItem, LeafProps, treeVariants, TitleLeafProps } from "./index";
import React from "react";
import TreeActions from "@/components/molecules/tree/actions";
import { cn } from "@/lib/utils";
import useTask from "@/lib/hooks/use-task";
import Done from "@/components/molecules/done";
import { TaskWithChildren } from "@/lib/types/task";
import { RecurseAction } from "@/components/molecules/recurse-action";
import Priority from "@/components/molecules/priority";

export const LeafComponent = React.forwardRef(function LeafComponent<
  DataItem extends TreeDataItem,
>(
  {
    className,
    data,
    selectedItemId,
    handleSelectChange,
    actions,
    ...props
  }: LeafProps<DataItem> & React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const _data = data as TaskWithChildren;
  const { loading, handleDoneChange, handleRecurChange, handlePriorityChange } =
    useTask(_data);
  return (
    <div className="ml-5 h-14 flex text-left items-center">
      <div
        ref={ref}
        className={cn(
          "flex flex-1 gap-2 items-center cursor-pointer relative",
          treeVariants(),
          className,
          //selectedItemId === data.id && selectedTreeVariants(),
        )}
        onClick={() => {
          handleSelectChange?.(data);
          data.onClick?.(data);
        }}
        {...props}
      >
        <Done
          checked={data.done ?? false}
          loading={loading}
          handleCheckChange={handleDoneChange}
        />
        <div className={"flex flex-col justify-start items-start gap-1"}>
          <span
            className={cn(
              "text-sm font-semibold ml-1 truncate",
              selectedItemId === data.id ? "relative z-20" : "",
            )}
          >
            {data.title}
          </span>
          <Priority
            handlePriorityChange={handlePriorityChange}
            priority={data.priority as number}
          />
        </div>
        {!_data.parentId && (
          <RecurseAction
            handleRecurActionChange={handleRecurChange}
            data={data as TaskWithChildren}
          />
        )}
      </div>
      <TreeActions isSelected={selectedItemId === data.id}>
        {actions}
      </TreeActions>
    </div>
  );
});

export function TitleLeafComponent<DataItem extends TreeDataItem>({
  className,
  data,
}: TitleLeafProps<DataItem> & { className?: string }) {
  const { loading, handleDoneChange, handleRecurChange, handlePriorityChange } =
    useTask(data as TaskWithChildren);

  return (
    <div className={cn(" relative z-20 h-14 flex items-center", className)}>
      <Done
        checked={data.done ?? false}
        loading={loading}
        handleCheckChange={handleDoneChange}
      />
      <div className={"flex flex-col justify-start items-start gap-1"}>
        <span className={cn("text-sm font-semibold ml-1 truncate")}>
          {data.title}
        </span>
        <Priority
          handlePriorityChange={handlePriorityChange}
          priority={data.priority as number}
        />
      </div>
      <RecurseAction
        handleRecurActionChange={handleRecurChange}
        data={data as TaskWithChildren}
      />
    </div>
  );
}
