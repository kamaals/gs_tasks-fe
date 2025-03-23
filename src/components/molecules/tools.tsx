"use client";
import { ReactNode } from "react";

function Tools({ children }: { children: ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}

export default Tools;
