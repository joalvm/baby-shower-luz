"use client";

import type { ReactNode } from "react";
import { createContext } from "react";
import type { Invitation } from "@/config/invitation";

export const InvitationContext = createContext<Invitation | null>(null);

type InvitationProviderProps = {
  children: ReactNode;
  value: Invitation;
};

export function InvitationProvider({ children, value }: InvitationProviderProps) {
  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>;
}