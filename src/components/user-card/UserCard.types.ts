import type { ReactNode } from "react";

export type UserCardProps = {
  name: string;
  email?: string;
  avatarUrl?: string;
  loading?: boolean;
  action?: ReactNode;
};
