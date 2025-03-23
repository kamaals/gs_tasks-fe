// Base data type
import React from "react";
import { cva } from "class-variance-authority";
import { useTree } from "@/lib/hooks/use-tree";
import TreeItem from "@/components/molecules/tree/tree-item";

export interface TreeDataItem {
  id: string;
  title: string;
  done?: boolean;
  priority?: number;
  children?: Array<this>;
  onClick?: (item: this | undefined) => void;
  icon?: never;
  selectedIcon?: never;
  openIcon?: never;
}

export type LeafProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  selectedItemId?: string;
  handleSelectChange?: (item: DataItem | never | undefined) => void;
  actions?: React.ReactNode;
  parentIndex?: number;
};

// Define LeafType as a generic component type specific to DataItem
export type LeafType<DataItem extends TreeDataItem> = React.ComponentType<
  LeafProps<DataItem>
>;

export type TitleLeafProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  handleSelectChange?: (item: never | undefined) => void;
  parentIndex?: number; // parentIndex
  leafIndex: number;
} & LeafProps<DataItem>;

export type TitleLeafType<DataItem extends TreeDataItem> = React.ComponentType<
  TitleLeafProps<DataItem>
>;

export type NodeProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  handleSelectChange: (item: DataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: never;
  leaf?: LeafType<DataItem>; // Tied to specific DataItem type
  titleLeaf?: TitleLeafType<DataItem>; // Tied to specific DataItem type
  actions?: React.ReactNode;
  parentIndex?: number; // parentIndex
  leafIndex: number;
};

export type TreeItemProps<DataItem extends TreeDataItem> = {
  data: Array<DataItem> | DataItem;
  handleSelectChange: (item: DataItem | never | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  leaf?: LeafType<DataItem>; // Tied to specific DataItem type
  titleLeaf?: TitleLeafType<DataItem>; // Tied to specific DataItem type
  actions?: React.ReactNode;
  parentIndex?: number;
};

export const treeVariants = cva(
  "group hover:before:opacity-100 before:absolute before:rounded-lg before:-left-0 before:right-0 before:bg-accent before:opacity-0 before:h-[2rem] before:-z-10",
);

export const selectedTreeVariants = cva(
  "before:opacity-100 before:bg-white text-accent-foreground before:z-10",
);

export const verticalLIne =
  "relative vertical-line before:absolute before:border-zinc-300 before:left-1 before:top-0 before:bottom-0 before:w-2 before:border-l before:z-20 [&:last-child]:before:h-4";

export const horizontalLIne =
  "relative horizontal-line after:border-zinc-300 after:absolute after:rounded-bl-lg after:border-l after:left-1 after:top-3.5 after:w-4 after:h-6 after:border-b after:z-20";

export const iconLine =
  "relative transition-left duration-200 after:border-zinc-300 after:absolute after:top-11 after:bottom-0 after:left-4 after:w-1  after:border-l group-data-[state=closed]:after:border-l-0";

// Tree component props with constrained leaf type
export type TreeProps<DataItem extends TreeDataItem> = {
  data: Array<DataItem>;
  leaf?: LeafType<DataItem>; // Tied to specific DataItem type
  titleLeaf?: TitleLeafType<DataItem>; // Tied to specific DataItem type
  initialSelectedItemId?: string;
  onSelectChange?: <DataType>(item: DataType | undefined) => void;
  actions?: React.ReactNode;
};

function Index<DataItem extends TreeDataItem>({
  data,
  leaf,
  titleLeaf,
  onSelectChange,
  initialSelectedItemId,
  actions,
}: TreeProps<DataItem>) {
  const { selectedItemId, handleSelectChange, expandedItemIds } =
    useTree<DataItem>({
      data,
      initialSelectedItemId,
      onSelectChange,
    });

  return (
    <div>
      <TreeItem<DataItem>
        actions={actions} // props
        data={data} // props
        leaf={leaf} // props
        titleLeaf={titleLeaf} // props
        selectedItemId={selectedItemId} // from hook
        handleSelectChange={handleSelectChange} // from hook
        expandedItemIds={expandedItemIds} // from hook
      />
    </div>
  );
}

export default Index;
