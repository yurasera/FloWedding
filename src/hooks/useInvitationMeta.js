import { useMemo } from "react";
import { formatDateID, formatTimeID, getQueryParam } from "../utils/date.js";

export function useInvitationMeta(invitation) {
  const guestName = useMemo(() => getQueryParam("to"), []);
  const coupleName = `${invitation.couple.groom.short} & ${invitation.couple.bride.short}`;
  const start = useMemo(() => new Date(invitation.event.startISO), [invitation.event.startISO]);
  const dateText = `${formatDateID(start)} • ${formatTimeID(start)} ${invitation.event.timezoneLabel}`;

  return { guestName, coupleName, start, dateText };
}

