"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";

export default function StoreProvider({children}: {children: React.ReactNode}) {
  const storeRef = useRef<AppStore>(makeStore());
  return <Provider store={storeRef.current}>{children}</Provider>;
}
