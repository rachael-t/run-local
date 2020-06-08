import "@testing-library/jest-dom/";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import BadPath from "./BadPath";
import React from "react";

describe("BadPath", () => {
  it("should display the message and button to return home when rendered", () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <BadPath />
      </MemoryRouter>
    );

    const errorMessage = getByText(
      "Hmm... it doesn't look like there is a trail here. Time to turn around!"
    );
    const returnButton = getByRole("button", { name: "Return Home" });

    expect(errorMessage).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();
  });
});
