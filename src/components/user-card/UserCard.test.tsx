import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { UserCard } from "./UserCard";

describe("UserCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renderiza datos completos", () => {
    render(
      <UserCard
        name="Ada Lovelace"
        email="ada@example.com"
        avatarUrl="https://example.com/ada.png"
      />,
    );

    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Avatar de Ada Lovelace" })).toBeInTheDocument();
  });

  it("no renderiza texto vacio para email faltante", () => {
    render(<UserCard name="Ada Lovelace" />);

    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.queryByText("ada@example.com")).not.toBeInTheDocument();

    const card = screen.getByLabelText("Tarjeta de usuario");
    const contentSection = card.children[1];
    expect(contentSection?.querySelectorAll("p")).toHaveLength(1);
  });

  it("muestra fallback cuando falta avatar", () => {
    render(<UserCard name="Ada Lovelace" />);

    expect(screen.getByLabelText("Fallback avatar Ada Lovelace")).toBeInTheDocument();
  });

  it("muestra skeleton cuando loading esta activo", () => {
    render(<UserCard name="Ada Lovelace" email="ada@example.com" loading />);

    expect(screen.getByTestId("user-card-skeleton")).toBeInTheDocument();
    expect(screen.queryByText("Ada Lovelace")).not.toBeInTheDocument();
    expect(screen.queryByText("ada@example.com")).not.toBeInTheDocument();
  });

  it("renderiza action cuando se define y la omite cuando no", () => {
    const { rerender } = render(
      <UserCard
        name="Ada Lovelace"
        action={<button type="button">Ver perfil</button>}
      />,
    );

    expect(screen.getByRole("button", { name: "Ver perfil" })).toBeInTheDocument();

    rerender(<UserCard name="Ada Lovelace" />);

    expect(screen.queryByRole("button", { name: "Ver perfil" })).not.toBeInTheDocument();
  });
});

