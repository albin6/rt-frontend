"use client";

import { Tag } from "antd";
import type { UserRole } from "../../types/user-role";

const roleLabel: Record<UserRole, string> = {
  "set-executive": "SET Executive",
  "rnd-associate": "R&D Associate",
  head: "Head",
  lead: "Lead",
  admin: "Admin",
};

const roleColor: Record<UserRole, string> = {
  admin: "red",
  head: "gold",
  lead: "green",
  "rnd-associate": "geekblue",
  "set-executive": "cyan",
};

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <Tag color={roleColor[role]} aria-label={`Role ${roleLabel[role]}`}>
      {roleLabel[role]}
    </Tag>
  );
}

export { roleLabel };
