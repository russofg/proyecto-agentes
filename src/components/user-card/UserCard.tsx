"use client";

import type { UserCardProps } from "./UserCard.types";

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
};

export const UserCard = ({
  name,
  email,
  avatarUrl,
  loading = false,
  action,
}: UserCardProps) => {
  if (loading) {
    return (
      <article aria-busy="true" aria-label="Cargando usuario" data-testid="user-card-skeleton">
        <div aria-hidden="true">○○</div>
        <div aria-hidden="true">
          <div>████████</div>
          <div>██████</div>
        </div>
      </article>
    );
  }

  const showImage = typeof avatarUrl === "string" && avatarUrl.trim().length > 0;

  return (
    <article aria-label="Tarjeta de usuario">
      <div>
        {showImage ? (
          <img src={avatarUrl} alt={`Avatar de ${name}`} />
        ) : (
          <span aria-label={`Fallback avatar ${name}`}>{getInitials(name)}</span>
        )}
      </div>

      <div>
        <p>{name}</p>
        {email ? <p>{email}</p> : null}
      </div>

      {action ? <div>{action}</div> : null}
    </article>
  );
};
