import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RoleBadge from "../RoleBadge";

test("απεικονίζει σωστά τις ετικέτες ρόλων", () => {
  render(<RoleBadge role="admin" />);
  expect(screen.getByText("Διαχειριστής")).toBeInTheDocument();
});

test("εμφανίζει default ρόλο για undefined", () => {
  render(<RoleBadge />);
  expect(screen.getByText("Ιδιώτης")).toBeInTheDocument();
});