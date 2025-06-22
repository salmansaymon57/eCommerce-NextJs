// components/ReduxProviderWrapper.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { ReactNode } from "react"; // Added import for ReactNode

export const ReduxProviderWrapper = ({ children }: { children: ReactNode }) => {
  console.log("ReduxProviderWrapper rendered on client");
  return <Provider store={store}>{children}</Provider>;
};
