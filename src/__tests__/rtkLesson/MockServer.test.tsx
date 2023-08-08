import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "../../pages/rtlLesson/MockServer";
import { act } from "react-dom/test-utils";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Mocking API", () => {
  it("[Fetch success]Should display fetched data correctly and button disable", async () => {
    render(<MockServer />);
    await act(async () => {
      userEvent.click(screen.getByRole("button"));
      // Wait for any async state updates to complete
    });
    // screen.debug();
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    // console.log(await screen.findByRole("heading"));
  });
});
