import "fetch-ponyfill";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UseEffectRender from "../../../pages/rtlLesson/UseEffectRender";

describe("useEffect rendering", () => {
  it("should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    // API取ってくるまでは表示されないこと
    expect(screen.queryByText(/I am/)).toBeNull();
    // データとってきたらi amが表示されていること
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
