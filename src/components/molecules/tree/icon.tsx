import React from "react";
import { TreeDataItem } from "@/components/molecules/tree/index";

export type IconProps<DataItem extends TreeDataItem> = {
  data: DataItem;
  isOpen?: boolean;
  isSelected?: boolean;
  default?: any;
};

function TreeIcon<DataItem extends TreeDataItem>({
  data,
  isOpen,
  isSelected,
  default: defaultIcon,
}: IconProps<DataItem>) {
  let Icon = defaultIcon;
  if (isSelected && data.selectedIcon) {
    Icon = data.selectedIcon;
  } else if (isOpen && data.openIcon) {
    Icon = data.openIcon;
  } else if (data.icon) {
    Icon = data.icon;
  }
  return Icon ? (
    <Icon className="h-4 w-4 shrink-0 mr-2 relative z-20" />
  ) : (
    <></>
  );
}

export default TreeIcon;
