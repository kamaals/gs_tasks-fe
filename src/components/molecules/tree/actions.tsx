import React from "react";
import { cn } from "@/lib/utils";

export type ActionsProps = {
  children: React.ReactNode;
  isSelected: boolean;
};

const TreeActions = ({ children, isSelected }: ActionsProps) => {
  return (
    <div
      className={cn(
        isSelected ? "flex" : "hidden",
        "absolute items-center h-10 right-0 z-20",
      )}
    >
      {children}
    </div>
  );
};
export default TreeActions;
