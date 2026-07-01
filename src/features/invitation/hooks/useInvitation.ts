"use client";

import { useContext } from "react";
import { InvitationContext } from "@/features/invitation/providers/InvitationProvider";

export function useInvitation() {
  const invitation = useContext(InvitationContext);

  if (invitation === null) {
    throw new Error("useInvitation debe usarse dentro de InvitationProvider.");
  }

  return invitation;
}
