import React from "react";
import {
  horizontalLIne,
  TreeDataItem,
  TreeItemProps,
  verticalLIne,
} from "@/components/molecules/tree/index";
import { LeafComponent } from "@/components/molecules/tree/leaf";
import Node from "@/components/molecules/tree/node";
import { cn } from "@/lib/utils";

function TreeItem<DataItem extends TreeDataItem>({
  className,
  data,
  leaf,
  selectedItemId,
  handleSelectChange,
  expandedItemIds,
  titleLeaf,
  actions,
  ref,
  ...props
}: TreeItemProps<DataItem> &
  React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  }) {
  const Leaf = leaf ? leaf : LeafComponent;
  if (!(data instanceof Array)) {
    data = [data];
  }

  return (
    <div ref={ref} className={cn(className)} {...props}>
      <ul>
        {data.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              horizontalLIne,
              item.children ? "" : "after:w-4",
              verticalLIne,
              "pt-2",
            )}
          >
            {Array.isArray(item.children) && item.children.length ? (
              <Node<DataItem>
                leafIndex={index}
                parentIndex={index}
                actions={actions}
                leaf={leaf}
                titleLeaf={titleLeaf}
                data={item}
                selectedItemId={selectedItemId}
                expandedItemIds={expandedItemIds}
                handleSelectChange={handleSelectChange}
              />
            ) : (
              <Leaf
                actions={actions} // This is not defined in this file
                // @ts-expect-error: partial item
                handleSelectChange={handleSelectChange}
                data={item}
                selectedItemId={selectedItemId}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreeItem;
