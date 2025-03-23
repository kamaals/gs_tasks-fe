import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { TitleLeafComponent } from "@/components/molecules/tree/leaf";
import {
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/molecules/tree/expandable";
import TreeIcon from "@/components/molecules/tree/icon";
import TreeActions from "@/components/molecules/tree/actions";
import {
  TreeDataItem,
  NodeProps,
  selectedTreeVariants,
  iconLine,
} from "@/components/molecules/tree/index";
import TreeItem from "@/components/molecules/tree/tree-item";

function Node<DataItem extends TreeDataItem>({
  data,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  leaf,
  actions,
  titleLeaf,
  leafIndex,
}: NodeProps<DataItem>) {
  const [value, setValue] = React.useState(
    expandedItemIds.includes(data.id) ? [data.id] : [],
  );
  const TitleLeaf = titleLeaf ? titleLeaf : TitleLeafComponent;
  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={(s) => setValue(s)}
    >
      <AccordionPrimitive.Item
        className={cn("pl-4 ml-1 group")}
        value={data.id}
      >
        <div className={"flex items-space-between relative"}>
          <div className={cn("w-full flex items-start", iconLine)}>
            <ExpandableTrigger
              className={cn(
                //treeVariants(),
                selectedItemId === data.id && selectedTreeVariants(),
                "has-child before:left-1",
                "flex-1 h-10 2",
              )}
              onClick={() => {
                handleSelectChange(data);
                data.onClick?.(data);
              }}
            >
              <TreeIcon
                data={data}
                isSelected={selectedItemId === data.id}
                isOpen={value.includes(data.id)}
              />
            </ExpandableTrigger>
            <div
              className={"flex-1"}
              onClick={() => {
                handleSelectChange(data);
                data.onClick?.(data);
              }}
            >
              <TitleLeaf
                className={cn("flex-1")}
                leafIndex={leafIndex}
                data={data}
                handleSelectChange={handleSelectChange}
              />
            </div>
          </div>
          <TreeActions isSelected={selectedItemId === data.id}>
            {actions}
          </TreeActions>
        </div>

        <ExpandableContent className={cn("ml-3")}>
          <TreeItem<DataItem>
            leaf={leaf}
            actions={actions}
            data={data.children ? data.children : data}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
          />
        </ExpandableContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
}

export default Node;
