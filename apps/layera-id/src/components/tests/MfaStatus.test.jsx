import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MfaStatus from "../MfaStatus";

test("δείχνει ενεργό", () => {
  render(<MfaStatus mfa={true} />);
  expect(screen.getByText(/2FA: Ενεργό/)).toBeInTheDocument();
});

test("δείχνει ανενεργό", () => {
  render(<MfaStatus mfa={false} />);
  expect(screen.getByText(/2FA: Ανενεργό/)).toBeInTheDocument();
});