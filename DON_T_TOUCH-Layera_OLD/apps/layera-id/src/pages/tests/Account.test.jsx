import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Account from "../Account";
import { AuthProviderMock } from "../../test/AuthMock";

test("προβάλλει email, ρόλο και 2FA", () => {
  render(
    <MemoryRouter>
      <AuthProviderMock value={{ currentUser:{ email:"user@ex.com", emailVerified:true }, claims:{ role:"broker", mfa:true }}}>
        <Account/>
      </AuthProviderMock>
    </MemoryRouter>
  );
  expect(screen.getByText(/user@ex.com/)).toBeInTheDocument();
  expect(screen.getByText("Μεσίτης")).toBeInTheDocument();
  expect(screen.getByText(/2FA: Ενεργό/)).toBeInTheDocument();
});